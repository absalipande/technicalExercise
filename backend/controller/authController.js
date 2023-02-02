import axios from 'axios';

const logInController = async (request, response) => {
  // these are the only info that we need
  const { username, password } = request.body;

  try {
    const response = await axios.post(
      'https://netzwelt-devtest.azurewebsites.net/Account/SignIn',
      { username, password }
    );

    // all the username and roles will be stored in the session respectively
    const { username, roles } = response.data;
    request.session.username = username;
    request.session.roles = roles;
    // after a succesful login, we will redirect the user to the homepage
    response.redirect('/home');
  } catch (error) {
    response.status(401).json({ error: 'Invalid credentials' });
  }
};

const territoryController = async (request, response) => {
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

export default { logInController, territoryController };
