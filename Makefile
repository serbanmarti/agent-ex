.SHELL := /usr/bin/bash

## Backend ##
backend-remove:
	docker compose -f ./docker-compose.yml --project-directory . down --remove-orphans
backend-build-image:
	docker compose -f ./docker-compose.yml --project-directory . build
backend-start-container:
	-docker compose -f ./docker-compose.yml --project-directory . up -d --wait || true

## Build & Start local backend containers
backend-start: backend-build-image backend-start-container

## Restart local backend containers
backend-restart: backend-remove backend-start

## Stop local backend containers
backend-stop: backend-remove
