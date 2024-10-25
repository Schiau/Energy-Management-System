import { useNavigate } from "react-router-dom"
import './Stylesheet.css'

function BackHomeBtn(){
    const navigator = useNavigate()
    const handleClick = () => navigator("/")

    return(
        <>
        <button className="back-home-btn" onClick={handleClick}>
            <img src="/home.svg" alt="Home icone"/>
            Back home
        </button>
        </>
    )
}

export default BackHomeBtn