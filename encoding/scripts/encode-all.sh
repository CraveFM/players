#!/bin/bash

RESOURCE_FOLDER=../resources

STREAM_FOLDER=stream; rm -rf ${STREAM_FOLDER}; mkdir -p ${STREAM_FOLDER}/dash; mkdir ${STREAM_FOLDER}/hls

OUTPUT_FOLDER=output; rm -rf ${OUTPUT_FOLDER}; mkdir ${OUTPUT_FOLDER}

SONGS=(
"WhatIsThisThingCalledLove"
"TIAr0000000196Al0000000001So0000006243"
) 

for SONG in "${SONGS[@]}"; do
   echo ${SONG} 

   ffmpeg -loop 1 -i ${RESOURCE_FOLDER}/img/ImageMP3.png -i ${RESOURCE_FOLDER}/mp3/${SONG}.mp3  -c:v libx264 -c:a aac -b:a 128k  -shortest ${OUTPUT_FOLDER}/TMP_${SONG}.mp4
   MP4Box -add ${OUTPUT_FOLDER}/TMP_${SONG}.mp4 -fps 24 ${OUTPUT_FOLDER}/${SONG}.mp4


   # DASH section only

   mkdir ${STREAM_FOLDER}/dash/${SONG}
   MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ ${OUTPUT_FOLDER}/${SONG}.mp4#audio -out ${STREAM_FOLDER}/dash/${SONG}/.mpd

   # HLS section only
   # HLS is native on Safari but for some reasons ther file name is needed when using the .m3u8 extension

   mkdir ${STREAM_FOLDER}/hls/${SONG}
   ffmpeg  -i ${OUTPUT_FOLDER}/${SONG}.mp4 -c:v h264 -flags +cgop -g 30 -hls_time 10 -hls_list_size 0 -f hls ${STREAM_FOLDER}/hls/${SONG}/${SONG}.m3u8
done

rm -rf ${OUTPUT_FOLDER}
