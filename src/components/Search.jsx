import React from "react";

class Search extends React.Component {
    state = {
        search: '',
    }

    handleSearchInput = (event) => {
        this.setState({ search: event.target.value });
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovies(this.state.search);
            this.clearInput();
        }
    }

    clearInput = () => {
        this.setState({ search: '' });
    }

    render () {
        const { search } = this.state;

        return (
            <div className="nav-wrapper">
                <div className="input-field ">
                    <input 
                        id="search" 
                        type="search" 
                        name="search"
                        value={search}
                        onChange={this.handleSearchInput}
                        onKeyDown={this.handleKey}
                    />
                    <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                    <i className="material-icons" onClick={this.clearInput}>close</i>
                </div>
            </div>
        );
    }
}

export { Search }