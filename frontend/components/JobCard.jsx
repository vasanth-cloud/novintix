import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">📍 {job.location}</p>
      <div className="job-details">
        <span className="job-type">{job.job_type}</span>
        <span className="salary">💰 ₹{job.salary}</span>
      </div>
      <p className="description">
        {job.description?.substring(0, 100)}...
      </p>
      <Link to={`/jobs/${job._id}`} className="btn-view">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;
