// Email templates for FaxPulse
// These return HTML strings that can be passed to sendEmail()

export function welcomeEmail(userName: string): { subject: string; html: string } {
  return {
    subject: `Welcome to FaxPulse!`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Welcome to FaxPulse 🎉</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Hi ${userName},</p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Thanks for signing up! We're excited to have you on board.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">Go to Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function welcome_emailEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Welcome Email`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Welcome Email</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function fax_delivered_confirmationEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Fax Delivered Confirmation`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Fax Delivered Confirmation</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function fax_received_notificationEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Fax Received Notification`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Fax Received Notification</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function fax_failed_alertEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Fax Failed Alert`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Fax Failed Alert</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function monthly_usage_summaryEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Monthly Usage Summary`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Monthly Usage Summary</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function payment_confirmationEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Payment Confirmation`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Payment Confirmation</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}

export function payment_failed_alertEmail(data: Record<string, string>): { subject: string; html: string } {
  return {
    subject: `FaxPulse: Payment Failed Alert`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 16px;">Payment Failed Alert</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">You have a new notification from FaxPulse.</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          ${Object.entries(data).map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px;"><strong>${k}:</strong> ${v}</p>`).join("")}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard" style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Dashboard</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">— The FaxPulse Team</p>
      </div>
    `,
  };
}
