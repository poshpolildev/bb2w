import React, { useState } from 'react';

const ContactForm = () => {
  // State to manage the form's input fields
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    email: '',
  });

  // State to manage the submission process (loading, success, error)
  const [formState, setFormState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  // This function updates the state as the user types
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // This function runs when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setFormState({ isLoading: true, isSuccess: false, error: null });

    try {
      // Send the form data to our backend API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('তথ্য পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }

      // If successful:
      setFormState({ isLoading: false, isSuccess: true, error: null });
      setFormData({ businessName: '', description: '', email: '' }); // Clear the form fields

    } catch (error) {
      setFormState({ isLoading: false, isSuccess: false, error: error.message });
    }
  };

  // If the form was submitted successfully, we show a "Thank You" message instead of the form
  if (formState.isSuccess) {
    return (
      <div className="bg-form-container p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-green-400">ধন্যবাদ!</h3>
        <p className="text-gray-300 mt-2">আপনার তথ্য পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
      </div>
    );
  }

  return (
    <div className="bg-form-container p-8 rounded-xl">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        আপনার তথ্য দিন
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            id="businessName" // Changed from 'business-name' to match state
            placeholder="আপনার ব্যবসার নাম"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <textarea
            id="description" // Changed from 'business-description' to match state
            placeholder="ব্যবসার বর্ণনা"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="আপনার ইমেইল"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={formState.isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {formState.isLoading ? 'পাঠানো হচ্ছে...' : 'ফ্রি ডেমোর জন্য রিকোয়েস্ট করুন'}
          </button>
        </div>
        {formState.error && (
          <p className="text-red-400 text-center">{formState.error}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;


