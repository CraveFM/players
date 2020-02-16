### 🌶️ Using docker plugin `rexray/s3fs`

https://github.com/rexray/rexray/issues/1172

```
$ docker plugin install rexray/s3fs \
      S3FS_ENDPOINT='http://minio-1' S3FS_MAXRETRIES=20 \
      S3FS_ACCESSKEY=MINIO-ACCESS-KEY S3FS_SECRETKEY=MINIO.SECRET-KEY REXRAY_LOGLEVEL=debug
```
