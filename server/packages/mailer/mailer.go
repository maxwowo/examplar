package mailer

import (
	"fmt"
	"log"
	"net/smtp"
)

func Send(recipient string, subject string, body string) {
	SMTPDomain := "smtp.gmail.com"
	SMTPPort := "587"
	SMTPServer := fmt.Sprintf("%s:%s", SMTPDomain, SMTPPort)

	sender := "examplarmail@gmail.com"
	password := "examplar"

	auth := smtp.PlainAuth("", sender, password, SMTPDomain)

	message := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\n\n%s", sender, recipient, subject, body)

	err := smtp.SendMail(SMTPServer, auth, sender, []string{recipient}, []byte(message))

	if err != nil {
		log.Printf("SMTP error: %s", err)
	}
}
