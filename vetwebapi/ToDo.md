# Vetwebapi
## Приложение на [FastAPI](https://fastapi.tiangolo.com/) для ветеринарной работы



* ### Создадим папку для проекта vetwebapi
* ### Создадим проект с помощью [poetry](https://python-poetry.org/)
> poetry new vetwebapi

### Если проект клонировали с репозитория надо удалить poetry.lock

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
* ### Возможно на убунту надо будет установить setuptools : pip3 install setuptools в оболочке poetry shell

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
SECRET=secret
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
SECRET=secret
MODE=dev

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=vetwebapi_db
```
## Инициируем алембик в корне проекта:
```
PS D:\VscodeProjects\vetwebapi\vetwebapi> poetry shell
```
```
(vetwebapi-py3.11) PS D:\VscodeProjects\vetwebapi\vetwebapi> alembic init migrations
```


### Файл main.py
```python
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.utils import utils
from vetwebapi.api_v1 import router as router_v1
from vetwebapi.api_v1.auth import crud


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router_v1, prefix=settings.api_v1_prefix)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    if not await crud.read_roles(session=session):
        await utils.fill_street_table(session=session)
        await utils.add_start_roles(session=session)
        return {"message": "Аll streets have been added!"}
    return {"message": "Hello, Dude!!!"}
```


Доделать страницу компании, таблицу животных







## Хук useRef


# React Select https://react-select.com/home

```
yarn add react-select
```

```
yarn add @hookform/error-message
```

```
yarn add react-icons
```


# SASS установка: 
```
npm install -g sass
```
## файл .vscode/settings.json
```
{
    ...

    "tasks": [
        {
            "label": "Compile SCCS to CSS",
            "type": "shell",
            "command": "sass styles.scss styles.css ",
            "group": "build",
        }
    ]
}
```

## Установим плагин на VS Code
    Live Sass Compiler


# React bootstrap https://react-bootstrap.github.io/docs/getting-started/introduction

```
yarn add react-bootstrap bootstrap
```

``` tsx

//файл main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';

// подключаем bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( 
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
        
    </React.StrictMode>
       
)

```




# Адаптивность десктоп

```css
html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

a {
	color: inherit;
	text-decoration: none;
	cursor: pointer;
}


img {
	max-width: 100%;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Regular'), url('../fonts/Roboto-Regular.ttf') format('ttf');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Light'), url('../fonts/Roboto-Light.ttf') format('ttf');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Bold'), url('../fonts/Roboto-Bold.ttf') format('ttf');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

.roboto-light {
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-style: normal;
  }
  
  .roboto-regular {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-style: normal;
  }
  
  .roboto-bold {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
  }

body {
	min-width: 1200px;
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}


/* global */

.list-reset {
	margin: 0;
	padding: 0;
	list-style: none;
}

.btn-reset {
	padding: 0;
	border: none;
	color: inherit;
	background-color: transparent;
	cursor: pointer;
}

.flex {
	display: flex;
}

.container {
	width: 1200px;
	padding: 0 15px;
	margin: 0 auto;
}

.section-title {
	margin: 0;
	margin-bottom: 40px;
}

.section-offset {
	padding-top: 87px;
	padding-bottom: 160px;
}

.btn {
	font-weight: 600;
	font-size: 15px;
	text-transform: uppercase;
	padding: 5px 15px;
	outline: auto;
	outline-color: grey;
	background-color: rgb(219, 212, 212);
	color:rgba(0, 0, 0, .8)
}

.btn:hover {
	opacity: 0.5;
	transition: opacity, 2.5ms, ease-in-out;
}


/* header */

.header {
	padding: 36px 0;
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, .4);
	background-color: #fff;
}

.header-container {
	align-items: center;
}

.navbar-brand {
	margin-right: auto;
}

.header-logo {
	border-radius: 50%;
	overflow: hidden;
}

.header-nav {
	margin-right: 52px;
}

.header-list-item {
	font-weight: 600;
	
}

.header-list-item:focus {
	opacity: .5;
}

.header-list-item:hover {
	opacity: .5;
}

.header-list-item:not(:last-child) {
	margin-right: 52px;
}


/* carousel */


.home-carousel-item {
	height: 600px;
	
}

.home-carousel-image {
	height: 600px;
	background-size: cover;
	background-position: center;
}

.home-carousel-caption {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 30px;
	box-shadow: 10px 10px 10px 10px rgba(255, 255, 255, 0.2);
}

.home-carousel-caption-title {
	margin: 0;
	margin-bottom: 25px;
	font-size: 70px;
	font-weight: 700;
	line-height: 1.3;
	color:rgba(0, 0, 0, .8);
}

.home-carousel-caption-desc {
	margin: 0;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 400;
	line-height: 1.3;
	color:rgb(0, 0, 0);
}


/* home-content */

.section-title {
	text-align: center;
	font-weight: 600;
}

