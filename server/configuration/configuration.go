package configuration

import (
	"log"

	"github.com/spf13/viper"
)

var config *viper.Viper

func Init(env string) {
	config = viper.New()

	config.SetConfigType("yaml")
	config.SetConfigName(env)
	config.AddConfigPath("../configuration/")
	config.AddConfigPath("configuration/")

	if err := config.ReadInConfig(); err != nil {
		log.Fatalln("Error on parsing configuration file.")
	}
}

func GetConfig() *viper.Viper {
	return config
}
