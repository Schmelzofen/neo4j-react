import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="homeContainer">
            <h1>This is a small "app" for testing purposes.</h1>
            <p>1. <Link to={"/database"}>Database</Link> shows all actors and movies (and lets you filter for title or name).</p>
            <p>2. <Link to={"/graph"}>Graph</Link> shows the db entries in a visual graph.</p>
        </div>
    );
}

export default Home;