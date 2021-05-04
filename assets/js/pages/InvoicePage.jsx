import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import CustomersAPI from'../services/customersAPI';
import InvoicesAPI from '../services/invoicesAPI';
import { toast } from 'react-toastify';
import FormContentloader from '../components/loaders/FormContentloader';


const InvoicePage = ({history,match}) => {

    const {id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount:"",
        customer:"",
        status:"SENT"
    });

    const [errors, setErrors] = useState({
        amount:"",
        customer:"",
        status:""
    });

    const [customers,setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    //Récupération des clients
    const fetchCustomers = async () => {
        try{
            const data =  await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
            if (!invoice.customer) setInvoice({...invoice,customer: data[0].id});
        }catch(error){
            toast.error("Une erreur est survenue");
            history.replace('/invoices');
        }
    }

    //Récupération de la liste des clients au chargement
    useEffect(() => {
        fetchCustomers();
    }, [])

    //Récupération de la facture
    const fetchInvoice = async id =>{
        try{
            const data = await InvoicesAPI.findOneInvoice(id);
            const {amount, status, customer} = data;          
            setInvoice({amount, status, customer: customer.id});
            setLoading(false);

        }catch(error){
            toast.error("Une erreur est survenue");
            history.replace('/invoices')
        }
    }

    //Récupération de la bonne fature grâce à l'ID de l'URL
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);




      //Changement des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        
        try{
            if (editing){
               await InvoicesAPI.updateInvoice(id, invoice);
               toast.success("La facture a bien été modifiée");
             }else{
                await InvoicesAPI.createInvoice(invoice);
                toast.success("La facture a bien été enregistrée");
                history.replace("/invoices");
            }
         
        }catch({response}){
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
                setErrors(apiErrors); 
                toast.error("Des erreurs dans votre formulaire");
                console.log(errors);
            }
        }
    }


    return ( 
        <>
       
            {editing && <h1>Modification d'une facture</h1> ||<h1>Création d'une facture</h1>}
            {loading && <FormContentloader/>}

            {!loading && 
            <form onSubmit={handleSubmit}>
                <Field 
                name="amount" 
                type="number" 
                placeholder="Montant de la facture" 
                label="Montant" 
                onChange={handleChange}
                value={invoice.amount}
                error={errors.amount}
                />
                <Select 
                name="customer" 
                label="Client" 
                value={invoice.customer} 
                error={errors.customer}
                onChange={handleChange}>
                {customers.map(customer => 
                    <option key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName}
                    </option>
                )}
                </Select>
                <Select 
                name="status" 
                label="Statut" 
                value={invoice.status} 
                error={errors.status}
                onChange={handleChange}>
                        <option value="SENT">Envoyée</option>
                        <option value="PAID">Payée</option>
                        <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour</Link>
                </div>
            </form>}
            
        </>
     );
}
 
export default InvoicePage;