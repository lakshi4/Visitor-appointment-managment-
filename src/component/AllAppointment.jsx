// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function AllAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        function getAppointment() {
            axios.get("http://localhost:8070/appointment/")
                .then((res) => {
                    setAppointments(res.data);
                    console.log("appointments:", res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    
        getAppointment();
    }, []);
    // eslint-disable-next-line no-unused-vars
    const handleEdit = (appointmentID) => {
        // Redirect to the update page with the appointment ID as a URL parameter
        history.push(`http://localhost:8070/update/${appointmentID}`);
    };


    const handleDelete = (appointmentID) => {
        axios.delete(`http://localhost:8070/appointment/delete/${appointmentID}`)
            .then(() => {
                // Remove the deleted appointment from the local state
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentID));
                alert("Appointment deleted successfully.");
            })
            .catch((err) => {
                alert("Failed to delete appointment. Error: " + err.message);
            });
    };

    const handleSearch = (e) => {
        const query = e.target.value.trim().toLowerCase();

        const filtered = appointments.filter(appointment =>
            appointment.name.toLowerCase().includes(query) ||
            appointment.email.toLowerCase().includes(query) ||
            appointment.phone_number.toString().includes(query) || // Convert phone_number to string for comparison
            appointment.group_individual.toLowerCase().includes(query) ||
            appointment.date.toLowerCase().includes(query)
        );
        setFilteredAppointments(filtered);
        setSearchQuery(query); // Update searchQuery state
    };

    const generatePDF = () => {
        // Convert the appointments table to canvas
        html2canvas(document.querySelector("#appointments-table")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Set PDF dimensions and create new PDF
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth * 0.9; // Adjust as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = (pdfWidth - imgWidth) / 4;
        const y = (pdfHeight - imgHeight) /8;

        // Add image of the appointments table to the PDF
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            
            // Save the PDF
            pdf.save("appointments_report.pdf");
        });
    };

    
    
    return (
        <div className="container" style={{ backgroundColor: "white",  alignItems: "center", minHeight: "100vh" ,minWidth:"219vh",}}>
            <h2><b>All Appointments</b></h2>
            <div className="mb-3" style={{ width: "60%", border: "01px solid green",alignItems: "center", padding: "05px", borderRadius: "10px",marginTop:"10px"}}>
                <input 
                     type="text"
                     className="form-control"
                     placeholder="Search appointments..."
                     value={searchQuery}
                     onChange={handleSearch}
                />
                 
            </div>
            <button onClick={generatePDF} style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", padding: '10px', border: '1px solid black',borderRadius: "10px"} }>Generate PDF</button>
            <div>
            <table  id="appointments-table"  className="table" style={{ width: "95%", border: "2px solid green", padding: "10px", borderRadius: "50px", backgroundColor: "rgba(255, 255, 255, 0.4)" ,marginTop:"10px"}}>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Group/Individual</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
             {searchQuery === "" ? appointments.map((appointment) => (
                 <tr key={appointment.appointmentID}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.phone_number}</td>
                <td>{appointment.group_individual}</td>
                <td>{appointment.date}</td>
                <td>
                <Link to={`/update/${appointment._id}`} className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>Delete</button>
            </td>
        </tr>
    )) : filteredAppointments.map((appointment) => (
        <tr key={appointment.appointmentID} >
            <td>{appointment.name}</td>
            <td>{appointment.email}</td>
            <td>{appointment.phone_number}</td>
            <td>{appointment.group_individual}</td>
            <td>{appointment.date}</td>
            <td>
                <Link to={`/update/${appointment._id}`} className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>

            </table>
            </div>
        </div>
    );
}

export default AllAppointment;
