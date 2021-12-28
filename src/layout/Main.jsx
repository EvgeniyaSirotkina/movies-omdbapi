import React from "react";
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';


class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false
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

    render() {
        const { movies, isLoaded } = this.state;
        console.dir(movies);

        return (
            <main className="container content">
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