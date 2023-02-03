import axios from 'axios';

export const logInController = async (req, res) => {
  // these are the only info that we need
  const { username, password } = req.body;

  try {
    const apiResponse = await axios.post(
      `http://localhost:3070/Account/SignIn`,
      {
        username,
        password,
      }
    );
    const { username, roles, token } = apiResponse.data;
    // additional error handling
    if (!username || !roles) {
      return res.status(401).json({ error: 'Unable to authenticate user' });
    }

    // all the username and roles will be stored in the session respectively
    req.session.set({
      username,
      roles,
    });
    // send the token back
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Failed to authenticate user' });
  }
};

export const homePageController = async (req, res) => {
  // if not valid user, we will redirect the user to the login page
  if (!req.session.username) {
    return res.redirect('/login');
  }

  try {
    const axiosResponse = await axios.get(`${API_URL}/Territories/All`);
    const territories = axiosResponse.data;
    res.render('home', { territories });
  } catch (error) {
    return res.status(400).json({ error: 'Failed to retrieve territories' });
  }
};
