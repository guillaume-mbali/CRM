import React, {useState, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';
import Field from '../components/forms/Field'
import { toast } from 'react-toastify';



const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthContext)

    
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");


    //Gestion des champs
    const handleChange =  event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value});
    };
    //Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials)
            setError('');
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté !")
            history.replace("/customers");
        }catch(error){
            toast.error("Une erreur est survenue");
           setError("E-mail invalide");
        }
     
    }
    return (
        <>
        <h1>Page de connexion</h1>

        <form onSubmit={handleSubmit}>
            <Field 
            name="username" 
            label="Adresse email" 
            value={credentials.username} 
            onChange={handleChange} 
            type="email" 
            placeholder="Adresse email de connexion"
            error={error}/>

            <Field 
            name="password" 
            label="Mot de passe" 
            value={credentials.password} 
            onChange={handleChange} 
            type="password" 
            placeholder="Mot de passe"
            error={error}/>
         
            <div className="form-group">
                <button type="submit" className="btn btn-success">
                    Je me connecte
                </button>
            </div>
        </form>
        </>
    );
}
 
export default LoginPage;