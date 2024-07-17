


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        
        const query = searchParams.get('query');
        if (query) {
            
            searchMovies(query);
        }
    }, [searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const query = form.elements.topic.value.trim();

        if (query === '') {
            toast.error('The field must not be empty.');
            return;
        }

        
        setSearchParams({ query: query });
        
        

        form.reset();
    };

    const searchMovies = async (query) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie`,
                {
                    params: {
                        api_key: '26f8d49a862d0ab5239f351c81fa53f0',
                        query: query,
                    },
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmY4ZDQ5YTg2MmQwYWI1MjM5ZjM1MWM4MWZhNTNmMCIsIm5iZiI6MTcyMDgwMTYyOC43OTMyNTQsInN1YiI6IjY2OTEzM2JlNmI4OTc1NDhlNjA2YjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dEeqUy0rExHTvhUNbG99Y257EC5oMNFKaG7Bcq1pNcY',
                    },
                }
            );
            setMovies(response.data.results);
        } catch (error) {
          setError('Error searching movies');
        }
    };

    return (
        <div>
            <form className={css.container} onSubmit={handleSubmit}>
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    placeholder="Search a movie by title"
                    name="topic"
                />
                <button className={css.btn} type="submit">
                    Search
                </button>
            </form>

            <Toaster />
            {error ? <p>{error}</p> : <MovieList movies={movies} />}
        </div>
    );
};

export default MoviesPage;

