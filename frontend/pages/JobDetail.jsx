import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    cover_letter: '',
    resume_url: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}/`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job:', err);
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]); // Now only depends on jobId

  // Rest of your code remains the same...
  const handleChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('Please login to apply');
      navigate('/login');
      return;
    }

    try {
      const data = {
        ...applicationData,
        applicant_id: user.user_id,
        applicant_name: user.username,
        applicant_email: user.email
      };

      await axios.post(`http://localhost:8000/api/jobs/${jobId}/apply/`, data);
      alert('Application submitted successfully!');
      navigate('/my-applications');
    } catch (err) {
      alert(err.response?.data?.error || 'Application failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-detail-container">
      <div className="job-header">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        <div className="job-meta">
          <span>📍 {job.location}</span>
          <span>💼 {job.job_type}</span>
          <span>💰 ₹{job.salary}</span>
          <span>📈 {job.experience_level}</span>
        </div>
      </div>

      <div className="job-content">
        <section>
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </section>

        {job.requirements && job.requirements.length > 0 && (
          <section>
            <h3>Requirements</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {job.skills && job.skills.length > 0 && (
          <section>
            <h3>Skills Required</h3>
            <div className="skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}

        <section className="apply-section">
          <h3>Apply for this position</h3>
          <form onSubmit={handleApply}>
            <div className="form-group">
              <label>Cover Letter</label>
              <textarea
                name="cover_letter"
                value={applicationData.cover_letter}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>
            <div className="form-group">
              <label>Resume URL</label>
              <input
                type="url"
                name="resume_url"
                value={applicationData.resume_url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={applicationData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default JobDetail;
