

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

docker run -d --name mailhog -p 1025:1025 -p 8025:8025 mailhog/mailhog