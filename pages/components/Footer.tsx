
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <>
            <footer>
                <p>Made with <FontAwesomeIcon icon={faHeart} size={"xs"} /> by Temitope.js</p>
            </footer>
        </>
    )
}
export default Footer