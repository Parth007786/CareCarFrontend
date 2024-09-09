import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setChecking(false);
  }, [user]);
  return { isLoggedIn, checking };
};

export default useAuthStatus;
