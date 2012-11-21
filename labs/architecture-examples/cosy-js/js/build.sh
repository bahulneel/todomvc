#!/bin/bash

[ -d ./node_modules ] || npm install browserify hogan.js

if [ ! -d ./build ]
then
    mkdir -p ./build
fi

./node_modules/.bin/browserify ./script/bootstrap.js -o ./build/app.js
