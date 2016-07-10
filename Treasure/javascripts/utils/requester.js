import DeviceInfo from 'react-native-device-info';

export default {
  get: (route, params, resolve, reject) => {
    const query = Object.keys(params)
                        .map(key => `${key}=${params[key]}`)
                        .join('&');
    fetch(`${route}?${query}`)
    .then(response => {
      const json = response.json();
      if (response.status >= 400) {
        reject && reject(json);
        return undefined;
      } else {
        return json;
      }
    })
    .then(json => json !== undefined && typeof resolve === 'function' && resolve(json));
  },
  post: (route, params, resolve, reject) => {
    // this is gross and not React-y but yolo
    params.phone_id = DeviceInfo.getUniqueID();
    fetch(route, {
      body: JSON.stringify(params),
      cache: 'default',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    .then(response => {
      const json = response.json();
      if (response.status >= 400) {
        reject && reject(json);
        return undefined;
      } else {
        console.log(json);
        return json;
      }
    })
    .then(json => json !== undefined && typeof resolve === 'function' && resolve(json));
  },
};
