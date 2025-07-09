import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  // We only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Now we are reading the actual data from the form submission
    const { businessName, description, email } = req.body;

    // We validate the real data
    if (!businessName || !description || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // And we use the real data in the email content
    const { data, error } = await resend.emails.send({
      from: 'Brain Box To Web <noreply@brainboxtoweb.tech>',
      to: ['poshpobarua@outlook.com'],
      subject: `New Inquiry from ${businessName}`,
      // The HTML now uses the variables from the form
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
      // If there's an error, log it for debugging
      console.error('Error from Resend:', error);
      return res.status(400).json(error);
    }

    // If successful, send a success message
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
};