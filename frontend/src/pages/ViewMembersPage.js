import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewMembersPage.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch members. Is the backend running?');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="page-wrapper loading-state">
      <div className="loader" />
      <p>Loading members...</p>
    </div>
  );

  if (error) return (
    <div className="page-wrapper">
      <div className="alert alert-error">{error}</div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <h1 className="page-title">MEET OUR <span>AMAZING TEAM</span></h1>
      <div className="divider" />

      {members.length === 0 ? (
        <div className="empty-state">
            <p>
              No members yet. {' '}
              <Link to="/add" style={{ color: 'var(--yellow)' }}>
                Add the first one →
              </Link>
            </p>
        </div>
      ) : (
        <>
          <p className="member-count">{members.length} TEAM VIOLET member{members.length !== 1 ? 's' : ''} registered</p>
          <div className="members-grid">
            {members.map(member => (
              <div key={member._id} className="member-card card">
                <div className="member-card-img">
                  {member.image
                    ? <img
                        src={`${BACKEND_URL}/uploads/${member.image}`}
                        alt={member.name}
                      />
                    : <div className="member-avatar">{member.name.charAt(0).toUpperCase()}</div>
                  }
                </div>
                <div className="member-card-body">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-roll">Roll No: {member.roll}</p>
                  <Link to={`/member/${member._id}`} className="btn btn-primary view-btn">
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewMembersPage;
