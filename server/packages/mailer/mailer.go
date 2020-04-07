package mailer

import (
	"fmt"
	"github.com/maxwowo/examplar/configuration"
	"github.com/maxwowo/examplar/models"
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
		log.Printf("SMTP error: %s\n", err)
	}
}

func SendRegistrationConfirmation(user *models.User) {
	subject := "[Examplar] Confirm E-mail Address"
	body := fmt.Sprintf("Welcome %s!\n\nThanks for signing up with Examplar!\nYou must follow this link to activate your account:\nhttps://examplar.org/join/verify?token=MjkzNzMyNQ:1jLk22:l-RsLRZd0uxxTSnPZqK_AqJ-79c\n\nHave fun, and don't hesitate to contact us with your feedback.", user.Username)

	Send(user.Email, subject, body)
}
