#!/bin/bash
sleep 20s;
poetry shell;
alembic upgrade head;
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000
