import sendEmail from "../email.service.js";
import { escapeHtml, formatAmount, maskAccount } from "../sub-controller/email.controller.js";
async function sendRegisterationEmail(userEmail, name) {
    const subject = "Welcome to Backend System";
    const text = `Hello ${name},

Thank you for registering at Backend System.
We're excited to have you on board!

Best regards,
The Backend System Team`;
    const html = `
  <div style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <tr>
        <td style="background:#0f172a;padding:30px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">
            Backend System
          </h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 30px;">
          <h2 style="margin:0 0 15px 0;color:#111827;font-size:20px;">
            Hello ${name},
          </h2>

          <p style="margin:0 0 20px 0;color:#4b5563;font-size:15px;line-height:1.6;">
            Thank you for registering with <strong>Backend System</strong>.
            We're excited to have you on board!
          </p>

          <p style="margin:0 0 30px 0;color:#4b5563;font-size:15px;line-height:1.6;">
            If you have any questions or need assistance, feel free to reach out.
            We're here to help you succeed.
          </p>

          <!-- CTA Button -->
          <div style="text-align:center;">
            <a href="http://localhost:3000"
               style="display:inline-block;padding:12px 24px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:bold;">
               Visit Dashboard
            </a>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#9ca3af;">
          © ${new Date().getFullYear()} Backend System. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
  `;
    await sendEmail(userEmail, subject, text, html);
}
async function sendTransactionEmail({ userEmail, name, amount, toAccount, }) {
    // ✅ validation (fail fast)
    if (!userEmail || !userEmail.includes("@"))
        throw new Error("Invalid userEmail");
    if (!name?.trim())
        throw new Error("name is required");
    if (!toAccount?.trim())
        throw new Error("toAccount is required");
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("amount must be a valid number > 0");
    }
    const subject = "✅ Transaction Successful";
    const maskedAccount = maskAccount(toAccount);
    const amt = formatAmount(amount);
    const text = `Hello ${name},

Your transaction of ${amt} has been completed successfully.

To account: ${maskedAccount}

If you did not make this transaction, please contact support immediately.
`;
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <div style="max-width: 560px; margin: 0 auto; padding: 16px;">
      <h2 style="margin: 0 0 12px;">✅ Transaction Successful</h2>

      <p style="margin: 0 0 12px;">Hello <b>${escapeHtml(name.trim())}</b>,</p>

      <p style="margin: 0 0 14px;">
        Your transaction of <b>${escapeHtml(amt)}</b> has been completed successfully.
      </p>

      <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #555;">Amount</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700;">
              ${escapeHtml(amt)}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #555;">To account</td>
            <td style="padding: 6px 0; text-align: right;">
              ${escapeHtml(maskedAccount)}
            </td>
          </tr>
        </table>
      </div>

      <p style="margin: 14px 0 0; color: #555; font-size: 12px;">
        If you did not make this transaction, please contact support immediately.
      </p>
    </div>
  </div>
  `.trim();
    await sendEmail(userEmail, subject, text, html);
}
async function sendTransactionFailedEmail({ userEmail, name, amount, toAccount, }) {
    // ✅ validation
    if (!userEmail || !userEmail.includes("@"))
        throw new Error("Invalid userEmail");
    if (!name?.trim())
        throw new Error("name is required");
    if (!toAccount?.trim())
        throw new Error("toAccount is required");
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("amount must be a valid number > 0");
    }
    const subject = "❌ Transaction Failed";
    const maskedAccount = maskAccount(toAccount);
    const amt = formatAmount(amount);
    const text = `Hello ${name},

Your transaction of ${amt} to account ${maskedAccount} was not completed.

No amount has been deducted (or if deducted, it will be reversed automatically based on bank processing time).

If this wasn’t you, please contact support immediately.
`;
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <div style="max-width: 560px; margin: 0 auto; padding: 16px;">
      <h2 style="margin: 0 0 12px;">❌ Transaction Failed</h2>

      <p style="margin: 0 0 12px;">Hello <b>${escapeHtml(name.trim())}</b>,</p>

      <p style="margin: 0 0 14px;">
        Your transaction of <b>${escapeHtml(amt)}</b> to account
        <b>${escapeHtml(maskedAccount)}</b> was <b>not completed</b>.
      </p>

      <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #555;">Amount</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700;">
              ${escapeHtml(amt)}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #555;">To account</td>
            <td style="padding: 6px 0; text-align: right;">
              ${escapeHtml(maskedAccount)}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #555;">Status</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700;">
              FAILED
            </td>
          </tr>
        </table>
      </div>

      <p style="margin: 14px 0 0; color: #555; font-size: 12px;">
        No amount has been deducted (or if deducted, it will be reversed automatically based on bank processing time).
      </p>

      <p style="margin: 8px 0 0; color: #555; font-size: 12px;">
        If you did not try this transaction, contact support immediately.
      </p>
    </div>
  </div>
  `.trim();
    await sendEmail(userEmail, subject, text, html);
}
export { sendRegisterationEmail, sendTransactionEmail, sendTransactionFailedEmail };
//# sourceMappingURL=email.controller.js.map