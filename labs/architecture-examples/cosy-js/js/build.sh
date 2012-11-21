#!/bin/bash

if [ ! -d ./build ]
then
    mkdir -p ./build
fi

browserify ./script/bootstrap.js -o ./build/app.js
