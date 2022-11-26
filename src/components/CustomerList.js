import React, { useEffect, useState } from 'react'
import {API_URL} from '../constants';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment} from '@mui/material';
import EditCustomer from './EditCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTraining from './AddTraining';
import AddCustomer from './AddCustomer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';




function CustomerList(){
    const [customer, setCustomer] = useState([]);
    const [search, setSearch] = useState('');
    const [infoGrid, setInfoGrid] = useState(null);
    
    const [columnDefs] = useState([
        {  
            cellRenderer : params => <IconButton color='error' onClick={()=> deleteCustomer(params.data)}><DeleteIcon/></IconButton>, 
            headerName: 'Actions', width: 100
        },
        {cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />, width: 70},
        {cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />, width: 160},
        {field: 'firstname', headerName: "First name", sortable: true, filter: true, width: 130},
        {field: 'lastname',  headerName: "Last name", sortable: true, filter: true, width: 130},
        {field: 'email',  headerName: "Email", sortable: true, filter: true, width: 200},
        {field: 'phone',  headerName: "Phone", sortable: true, filter: true, width: 150},
        {field: 'streetaddress',  headerName: "Address", sortable: true, filter: true, width: 200},
        {field: 'postcode',  headerName: "Postcode", sortable: true, filter: true, width: 130},
        {field: 'city',  headerName: "City", sortable: true, filter: true, width: 150},     
    ]);

    useEffect(() => {
        getCustomers();
    },[])

    //when this function is called, it creat the api for grid
    const onGridReady = (params) => {
        setInfoGrid(params.api);
    };

    //function to export the data to csv whit the filds that we want
    const gridExport = () => {
        const params = {columnKeys: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city']};
        infoGrid.exportDataAsCsv(params);
    };

    const getCustomers = () => {
        //Fetch customers from API
        fetch(API_URL + '/customers')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Something went wrong in fetch');
            })
        .then(data => 
            setCustomer(data.content))
        
        .catch(err =>console.error(err))
    };

    //function to search the customers by name or lastname
    const filterCust = customer.filter((cust) => { 
        return cust.firstname.toLowerCase().includes(search.toLowerCase())|| 
        cust.lastname.toLowerCase().includes(search.toLowerCase())
    });
       
    //function to add a new customer
    const addCustomer = (customer) =>{
        fetch(API_URL + '/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(customer) //converts the customer that we want to creat to json
        })
        .then(response => {
            if(response.ok)
                getCustomers();
            else
                alert('Something went wrong in adding a customer');
        })
        .catch(err => console.error(err))
    }

    //function to update a customer with the new data that the user has entered and the url of the customer that we want to update
    const updateCustomer = (customer, url) => {
        fetch(url,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok)
                getCustomers();
            else
                alert('Something went wrong in updating a customer');
        })
        .catch(err => console.error(err))
    }
    
    //function to add a new training to a customer 
    const addTraining = (training) => {
        fetch(API_URL + '/trainings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if(response.ok)
                getCustomers();
            else
                alert('Something went wrong in adding a training');
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (data) => {
        if(window.confirm("Are you sure ?")){
            fetch(data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if(response.ok)
                    getCustomers();
                else
                    alert('Something went wrong in deletion')
            })
        }
    }

    return(
        <div>
            <div style={{fontSize:19, marginTop:"20px", marginBottom:"-30px", marginRight:"82%"}}>Customers</div>
            <div style={{marginTop:"0px", marginBottom:"-55px", marginLeft:"60%"}}>
            <TextField
                value = {search}
                placeholder="Search"
                onChange={e => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                }}
                variant="standard"
            />
            </div>
            <div style={{margin: "20px", marginLeft:"81.5%"}}>
                <AddCustomer addCustomer={addCustomer}/>
            </div>
            <div style={{marginTop: "-60px", marginLeft:"89%"}}>
                <IconButton  onClick={gridExport}><FileDownloadIcon/></IconButton>
            </div>
            <div className='ag-theme-material' style={{height: 600, width: '90%', margin:'auto', fontSize:'20'}}>               
                <AgGridReact
                    rowData={filterCust}
                    columnDefs={columnDefs}
                    onGridReady={(params) => onGridReady(params)}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default CustomerList;