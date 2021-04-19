import axios from "axios";

function findAll(){

    return axios
            .get("https://127.0.0.1:8000/api/invoices")
            .then(response => response.data['hydra:member']);
}

function deleteInvoice(id){
    axios
    .delete("https://127.0.0.1:8000/api/invoices/" + id);
}
function findOneInvoice(id){
    return axios
                .get("https://127.0.0.1:8000/api/invoices/" + id)
                .then(response =>response.data);
}
function updateInvoice(id, invoice){
    return axios.put("https://127.0.0.1:8000/api/invoices/" + id, 
    { ...invoice, amount:Number(invoice.amount), customer:'/api/customers/' + invoice.customer}); 

}
function createInvoice(invoice){
    return axios.post("https://127.0.0.1:8000/api/invoices", 
                { ...invoice, amount:Number(invoice.amount), customer:'/api/customers/' + invoice.customer}); 
               
}

export default{
    findAll,
    delete : deleteInvoice,
    findOneInvoice,
    updateInvoice,
    createInvoice
};