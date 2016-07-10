// Source: http://stackoverflow.com/a/5260472
export function toRadians(num) {
  return num * Math.PI / 180;
}

// Source: http://www.movable-type.co.uk/scripts/latlong.html
export function meterDistance(coord1, coord2) {
  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;

  const R = 6371e3; // metres
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const delta_phi = toRadians(lat2-lat1);
  const delta_lam = toRadians(lon2-lon1);

  const a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2)
            + Math.cos(phi1) * Math.cos(phi2)
            * Math.sin(delta_lam/2) * Math.sin(delta_lam/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
