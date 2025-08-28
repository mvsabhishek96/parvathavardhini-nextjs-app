'use client';
import { useState, useEffect, useMemo } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import * as XLSX from 'xlsx';

// Import our new modal components
import ViewModal from '@/components/ViewModal';
import EditModal from '@/components/EditModal';

export default function SubmissionsPage() {
  const { user } = useUserStore();
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date_desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchData = async () => {
      if (!user) { setLoading(false); return; }
      setLoading(true);
      try {
          const userEmail = user.email;
          const cashQuery = query(collection(db, `CommitteeMembers/${userEmail}/Submissions`), orderBy('timestamp', 'desc'));
          const inKindQuery = query(collection(db, `CommitteeMembers/${userEmail}/InKindDonations`), orderBy('timestamp', 'desc'));
          const [cashSnapshot, inKindSnapshot] = await Promise.all([getDocs(cashQuery), getDocs(inKindQuery)]);
          const cashData = cashSnapshot.docs.map(d => ({ id: d.id, type: 'Cash', ...d.data() }));
          const inKindData = inKindSnapshot.docs.map(d => ({ id: d.id, type: 'In-Kind', ...d.data() }));
          setAllSubmissions([...cashData, ...inKindData]);
      } catch (err) {
          console.error(err);
          setError('Failed to load submissions.');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const filteredAndSortedSubmissions = useMemo(() => {
    let data = [...allSubmissions];
    if (searchTerm) data = data.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || item.city?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (startDate) { const start = new Date(startDate); start.setHours(0,0,0,0); data = data.filter(item => item.timestamp?.toDate() >= start); }
    if (endDate) { const end = new Date(endDate); end.setHours(23,59,59,999); data = data.filter(item => item.timestamp?.toDate() <= end); }
    switch (sortOrder) {
      case 'amount_asc': data.sort((a, b) => (a.amount || 0) - (b.amount || 0)); break;
      case 'amount_desc': data.sort((a, b) => (b.amount || 0) - (a.amount || 0)); break;
      case 'date_desc':
      default: data.sort((a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0)); break;
    }
    return data;
  }, [allSubmissions, searchTerm, sortOrder, startDate, endDate]);

  const handleView = (submission) => { setSelectedSubmission(submission); setViewModalOpen(true); };
  const handleEdit = (submission) => { setSelectedSubmission(submission); setEditModalOpen(true); };
  const handleCloseModals = () => { setViewModalOpen(false); setEditModalOpen(false); setSelectedSubmission(null); };

  const handleDelete = async (subId, subType) => {
      if (!confirm('Are you sure you want to delete this record?')) return;
      try {
          const collectionName = subType === 'Cash' ? 'Submissions' : 'InKindDonations';
          await deleteDoc(doc(db, `CommitteeMembers/${user.email}/${collectionName}`, subId));
          fetchData(); // Refresh data
      } catch (err) { console.error("Delete failed:", err); alert("Error deleting record."); }
  };

  const handleSaveEdit = async (updatedData) => {
      try {
          const collectionName = selectedSubmission.type === 'Cash' ? 'Submissions' : 'InKindDonations';
          const docRef = doc(db, `CommitteeMembers/${user.email}/${collectionName}`, selectedSubmission.id);
          await updateDoc(docRef, updatedData);
          handleCloseModals();
          fetchData();
      } catch (err) { console.error("Update failed:", err); alert("Error updating record."); }
  };

  const handleExport = () => {
      if (confirm("Download an Excel sheet with the currently filtered and sorted data?")) {
          const dataForExport = filteredAndSortedSubmissions.map(item => ({
              'Name': item.name, 'City': item.city, 'Donation Type': item.type,
              'Amount': item.type === 'Cash' ? item.amount : '',
              'Items': item.type === 'In-Kind' ? item.description : '',
              'Phone Number': item.phoneNumber,
              'Date': item.timestamp?.toDate().toLocaleString() || 'N/A',
          }));
          const ws = XLSX.utils.json_to_sheet(dataForExport);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Donations');
          XLSX.writeFile(wb, 'donations_export.xlsx');
      }
  };

  if (loading) return <div className="text-center font-bold text-xl"><div className="loader inline-block"></div> Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!user) return <div className="text-center">Please <Link href="/" className="underline">log in</Link>.</div>;

  return (
    <div className="bg-white/80 backdrop-blur-lg p-4 md:p-8 rounded-xl shadow-lg w-full max-w-6xl">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Form</Link>
        <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-6">Your Submissions</h2>
        <div className="filters-container">
            <div><label htmlFor="searchInput">Search</label><input type="text" id="searchInput" placeholder="Name or City..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
            <div><label htmlFor="startDate">Start Date</label><input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
            <div><label htmlFor="endDate">End Date</label><input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
            <div><label htmlFor="sortOrder">Sort By</label>
                <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="date_desc">Date (Newest First)</option>
                    <option value="amount_desc">Amount (High to Low)</option>
                    <option value="amount_asc">Amount (Low to High)</option>
                </select>
            </div>
            <button onClick={handleExport} className="export-button bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"><i className="fas fa-file-excel mr-2"></i>Export</button>
        </div>

        {filteredAndSortedSubmissions.length === 0 ? (<p className="text-center mt-4">No submissions found.</p>) : (
            <table>
                <thead><tr><th>Name</th><th>City</th><th>Donation</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                    {filteredAndSortedSubmissions.map(sub => (
                        <tr key={sub.id}>
                            <td data-label="Name">{sub.name}</td>
                            <td data-label="City">{sub.city}</td>
                            <td data-label="Donation">{sub.type === 'Cash' ? `₹${sub.amount}` : sub.description}</td>
                            <td data-label="Date">{sub.timestamp?.toDate().toLocaleDateString()}</td>
                            <td className="action-cell">
                                <button onClick={() => handleView(sub)} className="view-btn p-2 rounded-md bg-blue-500 text-white"><i className="fas fa-eye"></i></button>
                                <button onClick={() => handleEdit(sub)} className="edit-btn p-2 rounded-md bg-yellow-500 text-white"><i className="fas fa-edit"></i></button>
                                <button onClick={() => handleDelete(sub.id, sub.type)} className="delete-btn p-2 rounded-md bg-red-500 text-white"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {isViewModalOpen && <ViewModal submission={selectedSubmission} onClose={handleCloseModals} />}
        {isEditModalOpen && <EditModal submission={selectedSubmission} onSave={handleSaveEdit} onClose={handleCloseModals} />}
    </div>
  );
}