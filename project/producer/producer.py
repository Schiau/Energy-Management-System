import threading
import json
import time
import csv
import pika
from time import sleep

CSV_FILE = "sensor.csv"
TIME_SLEEP = 10
IDS = [1, 2,3,4]
RABBITMQ_HOST = 'localhost'
QUEUE_NAME = 'sensor_data_queue'


def init_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    return connection, channel


def thread_function(thread_id):
    connection, channel = init_rabbitmq()
    with open(CSV_FILE, mode='r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            value = row['0']
            data = {
                "timestamp": int(time.time() * 1000),
                "device_id": thread_id,
                "measurement_value": value
            }
            json_data = json.dumps(data, indent=4)

            try:
                channel.basic_publish(
                    exchange='',
                    routing_key=QUEUE_NAME,
                    body=json_data,
                    properties=pika.BasicProperties(
                        delivery_mode=2,  # persistent
                    )
                )
                print(f"Sent to RabbitMQ: {json_data}\n")
            except pika.exceptions.AMQPConnectionError as e:
                print(f"Connection error: {e}")
            sleep(TIME_SLEEP)
    connection.close()

threads = []
for thread_id in IDS:
    thread = threading.Thread(target=thread_function, args=(thread_id,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print("All threads completed.")
