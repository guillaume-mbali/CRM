import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import moment from "moment";
import InvoicesAPI from "../services/invoicesAPI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';


const STATUS_CLASSES = {
    PAID: "check",
    CANCELLED: 'times',
    SENT:"paper-plane"
}
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED : "Annulée"
}
const InvoicesPage = (props) => {

    
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const[loading, setLoading] = useState(true);
  

    // Permet d'aller récupérer les factures
    const fetchInvoices = async () => {
      try{
        const data = await InvoicesAPI.findAll();
        setInvoices(data);
        setLoading(false);
      }catch (error){
        toast.error("Erreur lors du chargement des factures");
      }
    };

    // Au chargement du composant, on va chercher les factures
    useEffect(() => {
        fetchInvoices();
    }, []);

    //Gestion de la suppression
    const handleDelete = async id => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try{
           await InvoicesAPI.delete(id);
           toast.success("La facture a bien été supprimée");
        }catch (error){
            setInvoices(originalInvoices);
            toast.error("Une erreur est survenue");
        }
    }
      // Gestion du changement de page 
      const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // Gestion de la recherche
    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }

    //Filtrage des invoices en fonction de la recherche
    const filteredInvoices = invoices.filter(
        i => 
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) || 
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) 
    );

    //Gestion de la pagination
    const itemsPerPage = 10;
    const paginatedInvoices = Pagination.getData(filteredInvoices,currentPage, itemsPerPage);

    //Gestion du format de date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');


    return ( 
        <>
         
            <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des factures</h1>
            <Link className="btn btn-primary" to="/invoices/new">Créer une facture</Link>
            </div>
            
            <div className="row">
                <div className="col-sm">
                    <div className="form-group">
                        <input className="form-control" onChange={handleSearch} value={search} placeholder="Rechercher..."/>
                    </div>
                </div>
                <div className="col-sm">   
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Montant</th>
                        <th className="text-center">Statut</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && 
                <tbody>
                    {paginatedInvoices.map(invoice =>
                            <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td><Link to={"/customers/" + invoice.customer.id}>{invoice.customer.firstName} {invoice.customer.lastName}</Link></td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                            <td className="text-center"><FontAwesomeIcon icon={STATUS_CLASSES[invoice.status]}/><p>{STATUS_LABELS[invoice.status]}</p></td>
                            <td>
                                <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                            </td>
                        </tr>
                        
                    )}
                
                </tbody>
                }
            </table>
            {loading && <TableLoader/>}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} 
            length={filteredInvoices.length}/>
        </>
     );
}
 
export default InvoicesPage;