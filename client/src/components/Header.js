import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/database"}>Database</Link>
                    <Link to={"/graph"}>Graph</Link>
                </ul>
            </nav>
        </header>
    );
}

export default Header;