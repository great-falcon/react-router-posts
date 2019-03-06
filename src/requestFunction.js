const url = 'https://jsonplaceholder.typicode.com';

export const makeRequest = async (params) => {
  const request = await fetch(`${url}${params}`);
  const response = await request.json();
  return response;
}