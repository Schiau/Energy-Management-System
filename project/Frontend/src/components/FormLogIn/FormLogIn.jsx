import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Stylesheet.css'
import { logIn, getUserByToken } from "../../services/ServiceUser";

function FormLogIn()
{
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigator = useNavigate()

    const getCurrentUser = async (token) => {
      return await getUserByToken(token);
  };

  useEffect(() => {
      const checkToken = async () => {
          try {
              const token = sessionStorage.getItem("token");
              if (token) {
                  const currentUser = await getCurrentUser(token); 
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

  const handleSubmit = async (e) => {
      e.preventDefault(); 

      try {
          const token = await logIn(name, password); 
          if (token) {
            sessionStorage.setItem("token", token);
              const currentUser = await getCurrentUser(token); 

              if (currentUser.role === "ADMIN") {
                  navigator("/admin");
              } else {
                  navigator("/user");
              }
          } else {
              alert("Log in failed");
          }
      } catch (error) {
          alert("An error occurred during login: " + error.message);
      }
  };

    return(
        <form onSubmit={handleSubmit} className="form-class">
        <div>
          <label htmlFor="name">Email: </label>
          <input 
            type="email" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
}

export default FormLogIn