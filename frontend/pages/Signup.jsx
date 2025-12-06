import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'applicant'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', formData);
      alert(response.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="applicant">Job Seeker</option>
              <option value="company">Employer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
