import React from 'react';

const ContactInfo = () => {
  return (
    <div className="w-full p-6 rounded-xl bg-form-container text-gray-300 space-y-3">
      <h3 className="text-xl font-bold text-white mb-2">যোগাযোগ করুন</h3>
      {/* I've wrapped the numbers in a <span> with the new font class */}
      <p><strong>ইমেইল:</strong> contact@brainboxtoweb.tech</p>
      {/* The phone number is also wrapped in a <span> */}
      <p><strong>ফোন:</strong> <span className="font-numeric">+৮৮০ ১৪০১ ৪০২ ২৩৫</span></p>
    </div>
  );
};

export default ContactInfo;
