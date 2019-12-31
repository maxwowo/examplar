NAME=examplar
BUILD_DIRECTORY=build
MIGRATIONS_DIRECTORY=database/migrations
DATABASE_USERNAME=examplar
DATABASE_PASSWORD=examplar
DATABASE_NAME=examplar

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
	@migrate -ext sql -dir $(MIGRATIONS_DIRECTORY) $(name)
else
	@echo 'No name parameter supplied'
endif

.PHONY: migrations-run
## migrations-run: Run migrations.
migrations-run:
	@migrate -database postgres://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable -path $(MIGRATIONS_DIRECTORY) up

.PHONY: clean
## clean: Clean project and previous builds.
clean:
	@rm -rf $(BUILD_DIRECTORY)
