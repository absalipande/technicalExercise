import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          'https://netzwelt-devtest.azurewebsites.net/Territories/All'
        );
        setLocations(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchLocations();
  }, []);

  // error handling
  if (error) {
    return <div>An error occured: {error.message} </div>;
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
