function Movie (props) {
    const { 
        Title: title,
        Year: year,
        imdbID: id,
        Poster: poster,
     } = props;
    
    return (
        <div id={id} className="movie card">
            <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={poster} />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{title}</span>
                <p>Year: {year}</p>
            </div>
        </div>
    );
}

export { Movie }