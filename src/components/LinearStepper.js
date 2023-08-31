
import React, { useState } from "react";
import {db , ref , set} from './firebase';

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },

}));

const patientID = '7812abc';
function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
  ];
}

function GetStepContent(step) {
    const [FirstName,setFirstName] =useState("");
    const [LastName,setLastName] =useState("");
    const [MarriedStatus,setMarriedStatus] =useState("");
    const[PhoneNumber,setPhoneNumber]=useState("");
    const [Address,setAdress] =useState("");
    const[State1,setState1 ]=useState("");

       const postdb = (e)=>{
      if(e.target.value!==""){
      set(ref(db, 'users/' + patientID), {
        firstName : FirstName,
        lastName : LastName,
        MarriedStatus:MarriedStatus,
        PhoneNumber: PhoneNumber,
        Address: Address,
        State1:State1,
      })
      .then(() => {
        console.log("Posted Succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    }
  
  switch (step) {
    case 0:
      return (
        <>
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name" 
            fullWidth
            margin="normal"
            name="firstName"
            value={FirstName} onChange={(e)=> setFirstName(e.target.value)} onBlur = {(e)=> postdb(e)}
            required 
          />
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            name="lastName"
            value={LastName} onChange={(e)=> setLastName(e.target.value)} onBlur = {(e)=> postdb(e)}
            required 
          />
        </>
      );

    case 1:
      return (
        <>
          <TextField
            id="married"
            label="Enter Your Married Status"
            variant="outlined"
            placeholder="Married Status"
            fullWidth
            margin="normal"
            name="MarriedStatus"   
            value={MarriedStatus} onChange={(e)=> setMarriedStatus(e.target.value)} onBlur = {(e)=> postdb(e)} 
            required
          />
          <TextField
            id="phoneNumber"
            label="PhoneNumber"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            name="PhoneNumber"
            value={PhoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} onBlur = {(e)=> postdb(e)} 
            required
          />
        </>
      );
    case 2:
      return (
        <>
          <TextField
            id="Address"
            label="Address "
            variant="outlined"
            placeholder="Enter Your Address "
            fullWidth
            margin="normal"
            name="Address"
            value={Address} onChange={(e)=> setAdress(e.target.value)} onBlur = {(e)=> postdb(e)} 
            required
          />
          <TextField
            id="State1"
            label="State1"
            variant="outlined"
            placeholder="Enter Your State Name"
            fullWidth
            margin="normal"
            name="State1"
            value={State1} onChange={(e)=> setState1(e.target.value)} onBlur = {(e)=> postdb(e)}
            required
          />
        </>
      );
    default:
      return <>Thank You</>
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

        <>
          <form>{GetStepContent(activeStep)}</form>
          <Button
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            back
          </Button> 
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
    </div>
  );
};

export default LinaerStepper;
