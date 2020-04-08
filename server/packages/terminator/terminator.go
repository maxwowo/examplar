package terminator

import (
	"database/sql"
	"log"
)

func TerminateStatement(stmt *sql.Stmt) {
	err := stmt.Close()
	if err != nil {
		log.Panic(err.Error())
	}
}
