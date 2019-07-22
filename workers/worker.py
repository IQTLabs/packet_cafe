import datetime
import json
import time
import uuid

import docker
import pika
import requests


def callback(ch, method, properties, body):
    """Callback that has the message that was received"""
    workers = load_workers()
    d = setup_docker()
    pipeline = json.loads(body.decode('utf-8'))
    if 'id' in pipeline and 'file_type' in pipeline:
        print(" [O] %s UTC %r:%r" % (str(datetime.datetime.utcnow()),
                                     method.routing_key,
                                     pipeline))
        for worker in workers['workers']:
            if pipeline['file_type'] in worker['inputs']:
                uid = str(uuid.uuid4()).split('-')[-1]
                name = worker['name'] + '_' + uid
                try:
                    d.containers.run(image=worker['image'],
                                     name=name,
                                     network='analysis',
                                     volumes={'packet_cafe_files': {'bind': '/pcaps', 'mode': 'ro'}},
                                     environment=pipeline,
                                     remove=True,
                                     command=["/pcaps/id/{0}".format(pipeline['id']), "-r"],
                                     detach=True)
                except Exception as e:  # pragma: no cover
                    print('failed: {0}'.format(str(e)))
    elif 'id' in pipeline and 'results' in pipeline and pipeline['type'] == 'data':
        print(" [A] %s UTC %r:%r:%r" % (str(datetime.datetime.utcnow()),
                                        method.routing_key,
                                        pipeline['id'],
                                        pipeline['results']))
        r = requests.post('http://lb/v1/results/pcapplot/{0}/{1}'.format(pipeline['results']['counter'], pipeline['id']), data=json.dumps(pipeline))
    elif 'id' in pipeline and 'results' in pipeline and pipeline['type'] == 'metadata':
        print(" [A] %s UTC %r:%r:%r" % (str(datetime.datetime.utcnow()),
                                        method.routing_key,
                                        pipeline['id'],
                                        pipeline['results']))
        r = requests.post('http://lb/v1/results/pcapplot/{0}/{1}'.format(0, pipeline['id']), data=json.dumps(pipeline))
    else:
        print(" [X] %s UTC %r:%r" % (str(datetime.datetime.utcnow()),
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


def load_workers():
    with open('workers.json') as json_file:
        workers = json.load(json_file)
    return workers


if __name__ == "__main__":
    queue_name = 'task_queue'
    host = 'messenger'
    main(queue_name, host)
