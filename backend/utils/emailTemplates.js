// Email template system
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to Malaysian Contractors Hub',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to MC-Hub!</h1>
        <p>Dear ${data.name},</p>
        <p>Thank you for joining Malaysian Contractors Hub. Your account has been successfully created.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Account Details:</h3>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Role:</strong> ${data.role}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>You can now access all features of our platform including:</p>
        <ul>
          <li>Project management tools</li>
          <li>Engineering calculations</li>
          <li>Compliance checking</li>
          <li>Weather monitoring</li>
          <li>Marketplace access</li>
        </ul>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
           style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Login to Your Account
        </a>
        <p>Best regards,<br>The MC-Hub Team</p>
      </div>
    `
  },

  projectInvitation: {
    subject: 'Project Invitation - Malaysian Contractors Hub',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Project Invitation</h1>
        <p>Dear ${data.recipientName},</p>
        <p>You have been invited to join a project on Malaysian Contractors Hub.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Details:</h3>
          <p><strong>Project:</strong> ${data.projectName}</p>
          <p><strong>Invited by:</strong> ${data.inviterName}</p>
          <p><strong>Role:</strong> ${data.role}</p>
          <p><strong>Description:</strong> ${data.description || 'No description provided'}</p>
        </div>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/projects/${data.projectId}" 
           style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          View Project
        </a>
        <p>Best regards,<br>The MC-Hub Team</p>
      </div>
    `
  },

  taskAssignment: {
    subject: 'New Task Assignment - Malaysian Contractors Hub',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Task Assignment</h1>
        <p>Dear ${data.assigneeName},</p>
        <p>A new task has been assigned to you.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Task Details:</h3>
          <p><strong>Task:</strong> ${data.taskTitle}</p>
          <p><strong>Project:</strong> ${data.projectName}</p>
          <p><strong>Priority:</strong> ${data.priority}</p>
          <p><strong>Due Date:</strong> ${data.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'Not set'}</p>
          <p><strong>Description:</strong> ${data.description || 'No description provided'}</p>
        </div>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/projects/${data.projectId}/tasks/${data.taskId}" 
           style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          View Task
        </a>
        <p>Best regards,<br>The MC-Hub Team</p>
      </div>
    `
  },

  passwordReset: {
    subject: 'Password Reset - Malaysian Contractors Hub',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Password Reset Request</h1>
        <p>Dear ${data.name},</p>
        <p>You have requested to reset your password for Malaysian Contractors Hub.</p>
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p><strong>Security Notice:</strong> If you did not request this password reset, please ignore this email.</p>
        </div>
        <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${data.resetToken}" 
           style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Reset Password
        </a>
        <p>Best regards,<br>The MC-Hub Team</p>
      </div>
    `
  },

  documentShared: {
    subject: 'Document Shared - Malaysian Contractors Hub',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Document Shared</h1>
        <p>Dear ${data.recipientName},</p>
        <p>A document has been shared with you on Malaysian Contractors Hub.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Document Details:</h3>
          <p><strong>Document:</strong> ${data.documentName}</p>
          <p><strong>Shared by:</strong> ${data.sharedBy}</p>
          <p><strong>Project:</strong> ${data.projectName}</p>
          <p><strong>Type:</strong> ${data.documentType}</p>
        </div>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/projects/${data.projectId}/documents" 
           style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          View Document
        </a>
        <p>Best regards,<br>The MC-Hub Team</p>
      </div>
    `
  }
};

export const generateEmailContent = (templateName, data) => {
  const template = emailTemplates[templateName];
  if (!template) {
    throw new Error(`Email template '${templateName}' not found`);
  }

  return {
    subject: template.subject,
    html: template.html(data)
  };
};

export default emailTemplates;