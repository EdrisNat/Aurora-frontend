import React, { useState, useEffect } from 'react';

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/admin/consultations/')
      .then((res) => res.json())
      .then((data) => setConsultations(data))
      .catch((err) => console.error('Error fetching consultations:', err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this consultation request?')) return;

    fetch(`http://localhost:8000/api/admin/consultations/${id}/delete/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Delete failed');
        setConsultations((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting consultation:', err);
        alert('Failed to delete consultation request.');
      });
  };

  return (
    <main style={{ padding: '2rem', background: '#f4f6f8', minHeight: '100vh', borderRadius:'2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#0D5F3A', fontSize: '2rem' }}>
        Consultation Requests
      </h2>

      {consultations.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No consultation requests found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {consultations.map((c) => (
            <div
              key={c.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ margin: '0.5rem 0' }}><strong>Name:</strong> {c.name}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Email:</strong> {c.email}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Phone:</strong> {c.phone || 'N/A'}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Concern:</strong> {c.concern}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Preferred Date & Time:</strong> {c.preferred_date} {c.preferred_time || ''}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Additional Info:</strong> {c.additional_info || 'None'}</p>
              <p style={{ margin: '0.5rem 0', color: '#888', fontSize: '0.875rem' }}>
                Submitted: {new Date(c.submitted_at).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(c.id)}
                style={{
                  marginTop: 'auto',
                  background: '#3A8349',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Delete Request
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminConsultations;
