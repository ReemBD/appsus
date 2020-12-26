import { AppGrid } from './AppGrid.jsx'
const { Link, NavLink, withRouter } = ReactRouterDOM;
export function MainHeader() {

    return (
        <header className='main-header keep-main-layout flex'>
            <div className="logo"><Link to="/">Appsus</Link></div>
            <nav className="main-nav">
                <ul className="flex">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/email">Mister Email</NavLink></li>
                    <li><NavLink to="/keep">Miss Keep</NavLink></li>
                    <li><NavLink to="/books">Miss Books</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <AppGrid />
                </ul>
            </nav>
        </header>
    )
}