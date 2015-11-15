#!/bin/bash
set -x
createdb -U postgres data_dev
createdb -U postgres data_test
set +x
