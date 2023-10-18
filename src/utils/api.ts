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

// Sign in a user using username and password and retrieving the token of the user
export async function signInUser(
  username: string,
  password: string
): Promise<string> {
  try {
    const authToken = await getAuthToken(username, password);
    console.log('Authentication successful. Token:', authToken);
    return authToken; // Return the authToken
  } catch (error) {
    console.error('Sign-in failed:', error);
    throw new Error('Sign-in failed');
  }
}

// Fetch the list of suppliers from the API
export async function fetchSuppliers(authToken: string, page: number = 1) {
  try {
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    const response = await axiosInstance.get('/api/v1/suppliers/', {
      headers,
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    throw new Error('Failed to fetch suppliers');
  }
}

// Fetch details of a specific supplier by ID
export async function fetchSupplierDetail(
  authToken: string,
  supplierId: string
) {
  try {
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    const response = await axiosInstance.get(
      `/api/v1/suppliers/${supplierId}/`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch supplier detail:', error);
    throw new Error('Failed to fetch supplier detail');
  }
}