.home-content-card {
	flex-direction: column;
	align-items: center;
	padding: 10px;
	width: 270px;
	height: 550px;
}

.home-content-card:not(:nth-child(4n)) {
	margin-right: 30px;
}

.home-content-card-image {
	margin-bottom: 30px;
	width: 248px;
	height: 200px;
}

.home-content-card-body-title h3 {
	margin: 0;
	margin-bottom: 15px;
	text-align: center;
	font-size: 1em;
	font-weight: 700;
}

.home-content-card-body-text {
	margin: 0;
	margin-bottom: 25px;
	text-align: center;
	font-size: 0.8em;
}


.home-content-card-footer-item {
	font-size: .8em;
}
```

## поменяем ширину для body и container

```css
html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

a {
	color: inherit;
	text-decoration: none;
	cursor: pointer;
}


img {
	max-width: 100%;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Regular'), url('../fonts/Roboto-Regular.ttf') format('ttf');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Light'), url('../fonts/Roboto-Light.ttf') format('ttf');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Bold'), url('../fonts/Roboto-Bold.ttf') format('ttf');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

.roboto-light {
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-style: normal;
  }
  
  .roboto-regular {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-style: normal;
  }
  
  .roboto-bold {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
  }

body {
	min-width: 320px;
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}

:root {
  --gap: 30px;
}


/* global */

.list-reset {
	margin: 0;
	padding: 0;
	list-style: none;
}

.btn-reset {
	padding: 0;
	border: none;
	color: inherit;
	background-color: transparent;
	cursor: pointer;
}

.flex {
	display: flex;
}

.container {
	max-width: 1200px;
	padding: 0 15px;
	margin: 0 auto;
  width: 100%;
}

.section-title {
	margin: 0;
	margin-bottom: 40px;
}

.section-offset {
	padding-top: 87px;
	padding-bottom: 160px;
}

.btn {
	font-weight: 600;
	font-size: 15px;
	text-transform: uppercase;
	padding: 5px 15px;
	outline: auto;
	outline-color: grey;
	background-color: rgb(219, 212, 212);
	color:rgba(0, 0, 0, .8)
}

.btn:hover {
	opacity: 0.5;
	transition: opacity, 2.5ms, ease-in-out;
}


/* header */

.header {
	padding: 36px 0;
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, .4);
	background-color: #fff;
}

.header-container {
	align-items: center;
}

.navbar-brand {
	margin-right: auto;
}

.header-logo {
	border-radius: 50%;
	overflow: hidden;
}

.header-nav {
	margin-right: 52px;
}

.header-list-item {
	font-weight: 600;
	
}

.header-list-item:focus {
	opacity: .5;
}

.header-list-item:hover {
	opacity: .5;
}

.header-list-item:not(:last-child) {
	margin-right: 52px;
}


/* carousel */


.home-carousel-item {
	height: 600px;
	
}

.home-carousel-image {
	height: 600px;
	background-size: cover;
	background-position: center;
}

.home-carousel-caption {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 30px;
	box-shadow: 10px 10px 10px 10px rgba(255, 255, 255, 0.2);
}

.home-carousel-caption-title {
	margin: 0;
	margin-bottom: 25px;
	font-size: 70px;
	font-weight: 700;
	line-height: 1.3;
	color:rgba(0, 0, 0, .8);
}

.home-carousel-caption-desc {
	margin: 0;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 400;
	line-height: 1.3;
	color:rgb(0, 0, 0);
}



/* home-content */

.section-title {
	text-align: center;
	font-weight: 600;
}

.home-content-card {
	flex-direction: column;
	align-items: center;
	padding: 10px;
	width: calc((100% - (30px * 3)) / 4);
	height: 550px;
}

.home-content-card:not(:nth-child(4n)) {
	margin-right: 30px;
}

.home-content-card-image {
	margin-bottom: 30px;
	width: 248px;
	height: 200px;
}

.home-content-card-body-title h3 {
	margin: 0;
	margin-bottom: 15px;
	text-align: center;
	font-size: 1em;
	font-weight: 700;
}

.home-content-card-body-text {
	margin: 0;
	margin-bottom: 25px;
	text-align: center;
	font-size: 0.8em;
}


.home-content-card-footer-item {
	font-size: .8em;
}

```

## Изменения в карточках для адаптивной верстки

```css
html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

a {
	color: inherit;
	text-decoration: none;
	cursor: pointer;
}


img {
	max-width: 100%;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Regular'), url('../fonts/Roboto-Regular.ttf') format('ttf');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Light'), url('../fonts/Roboto-Light.ttf') format('ttf');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Roboto';
	src: local('Roboto-Bold'), url('../fonts/Roboto-Bold.ttf') format('ttf');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

.roboto-light {
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-style: normal;
  }
  
  .roboto-regular {
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-style: normal;
  }
  
  .roboto-bold {
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
  }

body {
	min-width: 320px;
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}

