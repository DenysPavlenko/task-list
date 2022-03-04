import TaskList from 'components/TaskList';
import { FiltersProvider } from 'context/FiltersContext';
import { useEffect } from 'react';
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
      <div className={css.appList}>
        <FiltersProvider>
          <TaskList />
        </FiltersProvider>
      </div>
      {/* <div className={css.map}>
      </div> */}
    </div>
  );
};

export default App;
