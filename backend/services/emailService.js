import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(to, subject, html, text = '') {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        text,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeEmail(user) {
    const subject = 'Welcome to Malaysian Contractors Hub';
    const html = `
      <h1>Welcome ${user.name}!</h1>
      <p>Thank you for joining Malaysian Contractors Hub.</p>
      <p>You can now access all our engineering tools and project management features.</p>
      <p>Best regards,<br>MC-Hub Team</p>
    `;
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendProjectInvitation(user, project, invitedBy) {
    const subject = `Project Invitation: ${project.name}`;
    const html = `
      <h1>Project Invitation</h1>
      <p>Hi ${user.name},</p>
      <p>${invitedBy.name} has invited you to join the project "${project.name}".</p>
      <p>Location: ${project.location}</p>
      <p>Client: ${project.client}</p>
      <p>Login to your account to accept this invitation.</p>
      <p>Best regards,<br>MC-Hub Team</p>
    `;
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendTaskAssignment(user, task, project) {
    const subject = `New Task Assignment: ${task.title}`;
    const html = `
      <h1>New Task Assignment</h1>
      <p>Hi ${user.name},</p>
      <p>You have been assigned a new task in project "${project.name}":</p>
      <h3>${task.title}</h3>
      <p>${task.description || 'No description provided'}</p>
      <p>Due Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'}</p>
      <p>Login to your account to view details.</p>
      <p>Best regards,<br>MC-Hub Team</p>
    `;
    
    return this.sendEmail(user.email, subject, html);
  }
}

const emailService = new EmailService();
export default emailService;