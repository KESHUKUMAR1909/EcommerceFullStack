import './Footer.css';
import image from '../../../assets/google.png';
const Footer=()=>{
    return(
        <footer id="footer">
            <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Download App for android and IOS mobile phone</p>
            <img src={image}/>
            </div>
            <div className="midFooter">
                    <h1>Ecommerce</h1>
                    <p>High Quality is our First Priority</p>
                    <p>Copyrights 2021 &copy; KeshuKumar1909</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="">Instagram</a>
                <a href="">Linkedin</a>
                <a href="">Github</a>
            </div>
        </footer>
    )
}
export default Footer;