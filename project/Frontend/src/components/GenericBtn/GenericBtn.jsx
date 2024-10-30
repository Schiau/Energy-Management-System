import PropTypes from 'prop-types';
import './GenericBtn.css'

function GenericBtn({ img, text = "", handler, showImg = true}){
    return(
        <>
        <button className="generic-btn" onClick={handler}>
            {showImg ? <img src={img} alt="Button icone"/>: <></>}
            {text}
        </button>
        </>
    )
}


GenericBtn.prototype ={
    img: PropTypes.string,
    text: PropTypes.string,
    handler: PropTypes.func.isRequired,
    showImg: PropTypes.bool
}
export default GenericBtn