import datetime
import json
import time

import docker
import pika


def callback(ch, method, properties, body):
    """Callback that has the message that was received"""
    d = setup_docker()
    pipeline = json.loads(body.decode('utf-8'))
    if 'id' in pipeline and 'image' in pipeline:
        d.containers.run(pipeline['image'], detach=True)
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

if __name__ == "__main__":
    queue_name = 'task_queue'
    host = 'messenger'
    main(queue_name, host)
