import React, { useState } from 'react';

export const Search = (props) => {
    const [ search, setSearch ] = useState('home');
    const [ type, setType ] = useState('all');
    const { searchMovies } = props;

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            searchMovies(search, type);
        }
    }

    const handleFilter = (event) => {
        setType(event.target.value);
        searchMovies(search, event.target.value);
    }

    const handleSearchButton = () => {
        searchMovies(search, type);
    }

    return (
        <>
            <div className='nav-wrapper search row'>
                <div className='input-field '>
                    <input 
                        id='search' 
                        type='search' 
                        name='search'
                        value={search}
                        onChange={(event) =>  setSearch(event.target.value)}
                        onKeyDown={handleKey}
                    />
                    <label className='label-icon' for='search'><i className='material-icons'>search</i></label>
                    <button className='btn search-btn indigo accent-3' onClick={handleSearchButton}>Search</button>
                </div>
            </div>
            <div className='row filter'>
                <div className='col s2'>
                    <label>
                        <input 
                            className='with-gap' 
                            name='type' 
                            type='radio' 
                            value='all'
                            checked={type === 'all'}
                            onChange={handleFilter}
                        />
                        <span>All</span>
                    </label>
                </div>
                <div className='col s2'>
                    <label>
                        <input 
                            className='with-gap' 
                            name='type' 
                            type='radio' 
                            value='movie'
                            checked={type === 'movie'}
                            onChange={handleFilter}
                        />
                        <span>Movie</span>
                    </label>
                </div>
                <div className='col s2'>
                    <label>
                        <input 
                            className='with-gap' 
                            name='type' 
                            type='radio' 
                            value='series'
                            checked={type === 'series'}
                            onChange={handleFilter}
                        />
                        <span>Series</span>
                    </label>
                </div>
            </div>
        </>

                    
    );
}