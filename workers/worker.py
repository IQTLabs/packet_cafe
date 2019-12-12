import datetime
import json
import os
import time
import uuid

import docker
import pika
import requests
from redis import StrictRedis


def callback(ch, method, properties, body):
    """Callback that has the message that was received"""
    vol_prefix = os.getenv('VOL_PREFIX', '')
    workers = load_workers()
    d = setup_docker()
    pipeline = json.loads(body.decode('utf-8'))
    worker_found = False
    for worker in workers['workers']:
        file_path = pipeline['file_path']
        try:
            session_id = file_path.split('/')[2]
        except Exception as e:  # pragma: no cover
            session_id = ''
        if 'id' in pipeline and (('results' in pipeline and pipeline['results']['tool'] in worker['inputs']) or ('file_type' in pipeline and pipeline['file_type'] in worker['inputs'])):
            uid = str(uuid.uuid4()).split('-')[-1]
            name = worker['name'] + '_' + uid
            image = worker['image']

            if 'version' in worker:
                image += ':' + worker['version']
            command = []
            if 'command' in worker:
                command = worker['command']

            if worker['name'] == 'ncapture':
                command[1] = 'pcapfile:' + file_path
                command[3] = pipeline['id']
                command.append(os.path.dirname(file_path))
            else:
                command.append(file_path)

            environment = pipeline
            if 'environment' in worker:
                environment.update(worker['environment'])
            if 'rabbit' not in pipeline:
                pipeline['rabbit'] = 'true'
            try:
                d.containers.run(image=image,
                                 name=name,
                                 network=worker['stage'],
                                 volumes={vol_prefix + '/files': {'bind': '/files', 'mode': 'rw'}},
                                 environment=environment,
                                 remove=True,
                                 command=command,
                                 detach=True)
            except Exception as e:  # pragma: no cover
                print('failed: {0}'.format(str(e)))
            print(" [Create container] %s UTC %r:%r:%r:%r" % (str(datetime.datetime.utcnow()),
                                         method.routing_key,
                                         pipeline['id'],
                                         image,
                                         pipeline))
            worker_found = True
    if 'id' in pipeline and 'results' in pipeline and pipeline['type'] == 'data':
        print(" [Data] %s UTC %r:%r:%r" % (str(datetime.datetime.utcnow()),
                                        method.routing_key,
                                        pipeline['id'],
                                        pipeline['results']))
        r = requests.post('http://lb/api/v1/results/{0}/{1}/{2}/{3}'.format(pipeline['results']['tool'], pipeline['results']['counter'], session_id, pipeline['id']), data=json.dumps(pipeline))
    elif 'id' in pipeline and 'results' in pipeline and pipeline['type'] == 'metadata':
        if 'data' in pipeline and pipeline['data'] != '':
            print(" [Metadata] %s UTC %r:%r:%r" % (str(datetime.datetime.utcnow()),
                                            method.routing_key,
                                            pipeline['id'],
                                            pipeline['results']))
            r = requests.post('http://lb/api/v1/results/{0}/{1}/{2}/{3}'.format(pipeline['results']['tool'], 0, session_id, pipeline['id']), data=json.dumps(pipeline))
        else:
            print(" [Finished] %s UTC %r:%r" % (str(datetime.datetime.utcnow()),
                                         method.routing_key,
                                         pipeline))
    elif not worker_found:
        print(" [X no match] %s UTC %r:%r" % (str(datetime.datetime.utcnow()),
                                     method.routing_key,
                                     pipeline))

    ch.basic_ack(delivery_tag=method.delivery_tag)


def main(queue_name, host):
    """Creates the connection to RabbitMQ as a consumer and binds to the queue
    waiting for messages
    """
    counter = 0
    while True:
        counter += 1
        try:
            params = pika.ConnectionParameters(host=host, port=5672)
            connection = pika.BlockingConnection(params)
            channel = connection.channel()
            print('Connected to rabbit')
            channel.queue_declare(queue=queue_name, durable=True)
            channel.basic_qos(prefetch_count=1)
            channel.basic_consume(queue=queue_name, on_message_callback=callback)
            channel.start_consuming()
        except Exception as e:  # pragma: no cover
            print(str(e))
            print('Waiting for connection to rabbit...attempt: {0}'.format(counter))
        time.sleep(1)

    return


def setup_docker():
    return docker.from_env()


def setup_redis(host='redis', port=6379, db=0):
    r = None
    try:
        r = StrictRedis(host=host, port=port, db=db,
                        socket_connect_timeout=2)
    except Exception as e:  # pragma: no cover
        print('Failed connect to Redis because: {0}'.format(str(e)))
    return r


def load_workers():
    with open('/definitions/workers.json') as json_file:
        workers = json.load(json_file)
    return workers


if __name__ == "__main__":
    queue_name = 'task_queue'
    host = 'messenger'
    main(queue_name, host)
