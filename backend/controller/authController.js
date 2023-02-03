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
    if (re)
    // all the username and roles will be stored in the session respectively
    req.session.username = username;
    req.session.roles = roles;
    // after a succesful login, we will redirect the user to the homepage
    res.redirect('/home');
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const homePageController = async (request, response) => {
  // if not valid user, we will redirect the user to the login page
  if (!request.session.username) {
    return response.redirect('/login');
  }

  try {
    const response = await axios.get(
      'https://netzwelt-devtest.azurewebsites.net/Territories/All'
    );
    const territories = response.data;
    response.render('home', { territories });
  } catch (error) {
    return response
      .status(400)
      .json({ error: 'Failed to retrieve territories' });
  }
};
