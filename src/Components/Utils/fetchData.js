export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch data from', url);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};