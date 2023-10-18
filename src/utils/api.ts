import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://february-21.herokuapp.com',
});

//add new user to the api endpoint with only username and password
export async function registerNewUser(username: string, password: string) {
  try {
    const response = await axiosInstance.post('/api/v1/users/', {
      username,
      password,
    });
    console.log('User registered successfully:', response.data);
  } catch (error) {
    console.error('User registration failed:', error);
    throw new Error('User registration failed');
  }
}

//create a new authentication token to the api endopoint for the new user created
export async function getAuthToken(
  username: string,
  password: string
): Promise<string> {
  try {
    const response = await axiosInstance.post('/api-token-auth/', {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Token retrieval failed:', error);
    throw new Error('Token retrieval failed');
  }
}
