import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const logInController = async (req, res) => {
  // these are the only info that we need
  const { username, password } = req.body;

  try {
    const apiResponse = await axios.post(`${API_URL}/Account/SignIn`, {
      username,
      password,
    });
    const { username, roles } = apiResponse.data;
    // additional error handling
    if (apiResponse.status !== 200) {
      throw new Error('Unable to authenticate user');
    }
    // all the username and roles will be stored in the session respectively
    req.session.username = username;
    req.session.roles = roles;
    // after a succesful login, we will redirect the user to the homepage
    res.redirect('/home');
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
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
