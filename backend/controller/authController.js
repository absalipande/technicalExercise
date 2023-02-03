import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const logInController = async (req, res) => {
  let username;
  let password;
  // make sure that users doesnt input an empty string
  if (!req.body.username || !req.body.password) {
    return res
      .status(401)
      .json({ error: 'Username and Password are required' });
  }
  // these are the only info that we need
  username = req.body.username;
  password = req.body.password;

  try {
    const apiResponse = await axios.post(`${API_URL}/Account/SignIn`, {
      username,
      password,
    });
    console.log('API Response', apiResponse);
    const {
      username: apiUsername,
      roles: apiRoles,
      token: apiToken,
    } = apiResponse.data;

    // additional error handling
    if (!apiUsername || !apiRoles || !apiToken) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // all the username and roles will be stored in the session respectively
    req.session.token = token;
    res
      .status(200)
      .json({ username: apiUsername, roles: apiRoles, token: apiToken });
  } catch (error) {
    console.error('API Error', error);
    res.status(401).json({ error: 'invalid username or password' });
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
    return res.status(401).json({ error: 'Failed to retrieve territories' });
  }
};
