#!/bin/bash
cd /home/kavia/workspace/code-generation/photovault-94147-94177/main_container_for_photovault
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

