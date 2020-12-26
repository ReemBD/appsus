import { AppGrid } from './AppGrid.jsx'
const { Link, NavLink, withRouter } = ReactRouterDOM;
export function MainHeader() {

    return (
        <div className="header-container">
            <header className='main-header keep-main-layout flex'>
                <div className="logo"><Link to="/">appsus</Link></div>
                <nav className="main-nav">
                    <ul className="flex flex-center">
                        <li><NavLink to="/about">About</NavLink></li>
                        <AppGrid />
                    </ul>
                </nav>
            </header>
        </div>
    )
}