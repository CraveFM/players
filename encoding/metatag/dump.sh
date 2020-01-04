#!/bin/bash

LOCATION=../resources/mp3

FILES=(
TIAr0000000196Al0000000001So0000006243.mp3
)

for FILE in ${FILES}
do
   ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json ${LOCATION}/${FILE}
done
