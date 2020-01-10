# Mount an SSD

https://www.raspberrypi.org/documentation/configuration/external-storage.md

:one: Plug the device into the USB port


:two: List all disks

```
$ sudo lsblk -o UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
UUID                                 NAME        FSTYPE  SIZE MOUNTPOINT LABEL  MODEL
                                     mmcblk0            14.9G                   
3FFE-CDCA                            ├─mmcblk0p1 vfat    256M /boot      boot   
3122c401-b3c6-4d27-8e0d-6708a7613aed └─mmcblk0p2 ext4   14.6G /          rootfs 
```

