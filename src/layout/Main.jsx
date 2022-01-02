import React from "react";
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import { NotFound } from '../components/NotFound';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false,
        errorMessage: undefined,
        searchStatment: 'home',
        page: 1,
        totalPages: undefined,
        type: ''
    }

    generateRequest = (searchStatment, page, type) => {
        let request = `https://www.omdbapi.com/?apikey=${API_KEY}&r=json`;

        if (searchStatment) {
            request += `&s=${searchStatment}`;
        } else {
            request += '&s=home';
        }

        if (page) {
            request += `&page=${page}`;
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
                const totalPages = Math.ceil(data.totalResults / 10);
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true, totalPages });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false, totalPages: undefined });
            }
        });
    }

    searchMovies = (searchStatment) => {
        this.setState({ searchStatment, isLoaded: false, page: 1 });
        fetch(this.generateRequest(searchStatment, this.state.page))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const totalPages = Math.ceil(data.totalResults / 10);
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true, totalPages });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false, totalPages: undefined });
            }
        });
    }

    filterMovies = (filter) => {
        const currentPage = 1;
        this.setState({ isLoaded: false, page: currentPage, type: filter });

        fetch(this.generateRequest(this.state.searchStatment, currentPage, filter))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const totalPages = Math.ceil(data.totalResults / 10);
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true, totalPages });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false, totalPages: undefined });
            }
        });
    }

    changePage = (page) => {
        this.setState({ isLoaded: false, page: page });
        fetch(this.generateRequest(this.state.searchStatment, page, this.state.type))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const totalPages = Math.ceil(data.totalResults / 10);
                this.setState({ movies: data.Search, errorMessage: undefined, isLoaded: true, totalPages });
            }
            if (data.Response === 'False') {
                this.setState({ movies: [], errorMessage: data.Error, isLoaded: false, totalPages: undefined });
            }
        });
    }

    render() {
        const { movies, isLoaded, errorMessage, page, totalPages } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                <Filter filterMovies={this.filterMovies} />

                {totalPages && <Pagination currentPage={page} totalPages={totalPages} changePage={this.changePage} />}
                        
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