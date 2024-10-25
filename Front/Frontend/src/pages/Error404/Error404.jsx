import { Link } from "react-router-dom";
import './Error404.css';

function Error404() {
    return (
        <div className="error-container">
            <h1>404 Page Not Found</h1>
            <p>
                Oops! The page you're looking for doesn't exist. Return to the main <Link to="/">page</Link>.
            </p>
        </div>
    );
}

export default Error404;
