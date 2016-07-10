import DeviceInfo from 'react-native-device-info';

export default {
  get: (route, params, resolve, reject) => {
    console.log(`GET ${route}`);
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
    .then(json => json !== undefined && typeof resolve === 'function' && resolve(json))
    .done();
  },
  post: (route, params, resolve, reject) => {
    // this is gross and not React-y but yolo
    console.log(`PUT ${route}`);
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
      console.log(response);
      if (response.status >= 400) {
        reject && reject(json);
        return undefined;
      } else {
        return json;
      }
    })
    .then(json => json !== undefined && typeof resolve === 'function' && resolve(json))
    .done();
  },

  railsApp: 'http://79c5d105.ngrok.io',
  // railsApp: 'http://localhost:3000/',
};
