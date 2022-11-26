import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {API_URL} from '../constants';
import React, { useState, useEffect } from 'react';
//import stylesheets for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);
  const localizer = momentLocalizer(moment)

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

        for(let i = 0; i < data.content.length; i++){
            console.log(data.content[i].links[2].href);
            fetch(data.content[i].links[2].href)
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
                data.content[i].date = new Date(data.content[i].date);
            })
            .catch(err => console.error(err))
        }
        setTrainings(data.content);
        console.log(data.content);
    })
    .catch(err => console.error(err))
}


  return (
    <div>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="date"
        titleAccessor={
          (event) =>  event.activity + " / " + event.customer
        }
        endAccessor={event => moment(event.date).add(event.duration, 'minutes').toDate()}
        style={{ height: 500 }}
      />
    </div>
  )
}
export default TrainingCalendar