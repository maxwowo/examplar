package mailer

import (
	"fmt"
	"log"
	"net/smtp"

	"github.com/maxwowo/examplar/configuration"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/tokenizer"
)

func send(recipient string, subject string, body string) {
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

func Send(recipient string, subject string, body string) {
	go func() {
		send(recipient, subject, body)
	}()
}

func SendActivationEmail(user *models.User) {
	token := tokenizer.EncodeActivationToken(user.ID)

	subject := "[Examplar] Confirm E-mail Address"
	body := fmt.Sprintf("Welcome %s!\n\nThanks for signing up with Examplar!\nPlease follow this link to activate your account:\nhttps://examplar.org/email/validate/%s\n\nHave fun contributing, and don't hesitate to contact us with your feedback.", user.Username, token)

	Send(user.Email, subject, body)
}
