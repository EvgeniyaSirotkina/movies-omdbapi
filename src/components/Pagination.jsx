import React from "react";

class Pagination extends React.Component {
    state = {
        currentPage: 1,
        startPage: 1,
        endPage: 5
    }

    componentDidUpdate() {
        if (this.props.currentPage !== this.state.currentPage) {
            const currentPage = this.props.currentPage;
            
            if (currentPage === 1) {
                this.setState({ currentPage, startPage: 1, endPage: 5 })
            } else if (currentPage === this.props.totalPages) {
                this.setState({ currentPage, startPage: this.props.totalPages - 5, endPage: this.props.totalPages })
            } else {
                this.setState({ currentPage, startPage: currentPage, endPage: currentPage + 5 })
            }
        }
    }

    selectPage = (event) => {
        const currentPage = parseInt(event.target.outerText);
        this.setState({ currentPage });

        this.props.changePage(currentPage);

        if(currentPage === 1) {
            this.setState({ startPage: 1, endPage: 5 })
        } else if (currentPage === this.props.totalPages) {
            this.setState({ startPage: this.props.totalPages - 5, endPage: this.props.totalPages })
        }
    }

    selectFirstPageInRange = (event) => {
        const currentPage = parseInt(event.target.outerText);
        this.setState({ currentPage })

        this.props.changePage(currentPage);

        const endPage = currentPage;
        const startPage = endPage - 5 >= 1 ? startPage - 5 : 1;
        this.setState({ startPage, endPage })
    }

    selectLastPageInRange = (event) => {
        const currentPage = parseInt(event.target.outerText);
        this.setState({ currentPage })

        this.props.changePage(currentPage);

        const startPage = currentPage;
        const endPage = startPage + 5 <= this.props.totalPages ? startPage + 5 : this.props.totalPages;
        this.setState({ startPage, endPage })
    }

    increasePage = () => {
        if (this.state.currentPage !== this.props.totalPages) {
            const currentPage = this.state.currentPage + 1;
            if (this.state.currentPage === this.state.endPage) {
                const startPage = currentPage;
                const endPage = startPage + 5 <= this.props.totalPages ? startPage + 5 : this.props.totalPages;
                this.setState({ currentPage, startPage, endPage })
            } else {
                this.setState({ currentPage })
            }

            this.props.changePage(currentPage);
        }
    }

    decreasePage = () => {
        if (this.state.currentPage !== 1) {
            const currentPage = this.state.currentPage - 1;
            if (this.state.currentPage === this.state.startPage) {
                const endPage = currentPage;
                const startPage = endPage - 5 >= 1 ? endPage - 5 : 1;
                this.setState({ currentPage, startPage, endPage })
            } else {
                this.setState({ currentPage })
            }

            this.props.changePage(currentPage);
        }
    }

    render () {
        const { currentPage, startPage, endPage } = this.state;
        const { totalPages } = this.props;
   
        const lis = [];
        if (startPage !== 1) {

            lis.push(<li className="waves-effect"><a href="#" onClick={this.selectPage}>1</a></li>);
            lis.push(<li>...</li>);
        } 
        lis.push(<li className={startPage === currentPage ? "active" : "waves-effect"}><a href="#" onClick={this.selectFirstPageInRange}>{startPage}</a></li>);
        for (var i=startPage+1; i<endPage; i++) {
            lis.push(<li className={i === currentPage ? "active" : "waves-effect"}><a href="#" onClick={this.selectPage}>{i}</a></li>);
        }
        lis.push(<li className={endPage === currentPage ? "active" : "waves-effect"}><a href="#" onClick={this.selectLastPageInRange}>{endPage}</a></li>);
        if (endPage !== totalPages && endPage < totalPages) {
            lis.push(<li>...</li>);
            lis.push(<li className={totalPages === currentPage ? "active" : "waves-effect"}><a href="#" onClick={this.selectPage}>{totalPages}</a></li>);
        }

        return (
            <>
                {
                    totalPages && totalPages !== 1 ? (
                        <div className="pagination-wrapper">
                            <ul className="pagination">
                                <li className={currentPage === 1 ? "disabled" : "waves-effect"}>
                                    <a href="#" onClick={this.decreasePage}>
                                        <i className="material-icons">chevron_left</i>
                                    </a>
                                </li>
                                    {lis}
                                <li className={currentPage === totalPages ? "disabled" : "waves-effect"}>
                                    <a href="#" onClick={this.increasePage}>
                                        <i className="material-icons">chevron_right</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : null
                } 
            </>
            
            
        );
    }
}

export { Pagination }