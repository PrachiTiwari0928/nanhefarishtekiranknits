import React from "react";

function Contact() {
  return (
    <div style={container}>
      <div style={card}>
        <h2 style={heading}>📞 Contact Us</h2>

        <div style={infoContainer}>
          <div style={infoItem} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = '#e9ecef'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = '#f8f9fa'; }}>
            <span style={icon}>📞</span>
            <div>
              <strong style={label}>Phone:</strong>
              <p style={text}>+91 843941xxxx</p>
            </div>
          </div>

          <div style={infoItem} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = '#e9ecef'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = '#f8f9fa'; }}>
            <span style={icon}>✉️</span>
            <div>
              <strong style={label}>Email:</strong>
              <a href="mailto:tprachit09082005@gmail.com" style={link} onMouseEnter={(e) => e.target.style.color = '#555555'} onMouseLeave={(e) => e.target.style.color = '#000000'}>
                tprachit09082005@gmail.com
              </a>
            </div>
          </div>

          <div style={infoItem} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = '#e9ecef'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = '#f8f9fa'; }}>
            <span style={icon}>📍</span>
            <div>
              <strong style={label}>Address:</strong>
              <p style={text}>India</p>
            </div>
          </div>
        </div>

        <div style={footer}>
          <p style={madeBy}>
            Made with <span style={heart}>❤️</span> by <strong style={brand}>Nanhe Farishte – Kiran Knits</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  background: '#ffffff',
  padding: '20px',
};

const card = {
  background: '#ffffff',
  borderRadius: '25px',
  padding: '40px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
  border: '2px solid #000000',
  position: 'relative',
  overflow: 'hidden',
};

const heading = {
  fontSize: '2.5rem',
  color: '#000000',
  marginBottom: '30px',
  fontWeight: '700',
  textShadow: 'none',
};

const infoContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  marginBottom: '40px',
};

const infoItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '15px',
  boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid #000000',
};

const icon = {
  fontSize: '2rem',
  color: '#000000',
};

const label = {
  display: 'block',
  fontSize: '1.1rem',
  color: '#000000',
  marginBottom: '5px',
  fontWeight: '600',
};

const text = {
  fontSize: '1rem',
  color: '#333333',
  margin: '0',
  fontWeight: '500',
};

const link = {
  fontSize: '1rem',
  color: '#000000',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'color 0.3s ease',
};

const footer = {
  borderTop: '2px solid #000000',
  paddingTop: '20px',
};

const madeBy = {
  fontSize: '1.1rem',
  color: '#333333',
  margin: '0',
  fontStyle: 'italic',
};

const heart = {
  color: '#000000',
  fontSize: '1.2rem',
};

const brand = {
  color: '#000000',
  fontWeight: '700',
};

export default Contact;