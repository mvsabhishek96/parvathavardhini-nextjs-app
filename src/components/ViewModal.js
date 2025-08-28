// ViewModal.js
'use client';

export default function ViewModal({ submission, onClose }) {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold font-display text-maroon-800 mb-4">
              <i className="fas fa-file-invoice-dollar mr-2"></i>Donation Details
            </h3>
            <div className="space-y-2 border-t pt-4">
                <p><strong>Name:</strong> {submission.name}</p>
                <p><strong>City:</strong> {submission.city}</p>
                <p><strong>Gothra:</strong> {submission.gothra}</p>
                <p><strong>{submission.type === 'Cash' ? 'Amount:' : 'Items:'}</strong> {submission.type === 'Cash' ? `₹${submission.amount}` : submission.description}</p>
                <p><strong>Phone:</strong> {submission.phoneNumber}</p>
                <p><strong>Date:</strong> {submission.timestamp?.toDate().toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors">
              <i className="fas fa-times mr-2"></i>Close
            </button>
        </div>
    </div>
  );
}