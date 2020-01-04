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
build: ## build: Compile the packages.
	@go build -o $(BUILD_DIRECTORY)

.PHONY: run
run: build ## run: Build and run in development mode.
	@./$(BUILD_DIRECTORY) -e development

.PHONY: run-prod
run-prod: build ## run-production: Build and run in production mode.
	@./$(BUILD_DIRECTORY) -e production

.PHONY: migrations-generate
migrations-generate: ## migrations-generate: Generate migration files.
ifdef name
	@docker run \
	--rm \
	--name generate_migration \
	-v $(MIGRATIONS_DIRECTORY):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	create \
	-ext sql \
	-dir /migrations \
	$(name)
else
	@echo 'Example usage: sudo make migrations-generate name=hello'
endif

.PHONY: migrations-run
migrations-run: ## migrations-run: Run migrations.
	@docker run \
	--rm \
	-v $(MIGRATIONS_DIRECTORY):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	-path=/migrations/ \
	-database $(DATABASE_URL) \
	up

.PHONY: universities-load
universities-load: ## universities-load: Fill the universities table with details of universities from all over the world
	@go run $(PACKAGES_DIRECTORY)/uniloader/uniloader.go

.PHONY: clean
clean: ## clean: Clean project and previous builds.
	@rm -rf $(BUILD_DIRECTORY)
