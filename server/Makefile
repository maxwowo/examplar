MODULE = $(shell go list -m)
VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || echo "1.0.0")
PACKAGES := $(shell go list ./... | sed -n '1!p' | grep -v /vendor/)
LDFLAGS := -ldflags "-X main.Version=${VERSION}"

CONFIG_FILE ?= ./configs/local.yml
APP_DSN ?= $(shell sed -n 's/^dsn:[[:space:]]*"\(.*\)"/\1/p' $(CONFIG_FILE))
MIGRATE := docker run -v $(shell pwd)/migrations:/migrations --network host migrate/migrate -path=/migrations/ -database "$(APP_DSN)"

.PHONY: default
default: help

.PHONY: help
help: ## Helps message about make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: test
test: ## Runs unit tests
	@echo "mode: count" > coverage-all.out
	@$(foreach pkg,$(PACKAGES), \
		go test -p=1 -cover -covermode=count -coverprofile=coverage.out ${pkg}; \
		tail -n +2 coverage.out >> coverage-all.out;)

.PHONY: test-cover
test-cover: test ## Runs unit tests and show test coverage information
	go tool cover -html=coverage-all.out

.PHONY: server
server: ## Runs the API server
	go run ${LDFLAGS} cmd/server/main.go

.PHONY: build
build: clean ## Builds the API server binary
	CGO_ENABLED=0 go build ${LDFLAGS} -a -o server $(MODULE)/cmd/server

.PHONY: build-docker
build-docker: ## Builds the API server as a docker image
	docker build -f cmd/server/Dockerfile -t server .

.PHONY: clean
clean: ## Removes temporary files
	rm -rf server coverage.out coverage-all.out

.PHONY: version
version: ## Displays the version of the API server
	@echo $(VERSION)

.PHONY: db-start
db-start: ## Starts the database server
	@mkdir -p test/postgres
	docker run --rm --name postgres -v $(shell pwd)/test:/test \
		-v $(shell pwd)/test/postgres:/var/lib/postgresql/data \
		-e POSTGRES_PASSWORD=examplar -e POSTGRES_USER=examplar -d -p 5432:5432 postgres

.PHONY: db-stop
db-stop: ## Stops the database server
	docker stop postgres

.PHONY: db-test
db-test: ## Populates the database with test data
	make migrate-reset
	@echo "Populating test data..."
	@docker exec -it postgres psql "$(APP_DSN)" -f /test/test.sql

.PHONY: lint
lint: ## Runs golint on all Go package
	@golint $(PACKAGES)

.PHONY: fmt
fmt: ## Runs "go fmt" on all Go packages
	@go fmt $(PACKAGES)

.PHONY: migrate
migrate: ## Runs all new database migrations
	@echo "Running all new database migrations..."
	@$(MIGRATE) up

.PHONY: migrate-down
migrate-down: ## Reverts database to the last migration step
	@echo "Reverting database to the last migration step..."
	@$(MIGRATE) down 1

.PHONY: migrate-new
migrate-new: ## Creates a new database migration
	@read -p "Enter the name of the new migration: " name; \
	$(MIGRATE) create -ext sql -dir /migrations/ $${name// /_}

.PHONY: migrate-reset
migrate-reset: ## Resets database and re-run all migrations
	@echo "Resetting database..."
	@$(MIGRATE) drop
	@echo "Running all database migrations..."
	@$(MIGRATE) up
