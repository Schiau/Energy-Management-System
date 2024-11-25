import { useNavigate } from 'react-router-dom'
import GenericBtn from '../GenericBtn/GenericBtn'

function BackToUserPageBtn(){
    const navigator = useNavigate()
    const handleClick = () =>{ 
        navigator("/user")
    }

    return(
        <>
        <GenericBtn img= "/arrowLeft.svg" handler ={handleClick} showImg={true}/>
        </>
    )
}

export default BackToUserPageBtn