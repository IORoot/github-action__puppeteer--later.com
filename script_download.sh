#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "$0 [TARGET_FILENAME]"
    exit 1
fi

VIDEOFILE=$(cat post_videourl.txt)
TARGETFILE=$1
rclone copyurl --no-check-certificate ${VIDEOFILE} ${TARGETFILE}