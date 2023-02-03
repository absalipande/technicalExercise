import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const logInController = async (req, res) => {
  // make sure that users doesnt input an empty string
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ error: 'Username and Password are required' });
  }
  // these are the only info that we need
  const { username, password } = req.body;
  if (username !== 'foo' || password !== 'bar') {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  
  try {
    const apiResponse = await axios.post(`${API_URL}/Account/SignIn`, {
      username,
      password,
    });
    const { username, roles, token } = apiResponse.data;
    // additional error handling
    if (!username || !roles) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // all the username and roles will be stored in the session respectively
    req.session.token = token;
    res.status(200).json({ username, roles, token });
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
