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
import AddStudent from './AddStudent.js';

class Admin extends Component{
    render(){
        return(
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Administrative Functions
                         </Typography>
                     </Toolbar>
                </AppBar>
                <div align = "left">
                    <AddStudent />
                </div>
            </div>
        )
    }
}
export default Admin;
