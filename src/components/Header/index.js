import React, { useEffect } from "react";
import "./Styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/users.jpg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading,navigate]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Successfull!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user?.photoURL || userImg}
            alt="user"
            onError={(e) => {
              e.target.src = userImg;
            }}
            style={{
              borderRadius: "50%",
              height: "2.5rem",
              width: "2.5rem",
              objectFit: "cover"
            }}
          />
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
