import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';



const MovieReviews = ()=> {
    const [reviews, setRewiew] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        const fetchReviewsInfo = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmY4ZDQ5YTg2MmQwYWI1MjM5ZjM1MWM4MWZhNTNmMCIsIm5iZiI6MTcyMDgwMTM2OC4zNTc1NjcsInN1YiI6IjY2OTEzM2JlNmI4OTc1NDhlNjA2YjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mrX8vCpW_izL9Q420KuZtp5xiA-qTDrmsuywjKdVot8',
                        },
                    }
                );
                console.log(response.data);
                setRewiew(response.data.results);
            } catch (error) {
                setError('Error fetching reviews'); 
            }
        };

        
            fetchReviewsInfo();
        
    }, [movieId]);

     if (error) {
         return <div className="error-message">Error: {error}</div>;
     }

    
    
    
    
    
    
    
    return (
        <div>
        {reviews.length > 0 ? (
            reviews.map((review) => (
                review.content ? (
                    <div key={review.id}>
                        <p>Author: {review.author}</p>
                        <p>{review.content}</p>
                    </div>
                ) : (
                    <div key={review.id}>
                        <p>Author: {review.author}</p>
                        <p>Sorry, content is not found.</p>
                    </div>
                )
            ))
        ) : (
            <p>Sorry, content is not found.</p>
        )}
    </div>
    )
}



export default MovieReviews;