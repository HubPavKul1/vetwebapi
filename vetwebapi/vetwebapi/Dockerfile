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

ENTRYPOINT ["sh","app.sh"]
