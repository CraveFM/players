# Minio on a Raspberry Pi 3 with Raspbian (Debian Jessie 8.0)

The Raspberry Pi 3 Model B+ single board computer from the [Raspberry Pi Foundation](https://www.raspberrypi.org) has a 1.4 GHz quad-core ARMv8 CPU, 1 GByte main memory and a Gigabit Ethernet interface. 

![Front of the Raspberry Pi 3 Model B+ single board computer](images/RPi3plus_front.jpg)
![Back of the Raspberry Pi 3 Model B+ single board computer](images/RPi3plus_back.jpg)

This installation tutorial explains the installation of a Raspberry Pi 3 device from scratch and the configuration of [s3cmd](http://s3tools.org) on your computer. 

_This implies that you have already an installation of `s3cmd` on the system you want to use for the interaction with the Minio storage service._

## Fetch and decompress the operating system image

    $ wget http://downloads.raspberrypi.org/raspbian_lite/images/raspbian_lite-2019-09-30/2019-09-26-raspbian-buster-lite.zip
    $ unzip 2019-09-26-raspbian-buster-lite.zip 
    Archive:  2019-09-26-raspbian-buster-lite.zip
      inflating: 2019-09-26-raspbian-buster-lite.img

    $ lsblk | grep mm
    mmcblk0     179:0    0  29,8G  0 disk 
    └─mmcblk0p1 179:1    0  29,8G  0 part 

## Write the image on a local micro SD card

Check which one is the correct device! If you use an internal card reader, it is often `/dev/mmcblk0`.

    $ sudo dd bs=4M if=2019-09-26-raspbian-buster-lite.img of=/dev/mmcblk0 status=progress
    $ sudo sync

Default login of this image is `pi/raspberry`. To become user root, execute `sudo su`.

Older Raspian versions started the SSH server by default. Because of security reasons (as explained [here](https://www.raspberrypi.org/blog/a-security-update-for-raspbian-pixel/)), all Raspbian versions since version 2016-11-25 (see the [release notes](http://downloads.raspberrypi.org/raspbian/release_notes.txt)) have the SSH server disabled by default. To get the SSH server automatically activated during boot time, create a file `ssh` with any content (or just an empty file) inside the boot partition (it is the first partition) of the micro SD card.

    $ lsblk | grep mm
    mmcblk0     179:0    0  29,8G  0 disk 
    ├─mmcblk0p1 179:1    0   256M  0 part 
    └─mmcblk0p2 179:2    0   1,9G  0 part 

    $ sudo mount /dev/mmcblk0p1 /media/

    $ df | grep mm
    /dev/mmcblk0p1    258095     53032    205064   21% /media

    $ sudo touch /media/ssh
    $ sync
    $ sudo umount /media

## Start the Raspberry Pi Computer

The Raspbian operating system will try to fetch network configuration by using DHCP on the Ethernet interface per default. 

If DHCP is not the desired solution, you may want to specify a static IP address for the single board computer. Leave the file `/etc/network/interfaces` at its default, because since Debian 9 (Stretch) it effectively does nothing. Instead, modify the file `/media/etc/dhcpcd.conf`.

    $ sudo mount /dev/mmcblk0p2 /media/

    $ sudo joe /media/etc/dhcpcd.conf

Insert these lines:

    # Static address, routes and dns
    interface eth0
    static ip_address=10.0.2.1/16
    static routers=10.0.0.1
    static domain_name_servers=10.0.0.1

    $ sudo umount /media
    $ sync

Insert the micro SD card into the Raspberry Pi computer, connect it with the Ethernet cable and the micro USB cable for power supply and switch on the power supply. The operating system will try to fetch network configuration by using DHCP on the Ethernet interface per default. If you activated the SSH server, you can now log in via SSH.
    

## Expand the File System to make use of the entire Capacity of the micro SD Card

After you logged into the single boad computer with SSH, you can now configure the computer with the `raspi-config` tool.

    $ sudo raspi-config

![Expand the file system with raspi-config](images/Raspbian_Buster_expand_FS1.png)
![Expand the file system with raspi-config](images/Raspbian_Buster_expand_FS2.png)

## Reduce the amount of memory for the GPU

_This is not required for running Minio, but the Raspberry Pi 3 has just 1 GB of main memory which is not much at all and there is no need to waste 48 MB._

A part of the main memory (just 1 GB) is assigned to the GPU. A pure server does not need a GPU at all. The share can me specified via the `raspi-config` tool. The minimum value is 16 MB, which is more useful compared with the dafault value (64 MB).

![Specify the memory split with raspi-config](images/Raspbian_Buster_memory_split1.png)
![Specify the memory split with raspi-config](images/Raspbian_Buster_memory_split2.png)

After the new value is specified and after a reboot, the new value should be visible:

    $ vcgencmd get_mem gpu
    gpu=16M

## Configure the Time Zone

_This is not required for running Minio, but it is always useful to configure the operating system properly_

    $ sudo dpkg-reconfigure tzdata
    $ cat /etc/timezone
    Europe/Berlin

It is also possible to specify the time zone via the `raspi-config` tool.
    
## Predictable network interface names
    
It is more handy to have network names like `eth0` in Raspbian. Use the `raspi-config` tool.
    
![Specify the memory split with raspi-config](images/Raspbian_Buster_predictable_network_names1.png)
![Specify the memory split with raspi-config](images/Raspbian_Buster_predictable_network_names2.png)
![Specify the memory split with raspi-config](images/Raspbian_Buster_predictable_network_names3.png)

Reboot the system.

## Check the system    

    $ uname -a
    Linux raspberrypi 4.19.75-v7+ #1270 SMP Tue Sep 24 18:45:11 BST 2019 armv7l GNU/Linux
    $ ip -4 addr show | grep global
        inet 10.0.2.1/16 brd 10.0.255.255 scope global noprefixroute eth0





## Configure NTP to have the correct Time on the Raspberry Pi Computer

_This is not required for running Minio, but it is always useful to have the correct time on a computer_

    $ sudo apt-get update && sudo apt-get install -y ntp ntpdate

Now the time sould be synchronized with several NTP servers.

    $ ntpq -p
        remote           refid      st t when poll reach   delay   offset  jitter
    ==============================================================================
    0.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.002
    1.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.002
    2.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.002
    3.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.002
    213.251.53.187  193.0.0.229      2 u    2   64    1    7.757   -1.185   0.023
    nbg01.muxx.net  40.33.41.76      2 u    2   64    1   10.579   -0.898   0.028
    stratum2-1.NTP. 129.70.130.71    2 u    1   64    1   17.376    0.563   0.258
    x8d1ee404.agdsn 193.175.73.151   2 u    2   64    1   22.135   -0.846   0.062
    ntp.informatik. 124.216.164.14   2 u    1   64    1   16.043   -0.785   0.297
    kabel.akku.expr .DCFa.           1 u    1   64    1   26.807   -3.012   0.002
    cluster002.lino 130.149.17.21    2 u    2   64    1   11.572   -3.866   0.088
    mail.masters-of 131.211.8.244    2 u    1   64    1   11.611   -1.134   0.002
    y.ns.gin.ntt.ne 249.224.99.213   2 u    2   64    1   19.203   -6.312   0.176
    golf.zq1.de     205.46.178.169   2 u    1   64    1   12.154   -0.693   0.077
    bo.leptonics.co 187.182.182.166  3 u    1   64    1   12.197   -1.253   0.002
    tom.linocomm.ne 130.149.17.21    2 u    1   64    1   12.793   -1.525   0.002


Check the time and date:

    $ date -R
    Sat, 05 Oct 2019 15:18:36 +0200

## Install some packages

They are not required for the installation of Minio, but just nice to have.

    $ sudo apt-get install -y curl htop joe nmap git 

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
    insgesamt 36680
    -rwxr-xr-x 1 pi pi 37617664 Okt  5 11:16 minio

Create a folder for the objects and buckets.

    mkdir ~/minio-data
    
Start Minio.

    $ ~/go/bin/minio server ~/minio-data/

    Endpoint:  http://10.0.2.1:9000  http://127.0.0.1:9000    
    AccessKey: RZ26HANXN6EHUSX3LYKE 
    SecretKey: TuhruFQNumkC9eZcriXbWhKzvDf2d+BSDJU5AMz6 

    Browser Access:
    http://10.0.2.1:9000  http://127.0.0.1:9000    

    Command-line Access: https://docs.min.io/docs/minio-client-quickstart-guide
    $ mc config host add myminio http://10.0.2.1:9000 RZ26HANXN6EHUSX3LYKE TuhruFQNumkC9eZcriXbWhKzvDf2d+BSDJU5AMz6

    Object API (Amazon S3 compatible):
    Go:         https://docs.min.io/docs/golang-client-quickstart-guide
    Java:       https://docs.min.io/docs/java-client-quickstart-guide
    Python:     https://docs.min.io/docs/python-client-quickstart-guide
    JavaScript: https://docs.min.io/docs/javascript-client-quickstart-guide
    .NET:       https://docs.min.io/docs/dotnet-client-quickstart-guide


Minio provides a handy web user interface.

![Minio on the Raspberry Pi 3 Model B+ single board computer](images/Minio_WebUI_Raspbian_Buster_2019_10_05.png)
    
## Configure the `~/.s3cfg` file to make `s3cmd` working with Minio

All required steps are described here: [https://docs.minio.io/docs/s3cmd-with-minio](https://docs.minio.io/docs/s3cmd-with-minio)

Just these lines need to be modified:

    access_key = RZ26HANXN6EHUSX3LYKE
    host_base = <the_ip_of_your_raspberry>:9000
    host_bucket = <the_ip_of_your_raspberry>:9000
    secret_key = TuhruFQNumkC9eZcriXbWhKzvDf2d+BSDJU5AMz6
    bucket_location = us-east-1
    use_https = False
    signature_v2 = False

Now s3cmd should work properly with the Minio service.

    $ s3cmd mb s3://testbucket
    Bucket 's3://testbucket/' created
    bnc@olymp-x270:~$ s3cmd ls
    2019-10-05 13:49  s3://testbucket

**Important !!!** When using `s3cmd` together with Minio, the buckets names must not contain capital letters. Otherwise you will just get this error message:

    $ s3cmd mb s3://TESTBUCKET
    ERROR: S3 error: 400 (InvalidBucketName): The specified bucket is not valid.

## Some important Stuff

The user access key and secret access key can be specified via the environment variables `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY`.

Minio provides internal replication of the object data via multiple local folders. 

    $ minio server /mnt/folder1 /mnt/folder2/ /mnt/folder3/ /mnt/folder4/ 

If is possible to specify the behavior of Minio with a config file:

    ~/.minio/config.json

Inside this file, it is among others specified...
* the user access key and secret access key. This is important in order to keep your credentials- after a restart of the Minio service.
* several further credentials and endpoint information (e.g. to AWS-S3 or Google CS) if desired.
* if the web user interface shall be used.
* if the server shall print out messages on command line and the logging level.
* if the server shall write messages in a logfile and the file name as well as the logging level.

If the port number is not specified with option `--address ":<number>"`, the default port number of Minio (`9000`) will be used. 

If you want to start Minio automatically after each reboot, just execute `sudo crontab -e` and insert this line into the crontab:

    @reboot /home/pi/go/bin/minio server /home/pi/minio-data/
