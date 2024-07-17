import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation";

import React from 'react';


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

const App = ({}) => {
  return (
    <div>
      <Navigation/>
      <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/MoviesPage" element={<MoviesPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
        <Route path="cast" element={<MovieCast />}/> 
        <Route path="reviews" element={<MovieReviews/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}




export default App;