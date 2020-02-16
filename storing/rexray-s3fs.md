# 🌶️ Using docker plugin `rexray/s3fs`

### :warning: This post is to be used against an AWS environment

## :one: Point to the `docker-machine` instance

```
% eval $(docker-machine env MYREMOTE-VM)
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

```
$ docker volume ls
DRIVER               VOLUME NAME
local                4b6ff1712b3b855f4ca29d73fb04a2eacd82a7863540b800f0801cc9600484ad
local                84b3fdacb13365e0875e3290b6480e9fe78b0e12514eab076c9c02ce7ec77024
local                474b3e7bca22868e11b557d067217010188dd59f82e7cb23f0e8fd39001f8f64
local                707d541d4de8cede1704fdc55d35773e33445fe7c071764bf216462f85a188b7
local                3024758bc078755f6eb9ba17276570adaf35adbc0141754f791648840044019c
local                a8fb3eb0764b0687495bd653a3141aa62fb5b1870a0c152c873d696601e8df70
local                adfcd63fe429d784bbbd1cc43981b54172932941d6b9d89478edd0febd53b863
local                c0d3a50193a350c5172e569fc5b8de1d53de6600250d5eb23bce5e2eb01256f8
rexray/s3fs:latest   mycomp-stream-dev
rexray/s3fs:latest   mycomp-stream-qa
rexray/s3fs:latest   mycomp-stream-prod
```


```
$ docker run --interactive --tty --rm \
             --volume-driver=rexray/s3fs -v mycomp-stream-dev:/mycomp-stream-dev \
             busybox
```

https://github.com/rexray/rexray/issues/1172

```
$ docker plugin install rexray/s3fs \
      S3FS_ENDPOINT='http://minio-1' S3FS_MAXRETRIES=20 \
      S3FS_ACCESSKEY=MINIO-ACCESS-KEY S3FS_SECRETKEY=MINIO.SECRET-KEY REXRAY_LOGLEVEL=debug
```
