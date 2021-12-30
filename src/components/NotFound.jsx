function NotFound (props) {
    const { message } = props;

    return (  
        <div className="row">
            <div className="col s12 m6">
                <div className="card indigo accent-1">
                    <div className="card-content black-text">
                        <span className="card-title">{message}</span>
                        <p>Something went wrong</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { NotFound }