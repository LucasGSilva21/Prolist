import 'dotenv/config';
import { createTransport } from 'nodemailer';

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_CONFIG_EMAIL,
        pass: process.env.MAILER_CONFIG_PASSWORD
    }
});

export default transport;
