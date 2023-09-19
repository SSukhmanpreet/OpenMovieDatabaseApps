// MovieDetails.js
import React, { useEffect, useState } from 'react';
import {
    Link,
    useParams,
} from "react-router-dom";

const MovieDetails = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const apiKey = '6eb70200';
    let id = useParams().undefined;
    console.log("id")
    console.log(id)
    useEffect(() => {
        const fetchMovieDetails = async () => {

            try {
                const URL = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
                console.log(URL)
                const response = await fetch(`${URL}`);
                const data = await response.json();
                console.log("data");
                console.log(data);
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div class = "container">
            <div class = "result-container">
                <div class = "result-grid" id = "result-grid">
                    <div class = "movie-poster">
                        <img src={movieDetails.Poster} alt={movieDetails.title} />
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title">{movieDetails.Title}</h3>
                        <ul class = "movie-misc-info">
                            <li class = "year">Year: {movieDetails.Year}</li>
                            <li class = "rated">Ratings: {movieDetails.Rated}</li>
                            <li class = "released">Released: {movieDetails.Released}</li>
                        </ul>
                        <p class = "genre"><b>Genre:</b> {movieDetails.Genre}</p>
                        <p class = "writer"><b>Writer:</b> {movieDetails.Writer}</p>
                        <p class = "actors"><b>Actors: </b>{movieDetails.Actors}</p>
                        <p class = "plot"><b>Plot:</b> {movieDetails.Plot}</p>
                        <p class = "language"><b>Language:</b> {movieDetails.Language}</p>
                        <p class = "awards"><b><i class = "fas fa-award"></i></b> {movieDetails.Awards}</p>
                    </div>
                </div>
                <div class = "button-div">
                    <Link to={`/`} ><button class="button">Back to HomePage</button></Link>
                </div>
            </div>
        </div>
        // {/* <div className="movie-details">
        //     <h2>{movieDetails.Title}</h2>
        //     <img src={movieDetails.Poster} alt={movieDetails.title} />
        //     <div class="movieInfo">
        //         <h3 class="movieTitle">${movieDetails.Title}</h3>
        //         <ul class="movieMiscInfo">
        //             <li class="year">Year: ${movieDetails.Year}</li>
        //             <li class="imdbRating">IMDB Rating: ${movieDetails.imdbRating}</li>
        //             <li class="released">Realesed On: ${movieDetails.Released}</li>
        //         </ul>
        //         <p class="genre"><b>Genre:</b>${movieDetails.Genre}</p>
        //         <p class="type"><b>Type:</b> ${movieDetails.Type}</p>
        //         <p class="language"><b>Language:</b> ${movieDetails.Language}</p>
        //         <p class="actors"><b>Actors:</b>${movieDetails.Actors}</p>
        //         <p class="awards"><b>Awards:</b> ${movieDetails.Awards}</p>
        //         <p class="boxOffice"><b>BoxOffice:</b> ${movieDetails.BoxOffice}</p>
        //         <p class="country"><b>Country:</b> ${movieDetails.Country}</p>
        //         <p class="director"><b>Director:</b> ${movieDetails.Director}</p>
        //         <p class="metascore"><b>Metascore:</b> ${movieDetails.Metascore}</p>
        //         <p class="plot"><b>Plot:</b> ${movieDetails.Plot}</p>
        //         <p class="released"><b>Released:</b> ${movieDetails.Released}</p>
        //         <p class="runtime"><b>Runtime:</b> ${movieDetails.Runtime}</p>
        //         <p class="title"><b>Title:</b> ${movieDetails.Title}</p>
        //         <p class="writer"><b>Writer:</b> ${movieDetails.Writer}</p>
        //         <p class="year"><b>Year:</b> ${movieDetails.Year}</p>
        //         <p class="imdbVotes"><b>IMDB Votes:</b> ${movieDetails.imdbVotes}</p>
        //         <p class="production"><b>Production:</b> ${movieDetails.Production}</p>
        //         <p class="rated"><b>Rated:</b> ${movieDetails.Rated}</p>
        //         <p class="dvd"><b>DVD:</b> ${movieDetails.DVD}</p>
        //         <p class="website"><b>Website:</b> ${movieDetails.Website}</p>
        //     </div>
        // </div> */}
    );
};

export default MovieDetails;
