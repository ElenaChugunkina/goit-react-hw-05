import axios from 'axios';
import React, { useEffect, useState } from 'react';
import css from './HomePage.module.css'

import MovieList from '../../components/MovieList/MovieList';
const HomePage = ({id, state}) => {
    const  [movies, setMovies] = useState([]);
    const [error, setError] = useState(null)

    useEffect (() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day',
                {
                    headers: {
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmY4ZDQ5YTg2MmQwYWI1MjM5ZjM1MWM4MWZhNTNmMCIsIm5iZiI6MTcyMDgwMTM2OC4zNTc1NjcsInN1YiI6IjY2OTEzM2JlNmI4OTc1NDhlNjA2YjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mrX8vCpW_izL9Q420KuZtp5xiA-qTDrmsuywjKdVot8',
                    },
                  }
                );
                console.log(response);  
                setMovies(response.data.results);
                setError(null);
            } 
            catch {
              setError('Error fetching trending movies');
            }
        };
        fetchTrendingMovies();
    }, []);
    
    
    
    
    
    
    
    
    return (
      <>
        <h1 className={css.title}>Tranding today</h1>
        {error && <p>{error}</p>}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
      {!error && movies.length === 0 && <p>No movies found.</p>}
        </>

    )
}


export default HomePage;


