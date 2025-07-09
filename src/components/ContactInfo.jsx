import React from 'react';

const ContactInfo = () => {
  return (
    // I've replaced 'max-w-md' with 'w-full' to make this box
    // take up the same full width as the form.
    <div className="w-full p-6 rounded-xl bg-form-container text-gray-300 space-y-3">
      <h3 className="text-xl font-bold text-white mb-2">যোগাযোগ করুন</h3>
      <p><strong>ঠিকানা:</strong> ৩২- শুভ, ১১ নম্বর রোড, কসমোপলিটন রেসিডেন্সিয়াল এলাকা, ইস্ট নাসিরাবাদ, চট্টগ্রাম।</p>
      <p><strong>ইমেইল:</strong> posh.pobd@gmail.com</p>
      <p><strong>ফোন:</strong> +৮৮০ ১৯০১ ৪০২ ২০৫</p>
    </div>
  );
};

export default ContactInfo;
