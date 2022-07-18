import { useState, useEffect } from "react";
import axios from 'axios';

const Database = () => {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [filterVal, setFilterVal] = useState("");
    const [filteredMovies, setFilteredMovies] = useState();
    const [filteredActors, setFilteredActors] = useState();

    useEffect(() => {
        const fetchMoviesAndActors = async () => {
            await axios.get("http://localhost:8000/api/movies")
                .then((res) => {
                    setMovies(res.data.result.records);
                })
            await axios.get("http://localhost:8000/api/actors")
                .then((res) => {
                    setActors(res.data.result.records);
                })
        }
        fetchMoviesAndActors();
    }, [])

    function handleChange(event) {
        let showMeTheFilteredMovies = movies.filter((movie) => {
            return (movie._fields[0].properties.title).toLowerCase().includes(event.target.value.toLowerCase())
        })
        let showMeTheFilteredActors = actors.filter((actor) => {
            return (actor._fields[0].properties.name).toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilteredMovies(showMeTheFilteredMovies)
        setFilteredActors(showMeTheFilteredActors)

        if (event.target.value === "") {
            setFilteredMovies()
            setFilteredActors()
        }
    }

    return (
        <div className="databaseContainer">
            <h1>Database</h1>
            <input type="text" name="searchValue" placeholder="Search for movie or actor" onChange={handleChange} />
            <div className="filterOutput">
                <div className="filterOutputMovies">
                    <h1>Found Movies:</h1>
                    {filteredMovies ? filteredMovies.map((movie) => {
                        return (
                            <div key={movie.id} className="movie">
                                <p>Label: {movie._fields[0].labels[0]}</p>
                                <p>Title: {movie._fields[0].properties.title}</p>
                                <p>Tagline:{movie._fields[0].properties.tagline} </p>
                                <p>Released: {movie._fields[0].properties.released.low}</p>
                            </div>
                        )
                    }) : "No movies found"}
                </div>
                <div className="filterOutputActors">
                    <h1>Found Actors:</h1>
                    {filteredActors ? filteredActors.map((actor) => {
                        return (
                            <div key={actor._fields[0].identity.low}
                                className="actor">
                                <p>ID: {actor._fields[0].identity.low}</p>
                                <p>Label: {actor._fields[0].labels[0]}</p>
                                <p>Name: {actor._fields[0].properties.name}</p>
                                <p>Born: {actor._fields[0].properties.born?.low || "n/a"}</p>
                            </div>
                        )
                    }) : "No actors found"}
                </div>
            </div>
            <div className="outputContainer">
                <div className="outputContainerMovies">
                    <h1>Movies</h1>
                    {movies.length > 0 ? movies.map((movie) => {
                        return (
                            <div key={movie.id} className="movie">
                                <p>Label: {movie._fields[0].labels[0]}</p>
                                <p>Title: {movie._fields[0].properties.title}</p>
                                <p>Tagline:{movie._fields[0].properties.tagline} </p>
                                <p>Released: {movie._fields[0].properties.released.low}</p>
                            </div>
                        )
                    }) : "No movies found"}
                </div>
                <div className="outputContainerActors">
                    <h1>Actors</h1>
                    {actors.length > 0 ? actors.map((actor) => {
                        return (
                            <div key={actor._fields[0].identity.low}
                                className="actor">
                                <p>ID: {actor._fields[0].identity.low}</p>
                                <p>Label: {actor._fields[0].labels[0]}</p>
                                <p>Name: {actor._fields[0].properties.name}</p>
                                <p>Born: {actor._fields[0].properties.born?.low || "n/a"}</p>
                            </div>
                        )
                    }) : "No actors found"}
                </div>
            </div>
        </div>
    );
}

export default Database;