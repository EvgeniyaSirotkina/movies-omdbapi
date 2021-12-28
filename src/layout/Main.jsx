import React from "react";
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';


class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false,
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&s=home')
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, isLoaded: true });
            }
        });
    }

    searchMovies = (searchStatment) => {
        this.setState({ isLoaded: false });
        fetch(`http://www.omdbapi.com/?apikey=[YOUR_APIKEY]&r=json&s=${searchStatment}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                this.setState({ movies: data.Search, isLoaded: true });
            }
        });
    }

    render() {
        const { movies, isLoaded } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {isLoaded ? (
                    <Movies movies={movies} />
                ) : (
                    <Preloader />
                )}
            </main>
        );
    } 
}

export { Main }