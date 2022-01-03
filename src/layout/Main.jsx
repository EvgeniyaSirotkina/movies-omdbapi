import React, { useState, useEffect } from 'react';
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { NotFound } from '../components/NotFound';

const API_KEY = process.env.REACT_APP_API_KEY;

export const Main = () => {
    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const searchMovies = (search, type) => {
        setIsLoaded(false);
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&r=json&s=${search}${
            type !== 'all' ?  `&type=${type}` : ''
        }`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                setMovies(data.Search);
                setErrorMessage(undefined);
                setIsLoaded(true);
            }
            if (data.Response === 'False') {
                setMovies([]);
                setErrorMessage(data.Error);
            }
        });
    }

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&r=json&s=home`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {                
                setMovies(data.Search);
                setErrorMessage(undefined);
                setIsLoaded(true);
            }
            if (data.Response === 'False') {
                setMovies([]);
                setErrorMessage(data.Error);
            }
        });
    }, []);

    return (
        <main className='container content'>
            <Search searchMovies={searchMovies} />

            {!isLoaded && errorMessage ? (
                <NotFound message={errorMessage} />
            ) : isLoaded && !errorMessage ? (
                <Movies movies={movies} />
            ) : (
                <Preloader />
            )}
        </main>
    );
}