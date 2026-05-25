import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number
) {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString("en-IN")}</td>
        </tr>`
    )
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Order Confirmed - ${orderNumber} | Yati Powers`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 30px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0; font-size: 28px;">YATI POWERS</h1>
          <p style="color: #94a3b8; margin: 5px 0 0;">Solar Energy Solutions</p>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b;">Order Confirmed! 🎉</h2>
          <p style="color: #64748b;">Thank you for your order. We'll process it shortly.</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Order Number: ${orderNumber}</strong>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 8px; text-align: left;">Product</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="text-align: right; margin-top: 15px;">
            <strong style="font-size: 18px;">Total: ₹${total.toLocaleString("en-IN")}</strong>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            Questions? Contact us at <a href="mailto:info@yatipowers.com" style="color: #f59e0b;">info@yatipowers.com</a>
            or call <a href="tel:+918090277689" style="color: #f59e0b;">+91 98765 43210</a>
          </p>
        </div>
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">© 2024 Yati Powers. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}

export async function sendInquiryNotification(
  adminEmail: string,
  inquiry: { name: string; email: string; phone: string; message: string; type: string }
) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: adminEmail,
    subject: `New Inquiry from ${inquiry.name} | Yati Powers`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e293b; padding: 20px;">
          <h2 style="color: #f59e0b; margin: 0;">New Inquiry Received</h2>
        </div>
        <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td>${inquiry.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${inquiry.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td>${inquiry.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Type:</td><td>${inquiry.type}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td>${inquiry.message}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
}
