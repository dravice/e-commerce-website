import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, updateProfile, logout, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    // Validate form
    if (!name || !email) {
      setFormError('Name and email are required');
      return;
    }

    if (password && password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password && password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    // Create update data object
    const updateData = { name, email };
    if (password) updateData.password = password;

    try {
      await updateProfile(updateData);
      setSuccessMessage('Profile updated successfully');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Profile update error:', err);
      // Error is handled by the context
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container profile-container">
        <h2>Your Profile</h2>
        {(formError || error) && (
          <div className="auth-error">
            {formError || error}
          </div>
        )}
        {successMessage && (
          <div className="auth-success">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password (leave blank to keep current)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="auth-button">
            Update Profile
          </button>
        </form>
        <button onClick={handleLogout} className="auth-button logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;