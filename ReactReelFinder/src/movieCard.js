import React from "react";
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    const handleOnClick = (movieId) => {
        // Redirect to the MovieDetails page when a movie is clicked
        // You can implement the navigation based on your chosen routing method (e.g., React Router)
        console.log('Movie clicked with ID:', movieId);
        // Implement navigation to the MovieDetails page with the movieId
        // For example, if using React Router:
        // history.push(`/movie/${movieId}`);
    };
    return (
        <Link to={`/movieDetails/${props.imdbID}`} onClick={() => { handleOnClick(props.imdbID) }}>
            <div className="movie">
                <div className="column">
                    <div className="initialItemThumnail">
                        <img src={props.Poster} alt={props.Title} />
                    </div>
                    <div className="initialItemInfo">
                        <h2>{props.Title}</h2>
                        <p>{props.Year}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;