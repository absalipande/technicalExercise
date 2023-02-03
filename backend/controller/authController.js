import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const logInController = async (req, res) => {
  const { username, password } = req.body;
  // make sure that users doesnt input an empty string
  if (!username || !password) {
    return res
      .status(401)
      .json({ error: 'Username and Password are required' });
  }

  if (username !== 'foo' || password !== 'bar') {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

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
      return res.status(401).json({ error: 'Invalid response from API' });
    }

    // sign a JWT token
    const token = jwt.sign(
      { username: apiUsername, roles: apiRoles },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    // all the username and roles will be stored in the session
    req.session.token = token;
    res.status(200).json({ username: apiUsername, roles: apiRoles, token });
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
