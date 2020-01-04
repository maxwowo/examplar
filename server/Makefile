NAME=examplar
BUILD_DIRECTORY=build
MIGRATIONS_DIRECTORY=$(shell pwd)/database/migrations
PACKAGES_DIRECTORY=packages

DATABASE_USERNAME=examplar
DATABASE_PASSWORD=examplar
DATABASE_NAME=examplar
DATABASE_URL=postgres://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable

.PHONY: help
help: Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## Compile the packages.
	@go build -o $(BUILD_DIRECTORY)

.PHONY: build-docker
build-docker: ## Compile the packages in development mode into a Docker image
	docker build -t examplar .

.PHONY: run
run: build ## Build and run in development mode.
	@./$(BUILD_DIRECTORY) -e development

.PHONY: docker-run
docker-run: build-docker ## Build and run in detached development mode
	docker run \
	--rm \
	-d \
	--name examplar_server \
	-p 8080:8080 \
	examplar

.PHONY: docker-stop
docker-stop: ## Stop the docker server instance
	@docker stop examplar_server

.PHONY: run-prod
run-prod: build ## Build and run in production mode.
	@./$(BUILD_DIRECTORY) -e production

.PHONY: migrations-generate
migrations-generate: ## Generate migration files.
ifdef name
	@docker run \
	--rm \
	-v $(MIGRATIONS_DIRECTORY):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	create \
	-ext sql \
	-dir /migrations \
	$(name)
else
	@echo 'Usage: sudo make migrations-generate name=hello'
endif

.PHONY: migrations-run
migrations-run: ## Run migrations.
	@docker run \
	--rm \
	-v $(MIGRATIONS_DIRECTORY):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	-path=/migrations/ \
	-database $(DATABASE_URL) \
	up

.PHONY: database-start
database-start: ## Start the database in Docker
	@mkdir -p /var/lib/examplar/data
	@docker run \
	--rm \
	--name examplar_database \
	-v /var/lib/examplar/data:/var/lib/postgresql/data \
	-e POSTGRES_USER=examplar \
	-e POSTGRES_PASSWORD=examplar \
	-d \
	-p 5432:5432 \
	postgres

.PHONY: database-stop
database-stop: ## Stop the database in Docker
	@docker stop examplar_database

.PHONY: universities-load
universities-load: ## Fill the universities table with details of universities from all over the world
	go run $(PACKAGES_DIRECTORY)/uniloader/uniloader.go

.PHONY: clean
clean: ## Clean project and previous builds.
	@rm -rf $(BUILD_DIRECTORY)
