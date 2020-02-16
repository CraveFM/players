# Docker Install


## Installation 

Install minio using Docker: 

    $ docker run --name minio -p 9000:9000 -d alexellis2/minio-armhf:latest
    

Get the Access Keys using:

    % docker logs minio
    Created minio configuration file at /root/.minio

     Minio is 234 days 6 hours 41 minutes old 
     Update: docker pull minio/minio 


    Endpoint:  http://172.17.0.2:9000  http://127.0.0.1:9000
    AccessKey: YVP9VABOG339FL8XFNWF 
    SecretKey: d6NUZ/F1n8EDm53+znaT67LTwsOSL4q5UMBRRH5d 
    Region:    us-east-1
    SQS ARNs:  <none>

    Browser Access:
       http://172.17.0.2:9000  http://127.0.0.1:9000

    Command-line Access: https://docs.minio.io/docs/minio-client-quickstart-guide
       $ mc config host add myminio http://172.17.0.2:9000 YVP9VABOG339FL8XFNWF d6NUZ/F1n8EDm53+znaT67LTwsOSL4q5UMBRRH5d

    Object API (Amazon S3 compatible):
       Go:         https://docs.minio.io/docs/golang-client-quickstart-guide
       Java:       https://docs.minio.io/docs/java-client-quickstart-guide
       Python:     https://docs.minio.io/docs/python-client-quickstart-guide
       JavaScript: https://docs.minio.io/docs/javascript-client-quickstart-guide

    Drive Capacity: 1.9 GiB Free, 14 GiB Total
