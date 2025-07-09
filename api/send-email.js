import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { businessName, description, email } = req.body;

    if (!businessName || !description || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Brain Box To Web <noreply@brainboxtoweb.tech>',
      // The recipient email address has been updated here
      to: ['contact@brainboxtoweb.tech'],
      subject: `New Inquiry from ${businessName}`,
      html: `
        <h1>New Business Inquiry</h1>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Sender's Email:</strong> ${email}</p>
        <hr>
        <h2>Description:</h2>
        <p>${description}</p>
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return res.status(400).json(error);
    }

    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
};
