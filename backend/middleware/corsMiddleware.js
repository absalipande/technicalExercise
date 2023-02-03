import cors from 'cors';

const handlePreflight = (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  res.writeHead(200, headers);
  res.end();
};

const corsMiddleWare = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    handlePreflight(req, res);
    return;
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export default corsMiddleWare;
