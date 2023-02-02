import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://netzwelt-devtest.azurewebsites.net/Territories/All'
        );
        setLocations(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchLocations();
  }, []);

  // loading handling
  if (loading) {
    return <div>Loading...</div>;
  }

  // error handling
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  // if no available data
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
