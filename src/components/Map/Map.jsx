import { useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';

const Map = () => {
  const [userLoc, setUserLoc] = useState(null);

  useEffect(() => {
    const userLoc = JSON.parse(localStorage.getItem('userLocation'));
    userLoc && setUserLoc(userLoc);
  }, []);

  if (!userLoc) {
    return null;
  }

  return (
    <div>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: userLoc.latitude, lng: userLoc.longitude }}
      >
        <Marker position={{ lat: userLoc.latitude, lng: userLoc.longitude }} />
      </GoogleMap>
    </div>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
