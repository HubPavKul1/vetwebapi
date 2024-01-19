migrate:
	alembic upgrade head

startapp:
	uvicorn vetwebapi.main:app --reload

start:
	make migrate
	make startapp

test:
	pytest

lintmain:
	black --check --diff vetwebapi/main.py
	isort --check-only --profile black vetwebapi/main.py
	flake8 vetwebapi/main.py
	mypy vetwebapi/main.py

lintapi_1:
	black --check --diff vetwebapi/api_v1/
	isort --check-only --profile black vetwebapi/api_v1/
	flake8 vetwebapi/api_v1/
	mypy vetwebapi/api_v1/

lintapi:
	flake8 vetwebapi/api_v1/
	mypy vetwebapi/api_v1/

lintcore:
	black --check --diff vetwebapi/core/
	isort --check-only --profile black vetwebapi/core/
	flake8 vetwebapi/core/
	mypy vetwebapi/core/

linttests:
	black --check --diff tests/
	isort --check-only --profile black tests/
	flake8 tests/
	mypy tests/

lintfixmain:
	black vetwebapi/main.py
	isort --profile black vetwebapi/main.py

lintfixapi:
	black vetwebapi/api_v1/
	isort --profile black vetwebapi/api_v1/

lintfixcore:
	black vetwebapi/core/
	isort --profile black vetwebapi/core/

lintfixtests:
	black tests/
	isort --profile black tests/

lint:
	make lintmain
	make lintapi
	make lintcore
	make linttests
