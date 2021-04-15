import axios from 'axios';
import CustomersAPi from './customersAPI';
import jwtDecode from 'jwt-decode';


/**
 * Positionne le token JWT sur Axios
 * @param {string} token 
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}


/**
 * Mise en place lors du chargement de l'application
 */
function setup(){
    const token = window.localStorage.getItem("authToken");
    
    if(token){
        const jwtData = jwtDecode(token);
        if (jwtData.exp *1000 > new Date().getTime() ){
           setAxiosToken(token);
        }   
    }
}

/**
 * Déconnexion (suppression du token)
 */

function logout(){

    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];

}

/**
 * Requête HTTP d'authenfication et stockage du token dans le storage et sur Axios
 * @param {object} credentials 
 *  
 */

function authenticate(credentials){

return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {

        window.localStorage.setItem("authToken", token)

        setAxiosToken(token);

       CustomersAPi.findAll().then(data => console.log(data))
    })
   


}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 */
function isAuthenticated(){
   
    const token = window.localStorage.getItem("authToken");
    
    if(token){
        const jwtData = jwtDecode(token);
        if (jwtData.exp *1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
    
}

export default{
    authenticate,
    logout,
    setup,
    isAuthenticated
}