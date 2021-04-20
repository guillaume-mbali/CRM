import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import customersAPI from '../services/customersAPI';
import { toast } from 'react-toastify';
import FormContentloader from '../components/loaders/FormContentloader';



const CustomerPage = (props) => {

    const {id="new"} = props.match.params;

    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company:""
    })
   
    //Changement des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({ ...customer, [name]: value });
    }

    // A la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            if(editing){
                setErrors({});
                await customersAPI.updateCustomer(id,customer);
                toast.success("Le client a bien été modifié");
            }else{
                await customersAPI.createCustomer(customer);
                toast.success("Le client a bien été crée");
                props.history.replace("/customers");
            };
        }catch({response}){
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                setErrors(apiErrors); 
                toast.success("Des erreurs dans votre formulaire");
            }
        }
        
    }
    
    // Récupération du customer en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            const {firstName,lastName,email,company} = await customersAPI.findOne(id);
            setCustomer({firstName,lastName,email,company});
            setLoading(false);
        }catch(error){
            console.log(error.response);
            history.replace("/customers")
        }   
    }
    // Gestion des erreurs à la soumission du formulaire
    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company:""
    })


    const [editing, setEditing] = useState(false);


    //Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id != "new")  {
            setEditing(true);
            setLoading(true);
            fetchCustomer(id);
        }
    }, [id]);

    return (  
        <>
        {!editing  && <h1>Création d'un client</h1> || <h1>Modification d'un client</h1>}

        {loading && <FormContentloader/>}
        
        {!loading && 
        <form onSubmit={handleSubmit}>
            <Field 
            name="lastName" 
            label="Nom de famille" 
            placeholder="Nom de famille du client"
            value={customer.lastName}
            onChange={handleChange}
            error={errors.lastName}
            />
            <Field 
            name="firstName" 
            label="Prenom" 
            placeholder="Prénom du client"
            value={customer.firstName}
            onChange={handleChange}
            error={errors.firstName}
            />
            <Field 
            name="email" 
            label="Email" 
            placeholder="Adresse email du client" 
            type="email"
            value={customer.email}
            onChange={handleChange}
            error={errors.email}
            />
            <Field 
            name="company" 
            label="Entreprise" 
            placeholder="Entreprise du client"
            value={customer.company}
            onChange={handleChange}
            error={errors.company}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/customers" className="btn btn-link">Retour</Link>
            </div>
          
        </form>
        }
        </>
    );
}
 
export default CustomerPage;