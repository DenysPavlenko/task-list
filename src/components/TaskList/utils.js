const getDistance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
};

export const filterByTab = (tasks, tab) => {
  let filtered = [];
  if (tab === 'all') {
    return tasks;
  } else if (tab === 'location') {
    filtered = tasks.filter((task) => task.location);
    const userLoc = JSON.parse(localStorage.getItem('userLocation'));
    if (userLoc) {
      filtered = [...filtered].sort((a, b) => {
        return (
          getDistance(
            userLoc.latitude,
            userLoc.longitude,
            b.location.latitude,
            b.location.longitude
          ) -
          getDistance(
            userLoc.latitude,
            userLoc.longitude,
            a.location.latitude,
            a.location.longitude
          )
        );
      });
    }
  } else {
    filtered = tasks.filter((task) => task.appointmentDateTime);
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime)
    );
  }
  return filtered;
};

export const filterTasks = (tasks, filters) => {
  const { category } = filters;
  let filteredTasks = [];

  // const tasksWithCash = tasks.filter(({ reward }) => reward.cash);
  // const tasksWithXp = tasks.filter(({ reward }) => reward.xp && !reward.cash);

  // const sortedWithCash = [...tasksWithCash].sort((a, b) => {
  //   if (a.reward.cash !== b.reward.cash) {
  //     return b.reward.cash - a.reward.cash;
  //   } else {
  //     return b.reward.xp - a.reward.xp;
  //   }
  // });

  // const sortedWithXp = [...tasksWithXp].sort((a, b) => {
  //   return b.reward.xp - a.reward.xp;
  // });

  // filteredTasks = [...sortedWithCash, ...sortedWithXp];

  // if (groupBy === 'appointmentTime') {
  //   filteredTasks = [...filteredTasks].sort((a, b) => {
  //     return a - b;
  //   });
  // }

  if (category) {
    filteredTasks = tasks.filter((task) => task.category === category);
  }

  return filteredTasks.length > 0 ? filteredTasks : tasks;
};

export const tasksPagination = (page, tasks) => {
  const lastIndex = page * 10;
  const firstIndex = lastIndex - 10;
  return tasks.slice(firstIndex, lastIndex);
};
