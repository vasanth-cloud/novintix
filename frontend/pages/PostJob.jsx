import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'Full-time',
    salary: '',
    experience_level: '',
    skills: '',
    deadline: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('Please login to post a job');
      navigate('/login');
      return;
    }

    try {
      const data = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        posted_by: user.user_id
      };

      await axios.post('http://localhost:8000/api/jobs/create/', data);
      alert('Job posted successfully!');
      navigate('/my-jobs');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to post job');
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company *</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required />
        </div>
        <div className="form-group">
          <label>Requirements (one per line)</label>
          <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="4" />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Job Type *</label>
          <select name="job_type" value={formData.job_type} onChange={handleChange}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group">
          <label>Salary *</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Experience Level</label>
          <input type="text" name="experience_level" value={formData.experience_level} onChange={handleChange} placeholder="e.g., Entry, Mid, Senior" />
        </div>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
        </div>
        <div className="form-group">
          <label>Application Deadline</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;
