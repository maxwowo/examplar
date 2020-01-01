package configuration

import (
	"log"

	"github.com/spf13/viper"
)

var config *viper.Viper

func Initialize(env string) {
	config = viper.New()

	config.SetConfigType("yaml")
	config.SetConfigName(env)
	config.AddConfigPath("configuration")
	config.AddConfigPath("../../configuration")

	err := config.ReadInConfig()
	if err != nil {
		log.Panic(err)
	}
}

func GetConfig() *viper.Viper {
	return config
}
