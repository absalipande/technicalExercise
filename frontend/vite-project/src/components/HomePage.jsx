import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://netzwelt-devtest.azurewebsites.net/Territories/All',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        setLocations(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setError(
          error.message || 'Something went wrong, please try again later'
        );
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    fetchLocations();
  }, []);

  // redirect to login page if user is not logged in
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  // loading handling
  if (loading) {
    return <div>Loading...</div>;
  }

  // error handling
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  // if no avail data
  if (!locations.length) {
    return <div>No available data</div>;
  }

  return (
    <div>
      <h1>Hierarchical Tree of Places</h1>
      {locations.map((location) => (
        <div key={location.id}>
          <p>{location.name}</p>
          {location.children.map((child) => (
            <div key={child.id}>
              <p>{child.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
