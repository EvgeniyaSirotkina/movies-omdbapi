import React from "react";

class Filter extends React.Component {
    state = {
        type: 'all',
    }

    handleRadio = (event) => {
        this.setState({ type: event.target.value });
        this.props.filterMovies(event.target.value);
    }

    render () {
        const { type } = this.state;

        return (
            <div className="row filter">
                <div className="col s2">
                    <label>
                        <input 
                            className="with-gap" 
                            name="type" 
                            type="radio" 
                            value="all"
                            checked={type === "all"}
                            onChange={this.handleRadio}
                        />
                        <span>All</span>
                    </label>
                </div>
                <div className="col s2">
                    <label>
                        <input 
                            className="with-gap" 
                            name="type" 
                            type="radio" 
                            value="movie"
                            checked={type === "movie"}
                            onChange={this.handleRadio}
                        />
                        <span>Movie</span>
                    </label>
                </div>
                <div className="col s2">
                    <label>
                        <input 
                            className="with-gap" 
                            name="type" 
                            type="radio" 
                            value="series"
                            checked={type === "series"}
                            onChange={this.handleRadio}
                        />
                        <span>Series</span>
                    </label>
                </div>
                <div className="col s2">
                    <label>
                        <input 
                            className="with-gap" 
                            name="type" 
                            type="radio" 
                            value="game"
                            checked={type === "game"}
                            onChange={this.handleRadio}
                        />
                        <span>Game</span>
                    </label>
                </div>
            </div>
        );
    }
}

export { Filter }