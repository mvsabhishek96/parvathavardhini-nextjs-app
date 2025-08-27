'use client';
import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DonationForm() {
  const [donationType, setDonationType] = useState('cash');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [gothra, setGothra] = useState('');
  const [amount, setAmount] = useState('');
  const [inKindDescription, setInKindDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const isCash = donationType === 'cash';
    const donationValue = isCash ? amount : inKindDescription;

    if (!name || !city || !gothra || !donationValue || !phoneNumber) {
      setMessage('Error: Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    const collectionName = isCash ? "Submissions" : "InKindDonations";
    const userEmail = auth.currentUser.email;

    try {
      const dataToSave = { name, city, gothra, phoneNumber, timestamp: serverTimestamp() };
      if (isCash) {
        dataToSave.amount = parseFloat(amount);
      } else {
        dataToSave.description = inKindDescription;
      }
      
      const docRef = collection(db, "CommitteeMembers", userEmail, collectionName);
      await addDoc(docRef, dataToSave);
      
      setMessage('Success! Donation saved.');
      setName(''); setCity(''); setGothra(''); setAmount('');
      setInKindDescription(''); setPhoneNumber('');

    } catch (error) {
      console.error("Error saving donation:", error);
      setMessage('Error: Failed to save donation. Please check Firestore Rules.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-6">
        Enter Donation Details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-maroon-800 text-sm font-bold mb-2">Donation Type</label>
          <div className="flex rounded-lg border-2 border-maroon-800 overflow-hidden">
            <label htmlFor="typeCash" className={`flex-1 text-center p-2 cursor-pointer transition-colors ${donationType === 'cash' ? 'bg-maroon-800 text-white' : 'bg-white/50'}`}>Cash</label>
            <input type="radio" id="typeCash" name="donationType" value="cash" className="hidden" checked={donationType === 'cash'} onChange={() => setDonationType('cash')} />
            <label htmlFor="typeInKind" className={`flex-1 text-center p-2 cursor-pointer transition-colors ${donationType === 'inKind' ? 'bg-maroon-800 text-white' : 'bg-white/50'}`}>In-Kind</label>
            <input type="radio" id="typeInKind" name="donationType" value="inKind" className="hidden" checked={donationType === 'inKind'} onChange={() => setDonationType('inKind')} />
          </div>
        </div>
        <div className="mb-4"><label htmlFor="name" className="block text-maroon-800 text-sm font-bold mb-2">Name</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        <div className="mb-4"><label htmlFor="city" className="block text-maroon-800 text-sm font-bold mb-2">City</label><input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        <div className="mb-4"><label htmlFor="gothra" className="block text-maroon-800 text-sm font-bold mb-2">Gothra</label><input type="text" id="gothra" value={gothra} onChange={(e) => setGothra(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        
        {donationType === 'cash' ? (
          <div className="mb-4"><label htmlFor="amount" className="block text-maroon-800 text-sm font-bold mb-2">Amount (₹)</label><input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        ) : (
          <div className="mb-4"><label htmlFor="inKindDescription" className="block text-maroon-800 text-sm font-bold mb-2">Item Description</label><input type="text" id="inKindDescription" value={inKindDescription} onChange={(e) => setInKindDescription(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        )}
        
        <div className="mb-6"><label htmlFor="phoneNumber" className="block text-maroon-800 text-sm font-bold mb-2">Phone Number</label><input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="shadow border rounded-lg w-full py-3 px-4" /></div>
        
        {message && <p className={`text-center mb-4 font-bold ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
        
        <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105 transition-transform text-maroon-900 font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Saving...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  );
}