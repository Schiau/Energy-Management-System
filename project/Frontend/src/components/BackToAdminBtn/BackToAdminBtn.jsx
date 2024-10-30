import { useNavigate } from 'react-router-dom'
import GenericBtn from '../GenericBtn/GenericBtn'

function BackToAdminBtn(){
    const navigator = useNavigate()
    const handleClick = () =>{ 
        navigator("/admin")
    }

    return(
        <>
        <GenericBtn img= "/arrowLeft.svg" handler ={handleClick} showImg={true}/>
        </>
    )
}

export default BackToAdminBtn