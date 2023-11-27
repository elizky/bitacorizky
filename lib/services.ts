export async function getLocationWrite(lat: number, lng: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch team players data');
  }
  const data = await res.json();
  const location = `${data.address.city}, ${data.address.country}`;
  return location;
}
