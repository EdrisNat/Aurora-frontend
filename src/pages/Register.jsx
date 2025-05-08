import React, { useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState({
    peanuts: false,
    dairy: false,
    gluten: false,
    fragrance: false,
    latex: false,
    other: false
  });
  const [otherAllergy, setOtherAllergy] = useState('');
  const navigate = useNavigate();

  const handleAllergyChange = (allergyName) => {
    setSelectedAllergies(prev => ({
      ...prev,
      [allergyName]: !prev[allergyName]
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Front-end validations
    if (password.length < 8) {
      return alert('Password must be at least 8 characters long.');
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    // Process allergies into array
    const allergiesArray = Object.keys(selectedAllergies)
      .filter(key => selectedAllergies[key] && key !== 'other')
      .concat(selectedAllergies.other ? [otherAllergy] : []);

    const newUser = { email, password, name, age, allergies: allergiesArray };

    fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (response.ok) return response.json();
        return response.json().then(data => { throw new Error(data.error || 'Registration failed'); });
      })
      .then(() => {
        alert('Registration successful! Please log in.');
        navigate('/login');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const ageOptions = [
    'Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
  ];

  return (
    <div className="login-bg">
      <div className="register-container">
        <div className="login-card register-card">
          <h2 className="login-title">Aurora Organics - Create Account</h2>
          <div className="login-subtitle">Please fill in your information</div>
          
          <form onSubmit={handleRegister} className="login-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="age">Age Bracket</label>
              <select
                id="age"
                value={age}
                onChange={e => setAge(e.target.value)}
                required
                className="login-input"
              >
                <option value="" disabled>Select your age bracket</option>
                {ageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Allergies (select all that apply)</label>
              <div className="checkbox-group">
                {Object.keys(selectedAllergies).map(key => (
                  key !== 'other' ? (
                    <div className="checkbox-item" key={key}>
                      <input
                        type="checkbox"
                        id={key}
                        checked={selectedAllergies[key]}
                        onChange={() => handleAllergyChange(key)}
                        className="checkbox-input"
                      />
                      <label htmlFor={key} className="checkbox-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    </div>
                  ) : (
                    <div className="checkbox-item" key={key}>
                      <input
                        type="checkbox"
                        id="other"
                        checked={selectedAllergies.other}
                        onChange={() => handleAllergyChange('other')}
                        className="checkbox-input"
                      />
                      <label htmlFor="other" className="checkbox-label">Other</label>
                    </div>
                  )
                ))}
              </div>
              {selectedAllergies.other && (
                <input
                  type="text"
                  placeholder="Please specify other allergies"
                  value={otherAllergy}
                  onChange={e => setOtherAllergy(e.target.value)}
                  required
                  className="login-input mt-10"
                />
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <button type="submit" className="login-button">Create Account</button>
          </form>
          
          <div className="register-link">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
