package mailer

import (
	"fmt"
	"github.com/maxwowo/examplar/configuration"
	"log"
	"net/smtp"
)

func Send(recipient string, subject string, body string) {
	config := configuration.GetConfig()

	SMTPDomain := config.GetString("mail.outgoing.domain")
	SMTPPort := config.GetString("mail.outgoing.port")
	SMTPServer := fmt.Sprintf("%s:%s", SMTPDomain, SMTPPort)

	sender := config.GetString("mail.address")
	password := config.GetString("mail.password")

	auth := smtp.PlainAuth("", sender, password, SMTPDomain)

	message := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\n\n%s", sender, recipient, subject, body)

	err := smtp.SendMail(SMTPServer, auth, sender, []string{recipient}, []byte(message))

	if err != nil {
		log.Printf("SMTP error: %s", err)
	}
}
