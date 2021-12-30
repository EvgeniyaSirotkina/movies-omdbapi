import React from "react";
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import { NotFound } from '../components/NotFound';

class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false,
        errorMessage: undefined,
        searchStatment: 'home',
        page: 1,
        pages: 1,
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&page=${this.state.page}&s=home`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, isLoaded: true });
            }
        });
    }

    searchMovies = (searchStatment) => {
        this.setState({ searchStatment, isLoaded: false });
        fetch(`http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&page=${this.state.page}&s=${searchStatment}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, isLoaded: true });
            }
        });
    }

    filterMovies = (filter) => {
        this.setState({ isLoaded: false });

        const request =  filter !== 'all' 
                            ? `http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&page=${this.state.page}&s=${this.state.searchStatment}&type=${filter}`
                            : `http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&page=${this.state.page}&s=${this.state.searchStatment}`;

        fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, isLoaded: true });
            }
        });
    }

    render() {
        const { movies, isLoaded, errorMessage, page, pages } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                <Filter filterMovies={this.filterMovies} />
                <Pagination currentPage={page} pages={pages} changePage={this.changePage} />
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