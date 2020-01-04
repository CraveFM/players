#!/bin/bash

LOCATION=../resources/mp3

FILES=(
TIAr0000000196Al0000000001So0000006243.mp3
)

for FILE in ${FILES}
do
   ffprobe -v quiet -print_format json -show_format -show_streams ${LOCATION}/${FILE}
done
