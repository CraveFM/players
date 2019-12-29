# Manually

## Install Go

    cd $HOME
    FileName='go1.13.1.linux-armv6l.tar.gz'
    wget https://dl.google.com/go/$FileName
    sudo tar -C /usr/local -xvf $FileName
    cat >> ~/.bashrc << 'EOF'
    export GOPATH=$HOME/go
    export PATH=/usr/local/go/bin:$PATH:$GOPATH/bin
    EOF
    source ~/.bashrc

## Install Minio

All required steps are described in the Minio Quickstart Guide here: [https://github.com/minio/minio/blob/master/README.md](https://github.com/minio/minio/blob/master/README.md)

This tutorial has been tested with Minio revision 2019-10-02T21-19-38Z. Later revisions may or may not work.

    $ cd $HOME
    $ git clone --branch RELEASE.2019-10-02T21-19-38Z https://github.com/minio/minio/
    $ cd minio/
    $ make install

The binary is no inside the folder `/home/pi/go/bin`.
    
    $ ls -l ~/go/bin
    total 36680
    -rwxr-xr-x 1 pi pi 37617664 Dec 29 12:47 minio

Create a folder for the objects and buckets.

    mkdir ~/minio-data
    
Start Minio.

    $ ~/go/bin/minio server ~/minio-data/
    Endpoint:  http://192.168.1.10:9000  http://10.8.0.1:9000  http://172.17.0.1:9000  http://172.18.0.1:9000  http://127.0.0.1:9000      
    AccessKey: KYNUR02NE46743GT0JDT 
    SecretKey: rN3cV4o+NclcDSf+IjBCgFoaAonF86TDOem81zMg 

    Browser Access:
       http://192.168.1.10:9000  http://10.8.0.1:9000  http://172.17.0.1:9000  http://172.18.0.1:9000  http://127.0.0.1:9000      

    Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
       $ mc config host add myminio http://192.168.1.10:9000 KYNUR02NE46743GT0JDT rN3cV4o+NclcDSf+IjBCgFoaAonF86TDOem81zMg

    Object API (Amazon S3 compatible):
       Go:         https://docs.min.io/docs/golang-client-quickstart-guide
       Java:       https://docs.min.io/docs/java-client-quickstart-guide
       Python:     https://docs.min.io/docs/python-client-quickstart-guide
       JavaScript: https://docs.min.io/docs/javascript-client-quickstart-guide
       .NET:       https://docs.min.io/docs/dotnet-client-quickstart-guide
