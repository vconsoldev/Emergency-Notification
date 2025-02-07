const RESEND_API_KEY = process.env.RESEND_KEY;
const RESEND_EMAIL_BASE_URL = process.env.RESEND_EMAIL_BASE_URL;
const FROM_EMAIL = process.env.FROM_EMAIL;
/**
 * Sends an email.
 *
 * @async
 * @function sendMail
 * @param {string} sender_name - The name of the sender.
 * @param {string} receiver_email - The email address of the recipient.
 * @param {string} subject - The subject line of the email.
 * @param {string} email_template - The HTML content of the email.
 * @returns {Promise<void>} -  A Promise that resolves when the email is sent successfully, or rejects if there's an error.
 * @throws {Error} - Throws an error if the email fails to send. The error message will provide details about the failure.
 *
 * @example
 * // Example usage:
 * const senderName = 'John Doe';
 * const receiverEmail = 'recipient@example.com';
 * const emailSubject = 'Important Update';
 * const emailContent = '<p>Hello, this is an important update.</p>';
 *
 * try {
 *   await sendMail(senderName, receiverEmail, emailSubject, emailContent);
 *   console.log('Email sent successfully!');
 * } catch (error) {
 *   console.error('Failed to send email:', error);
 * }
 */
const sendMail = async (
  sender_name,
  receiver_email,
  subject,
  email_template
) => {
  const res = await fetch(`${RESEND_EMAIL_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `${sender_name} <${FROM_EMAIL}>`,
      to: [`${receiver_email}`],
      subject,
      html: email_template,
    }),
  });

  const data = await res.json();
  return data;
};

export default sendMail;
