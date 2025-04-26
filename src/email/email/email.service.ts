import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private resend: Resend;

    constructor() {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
  
    async sendEmail(to: string, subject: string, html: string) {
      try {
        const response = await this.resend.emails.send({
          from: 'Labtrack <onboarding@resend.dev>',
          to,
          subject,
          html,
        });
  
        console.log('Email enviado:', response);
        return response;
      } catch (err) {
        console.error('Erro ao enviar e-mail:', err);
        throw err;
      }
    }
}
