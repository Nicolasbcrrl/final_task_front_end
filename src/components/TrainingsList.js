import React, { useEffect, useState } from 'react'
import {API_URL} from '../constants';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';


function TrainingsList(){
    const [trainings, setTrainings] = useState([]);
    const [search, setSearch] = useState('');

    const [columnDefs] = useState([
        {cellRenderer: 
            params => <IconButton color='error' onClick={()=> deleteTraining(params.data)}><DeleteIcon/></IconButton>, 
            headerName: 'Actions', width: 250
        },
        {field: "activity", headerName: "Activity", sortable: true, filter: true, width: 300},
        {field: "date", headerName: "Date", sortable: true, filter: true, width: 300}, 
        {field: "duration", headerName: "Duration (min)", sortable: true, filter:true, width: 300},
        {field: "customer", headerName: "Customer", sortable: true, filter: true, width: 300},
    ]);

    useEffect(()=>{
        getTrainings();
    },[]);

    const getTrainings = () => {
        fetch(API_URL + '/trainings')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Something went wrong in fetch');
        })
        //data contains all the trainings
        .then(data => {
            //we are going to make a loop to get all the customers by trainings
            (async () => {
                for(let i = 0; i < data.content.length; i++){
                    console.log(data.content[i].links[2].href);
                    await fetch(data.content[i].links[2].href)
                    .then(response => {
                        if(response.ok)
                            return response.json();
                        else
                            alert('Something went wrong in fetch');
                    })
                    //cust contains the customer of the training
                    .then(cust => {
                        //we are going to add the customer to the training
                        data.content[i].customer = cust.firstname + " " + cust.lastname;
                        //change the format of the date
                        data.content[i].date = format(new Date(data.content[i].date), 'dd.MM.yyyy HH:mm');
                    })
                    .catch(err => console.error(err))
                }
                setTrainings(data.content);
            })();
            
        })
        .catch(err => console.error(err))
    }
    //function to search a training by activity
    const filterTraining = trainings.filter((train) => { 
        return train.activity.toLowerCase().includes(search.toLowerCase())});

    const deleteTraining = (training) => {
        if(window.confirm('Are you sure ?'))
        {
            fetch(training.links[0].href, {method: 'DELETE'})
            .then(response => {
                if(response.ok)
                    getTrainings();
                else
                    alert('Something went wrong in fetch');
            })
        }
    }

    return(
        <div>
            <div style={{fontSize:19, marginTop:"20px", marginBottom:"-30px",marginRight:"83%"}}>
                Trainings
            </div>
            <div style={{marginTop:"0px",marginLeft:"73%"}}>
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
            <div className='ag-theme-material' style={{height: 600, width: '90%', margin:'auto'}}>
                <AgGridReact
                rowData={filterTraining}
                columnDefs={columnDefs}
                pagination = {true}
                paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
        </div>
    );
}
export default TrainingsList;