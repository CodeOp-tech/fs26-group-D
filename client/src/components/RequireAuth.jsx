import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      auth.logout();
    } else {
      auth.login();
    }
    setLoading(false);
  });

  if (!auth.user && !loading) {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>{children}</div>
  );
}

export default RequireAuth;