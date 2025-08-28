'use client';
import { useState, useEffect } from 'react';

export default function EditModal({ submission, onSave, onClose }) {
  // Initialize state with empty strings to prevent the "uncontrolled" error
  const [formData, setFormData] = useState({
    name: '', city: '', gothra: '',
    amount: '', description: '', phoneNumber: ''
  });

  // Pre-fill the form using useEffect
  useEffect(() => {
    if (submission) {
      setFormData({
        name: submission.name ?? '',
        city: submission.city ?? '',
        gothra: submission.gothra ?? '',
        amount: submission.amount ?? '',
        description: submission.description ?? '',
        phoneNumber: submission.phoneNumber ?? '',
      });
    }
  }, [submission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    const dataToUpdate = { ...formData };
    if (submission.type === 'Cash') {
      dataToUpdate.amount = parseFloat(dataToUpdate.amount) || 0;
      delete dataToUpdate.description;
    } else {
      delete dataToUpdate.amount;
    }
    onSave(dataToUpdate);
  };

  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
        <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()} onSubmit={handleFormSave}>
            <h3 className="text-2xl font-bold font-display text-maroon-800 mb-4">Edit Donation</h3>
            <div className="space-y-4 border-t pt-4">
                <div><label className="font-bold">Name</label><input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mt-1" /></div>
                <div><label className="font-bold">City</label><input name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded mt-1" /></div>
                {submission.type === 'Cash' ? (
                    <div><label className="font-bold">Amount</label><input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded mt-1" /></div>
                ) : (
                    <div><label className="font-bold">Items</label><input name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mt-1" /></div>
                )}
                <div><label className="font-bold">Phone</label><input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded mt-1" /></div>
            </div>
            <div className="flex gap-4 mt-6">
                <button type="button" onClick={onClose} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">Save Changes</button>
            </div>
        </form>
    </div>
  );
}
