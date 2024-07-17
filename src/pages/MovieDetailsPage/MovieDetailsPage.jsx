import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import  css from './MovieDetailsPage.module.css'


const MovieDetailsPage = () => {

    const {movieId} = useParams();
    const  [detail, setDetails] = useState(null);
    const location = useLocation();
    const [error, setError] = useState(null);
    const previousLocation = useRef(location.state?.from || '/movies');
    const defaultImg = 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

    useEffect (() => {
        const fetchDetailsPage= async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,
                {
                    headers: {
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmY4ZDQ5YTg2MmQwYWI1MjM5ZjM1MWM4MWZhNTNmMCIsIm5iZiI6MTcyMDgwMTM2OC4zNTc1NjcsInN1YiI6IjY2OTEzM2JlNmI4OTc1NDhlNjA2YjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mrX8vCpW_izL9Q420KuZtp5xiA-qTDrmsuywjKdVot8',
                    },
                  }
                );
                
                setDetails(response.data);
            } 
            catch  (error) {
                setError('Error fetching movie details');
            }
        };
        fetchDetailsPage();
    }, [movieId]);
    
    
    
    if (!detail) return null;
    
    
    
    
    const genres = detail.genres.map(genre => genre.name).join(', ');
    
    
    
    
    
    return (
        <div >
        
            
          {error ? (
            <p>{error}</p>
          ) : (
            detail && (
              <>
              <div className={css.go}><NavLink className={css.back} to={previousLocation.current}>Go back</NavLink></div>
             <div className={css.container}>  <img src={
 detail.poster_path ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
 : defaultImg
}
width={250}
alt="poster"
/>
              
                <div>
                <h2 className={css.title}>{detail.title}</h2>
            <p>{detail.vote_average}</p>
            <h3 className={css.title}>Overview</h3>
             <p className={css.ditail}>{detail.overview}</p>
             <h3 className={css.title}>Genres</h3>
             <p >{genres}</p>
                </div>
                </div> 
                <ul className={css.reviews}>
                    <li>
                        <NavLink className={css.cast} to="cast">Cast</NavLink>
                    </li>
                    <li>
                        <NavLink className={css.cast} to="reviews">Reviews</NavLink>
                    </li>
                </ul>
              </>
            )
          )}
            <Outlet/>
        </div> )
}



export default MovieDetailsPage;