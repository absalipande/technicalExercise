export const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173,http://localhost:3070');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-USER-ID'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Referer', 'http://localhost:5173');


  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
};
