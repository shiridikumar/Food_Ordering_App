import "./../css/components.css"

const Navbar2 = (props) => {
    return (
        <nav className="navbar navbar nav2" style={{"backgroundColor":"#d84f57"}}>
            <div className="container-fluid">
                <a className="navbar-brand">{props.canteen} Canteen</a>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-light" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )

}

export default Navbar2;