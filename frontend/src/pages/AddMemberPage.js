import React, { useState } from 'react';
import axios from 'axios';
import './AddMemberPage.css';

const initialForm = {
  name: '',
  roll: '',
  year: '',
  degree: '',
  role: '',
  email: '',
  project: '',
  hobbies: '',
  certificate: '',
  internship: '',
  aboutYourAim: '',
};

function AddMemberPage() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const required = ['name', 'roll', 'year', 'degree', 'role', 'email'];
    for (let field of required) {
      if (!form[field].trim()) {
        return `Please fill in the "${field}" field.`;
      }
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const error = validate();
    if (error) {
      setStatus({ type: 'error', msg: error });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);

    try {
      await axios.post('/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ type: 'success', msg: '✅ Member added successfully!' });
      setForm(initialForm);
      setImage(null);
      setPreview(null);
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to add member.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">ADD <span>MEMBER</span></h1>
      <div className="divider" />

      {status && (
        <div className={`alert alert-${status.type}`}>{status.msg}</div>
      )}

      <div className="add-layout">
        {/* Image preview */}
        <div className="image-side">
          <div className="image-preview-box">
            {preview
              ? <img src={preview} alt="Preview" className="image-preview" />
              : <div className="image-placeholder">📷<span>Upload Photo</span></div>
            }
          </div>
          <label className="upload-label btn btn-ghost">
            {image ? '✓ Photo Selected' : 'Choose Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
          {image && <p className="upload-filename">{image.name}</p>}
        </div>

        {/* Form */}
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
            </div>
            <div className="form-group">
              <label>Roll Number *</label>
              <input name="roll" value={form.roll} onChange={handleChange} placeholder="e.g. RA2111003010XXX" />
            </div>
            <div className="form-group">
              <label>Year *</label>
              <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2024" />
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label>About Project</label>
            <textarea name="project" value={form.project} onChange={handleChange} placeholder="Describe the project..." />
          </div>
          <div className="form-group">
            <label>Hobbies (comma separated)</label>
            <input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="e.g. Reading, Gaming, Coding" />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Certificate</label>
              <input name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. AWS, Fullstack" />
            </div>
            <div className="form-group">
              <label>Internship</label>
              <input name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. Cloud Computing at TCS" />
            </div>
          </div>
          <div className="form-group">
            <label>About Your Aim</label>
            <textarea name="aboutYourAim" value={form.aboutYourAim} onChange={handleChange} placeholder="What do you aim to achieve?" />
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : '＋ SUBMIT MEMBER'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMemberPage;
