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
import AddStudent from './AddStudent';


class StudentList extends Component {
    constructor(props) {
      super(props);
      this.state = { students: [] }; //empty students right now
    } 
    
    componentDidMount() {
      this.fetchStudents();
    }
    
    fetchStudents = () => {
      console.log("StudentList.fetchStudents");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/addStudent?studentEmail=${this.props.location.email}&studentName=${this.props.location.name}`, 
        {  
          method: 'GET', 
          headers: { 'X-XSRF-TOKEN': token }
        } )
      .then((response) => {
        console.log("FETCH RESP:"+response);
        return response.json();}) 
      .then((responseData) => { 
        // do a sanity check on response
        if (Array.isArray(responseData.courses)) {
          this.setState({ 
            courses: responseData.courses,
          });
        } else {
          toast.error("Fetch failed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
        }        
      })
      .catch(err => {
        toast.error("Fetch failed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err); 
      })
    }
  
    // Drop Course 
   // onDelClick = (id) => {
    //  if (window.confirm('Are you sure you want to drop the course?')) {
    //  const token = Cookies.get('XSRF-TOKEN');
        
    //    fetch(`${SERVER_URL}/schedule/${id}`,
      //    {
       //     method: 'DELETE',
        //    headers: { 'X-XSRF-TOKEN': token }
         // })
      //.then(res => {
        //  if (res.ok) {
          //  toast.success("Course successfully dropped", {
            //    position: toast.POSITION.BOTTOM_LEFT
           // });
        //    this.fetchCourses();
          //} else {
           // toast.error("Course drop failed", {
            //    position: toast.POSITION.BOTTOM_LEFT
            //});
           // console.error('Delete http status =' + res.status);
     // }})
       // .catch(err => {
    // toast.error("Course drop failed", {
      //          position: toast.POSITION.BOTTOM_LEFT
        //  });
          //console.error(err);
       // }) 
// } 
  //  }
  
    // Add student
    addStudent = (student) => {
      const token = Cookies.get('XSRF-TOKEN');
   
      fetch(`${SERVER_URL}/addStudent?studentEmail=${this.props.location.email}&studentName=${this.props.location.name}`,
        { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json',
                     'X-XSRF-TOKEN': token  }, 
          body: JSON.stringify(student)
        })
      .then(res => {
          if (res.ok) {
            toast.success("Student successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchStudents();
          } else {
            toast.error("Error when adding", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
      .catch(err => {
        toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
      })
    } 
  
    render() {
       const columns = [
        { field: 'studentName', headerName: 'Name', width: 400 },
        { field: 'studentEmail', headerName: 'Email', width: 125 },
        {
          field: 'id',
          headerName: '  ',
          sortable: false,
          width: 200,
          renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }} 
                onClick={()=>{this.onDelClick(params.value)}}
              >
                Delete Student
              </Button>
          )
        }
        ];
    
    return(
        <div>
            <AppBar position="static" color="default">
              <Toolbar>
                 <Typography variant="h6" color="inherit">
                    { 'Student ' + this.props.studentName + ' ' +this.props.studentEmail }
                  </Typography>
              </Toolbar>
            </AppBar>
            <div className="App">
              <div style={{width:'100%'}}>
                  For DEBUG:  display state.
                  {JSON.stringify(this.state)}
              </div>
              <Grid container>
                <Grid item>
                  <ButtonGroup>
                    <AddStudent addStudent={this.addStudent}  />
                  </ButtonGroup>
                </Grid>
              </Grid>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={this.state.courses} columns={columns} />
              </div>
              <ToastContainer autoClose={1500} />   
            </div>
        </div>
        ); 
    }
  }
  
  export default StudentList;