
import BackHomeBtn from "../../components/BackHomeBtn/BackHomeBtn";
import FormLogIn from "../../components/FormLogIn/FormLogIn";
import './Stylesheet.css'

function LogInPage()
{
    return(
        <div className="login-page">
            <h2>LogIn Form</h2>
            <FormLogIn />
             <BackHomeBtn/>
        </div>
    )
}

export default LogInPage