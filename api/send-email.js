import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';
// This is the corrected way to import Formidable v2
import formidable from 'formidable';

// Configure Cloudinary with your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel's body parser doesn't handle file uploads, so we disable it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // This new code block correctly parses the form data
    const data = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;
    const { businessName, description, email } = fields;
    const imageFile = files.image;

    // Upload the image to Cloudinary
    let imageUrl = '';
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.filepath);
      imageUrl = uploadResult.secure_url;
    }

    // Send the email with the image link included
    const { data: emailData, error } = await resend.emails.send({
      from: 'Brain Box To Web <noreply@brainboxtoweb.tech>',
      to: ['contact@brainboxtoweb.tech'],
      subject: `New Inquiry from ${businessName}`,
      html: `
        <h1>New Business Inquiry</h1>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Sender's Email:</strong> ${email}</p>
        <hr>
        <h2>Description:</h2>
        <p>${description}</p>
        ${imageUrl ? `<h2>Uploaded Image:</h2><p><a href="${imageUrl}">View Image</a></p><img src="${imageUrl}" alt="User Upload" width="300"/>` : ''}
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return res.status(400).json(error);
    }

    res.status(200).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
};

