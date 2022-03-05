import { useEffect } from 'react';
import TaskList from 'components/TaskList';
import Map from 'components/Map';
import { FiltersProvider } from 'context/FiltersContext';
import css from './App.module.scss';

const App = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          localStorage.setItem('userLocation', JSON.stringify(userLocation));
        },
        () => {
          alert('Location is unawailable');
        }
      );
    }
  }, []);

  return (
    <div className={css.app}>
      <div className={css.list}>
        <FiltersProvider>
          <TaskList />
        </FiltersProvider>
      </div>
      <div className={css.map}>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCeXZtCX49U4dBm4lhkyxrx3NeumwsYfBg"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
};

export default App;
// AIzaSyCeXZtCX49U4dBm4lhkyxrx3NeumwsYfBg
