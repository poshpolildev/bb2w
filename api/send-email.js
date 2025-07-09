import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  // We're keeping this check for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('--- Starting Test Email Function ---');

  try {
    // We are ignoring the form data for this test.
    // Instead, we are sending a hardcoded email.
    const { data, error } = await resend.emails.send({
      from: 'Test <noreply@brainboxtoweb.tech>',       // Uses your verified domain
      to: ['poshpobarua@outlook.com'],                 // Sends to your email
      subject: 'Hello from Your Website! (Test Email)',
      html: '<h1>Success!</h1><p>If you received this email, your Resend API Key and domain are working correctly.</p>',
    });

    // If Resend gives an error, we log it and send it back
    if (error) {
      console.error('Error from Resend:', JSON.stringify(error, null, 2));
      return res.status(400).json(error);
    }

    // If the test email is sent successfully
    console.log('Test email sent successfully:', data);
    res.status(200).json({ message: 'Test email sent successfully!' });

  } catch (error) {
    console.error('A server error occurred:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
};