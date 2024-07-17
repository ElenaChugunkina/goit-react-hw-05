import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css'

const MovieCast = () => {
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        const fetchActorsInfo = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmY4ZDQ5YTg2MmQwYWI1MjM5ZjM1MWM4MWZhNTNmMCIsIm5iZiI6MTcyMDgwMTM2OC4zNTc1NjcsInN1YiI6IjY2OTEzM2JlNmI4OTc1NDhlNjA2YjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mrX8vCpW_izL9Q420KuZtp5xiA-qTDrmsuywjKdVot8',
                        },
                    }
                );
                console.log(response.data);
                setActors(response.data.cast);
            } catch (error) {
                setError(error.message); 
            }
        };

        if (movieId) {
            fetchActorsInfo();
        }
    }, [movieId]);

    if (error) {
        return <div className="error-message">Помилка: {error}</div>;
    }

    return (
        <div className={css.list}>
      {actors.map((actor) => (
        
        actor.profile_path ? (
          <div key={actor.cast_id} className="actor">
            <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} className="actor-image" />
            <p className="actor-name">{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </div>
        ) : null
      ))}
    </div>
    );
};

export default MovieCast;


