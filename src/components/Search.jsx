import React, { useState } from "react";

export const Search = (props) => {
    const [ search, setSearch ] = useState('');
    const { searchMovies } = props;

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    }

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            searchMovies(search);
            clearInput();
        }
    }

    const handleButton = () => {
        searchMovies(search);
        clearInput();
    }

    const clearInput = () => {
        setSearch('');
    }

    return (
        <div className="nav-wrapper search row">
            <div className="input-field ">
                <input 
                    id="search" 
                    type="search" 
                    name="search"
                    value={search}
                    onChange={handleSearchInput}
                    onKeyDown={handleKey}
                />
                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                <button className="btn search-btn" onClick={handleButton}>Search</button>
            </div>
        </div>
    );
}