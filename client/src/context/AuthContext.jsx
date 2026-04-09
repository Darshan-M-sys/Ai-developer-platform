import axios from 'axios';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUserData] = useState(null); // ✅ null instead of {}
  const [loading, setLoading] = useState(true); // ✅ important

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/auth/me',
        { withCredentials: true }
      );

      setUserData(res.data?.data || null);
    } catch (error) {
      setUserData(null); // ✅ clear user if not authenticated
      console.log(error.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Better auth check
  const isLogged = useMemo(() => {
    return !!user; // true if user exists
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserData,
        isLogged,
        loading,
        refreshUser: fetchUser // ✅ super useful
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;