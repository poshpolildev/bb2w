import React from 'react';

const ContactInfo = () => {
  return (
    <div className="w-full p-6 rounded-xl bg-form-container text-gray-300 space-y-3">
      <h3 className="text-xl font-bold text-white mb-2">যোগাযোগ করুন</h3>
      <p><strong>ঠিকানা:</strong> ৩২- শুভ, ১১ নম্বর রোড, কসমোপলিটন রেসিডেন্সিয়াল এলাকা, ইস্ট নাসিরাবাদ, চট্টগ্রাম।</p>
      {/* The email address has been updated here */}
      <p><strong>ইমেইল:</strong> contact@brainboxtoweb.tech</p>
      <p><strong>ফোন:</strong> +৮৮০ ১৯০১ ৪০২ ২০৫</p>
    </div>
  );
};

export default ContactInfo;
