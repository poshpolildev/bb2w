import React, { useState } from 'react';

const ContactForm = () => {
  // We need a new state to hold the selected file
  const [file, setFile] = useState(null);

  // This function handles the file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  // State for the text inputs remains the same
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    email: '',
  });

  const [formState, setFormState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.description || !formData.email) {
      setFormState({ ...formState, error: "Please fill out all fields." });
      return;
    }
    setFormState({ isLoading: true, isSuccess: false, error: null });

    // We use FormData to send text and a file together
    const data = new FormData();
    data.append('businessName', formData.businessName);
    data.append('description', formData.description);
    data.append('email', formData.email);
    if (file) {
      data.append('image', file); // 'image' must match the name in the backend
    }

    try {
      // The fetch call no longer needs the 'Content-Type' header
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('তথ্য পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }

      setFormState({ isLoading: false, isSuccess: true, error: null });
      setFormData({ businessName: '', description: '', email: '' });
      setFile(null); // Clear the file input

    } catch (error) {
      setFormState({ isLoading: false, isSuccess: false, error: error.message });
    }
  };

  if (formState.isSuccess) {
    return (
      <div className="bg-form-container p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-green-400">ধন্যবাদ!</h3>
        <p className="text-gray-300 mt-2">আপনার তথ্য পাঠানো হয়েছে।</p>
      </div>
    );
  }

  return (
    <div className="bg-form-container p-8 rounded-xl">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        আপনার তথ্য দিন
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text inputs remain the same */}
        <input
          type="text" id="businessName" placeholder="আপনার ব্যবসার নাম"
          value={formData.businessName} onChange={handleChange} required
          className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          id="description" placeholder="ব্যবসার বর্ণনা" rows="4"
          value={formData.description} onChange={handleChange} required
          className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
        <input
          type="email" id="email" placeholder="আপনার ইমেইল"
          value={formData.email} onChange={handleChange} required
          className="w-full p-4 rounded-lg bg-input-bg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        {/* New File Input Field */}
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">ছবি আপলোড করুন (ঐচ্ছিক)</label>
          <input 
            type="file"
            id="image-upload"
            name="image"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-input-bg file:text-gray-300 hover:file:bg-purple-700"
          />
        </div>

        <div>
          <button
            type="submit" disabled={formState.isLoading}
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
