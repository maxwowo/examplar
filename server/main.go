package main

import (
	"flag"

	"github.com/maxwowo/examplar/configuration"
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/server"
)

func main() {
	environment := flag.String("e", "development", "The environment to deploy in")

	flag.Parse()

	configuration.Initialize(*environment)
	database.Initialize()
	server.Initialize()
}
