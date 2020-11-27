#!/bin/bash

STREAM_FOLDER=stream; rm -rf ${STREAM_FOLDER}; mkdir ${STREAM_FOLDER}

OUTPUT_FOLDER=output; rm -rf ${OUTPUT_FOLDER}; mkdir ${OUTPUT_FOLDER}

SONGS=(
"WhatIsThisThingCalledLove"
"TIAr0000000196Al0000000001So0000006243"
) 

for SONG in "${SONGS[@]}"; do
   echo ${SONG} 
   mkdir ${STREAM_FOLDER}/${SONG}
   ffmpeg -loop 1 -i resources/img/ImageMP3.png -i resources/mp3/${SONG}.mp3  -c:v libx264 -c:a aac -b:a 128k  -shortest ${OUTPUT_FOLDER}/TMP_${SONG}.mp4
   MP4Box -add ${OUTPUT_FOLDER}/TMP_${SONG}.mp4 -fps 24 ${OUTPUT_FOLDER}/${SONG}.mp4
   ffmpeg  -i ${OUTPUT_FOLDER}/${SONG}.mp4 \
          -c:v h264 -flags +cgop -g 30 -hls_time 10 -hls_list_size 0 -f hls \
          ${STREAM_FOLDER}/${SONG}/${SONG}.m3u8
done

rm -rf $OUTPUT_FOLDER
