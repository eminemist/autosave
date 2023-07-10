import {Link} from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.png"

const Error = ()=> {
    return(
        <Wrapper className="full-page">
            <div>
                <img src={img} alt ="not-found"/>
                <h3>Page not found</h3>
                <p>cant find page you are looking for</p>
                <Link to='/'>Back Home</Link>
            </div>
        </Wrapper>
    );
}

export default Error;