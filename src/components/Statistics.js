import {API_URL} from '../constants';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash';


function Statistics(){
    const [activity, setActivity] = useState([]);

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
            statActivity(data.content);
        })
        .catch(err => console.error(err))
    }

    //function to groupe activities by activity and make the average duration
    const statActivity = (trainings) => {
        let grouped = _.groupBy(trainings, 'activity');
        let result = [];
        //we are going to make a loop to get all the activities
        for(let key in grouped){
            let sum = 0;
            //we are going to make a loop to get all the durations
            for(let i = 0; i < grouped[key].length; i++){
                sum += grouped[key][i].duration;
            }
            //we are going to add the activity and the average duration to the result
            result.push({activity: key, duration: sum / grouped[key].length});
        }
        setActivity(result);
        console.log(result);
    }

    return (
        <div style={{marginLeft:"20%"}}>
            <BarChart
                width={700}
                height={500}
                data={activity}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis label={{value:"Duration (min)", position:"insideLeft", angle:-90}} dataKey="duration"/>
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
export default Statistics;