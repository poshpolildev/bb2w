import React from 'react';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

// Header component - no changes needed
const Header = () => (
  <header className="flex-shrink-0 w-full py-6">
    <img src="/logo.png" alt="Brain Box To Web Logo" className="h-10 w-10 mr-3 inline-block" />
    <span className="text-xl font-bold align-middle">Brain Box To Web</span>
  </header>
);

// Main App Component with the new two-column layout
function App() {
  return (
    <div className="bg-custom-blue text-white font-sans min-h-screen p-6">
      <div className="container mx-auto max-w-6xl h-full flex flex-col">
        
        <Header />

        {/* The main grid grows to fill the space and creates the two columns */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">

          {/* --- LEFT COLUMN --- */}
          {/* This column uses flex to vertically center its content */}
          <div className="flex flex-col justify-center text-left">
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                “সহজ ও কম খরচে আপনার ব্যবসার জন্য প্রফেশনাল ওয়েবসাইট তৈরি করুন!”
              </h1>
              <p className="text-lg text-gray-300 mt-4">
                আমরা সহজে এবং স্বল্প খরচে সব ধরনের ব্যবসার জন্য ওয়েবসাইট তৈরি করি। আপনার ব্যক্তিগত পোর্টফোলিও, ই-কমার্স স্টোর, বা কর্পোরেট সাইট, যাই প্রয়োজন হোক না কেন, আমাদের বিশেষজ্ঞ দল আধুনিক ডিজাইন এবং শক্তিশালী প্রযুক্তির মাধ্যমে আপনার স্বপ্নকে বাস্তবে রূপ দিতে প্রস্তুত।
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          {/* This column uses flex to space out the form and contact info */}
          <div className="flex flex-col justify-center space-y-8 py-4">
            <div>
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
