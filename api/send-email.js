// This is a Node.js serverless function that will run on the server.
// First, you need to install the 'resend' package by running: npm install resend
import { Resend } from 'resend';

// Initialize Resend with your API key.
// It is CRITICAL to use an environment variable for the API key.
// Do not write your actual key here.
const resend = new Resend(process.env.RESEND_API_KEY);

// This is the main function that will be executed.
export default async (req, res) => {
  // We only want to handle POST requests for security.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get the form data from the user's request.
    const { businessName, description, email } = req.body;

    // Simple validation to make sure no fields are empty.
    if (!businessName || !description || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Use Resend to send the email.
    const { data, error } = await resend.emails.send({
      // IMPORTANT: Change this to a verified sender email from your Resend account.
      from: 'Brain Box To Web <onboarding@resend.dev>', 
      // IMPORTANT: Change this to the email address where you want to receive the messages.
      to: ['your-personal-email@example.com'], 
      subject: `New Inquiry from ${businessName}`,
      // This is the HTML content of the email you will receive.
      html: `
        <h1>New Business Inquiry</h1>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Sender's Email:</strong> ${email}</p>
        <hr>
        <h2>Description:</h2>
        <p>${description}</p>
      `,
    });

    // If Resend returns an error, send it back.
    if (error) {
      return res.status(400).json(error);
    }

    // If everything is successful, send a success response.
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    // Handle any other unexpected server errors.
    res.status(500).json({ error: 'Something went wrong.' });
  }
};