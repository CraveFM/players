#!/bin/bash

LOCATION=/mnt/shared/theindie.biz/shared/mp3_user/repository


FILES=($LOCATION/*)

echo "["

for FILE in ${FILES[@]}
do
   # echo $FILE
   ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -print_format json ${FILE}
   echo ","
done
echo "]"

# Manually remove the last comma before the last bracket indicating the end of the array
