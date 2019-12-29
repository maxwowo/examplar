package main

import (
	"flag"
	"github.com/maxwowo/examplar/configuration"
	"github.com/maxwowo/examplar/database"
)

func main() {
	environment := flag.String("e", "development", "The environment to deploy in")

	flag.Parse()

	configuration.Init(*environment)
	database.Init()
	// server.Init()
}
