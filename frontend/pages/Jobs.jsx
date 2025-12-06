import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    job_type: '',
    company: ''
  });
  const [loading, setLoading] = useState(true);

  // Load all jobs on initial mount only
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/');
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty array - runs only once on mount

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:8000/api/jobs/?${params}`);
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="jobs-container">
      <div className="filters">
        <h2>Filter Jobs</h2>
        <div className="filter-group">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={filters.company}
            onChange={handleFilterChange}
          />
          <select name="job_type" value={filters.job_type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      </div>
      <div className="jobs-list">
        <h2>Available Jobs ({jobs.length})</h2>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
