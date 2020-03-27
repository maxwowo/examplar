BUILD_PATH=$(shell pwd)/bin/main
MIGRATIONS_PATH=$(shell pwd)/database/migrations
TOOLS_PATH=tools

DATABASE_USERNAME=examplar
DATABASE_PASSWORD=examplar
DATABASE_NAME=examplar
DATABASE_URL=postgres://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable

.PHONY: help
help: Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## Compile the packages.
	@docker run \
	--rm \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	-v $(shell pwd):$(shell pwd) \
	-w $(shell pwd) \
	-e XDG_CACHE_HOME='/tmp/.cache' \
	golang:latest \
	go build -o $(BUILD_PATH)

.PHONY: build-docker
build-docker: ## Compile the packages in development mode into a Docker image.
	docker build -t examplar_server .

.PHONY: run
run: build ## Build and run in development mode.
	@$(BUILD_PATH) -e development

.PHONY: run-docker
run-docker: build-docker ## Build and run in detached development mode.
	@docker run \
	--rm \
	--name examplar-server \
	-v /var/lib/examplar/server:/var/log/examplar_server \
	-p 8080:8080 \
	examplar_server

.PHONY: stop-docker
stop-docker: ## Stop the docker server instance.
	@docker stop examplar_server

.PHONY: run-bundle
run-bundle: ## Run the server and the database in Docker.
	@docker-compose up -d

.PHONY: stop-bundle
stop-bundle: ## Stop the server and database in Docker.
	@docker-compose down

.PHONY: run-production
run-production: build ## Build and run in production mode.
	@$(BUILD_PATH) -e production

.PHONY: generate-migrations
generate-migrations: ## Generate migration files.
ifdef name
	@docker run \
	--rm \
	--name generate-migration \
	-v $(MIGRATIONS_PATH):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	create \
	-ext sql \
	-dir /migrations \
	$(name)
else
	@echo 'Usage: make generate-migrations name=example'
endif

.PHONY: migrations-up
migrations-up: ## Run up migrations.
	@docker run \
	--rm \
	-v $(MIGRATIONS_PATH):/migrations \
	--network host migrate/migrate \
	-path=/migrations/ \
	-database $(DATABASE_URL) \
	up

.PHONY: migrations-down
migrations-down: ## Run down migrations.
	@docker run \
	--rm \
	-v $(MIGRATIONS_PATH):/migrations \
	--network host migrate/migrate \
	-path=/migrations/ \
	-database $(DATABASE_URL) \
	down --all

.PHONY: start-database
start-database: ## Start the database in Docker.
	@mkdir -p /var/lib/examplar/data
	@docker run \
	--rm \
	--name examplar-database \
	-v /var/lib/examplar/data:/var/lib/postgresql/data \
	-e POSTGRES_USER=examplar \
	-e POSTGRES_PASSWORD=examplar \
	-d \
	-p 5432:5432 \
	postgres

.PHONY: stop-database
stop-database: ## Stop the database in Docker.
	@docker stop examplar-database

.PHONY: load-universities
load-universities: ## Fill the universities table with details of universities from all over the world.
	@docker run \
	--rm \
	-v $(shell pwd):/usr/src/examplar_server \
	-w /usr/src/examplar_server \
	--network host \
	golang:latest \
	go run /usr/src/examplar_server/$(TOOLS_PATH)/uniloader/uniloader.go

.PHONY: refresh
refresh: ## Re-runs all migrations and reloads the universities back into the database
refresh:
	@make migrations-down && make migrations-up && make load-universities

.PHONY: clean
clean: ## Clean project and previous builds.
	@rm -rf $(BUILD_PATH)
