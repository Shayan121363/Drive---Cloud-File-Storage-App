const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const supabase = require('../config/supabase.config');
const fs = require('fs');
const path = require('path');

router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const fileBuffer = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(req.file.filename, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    // Delete local temp file
    fs.unlinkSync(filePath);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const { data: publicData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(req.file.filename);

    res.json({ url: publicData.publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
