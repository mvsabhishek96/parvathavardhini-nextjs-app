'use client';
import { useState } from 'react'; // 1. Import the useState Hook

export default function DonationForm() {
  // 2. Create state variables to hold the form's data
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  // 3. Create a function to handle what happens when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the browser from reloading
    console.log('New Donation Submitted:');
    console.log('Name:', name);
    console.log('City:', city);
    alert('Check the console to see the submitted data!');
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-6">
        Enter Donation Details
      </h2>
      {/* 4. Connect our handleSubmit function to the form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-maroon-800 text-sm font-bold mb-2">
            Name
          </label>
          {/* 5. Connect this input to our 'name' state */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-maroon-800 text-sm font-bold mb-2">
            City
          </label>
          {/* 6. Connect this input to our 'city' state */}
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105 transition-transform text-maroon-900 font-bold py-3 px-4 rounded-lg"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}