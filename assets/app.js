import React,{useState} from "react";
import ReactDOM from 'react-dom';
import Navbar from './js/components/Navbar';
import "./js/components/FontAwesomeIcons"
import HomePage from './js/pages/HomePage';
import CustomersPage from './js/pages/CustomersPage';
import CustomerPage from './js/pages/CustomerPage';
import LoginPage from './js/pages/LoginPage';
import InvoicesPage from './js/pages/InvoicesPage';
import InvoicePage from './js/pages/InvoicePage';
import RegisterPage from './js/pages/RegisterPage';
import { HashRouter,Switch, Route, withRouter, Redirect } from 'react-router-dom';
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from "./js/components/PrivateRoute";

AuthAPI.setup()

const App = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    )

const NavbarWithRouter = withRouter(Navbar);


const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
}

    return (

        <AuthContext.Provider value={contextValue}>
             <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} /> 
                        <Route path="/register" component={RegisterPage} /> 
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />   
                        <PrivateRoute path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
       
    );
};
const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);