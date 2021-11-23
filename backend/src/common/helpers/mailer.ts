import 'dotenv/config';
import { createTransport, Transporter } from 'nodemailer';

export class EmailSender {
    transport: Transporter

    constructor() {
        this.transport = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_CONFIG_EMAIL,
                pass: process.env.MAILER_CONFIG_PASSWORD
            }
        });
    }

    async sendMessage(
        to: string,
        subject: string,
        html: string,
        errorMessage: string = 'Cannot send the mail'
    ) {
        const mailOptions = {
            from: process.env.MAILER_CONFIG_EMAIL,
            to,
            subject,
            html,
        }

        this.transport.sendMail(mailOptions, (err: Error) => {
            if (err) {
                throw new Error(errorMessage);
            }
        });
    }
}
