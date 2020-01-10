# Mount an SSD

https://www.raspberrypi.org/documentation/configuration/external-storage.md



:one: List all disks

:pushpin: Before

```
$ sudo lsblk -o UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
UUID                                 NAME        FSTYPE  SIZE MOUNTPOINT LABEL  MODEL
                                     mmcblk0            14.9G                   
3FFE-CDCA                            ├─mmcblk0p1 vfat    256M /boot      boot   
3122c401-b3c6-4d27-8e0d-6708a7613aed └─mmcblk0p2 ext4   14.6G /          rootfs 
```

:two: Plug the device into the USB port

:pushpin: After (i.e. `sda`)

```
$ sudo lsblk -o UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
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

:pushpin: get location of disk partition (i.e. locate `UUID`)

```
$ sudo blkid
/dev/mmcblk0p1: LABEL_FATBOOT="boot" LABEL="boot" UUID="3FFE-CDCA" TYPE="vfat" PARTUUID="dabd7026-01"
/dev/mmcblk0p2: LABEL="rootfs" UUID="3122c401-b3c6-4d27-8e0d-6708a7613aed" TYPE="ext4" PARTUUID="dabd7026-02"
/dev/mmcblk0: PTUUID="dabd7026" PTTYPE="dos"
/dev/sda1: LABEL="Lexar" UUID="5A39-0D3D" TYPE="vfat" PARTUUID="1d0db7cb-01"
```

:pushpin: Edit `/etc/fstab`

```
UUID=5C24-1453 /mnt/shared FSTYPE defaults,auto,users,rw,nofail 0 0
```

# References:

| Link | Description |
|------|-------------|
| [vfat](https://stackoverflow.com/questions/11928982/what-is-the-difference-between-vfat-and-fat32-file-systems) | What is the difference between `vfat` and `fat32` file systems |
