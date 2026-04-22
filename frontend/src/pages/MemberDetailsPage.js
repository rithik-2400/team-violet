import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MemberDetailsPage.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

function MemberDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/members/${id}`)
      .then(res => {
        setMember(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Member not found or server error.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="page-wrapper loading-state">
      <div className="loader" />
      <p>Fetching member details...</p>
    </div>
  );

  if (error) return (
    <div className="page-wrapper">
      <div className="alert alert-error">{error}</div>
      <Link to="/view" className="btn btn-ghost">← Back to Members</Link>
    </div>
  );

  const hobbiesList = member.hobbies
    ? member.hobbies.split(',').map(h => h.trim()).filter(Boolean)
    : [];

  return (
    <div className="page-wrapper">
      <Link to="/view" className="back-link">← Back to Members</Link>

      <div className="detail-layout">
        {/* Left: Image */}
        <div className="detail-image-col">
          <div className="detail-image-box">
            {member.image
              ? <img src={`${BACKEND_URL}/uploads/${member.image}`} alt={member.name} />
              : <div className="detail-avatar">{member.name.charAt(0).toUpperCase()}</div>
            }
          </div>
          <div className="detail-badge">{member.role}</div>
        </div>

        {/* Right: Info */}
        <div className="detail-info-col">
          <h1 className="detail-name">{member.name}</h1>
          <p className="detail-degree">{member.degree} · {member.year}</p>

          <div className="detail-divider" />

          <div className="detail-grid">
            <DetailRow label="Roll Number" value={member.roll} />
            <DetailRow label="Email" value={member.email} />
            {member.project && <DetailRow label="Project" value={member.project} />}
            {member.certificate && <DetailRow label="Certificate" value={member.certificate} />}
            {member.internship && <DetailRow label="Internship" value={member.internship} />}
          </div>

          {member.aboutYourAim && (
            <div className="detail-section">
              <h3>About Your Aim</h3>
              <p>{member.aboutYourAim}</p>
            </div>
          )}

          {hobbiesList.length > 0 && (
            <div className="detail-section">
              <h3>Hobbies</h3>
              <div className="hobbies-tags">
                {hobbiesList.map((h, i) => (
                  <span key={i} className="hobby-tag">{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

export default MemberDetailsPage;
