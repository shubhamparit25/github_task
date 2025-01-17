import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/repositories?q=';

export const searchRepositories = async (query, page = 1, perPage = 15, token = null) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.get(BASE_URL + query, {
      headers,
      params: {
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        throw new Error('Rate limit exceeded. Please authenticate with a token.');
      } else if (status === 404) {
        throw new Error('No repositories found. Please refine your query.');
      }
    }
    throw new Error('An error occurred while fetching repositories.');
  }
};
