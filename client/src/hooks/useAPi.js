import { useState } from 'react';
import API from '../utils/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const callApi = async (method, endpoint, data = null) => {
    setLoading(true);
    setError('');
    try {
      const res = await API({ method, url: endpoint, data });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return { loading, error, callApi };
};