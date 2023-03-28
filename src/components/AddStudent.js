import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddCourse from './AddCourse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Admin from './Admin.js';


class AddStudent extends Component {
    constructor(props) {
    super(props);
    this.state = {open: false, student_name:"", student_email:"", message:""};
  };
  
  handleClickOpen = () => {
    this.setState( {open:true} );
  };

  handleClose = () => {
    this.setState( {open:false, student_name:"", student_email:"", message:""} );
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

// Save student and close modal form 
//THIS IS WHERE THE POST GOES!
  handleAdd = () => {
     const token = Cookies.get('XSRF-TOKEN');
     let rc=0;
     fetch(`${SERVER_URL}/addStudent`,
     {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 
    'X-XSRF-TOKEN': token }, 
    body: JSON.stringify(
      {student_name: this.state.name, student_email:this.state.email})
     } )
    .then((response => {
      rc = response.status;
      return response.json();
    }))
    .then((response)=> {
      if(response.id){
        this.setState({id: response.id, message: "Student id="+response.id});

      }
      else{
        this.setState({message: "Add failed. Email already exists. rc="+rc});
      }
    })
    .catch(err => {
      this.setState({message: "Add failed. "+err});
    }
   )
 }
   

render()  { 
  return (
      <div>
        <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >

              <TextField autoFocus fullWidth label="Student Name" name="name" onChange={this.handleChange}  /> 
              <h3>{this.state.message}</h3>
              <TextField autoFocus fullWidth label="Student Email" name="email" onChange={this.handleChange}  /> 
            </DialogContent>
            <DialogActions>
             <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
              <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
             </DialogActions>
           </Dialog>      
      </div>
    ); 
  }
}

// required property:  addStudent is a function to call to perform the Add action
//AddStudent.propTypes = {
 //addStudent : PropTypes.func.isRequired
//}

export default AddStudent;