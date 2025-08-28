// DonationForm.js
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

  const openWhatsApp = (phone, name, city, gothra, donationDisplay) => {
      const committeeMemberName = auth.currentUser.displayName || auth.currentUser.email;
      const whatsappMessage = `✨ *Divine Donation Confirmation* ✨\n\n- *Name:* ${name}\n- *City:* ${city}\n- *Gothra:* ${gothra}\n- ${donationDisplay}\n- *Phone:* ${phone}\n\n_Recorded with devotion by: ${committeeMemberName}_`;
      const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
  };

  const pickContact = async () => {
      if ('contacts' in navigator && 'select' in navigator.contacts) {
          try {
              const contacts = await navigator.contacts.select(['tel'], { multiple: false });
              if (contacts.length > 0 && contacts[0].tel.length > 0) {
                  let sanitized = contacts[0].tel[0].replace(/\D/g, '');
                  if (sanitized.startsWith('91') && sanitized.length > 10) sanitized = sanitized.substring(2);
                  setPhoneNumber(sanitized);
              }
          } catch (error) { console.error('Contact Picker error:', error); }
      } else { alert('Contact Picker is not supported on your browser.'); }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const isCash = donationType === 'cash';
    const donationValue = isCash ? amount : inKindDescription;

    if (!name || !city || !gothra || !donationValue || !phoneNumber) {
        setMessage('Please fill all fields to proceed with your sacred donation.');
        setIsSubmitting(false);
        return;
    }

    const userEmail = auth.currentUser.email;
    const collectionName = isCash ? "Submissions" : "InKindDonations";

    try {
        const dataToSave = { name, city, gothra, phoneNumber, timestamp: serverTimestamp() };
        if (isCash) {
            dataToSave.amount = parseFloat(amount);
        } else {
            dataToSave.description = inKindDescription;
        }

        await addDoc(collection(db, "CommitteeMembers", userEmail, collectionName), dataToSave);

        setMessage('Divine blessings! Your donation has been recorded successfully.');

        const donationDisplay = isCash ? `Amount: ₹${parseFloat(amount).toFixed(2)}` : `Items: ${inKindDescription}`;
        openWhatsApp(phoneNumber, name, city, gothra, donationDisplay, auth.currentUser.displayName || userEmail);

        setName(''); setCity(''); setGothra(''); setAmount('');
        setInKindDescription(''); setPhoneNumber('');
    } catch (error) {
        console.error("Error saving donation:", error);
        setMessage('Divine intervention needed! Please try again or contact support.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container w-full max-w-md bg-white/90 backdrop-blur-sm traditional-border p-6 rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-2">Divine Donation Record</h2>
      <p className="text-center text-maroon-700 mb-6">Your selfless contribution brings divine blessings</p>
      
      <div className="ornamental-divider mb-6">
        <i className="fas fa-donate text-gold-600 bg-white px-2 relative z-10"></i>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="form-label">Donation Type</label>
          <div className="flex rounded-lg border-2 border-maroon-300 overflow-hidden shadow-inner">
            <label htmlFor="typeCash" className={`flex-1 text-center p-3 cursor-pointer transition-all ${donationType === 'cash' ? 'bg-maroon-700 text-white' : 'bg-white hover:bg-maroon-100'}`}>
              <i className={`fas fa-rupee-sign mr-2 ${donationType === 'cash' ? 'text-gold-300' : 'text-maroon-700'}`}></i> Monetary
            </label>
            <input type="radio" id="typeCash" name="donationType" value="cash" className="hidden" checked={donationType === 'cash'} onChange={() => setDonationType('cash')} />
            
            <label htmlFor="typeInKind" className={`flex-1 text-center p-3 cursor-pointer transition-all ${donationType === 'inKind' ? 'bg-maroon-700 text-white' : 'bg-white hover:bg-maroon-100'}`}>
              <i className={`fas fa-gift mr-2 ${donationType === 'inKind' ? 'text-gold-300' : 'text-maroon-700'}`}></i> In-Kind
            </label>
            <input type="radio" id="typeInKind" name="donationType" value="inKind" className="hidden" checked={donationType === 'inKind'} onChange={() => setDonationType('inKind')} />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="name" className="form-label">Devotee's Name</label>
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input pl-10" placeholder="Full name" />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="city" className="form-label">City</label>
          <div className="relative">
            <i className="fas fa-city absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-input pl-10" placeholder="City name" />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="gothra" className="form-label">Gothra</label>
          <div className="relative">
            <i className="fas fa-seedling absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
            <input type="text" id="gothra" value={gothra} onChange={(e) => setGothra(e.target.value)} className="form-input pl-10" placeholder="Family gothra" />
          </div>
        </div>

        {donationType === 'cash' ? (
          <div className="mb-5">
            <label htmlFor="amount" className="form-label">Donation Amount (₹)</label>
            <div className="relative">
              <i className="fas fa-rupee-sign absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
              <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-input pl-10" placeholder="Amount in rupees" />
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <label htmlFor="inKindDescription" className="form-label">Item Description</label>
            <div className="relative">
              <i className="fas fa-pen absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
              <input type="text" id="inKindDescription" value={inKindDescription} onChange={(e) => setInKindDescription(e.target.value)} className="form-input pl-10" placeholder="Describe donated items" />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <div className="relative">
            <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input pl-10 pr-10" placeholder="10-digit mobile number" />
            <i onClick={pickContact} className="fas fa-address-book absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-maroon-600 hover:text-gold-600 transition-colors"></i>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-5 text-center ${message.startsWith('Divine blessings') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <i className={`mr-2 ${message.startsWith('Divine blessings') ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}`}></i>
            {message}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="w-full gold-button text-lg py-4">
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Recording Blessings...
            </>
          ) : (
            <>
              <i className="fas fa-save mr-2"></i> Save & Send WhatsApp
            </>
          )}
        </button>
      </form>
    </div>
  );
}