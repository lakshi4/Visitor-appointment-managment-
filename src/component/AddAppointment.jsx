
// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from "react"
import axios from "axios";
import "../App.css";


export default function AddAppointment(){

    
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[phone_number,setphone_number]=useState("");
    const[group_individual,setgroup_individual]=useState("");
    const[date,setdate]=useState("");

    function sendData(e) {
        e.preventDefault();
       
        const newAppointment={
            name,
            email,
            phone_number,
            group_individual,
            date
           
        }
        axios.post("http://localhost:8070/appointment/add",newAppointment).then(()=>{
            alert("Appointment add")
            setname("");
            setemail("");
            setphone_number("");
            setgroup_individual("");
            setdate("");
        }).catch((err)=>{
            alert(err)
        });
    }




return(
   
    <div className="container" style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" ,minWidth:"230vh"}}>

      <form onSubmit={sendData} style={{ width: "50%", border: "2px solid green", padding: "20px", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <h2>Book Appointment</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label"><h6>Name</h6></label>
                <input type="text" className="form-control" id="name" 
                onChange={(e)=>{
                    setname(e.target.value);
                }}required />
            
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"><h6>Email address</h6></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                onChange={(e)=>{
                    setemail(e.target.value);
                }} required />
            
            </div>
            <div className="mb-3">
                <label htmlFor="phone_number" className="form-label"><h6>Phone Number</h6></label>
                <input type="text" className="form-control" id="phone_number"  
                onChange={(e)=>{
                    setphone_number(e.target.value);
                }} required />
            
            </div>
        
            <div className="form-check form-check-inline">
                        <span className="title"><h6>Group or Individual</h6></span>
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Group"
                            checked={group_individual === "Group"}
                            onChange={(e) =>{setgroup_individual(e.target.value)}}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">Group</label><br />
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Individual"
                            checked={group_individual === "Individual"}
                            onChange={(e) =>{ setgroup_individual(e.target.value)}}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">Individual</label>
                    </div>
            <div className="mb-3">
            <label htmlFor="exampledate" className="form-label"><h6>Date</h6></label>
            <input className="form-control" type="date" placeholder="Enter Date" aria-label="default input example" value={date}
            onChange={(e)=>{
                setdate(e.target.value);
            }} required/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div> 
    
  )
}  

 