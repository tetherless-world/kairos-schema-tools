#!/bin/bash
set -e
service nginx start
/app/bin/kairos-schema-tools-app
