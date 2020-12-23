const { Link, NavLink, withRouter } = ReactRouterDOM;
export function MainHeader() {

    return (
        <header className='main-header flex'>
            <div className="logo"><Link to="/">Appsus</Link></div>
            <nav className="main-nav">
                <ul className="flex">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/email">Mister Email</NavLink></li>
                    <li><NavLink to="/keep">Miss Keep</NavLink></li>
                    <li><NavLink to="/books">Miss Books</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}