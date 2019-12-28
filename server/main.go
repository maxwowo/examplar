package main

import (
    "fmt"
    "database/sql"
    _ "gopkg.in/go-on/pq.v2"

//     redis "gopkg.in/redis.v4"
)

func main() {
//     client := redis.NewClient(&redis.Options{
//         Addr:     "redis:6379",
//         Password: "", // no password set
//         DB:       0,  // use default DB
//     })


    const (
        host = "localhost"
        port = 5432
        user = "examplar"
        password = "password"
        dbname = "examplar_db"
    )

    fmt.Println("hello world")
}