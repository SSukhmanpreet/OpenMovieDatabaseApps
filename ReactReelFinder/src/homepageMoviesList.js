import React, { useState, useEffect } from 'react';
import MovieCard from './movieCard';

// 1 - Create a list view component
// 2 - inside the list view create a movie component with details of the movie and the image
// 3 - keep separate files for each

// you guys have to create the movie list assignment that we did in javascript with the following things:
// fetch the list of movies from the API using useEffect
// Add search option which will directly call the API
// Add filter based on year
// Add pagination with the current page and the next 2 pages being cached (stored on the local machine) and only call the API if the next page is not cached
// if a filter and pagination is done together then the result should take both of them into account

// Use routing to create the likes page
// give the option to edit movie details and store that into localstorage, and while loading from the API check if its already available in localstorage then skip the API one.
// option to like and remove the like of the movie
// Structure of components is important

const MovieListComponent = () => {
    // const searchKey = 'Harry';
    const [moviesData, setMoviesData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('Harry');
    const [releaseYear, setReleaseYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const moviesPerPage = 10;
    // const [nextMoviesData, setNextMoviesData] = useState([]);

    useEffect(() => {
        // Check if the current page is cached in local storage
        const cachedPage = localStorage.getItem(`page_${currentPage}`);
        if (cachedPage) {
            setMoviesData(JSON.parse(cachedPage));
        } else {
            fetchMovies();
        }
    }, [currentPage]);

    const fetchMovies = async () => {
        try {
            console.log(currentPage);
            const apiKey = '6eb70200';
            const queryParams = [];

            if (searchQuery) {
                queryParams.push(`s=${searchQuery}`);
            }

            if (releaseYear) {
                queryParams.push(`y=${releaseYear}`);
            }

            // queryParams.push(`page=${currentPage}`);

            const queryString = queryParams.join('&');

            const initialURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${currentPage}`;
            console.log(initialURL)
            const response = await fetch(`${initialURL}`);
            const data = await response.json();
            console.log("data");
            console.log(data);
            setMoviesData(data);
            if (Number(data.totalResults % 10) < 5) {
                setTotalPages(Math.round((Number(data.totalResults) + 10) / 10));
            } else {
                setTotalPages(Math.round((Number(data.totalResults)) / 10));
            }
            // Cache next two and previous two pages in local storage
            // localStorage.setItem(`page_${currentPage}`, JSON.stringify(data));
            const nextPage = currentPage + 1;
            // const prevPage = currentPage - 1;
            // console.log(nextPage + " " + totalPages);
            if (nextPage <= totalPages) {
                console.log("caching next page");
                const nxtPageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage}`
                const res = await fetch(`${nxtPageURL}`);
                if (!res.ok) {
                    console.log('Network response was not ok');
                    return;
                } else {
                    const nxtPageData = await res.json();
                    // console.log("nxtPageData");
                    // console.log(nxtPageData);
                    localStorage.setItem(`page_${nextPage}`, JSON.stringify(nxtPageData));
                }
            }
            console.log(nextPage + " " + totalPages)
            if ((nextPage + 1) <= totalPages) {
                console.log("caching next page2");
                const nxt2PageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage + 1}`
                const res2 = await fetch(`${nxt2PageURL}`);
                if (!res2.ok) {
                    console.log('Network response was not ok');
                    return;
                } else {
                    const nxt2PageData = await res2.json();
                    // console.log("nxt2PageData");
                    // console.log(nxt2PageData);
                    localStorage.setItem(`page_${nextPage + 1}`, JSON.stringify(nxt2PageData));
                }
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError(error.message);
        }
    };








    // useEffect(() => {
    // const fetchMovies = async () => {
    //     console.log("Page Changed");
    //     try {

    //         const initialURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${currentPage}`;
    //         // console.log("initialURL");
    //         // console.log(initialURL);

    //         const response = await fetch(`${initialURL}`);
    //         const data = await response.json();
    //         // console.log("data");
    //         // console.log(data);
    //         setMoviesData(data);
    //         if (Number(data.totalResults % 10) < 5) {
    //             setTotalPages(Math.round((Number(data.totalResults) + 10) / 10));
    //         } else {
    //             setTotalPages(Math.round((Number(data.totalResults)) / 10));
    //         }
    //         // Cache next two and previous two pages in local storage
    //         // localStorage.setItem(`page_${currentPage}`, JSON.stringify(data));
    //         const nextPage = currentPage + 1;
    //         // const prevPage = currentPage - 1;
    //         // console.log(nextPage + " " + totalPages);
    //         if (nextPage <= totalPages) {
    //             // console.log("caching next page");
    //             const nxtPageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage}`
    //             const res = await fetch(`${nxtPageURL}`);
    //             const nxtPageData = await res.json();
    //             // console.log("nxtPageData");
    //             // console.log(nxtPageData);
    //             localStorage.setItem(`page_${nextPage}`, JSON.stringify(nxtPageData));
    //         }
    //         if ((nextPage + 1) <= totalPages) {
    //             const nxt2PageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage + 1}`
    //             const res2 = await fetch(`${nxt2PageURL}`);
    //             const nxt2PageData = await res2.json();
    //             // console.log("nxt2PageData");
    //             // console.log(nxt2PageData);
    //             localStorage.setItem(`page_${nextPage + 1}`, JSON.stringify(nxt2PageData));
    //         }

    //         // if (prevPage >= 1) {
    //         //     console.log("caching prev page");
    //         //     localStorage.setItem(`page_${prevPage}`, JSON.stringify(data));
    //         // }
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };
    // Check if the current page is cached in local storage
    // const cachedPage = localStorage.getItem(`page_${currentPage}`);
    // if (cachedPage) {
    //     // console.log("page already cached");
    //     // console.log(cachedPage);
    //     setMoviesData(JSON.parse(cachedPage));
    // } else {
    //     fetchMovies();
    // }
    // fetchMovies();
    // }, [currentPage])
    // useEffect(() => {
    //     // const initialURL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&page=1&y=${releaseYear}`;
    //     const fetchMovies = async () => {
    //         console.log("Search item Changed");
    //         setCurrentPage(1);
    //         console.log(currentPage);
    //         try {
    //             const queryParams = [];
    //             if (releaseYear) {
    //                 queryParams.push(`y=${releaseYear}`);
    //             }
    //             if (searchQuery) {
    //                 queryParams.push(`s=${searchQuery}`);
    //             }
    //             // queryParams.push(`page=${currentPage}`);

    //             const queryString = queryParams.join('&');
    //             // console.log("queryString");
    //             // console.log(queryString);

    //             const initialURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=1`;
    //             // console.log("initialURL");
    //             // console.log(initialURL);

    //             const response = await fetch(`${initialURL}`);
    //             const data = await response.json();
    //             // console.log("data");
    //             // console.log(data);
    //             setMoviesData(data);
    //             if (Number(data.totalResults % 10) < 5) {
    //                 setTotalPages(Math.round((Number(data.totalResults) + 10) / 10));
    //             } else {
    //                 setTotalPages(Math.round((Number(data.totalResults)) / 10));
    //             }
    //             // Cache next two and previous two pages in local storage
    //             // localStorage.setItem(`page_${currentPage}`, JSON.stringify(data));
    //             const nextPage = currentPage + 1;
    //             // const prevPage = currentPage - 1;
    //             // console.log(nextPage + " " + totalPages);
    //             if (nextPage <= totalPages) {
    //                 // console.log("caching next page");
    //                 const nxtPageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage}`
    //                 const res = await fetch(`${nxtPageURL}`);
    //                 const nxtPageData = await res.json();
    //                 // console.log("nxtPageData");
    //                 // console.log(nxtPageData);
    //                 localStorage.setItem(`page_${nextPage}`, JSON.stringify(nxtPageData));
    //             }
    //             if ((nextPage + 1) <= totalPages) {
    //                 const nxt2PageURL = `http://www.omdbapi.com/?apikey=${apiKey}&${queryString}&page=${nextPage + 1}`
    //                 const res2 = await fetch(`${nxt2PageURL}`);
    //                 const nxt2PageData = await res2.json();
    //                 // console.log("nxt2PageData");
    //                 // console.log(nxt2PageData);
    //                 localStorage.setItem(`page_${nextPage + 1}`, JSON.stringify(nxt2PageData));
    //             }

    //             // if (prevPage >= 1) {
    //             //     console.log("caching prev page");
    //             //     localStorage.setItem(`page_${prevPage}`, JSON.stringify(data));
    //             // }
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };
    //     // Check if the current page is cached in local storage
    //     const cachedPage = localStorage.getItem(`page_${currentPage}`);
    //     if (cachedPage) {
    //         // console.log("page already cached");
    //         // console.log(cachedPage);
    //         setMoviesData(JSON.parse(cachedPage));
    //     } else {
    //         fetchMovies();
    //     }
    //     // fetchMovies();
    // }, [searchQuery, releaseYear]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleYearChange = (event) => {
        setReleaseYear(event.target.value);
    };
    const handleSearch = () => {
        setCurrentPage(1);
        fetchMovies();
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // const handleMovieClick = (movieId) => {
    //     // Redirect to the MovieDetails page when a movie is clicked
    //     // You can implement the navigation based on your chosen routing method (e.g., React Router)
    //     console.log('Movie clicked with ID:', movieId);
    //     // Implement navigation to the MovieDetails page with the movieId
    //     // For example, if using React Router:
    //     // history.push(`/movie/${movieId}`);
    // };


    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    return (
        <div className="movie-list">
            <h1>Movie List</h1>
            <div className="search">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for movies here..."
                />
                <input
                    type="text"
                    value={releaseYear}
                    onChange={handleYearChange}
                    placeholder="Enter release year...(YYYY)" min="1899" max="2040"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {/* <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? 'active' : ''}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
                <button
                    disabled={moviesData.Search && moviesData.Search.length < moviesPerPage}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div> */}
            <div className="movies">
                {
                    moviesData.Search && moviesData.Search.map((movie, index) => (
                        <MovieCard key={index} {...movie}></MovieCard>
                    ))
                }
            </div>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? 'active' : ''}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
                <button
                    disabled={moviesData.Search && moviesData.Search.length < moviesPerPage}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default MovieListComponent;
