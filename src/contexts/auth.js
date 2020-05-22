import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      let storedUser, storedToken;
      try {
        storedUser = await AsyncStorage.getItem('@instaclone:user');
        storedToken = await AsyncStorage.getItem('@instaclone:token');
      } catch (err) {
        setLoading(false);
        setError(err);
        return;
      }

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common.authorization = `Bearer ${storedToken}`;
        setError(null);
      }

      setLoading(false);
    }

    loadStoredData();
  }, [error]);

  async function signIn(data) {
    setLoading(true);
    let response;

    try {
      response = await auth.signIn(data);
    } catch (err) {
      setError(err.response.data.message);
    }

    if (response.data.user && response.data.token) {
      setUser(response.data.user);
      api.defaults.headers.common.authorization = `Bearer ${
        response.data.token
      }`;

      const storeUser = [
        '@instaclone:user',
        JSON.stringify(response.data.user),
      ];
      const storeToken = ['@instaclone:token', response.data.token];

      try {
        await AsyncStorage.multiSet([storeUser, storeToken]);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
        return;
      }
    }

    setLoading(false);
  }

  async function signUp(data) {
    setLoading(true);
    let response;

    try {
      response = await auth.signUp(data);
    } catch (err) {
      setError(err.response.data.message);
    }

    if (response.data.user && response.data.token) {
      setUser(response.data.user);
      api.defaults.headers.common.authorization = `Bearer ${
        response.data.token
      }`;

      const storeUser = [
        '@instaclone:user',
        JSON.stringify(response.data.user),
      ];
      const storeToken = ['@instaclone:token', response.data.token];

      try {
        await AsyncStorage.multiSet([storeUser, storeToken]);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
        return;
      }
    }

    setLoading(false);
  }

  function signOut() {
    setLoading(true);

    const keys = ['@instaclone:user', '@instaclone:token'];

    try {
      AsyncStorage.multiRemove(keys).then(() => {
        setUser(null);
      });
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signUp, signOut, error}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
