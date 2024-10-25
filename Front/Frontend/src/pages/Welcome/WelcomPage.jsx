import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../services/ServiceUser"
import { useEffect } from "react";
import './WelcomePage.css'; 

function WelcomePage() {
    const navigator = useNavigate()

    const getCurrentUser = async (token) => {
      return await getUserByToken(token);
  };

  useEffect(() => {
      const checkToken = async () => {
          try {
              const token = localStorage.getItem("token");
              if (token) {
                //aici
                  const currentUser = await getCurrentUser(token); 
                  console.log("aici welcome")
                  console.log(currentUser.role);
                  if (currentUser.role === "ADMIN") {
                      navigator("/admin");
                  } else {
                      navigator("/user");
                  }
              }
          } catch (e) {
              console.log("No token or error occurred: " + e);
          }
      };

      checkToken(); 
  }, [navigator]);
    return (
        <div className="welcome-page">
            <h1>Welcome to the Energy Management System</h1>
            <div className="links">
                <Link to="/authentification" className="link-button">Authentication</Link>
                <Link to="/registration" className="link-button">Registration</Link>
            </div>
        </div>
    );
}

export default WelcomePage;
