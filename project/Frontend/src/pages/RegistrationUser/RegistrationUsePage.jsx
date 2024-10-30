import BackHomeBtn from "../../components/BackHomeBtn/BackHomeBtn";
import FormRegistrationGuest from "../../components/FormRegistrationGuest/FormRegistrationGuest";
import './Stylesheet.css'

function AuthForm() {


  return (
    <div className="auth-form">
      <h2>Registration Form</h2>
      <FormRegistrationGuest/>
      <BackHomeBtn />
    </div>
  );
}

export default AuthForm;
