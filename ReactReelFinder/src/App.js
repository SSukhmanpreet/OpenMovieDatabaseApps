// import logo from './logo.svg';
import './App.css';
import MovieListComponent from './homepageMoviesList';
import MovieDetails from './movieDetails';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

function App() {
  let { id } = useParams();
  // console.log("id");
  // console.log(id);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MovieListComponent />
    },
    {
      path: "/userLiked",
      element: <div>Hello</div>
    },
    {
      path: `/movieDetails/:${id}`,
      element:
        <MovieDetails />
    },
  ])
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
