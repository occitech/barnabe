#!/usr/bin/env bash
docker stop barnabe && docker rm -v barnabe && docker run --name barnabe --expose 3000 -p 3000:3000 -d -v "$PWD":/usr/src/barnabe -w /usr/src/barnabe node:0.10 npm start