# Mount an SSD

https://www.raspberrypi.org/documentation/configuration/external-storage.md



:one: List all `block storage` devices picking specific columns

:pushpin: Before

```
$ lsblk --output UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
UUID                                 NAME        FSTYPE  SIZE MOUNTPOINT LABEL  MODEL
                                     mmcblk0            14.9G                   
3FFE-CDCA                            ├─mmcblk0p1 vfat    256M /boot      boot   
3122c401-b3c6-4d27-8e0d-6708a7613aed └─mmcblk0p2 ext4   14.6G /          rootfs 
```

:two: Plug the device into the USB port

:pushpin: After (i.e. `sda`)

```
$ lsblk --output UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
UUID                                 NAME        FSTYPE  SIZE MOUNTPOINT LABEL  MODEL
                                     sda                57.6G                   USB_Flash_Drive
5A39-0D3D                            └─sda1      vfat   57.6G            Lexar  
                                     mmcblk0            14.9G                   
3FFE-CDCA                            ├─mmcblk0p1 vfat    256M /boot      boot   
3122c401-b3c6-4d27-8e0d-6708a7613aed └─mmcblk0p2 ext4   14.6G /          rootfs 
```

:three: make `shared` directory

```
$ mkdir /mnt/shared
```

:pushpin: Mount the USB drive to the shared directory 

```
$ sudo mount /dev/sda1 /mnt/shared/
```


:three: Automatic mounting

:pushpin: get location of disk partition (i.e. locate `UUID` and `TYPE`)

```
$ sudo blkid
/dev/mmcblk0p1: LABEL_FATBOOT="boot" LABEL="boot" UUID="3FFE-CDCA" TYPE="vfat" PARTUUID="dabd7026-01"
/dev/mmcblk0p2: LABEL="rootfs" UUID="3122c401-b3c6-4d27-8e0d-6708a7613aed" TYPE="ext4" PARTUUID="dabd7026-02"
/dev/mmcblk0: PTUUID="dabd7026" PTTYPE="dos"
/dev/sda1: LABEL="Lexar" UUID="5A39-0D3D" TYPE="vfat" PARTUUID="1d0db7cb-01"
```

:pushpin: Edit `/etc/fstab` change `UUID` , mount `name` and `FSTYPE` which is `vfat`

```
UUID=5A39-0D3D        /mnt/shared     vfat    defaults,auto,users,rw,nofail,umask=000 0 0
```

:five: Check if errors after `reboot`

```
$ journalctl | grep shared
Jan 10 14:00:59 isaha kernel: vc-sm: Videocore shared memory driver
Jan 10 14:01:00 isaha kernel: bcm2835_vc_sm_cma_probe: Videocore shared memory driver
Jan 10 14:01:01 isaha systemd[1]: Mounting /mnt/shared...
Jan 10 14:01:01 isaha mount[298]: mount: /mnt/shared: unknown filesystem type 'FSTYPE'.
Jan 10 14:01:01 isaha systemd[1]: mnt-shared.mount: Mount process exited, code=exited, status=32/n/a
Jan 10 14:01:01 isaha systemd[1]: mnt-shared.mount: Failed with result 'exit-code'.
Jan 10 14:01:01 isaha systemd[1]: Failed to mount /mnt/shared.
Jan 10 14:01:02 isaha udisksd[361]: failed to load module crypto: libbd_crypto.so.2: cannot open shared object file: No such file or directory
Jan 10 14:01:02 isaha udisksd[361]: failed to load module mdraid: libbd_mdraid.so.2: cannot open shared object file: No such file or directory
```


# References:

| Link | Description |
|------|-------------|
| [vfat](https://stackoverflow.com/questions/11928982/what-is-the-difference-between-vfat-and-fat32-file-systems) | What is the difference between `vfat` and `fat32` file systems |
