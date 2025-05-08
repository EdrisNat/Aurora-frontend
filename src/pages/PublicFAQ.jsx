import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicFAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/faqs/');
      setFaqs(res.data);
    } catch (error) {
      console.error('Failed to fetch FAQs', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#1A8D50' }}>Frequently Asked Questions</h2>
      {faqs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No FAQs available at the moment.</p>
      ) : (
        faqs.map((faq) => (
          <div key={faq.id} style={{
            background: '#f9f9f9',
            margin: '1rem 0',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Q: {faq.question}</p>
            <p style={{ marginLeft: '1rem' }}>A: {faq.answer}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicFAQ;