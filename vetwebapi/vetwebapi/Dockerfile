FROM python:3.11-alpine
RUN mkdir /vetwebapi
WORKDIR /vetwebapi
COPY ./pyproject.toml .
RUN pip install --upgrade pip
ENV PIP_ROOT_USER_ACTION=ignore
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install
EXPOSE 8000
COPY ./ .

RUN chmod a+x  *.sh
# RUN sleep 20s
# RUN alembic upgrade head
# RUN gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000

ENTRYPOINT ["sh","app.sh"]