:root {
	--gap: 30px;
}


/* global */

.list-reset {
	margin: 0;
	padding: 0;
	list-style: none;
}

.btn-reset {
	padding: 0;
	border: none;
	color: inherit;
	background-color: transparent;
	cursor: pointer;
}

.flex {
	display: flex;
}

.container {
	max-width: 1200px;
	padding: 0 15px;
	margin: 0 auto;
	width: 100%;
}

.section-title {
	margin: 0;
	margin-bottom: 40px;
}

.section-offset {
	padding-top: 87px;
	padding-bottom: 160px;
}

.btn {
	font-weight: 600;
	font-size: 15px;
	text-transform: uppercase;
	padding: 5px 15px;
	outline: auto;
	outline-color: grey;
	background-color: rgb(219, 212, 212);
	color:rgba(0, 0, 0, .8)
}

.btn:hover {
	opacity: 0.5;
	transition: opacity, 2.5ms, ease-in-out;
}


/* header */

.header {
	padding: 36px 0;
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, .4);
	background-color: #fff;
}

.header-container {
	align-items: center;
}

.navbar-brand {
	margin-right: auto;
}

.header-logo {
	border-radius: 50%;
	overflow: hidden;
}

.header-nav {
	margin-right: 52px;
}

.header-list-item {
	font-weight: 600;
	
}

.header-list-item:focus {
	opacity: .5;
}

.header-list-item:hover {
	opacity: .5;
}

.header-list-item:not(:last-child) {
	margin-right: 52px;
}


/* carousel */

.home-carousel-item {
	height: 600px;
	
}

.home-carousel-image {
	height: 600px;
	background-size: cover;
	background-position: center;
}

.home-carousel-caption {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 30px;
	box-shadow: 10px 10px 10px 10px rgba(255, 255, 255, 0.2);
}

.home-carousel-caption-title {
	margin: 0;
	margin-bottom: 25px;
	font-size: 70px;
	font-weight: 700;
	line-height: 1.3;
	color:rgba(0, 0, 0, .8);
}

.home-carousel-caption-desc {
	margin: 0;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 400;
	line-height: 1.3;
	color:rgb(0, 0, 0);
}


/* home-content */

.section-title {
	text-align: center;
	font-weight: 600;
}


.home-content-items {
	--offsets: 3;
	gap: var(--gap);
	flex-wrap: wrap;
}

@media (max-width: 1024px) {
	.home-content-items {
		--offsets: 2;
	}
}

@media (max-width: 768px) {
	.home-content-items {
		--offsets: 1;
	}
}

.home-content-item {
	flex-direction: column;
	align-items: center;
	padding: 10px;
	width: calc((100% - (var(--gap) * var(--offsets))) / (var(--offsets) + 1));
}


.home-content-card-image {
	margin-bottom: 30px;
	width: 248px;
	height: 200px;
}

.home-content-card-body-title h3 {
	margin: 0;
	margin-bottom: 15px;
	text-align: center;
	font-size: 1em;
	font-weight: 700;
}

.home-content-card-body-text {
	margin: 0;
	margin-bottom: 25px;
	text-align: center;
	font-size: .8em;
}


.home-content-card-footer-item {
	font-size: .8em;
}


/* footer */

.footer-container {
	background-color: rgb(255, 255, 255); 
	text-align: center;
}
```


# Работа со шрифтами

## подключение локальных шрифтов
```css

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Light'),
		url('../fonts/HelveticaNeueCyr-Light.woff') format('woff');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Medium'), 
		url('../fonts/HelveticaNeueCyr-Medium.woff') format('woff');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Bold'),
		url('../fonts/HelveticaNeueCyr-Bold.woff') format('woff');
	font-weight: bold;
	font-style: normal;
	font-display: swap;
}

body {
	min-width: 320px;
	font-family: 'HelveticaNeueCyr', sans-serif;
	font-weight: 300;
}
```

## Конвертация шрифтов 
https://everythingfonts.com/font-face

```css
@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Light'),
		url('../fonts/HelveticaNeueCyrLight.woff2') format('woff2'),
		url('../fonts/HelveticaNeueCyrLight.woff') format('woff');
	font-weight: 300;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Medium'), 
		url('../fonts/HelveticaNeueCyrMedium.woff2') format('woff2'),
		url('../fonts/HelveticaNeueCyrMedium.woff') format('woff');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Bold'),
		url('../fonts/HelveticaNeueCyrBold.woff2') format('woff2'),
		url('../fonts/HelveticaNeueCyrBold.woff') format('woff');
	font-weight: bold;
	font-style: normal;
	font-display: swap;
}

```
# Типограф https://www.artlebedev.ru/typograf/
## обработка текста перед вставкой в верстку

# SASS <https://sass-scss.ru/>
## Установить расширение Live Sass Compiler для VSCode

# Сжатие изображений для сайта https://squoosh.app/
