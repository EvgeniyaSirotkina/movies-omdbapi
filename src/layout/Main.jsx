import React from "react";
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';
import { NotFound } from '../components/NotFound';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false,
        errorMessage: undefined,
        searchStatment: 'home',
        type: ''
    }

    generateRequest = (searchStatment, type) => {
        let request = `https://www.omdbapi.com/?apikey=${API_KEY}&r=json`;

        if (searchStatment) {
            request += `&s=${searchStatment}`;
        } else {
            request += '&s=home';
        }

        if (type && type !== 'all') {
            request += `&type=${type}`;
        }

        return request;
    }

    componentDidMount() {
        fetch(this.generateRequest())
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false });
            }
        });
    }

    searchMovies = (searchStatment) => {
        this.setState({ searchStatment, isLoaded: false});
        fetch(this.generateRequest(searchStatment, this.state.type))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false });
            }
        });
    }

    filterMovies = (filter) => {
        this.setState({ isLoaded: false, type: filter });

        fetch(this.generateRequest(this.state.searchStatment, filter))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false });
            }
        });
    }

    changePage = (page) => {
        this.setState({ isLoaded: false });
        fetch(this.generateRequest(this.state.searchStatment, this.state.type))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false });
            }
        });
    }

    render() {
        const { movies, isLoaded, errorMessage } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                <Filter filterMovies={this.filterMovies} />

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
}

export { Main }