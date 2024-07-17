import css from './MovieList.module.css'
import { NavLink,useLocation } from "react-router-dom"


const MovieList = ({movies}) => {
    const location = useLocation();
    
    return(
        <div>
        <ul className={css.container}>
            {movies.map((movie) => (
                <li  key={movie.id}>
                    <NavLink className={css.list}  to={`/movies/${movie.id}`} state={{ from: location }}>
                    {movie.title}
                    </NavLink>
                    

                </li>
            ))}
        </ul>
    </div>
    )
}




export default MovieList;