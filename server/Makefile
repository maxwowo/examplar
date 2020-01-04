NAME=examplar
BUILD_DIRECTORY=build
MIGRATIONS_DIRECTORY=$(shell pwd)/database/migrations
PACKAGES_DIRECTORY=packages

DATABASE_USERNAME=examplar
DATABASE_PASSWORD=examplar
DATABASE_NAME=examplar
DATABASE_URL=postgres://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable

.PHONY: help
all: help
# help: show this help message
help: Makefile
	@echo
	@echo " Choose a command to run in "$(APP_NAME)":"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo

.PHONY: build
## build: Compile the packages.
build:
	@go build -o $(BUILD_DIRECTORY)

.PHONY: run
## run: Build and run in development mode.
run: build
	@./$(BUILD_DIRECTORY) -e development

.PHONY: run-prod
## run-production: Build and run in production mode.
run-prod: build
	@./$(BUILD_DIRECTORY) -e production

.PHONY: migrations-generate
## migrations-generate: Generate migration files.
migrations-generate:
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
## migrations-run: Run migrations.
migrations-run:
	@docker run \
	--rm \
	-v $(MIGRATIONS_DIRECTORY):/migrations \
	-u $(shell id -u $($USER)):$(shell id -g $($USER)) \
	--network host migrate/migrate \
	-path=/migrations/ \
	-database $(DATABASE_URL) \
	up

.PHONY: universities-load
## universities-load: Fill the universities table with details of universities from all over the world
universities-load:
	@go run $(PACKAGES_DIRECTORY)/uniloader/uniloader.go

.PHONY: clean
## clean: Clean project and previous builds.
clean:
	@rm -rf $(BUILD_DIRECTORY)
