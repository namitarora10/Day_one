export default function handler(req, res) {
  res.status(200).json({ 
    status: 'working',
    message: 'Simple test API',
    time: new Date().toISOString()
  });
}
