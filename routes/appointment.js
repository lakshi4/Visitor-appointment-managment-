const router = require("express").Router();

let Appointment = require("../models/Appointment");
//let nextAppointmentId = 1;

router.route("/add").post((req,res)=>{
  
    const name = req.body.name;
    const email = req.body.email;
    const phone_number = Number(req.body.phone_number);
    const group_individual = req.body.group_individual; 
    const date = Date(req.body.date);
   
     //const AppointmentId = nextAppointmentId++;

    const newAppointment = new Appointment({
        name,
        email,
        phone_number,
        group_individual,
        date
       
    })

    newAppointment.save().then(()=>{
        res.json("Data Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    Appointment.find().then((appointments)=>{
        res.json(appointments); // Assuming appointments is an array of appointment objects
    }).catch((err)=>{
        console.log(err);
        res.status(500).send('Error fetching appointments');
    });
});


router.route("/update/:appointmentID").put(async (req,res)=>{
    let appointmentID = req.params.appointmentID;
    const {name,email,phone_number,group_individual,date} = req.body;

    const updateAppointment = {
        name,
        email,
        phone_number,
        group_individual,
        date
    }

    const update = await Appointment.findByIdAndUpdate(appointmentID, updateAppointment).then(()=>{
        res.status(200).send({status : "Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data...",error: err.message});
    })
})

router.route("/delete/:appointmentID").delete(async (req,res)=>{
     let appointmentID = req.params.appointmentID;

     await Appointment.findByIdAndDelete(appointmentID).then(()=>{
        res.status(200).send({status: "Data deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data...",error: err.message});
     })
})

router.get('/viewappointment/:appointmentID', async (req, res) => {
  const appointmentID = req.params.appointmentID;

  try {
    const appointmentDoc = await Appointment.findOne({ _id: appointmentID });

    if (!appointmentDoc) {
      return res.status(404).send({ error: 'Appointment not found' });
    }

    res.status(200).send(appointmentDoc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error:`An error occurred while fetching appointment: ${err.message}`,
    });
  }
});

  
  router.put('/update/:appointmentID', async (req, res) => {
    const requestedappointmentID = req.params.appointmentID;
  
    try {
      const {
        name,
        email,
        phone_number,
        group_individual,
        date
      } = req.body;
  
      
      const updatedAppointment = await Appointment.findOneAndUpdate(
        { appointmentID: requestedappointmentID },
        {
            name,
            email,
            phone_number,
            group_individual,
            date: new Date(date),
        },
        { new: true } 
      );
  
      
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;