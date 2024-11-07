using System.Net;
using System.Net.Http;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace AccountService.Services
{
    public class EmailService : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var emailMessage = new MimeMessage();
            // Sets the sender's name and email address using configuration settings.
            emailMessage.From.Add(new MailboxAddress(_configuration["SmtpSettings:SenderName"], _configuration["SmtpSettings:SenderEmail"]));
            // Sets the recipient's email address. Empty display name is used for simplicity.
            emailMessage.To.Add(new MailboxAddress("", email));
            // Sets the email subject.
            emailMessage.Subject = subject;
            // Creates the email body with HTML formatting, allowing rich text content in the message.
            var bodyBuilder = new BodyBuilder { HtmlBody = htmlMessage };
            // Assigns the constructed HTML body to the email message.
            emailMessage.Body = bodyBuilder.ToMessageBody();
            // Creates an SMTP client to connect to the SMTP server and send the email.
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {// Connects to the SMTP server using configuration settings (server address and port).
                await client.ConnectAsync(_configuration["SmtpSettings:Host"], int.Parse(_configuration["SmtpSettings:Port"]), false);
                // Authenticates with the SMTP server using configured username and password.
                await client.AuthenticateAsync(_configuration["SmtpSettings:UserName"], _configuration["SmtpSettings:Password"]);
                // Sends the email message to the specified recipient.
                await client.SendAsync(emailMessage);
                // Disconnects from the SMTP server after sending the email, passing 'true' to gracefully close the connection.
                await client.DisconnectAsync(true);

            }
        }
    }
}
