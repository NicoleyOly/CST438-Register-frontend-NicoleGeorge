import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import StudentList from './StudentList.js';
import Admin from './Admin.js';
import AddStudent from './AddStudent.js';

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1 };
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ]
      //const icolumn = [
        //{
         // field: 'id',
          //headerName: 'Name',
          //width: 200,
          //rednerCel: (params) => (
           // <div>
             // value={params.row.id}
              //color="default"
              //size="small"
             // {StudentList[params.row.id].name}

            //</div>
          //)
        //},
        //{ field: 'name2', headerName: 'Name', width: 200 }
      //]
      ;       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - Select a Term
               </Typography>
            </Toolbar>
         </AppBar>


         <AppBar position="static" color="default">
          <Toolbar> 
            <Button component={Link}
            to={{pathname:'/addStudent', }} variant="outlined" color="primary" style={{margin: 10}}>
              Add Student
            </Button>
          </Toolbar>
         </AppBar>


         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
          </div>
      </div>
    )
  }
}
export default Semester;