import axios from "axios";

function findAll(){

    return axios
            .get("https://127.0.0.1:8000/api/customers")
            .then(response => response.data['hydra:member']);
}

function findOne(id){
   return axios
    .get("https://127.0.0.1:8000/api/customers/" + id)
    .then(response => response.data) 

}
function deleteCustomer(id){
    axios
    .delete("https://127.0.0.1:8000/api/customers/" + id);
}
function updateCustomer(){
    return axios
        .put("https://127.0.0.1:8000/api/customers/" + id, customer);
}
function createCustomer(customer){
    return axios
        .post("https://127.0.0.1:8000/api/customers", customer);
}

export default{
    findAll,
    delete : deleteCustomer,
    findOne,
    updateCustomer,
    createCustomer

};