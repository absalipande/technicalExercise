export const checkAuth = (req, res, next) => {
  // if the user is not logged in, we will redirect the user to the login page
  if (!req.session.username) {
    return res.redirect('/login');
  }

  next();
};
