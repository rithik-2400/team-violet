const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// POST /members - Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /members called');
    const {
      name, roll, year, degree, role, email,
      project, hobbies, certificate, internship, aboutYourAim
    } = req.body;

    console.log('Request body:', req.body);
    if (!name || !roll || !year || !degree || !role || !email) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const member = new Member({
      name, roll, year, degree, role, email,
      project, hobbies, certificate, internship, aboutYourAim,
      image: req.file ? req.file.filename : '',
    });

    console.log('Saving member:', member);
    await member.save();
    console.log('Member saved successfully');
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    console.error('Error saving member:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /members/:id - Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /members/:id - Delete a member
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
