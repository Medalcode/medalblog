.PHONY: up down build logs shell-backend shell-frontend

up:
	docker-compose up --build

down:
	docker-compose down -v

build:
	docker-compose build

logs:
	docker-compose logs -f

shell-backend:
	docker-compose exec backend sh

shell-frontend:
	docker-compose exec frontend sh
