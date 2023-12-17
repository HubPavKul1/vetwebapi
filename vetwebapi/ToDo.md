# Vetwebapi
## Приложение на [FastAPI](https://fastapi.tiangolo.com/) для ветеринарной работы
* ### Создадим папку для проекта vetwebapi
* ### Создадим проект с помощью [poetry](https://python-poetry.org/)
> poetry new vetwebapi

### Структура проекта:

```
└── vetwebapi
    ├── poetry.lock
    ├── pyproject.toml
    ├── README.md
    ├── tests
    │   └── __init__.py
    ├── ToDo.md
    └── vetwebapi
        └── __init__.py
```

* ### Перейдем в папку с проектом
> cd vetwebapi

* ### Создадим виртуальное окружение в проекте
```
poetry config virtualenvs.in-project true

poetry install
```
* ### Добавим необходимые зависимости

```
poetry add fastapi sqlalchemy uvicorn psycopg2-binary alembic pydantic pydantic-settings python-dotenv asyncpg python-multipart python-slugify werkzeug
```
```
[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.105.0"
sqlalchemy = "^2.0.23"
uvicorn = "^0.24.0.post1"
psycopg2-binary = "^2.9.9"
alembic = "^1.13.0"
pydantic = "^2.5.2"
pydantic-settings = "^2.1.0"
python-dotenv = "^1.0.0"
asyncpg = "^0.29.0"
python-multipart = "^0.0.6"
python-slugify = "^8.0.1"
werkzeug = "^3.0.1"
```

```
poetry add --group=dev flake8 pytest black isort factory-boy faker pytest-asyncio flake8-bugbear flake8-pie mypy mypy-extensions pytest-dotenv pytest-cov
```
```
[tool.poetry.group.dev.dependencies]
flake8 = "^6.1.0"
pytest = "^7.4.3"
black = "^23.12.0"
isort = "^5.13.2"
factory-boy = "^3.3.0"
faker = "^21.0.0"
pytest-asyncio = "^0.23.2"
flake8-bugbear = "^23.12.2"
flake8-pie = "^0.16.0"
mypy = "^1.7.1"
mypy-extensions = "^1.0.0"
pytest-dotenv = "^0.5.2"
pytest-cov = "^4.1.0"
```
* ### Добавим файл docker-compose.yml
```
version: '3.3'
services:
  # app:
  #   container_name: "vetwebapi"
  #   build: .
  #   stop_signal: SIGKILL
  #   env_file:
  #     - .env
  #   ports:
  #     - "8000:8000"
  #   # volumes:
  #   #   - ./blog_project/images/:/blog_project/images:rw
  #   depends_on:
  #     - db
  #   networks:
  #     - network

  # nginx:
  #   container_name: "nginx"
  #   restart: always
  #   build: ./blog_project/frontend
  #   ports:
  #     - "80:80"
  #   volumes:
  #     - ./blog_project/images:/usr/share/nginx/html/images:rw

  #   networks:
  #     - network
  #   depends_on:
  #     - app

  db:
    image: postgres:15.3-alpine3.18
    container_name: "db"
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    command: postgres -c log_destination=stderr -c logging_collector=on -c log_directory='logs'
    # volumes:
    #   - ./db/:/var/lib/postgresql/data
    networks:
      - network
  
  # test_db:
  #   image: postgres:15.3-alpine3.18
  #   container_name: "test_db"
  #   restart: always
  #   env_file:
  #     - ./blog_project/.test.env
  #   ports:
  #     - "5433:5432"
  #   networks:
  #     - network

networks:
  network:
    driver: bridge
```
* ### Добавим .env и .dev.env файл в корень проекта
```
.env

DB_USER=admin
DB_PASS=admin
DB_NAME=vetwebapi_db
DB_HOST=db
DB_PORT=5432
MODE=prod

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=vetwebapi_db
```
```
.dev.env

DB_USER=admin
DB_PASS=admin
DB_NAME=vetwebapi_db
DB_HOST=localhost
DB_PORT=5432
MODE=dev

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=vetwebapi_db
```



