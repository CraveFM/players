#!/bin/bash

LOCATION=/e/theindie.biz/shared/mp3_user/repository


FILES=($LOCATION/*)

for FILE in ${FILES[@]}
do
   # echo $FILE
   ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -print_format json ${FILE}
done
