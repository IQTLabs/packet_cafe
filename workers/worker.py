import datetime
import json
import time
import uuid

import docker
import pika


def callback(ch, method, properties, body):
    """Callback that has the message that was received"""
    workers = load_workers()
    d = setup_docker()
    pipeline = json.loads(body.decode('utf-8'))
    if 'id' in pipeline and 'file_type' in pipeline:
        for worker in workers['workers']:
            if pipeline['file_type'] in worker['inputs']:
                # TODO attach volume to file path
                uid = str(uuid.uuid4()).split('-')[-1]
                name = worker['name'] + '_' + uid
                d.containers.run(worker['image'], name=name, detach=True)
        print(" [O] %s UTC %r:%r" % (str(datetime.datetime.utcnow()),
                                     method.routing_key,
                                     pipeline))
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
