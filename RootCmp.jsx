import { HomePage } from './pages/HomePage.jsx';
import { MainHeader } from './cmps/MainHeader.jsx';
import { EmailApp } from './apps/MisterEmail/pages/EmailApp.jsx';
import { EmailDetails } from './apps/MisterEmail/pages/EmailDetails.jsx';
import { KeepApp } from './apps/MissKeep/pages/KeepApp.jsx';
import { About } from './pages/About.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function RootCmp() {
    return (
        <Router>
            <section className="app">
                <MainHeader />

                <Switch>
                    <Route path="/email" component={EmailApp} />
                    <Route path="/keep" component={KeepApp} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={HomePage} />
                </Switch>
            </section>
        </Router>
    )
}

// Using Class:
// export class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <header>
//                     <h1>Lets Play</h1>
//                 </header>
//                 <main>
//                     <Home />
//                 </main>
//             </div>
//         )
//     }
// }

