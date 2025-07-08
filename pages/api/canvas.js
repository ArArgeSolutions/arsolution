import axios from 'axios';
import cookie from 'cookie';

const canvasUrl = 'https://canvas.arsolution.com.tr';

// Server
// const clientId = '10000000000001';
// const clientSecret = 'a97n2WGFFwUZHBNUPwRhMDf3xcEa8TVMHwCET7k6rEBJPRwUEvMQF9vNCXrfeTvQ';
// const redirectUri = 'https://arsolution.com.tr/api/canvas';

// localhost
const clientId = '10000000000002';
const clientSecret = 'Lk244QBEBk3aWXmDCPQm9E7PAV28tUWrUhm3zDeZYfXDV9fZFXuu9K6H7xRB7EaU';
const redirectUri = 'http://localhost:3000/api/canvas';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const authUrl = `${canvasUrl}/login/oauth2/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    return res.redirect(authUrl);    
  }

  try {    
    const tokenResponse = await axios.post(`https://canvas.arsolution.com.tr/login/oauth2/token`, {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code,
    });

    const { access_token } = tokenResponse.data;

    // Access token'ı HTTP-Only bir cookie'ye yaz
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('access_token', access_token, {
        httpOnly: true,  // Frontend'in erişmesini engeller
        secure: process.env.NODE_ENV !== 'development', // Sadece HTTPS üzerinden iletilir
        maxAge: 60 * 60 * 24 * 30,  // 30 gün geçerli
        sameSite: 'strict',
        path: '/',
      })
    );

    res.redirect(`/admin/panel/${encodeURIComponent(access_token)}`);
  } catch (error) {
    console.error('OAuth2 Error:', error);
    res.status(500).json({ error: 'OAuth2 failed' });
  }
}