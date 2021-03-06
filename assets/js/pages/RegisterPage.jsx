import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import UserAPI from '../services/usersAPI';
import { toast } from 'react-toastify';

const RegisterPage = ({history}) => {

    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        passwordConfirm:""
    })

    const [errors,setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        passwordConfirm:""
    })

        //Changement des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({ ...user, [name]: value });
    }


         // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas correcte";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire");
            return;
        }
        try{
            await UserAPI.register(user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit !");
            history.replace('/login');

        }catch(error){
            console.log(error.response);
            const {violations} = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                setErrors(apiErrors); 
            }
            toast.error("Des erreurs dans votre formulaire");
        }
    }
        

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                name ="firstName" 
                label="Prenom" 
                placeholder="Votre prénom"
                error={errors.firstName}
                value={user.firstName}
                onChange={handleChange}
                />
                <Field
                name ="lastName" 
                label="Nom" 
                placeholder="Votre Nom"
                error={errors.lastName}
                value={user.lastName}
                onChange={handleChange}
                />
                <Field
                name ="email" 
                label="Email" 
                placeholder="Votre email"
                error={errors.email}
                type="email"
                value={user.email}
                onChange={handleChange}
                />
                <Field
                name ="password" 
                label="Mot de passe" 
                type="password"
                placeholder="Votre mot de passe"
                error={errors.password}
                value={user.password}
                onChange={handleChange}
                />
                 <Field
                name ="passwordConfirm" 
                label="Confirmation du mot de passe" 
                type="password"
                placeholder="Confirmez votre mot de passe"
                error={errors.passwordConfirm}
                value={user.passwordConfirm}
                onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">confirmation</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>

        </>
      );
}
 
export default RegisterPage;