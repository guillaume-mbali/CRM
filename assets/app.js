import React from "react";
import ReactDOM from 'react-dom';
import Navbar from './js/components/Navbar';
import "./js/components/FontAwesomeIcons"
import HomePage from './js/pages/HomePage';
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';
import { HashRouter,Switch, Route } from 'react-router-dom';
import CustomersPageWithPagination from "./js/pages/CustomersPageWithPagination";

console.log("Hello word");

const App = () => {
    return (
    <HashRouter>
        <Navbar/>
        <main className="container pt-5">
            <Switch>
                <Route path="/invoices" component={InvoicesPage} />   
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
    </HashRouter>
    );
};
const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);