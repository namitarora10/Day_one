module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ 
    status: 'OK', 
    service: 'Day One Gym SMS Service',
    timestamp: new Date().toISOString()
  });
}
