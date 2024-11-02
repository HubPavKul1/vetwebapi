migrate:
	alembic upgrade head


startapp:
	uvicorn main:app --reload

start:
	make migrate
	make startapp

test:
	pytest

lintmain:
	black --check --diff main.py
	isort --check-only --profile black main.py
	flake8 main.py
	mypy main.py

lintapi_1:
	black --check --diff api_v1/
	isort --check-only --profile black api_v1/
	flake8 api_v1/
	mypy api_v1/

lintapi:
	flake8 api_v1/
	mypy api_v1/

lintcore:
	black --check --diff core/
	isort --check-only --profile black core/
	flake8 core/
	mypy core/

linttests:
	black --check --diff tests/
	isort --check-only --profile black tests/
	flake8 tests/
	mypy tests/

lintfixmain:
	black main.py
	isort --profile black main.py

lintfixapi:
	black api_v1/
	isort --profile black api_v1/

lintfixcore:
	black core/
	isort --profile black core/

lintfixtests:
	black tests/
	isort --profile black tests/

lint:
	make lintmain
	make lintapi
	make lintcore
	
