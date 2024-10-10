import axios from 'axios';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';





function EditAppointment() {
  const { appointmentID } = useParams();

  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    phone_number: '',
    group_individual: '',
    date: '',
  });
  

  useEffect(() => {
    console.log("appointmentID:", appointmentID);
    axios
      .get(`http://localhost:8070/appointment/viewappointment/${appointmentID}`)
      .then((response) => {
        console.log("Fetched appointment data:", response.data);
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Appointment:', error);
      });
  }, [appointmentID]);
  
  

  function sendData(e) {
    e.preventDefault();
    axios
    .put(`http://localhost:8070/appointment/update/${appointmentID}`, appointment)
      .then(() => {
        alert('Appointment updated successfully');
      })
      .catch((err) => {
        console.error('Error updating Appointment:', err);
        alert('Failed to update Appointment');
      });
  }

  return (
    <div className="container" style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" ,minWidth:"230vh"}}>
        
    <form onSubmit={sendData} style={{ width: "50%", border: "2px solid green", padding: "20px", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
    <h2>Edit Appointment</h2>
    <div className="mb-3">
        <label htmlFor="name" className="form-label"><h6>Name</h6></label>
        <input type="text" className="form-control" id="name" 
        value={appointment.name}
        onChange={(e)=>{
            setAppointment({...appointment,name:e.target.value}  );
        }} />
      
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label"><h6>Email address</h6></label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
        value={appointment.email}
        onChange={(e)=>{
            setAppointment({...appointment,email:e.target.value}  );
        }}  />
      
    </div>
    <div className="mb-3">
        <label htmlFor="phone_number" className="form-label"><h6>Phone Number</h6></label>
        <input type="text" className="form-control" id="phone_number" 
        value={appointment.phone_number} 
        onChange={(e)=>{
            setAppointment({...appointment,phone_number:e.target.value}  );
        }}  />
      
    </div>

    <div className="form-check form-check-inline">
                <span className="title"><h6>Group or Individual</h6></span>
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Group"
                    checked={appointment.group_individual === "Group"}
                    onChange={(e) =>{ setAppointment({...appointment,group_individual:e.target.value}  );}}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">Group</label><br />
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Individual"
                    checked={appointment.group_individual === "Individual"}
                    onChange={(e) =>{  setAppointment({...appointment,group_individual:e.target.value}  );}}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Individual</label>
            </div>
     <div className="mb-3">
      <label htmlFor="exampledate" className="form-label"><h6>Date</h6></label>
      <input className="form-control" type="date" placeholder="Enter Date" aria-label="default input example" 
      value={appointment.date} 
      onChange={(e)=>{
        setAppointment({...appointment,date:e.target.value}  );
    }} />
      </div>

    <button type="submit" className="btn btn-primary">Edit</button>
    </form>
    </div>
  );
}

export default EditAppointment;