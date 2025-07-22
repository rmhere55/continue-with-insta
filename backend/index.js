import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/insta-token', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code,
      })
    );

    res.json(response.data); // { access_token, user_id }
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
