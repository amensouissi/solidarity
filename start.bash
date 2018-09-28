#!/bin/bash
export PYTHONPATH=$PYTHONPATH:.
pip3 install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
alembic -c production.ini upgrade head
./bin/pserve production.ini