# 🌶️ Using docker plugin `rexray/s3fs`

## :one: Point to the `docker-machine` instance

```
% eval $(docker-machine env cfm-dev)
```

```
$ cat ~/.aws/credentials
[default]
aws_access_key_id = AKI-MYID-
aws_secret_access_key = -MYSECRETKEY-
```

```
$ docker plugin install rexray/s3fs \
    S3FS_ACCESSKEY=AKI-MYID- S3FS_SECRETKEY="-MYSECRETKEY-"
Plugin "rexray/s3fs" is requesting the following privileges:
 - network: [host]
 - mount: [/dev]
 - allow-all-devices: [true]
 - capabilities: [CAP_SYS_ADMIN]
Do you grant the above permissions? [y/N] Y
latest: Pulling from rexray/s3fs
5fa993fcb5a9: Download complete 
Digest: sha256:8f1ededd08deb86093ece2c80defa263c9aeb3eadfead6b17fe7bd767e417df9
Status: Downloaded newer image for rexray/s3fs:latest
Installed plugin rexray/s3fs
```



https://github.com/rexray/rexray/issues/1172

```
$ docker plugin install rexray/s3fs \
      S3FS_ENDPOINT='http://minio-1' S3FS_MAXRETRIES=20 \
      S3FS_ACCESSKEY=MINIO-ACCESS-KEY S3FS_SECRETKEY=MINIO.SECRET-KEY REXRAY_LOGLEVEL=debug
```
