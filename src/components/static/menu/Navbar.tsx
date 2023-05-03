import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button/Button";
import { Box } from "@mui/material";
import {Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import {toast} from 'react-toastify';

import HomeIcon from '@mui/icons-material/Home';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    const dispatch = useDispatch();

    let navigate = useNavigate();

    function goLogout(){
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
            progress: undefined,
        });
        navigate('/login')
    }

    var navbarComponent;
    if(token != ""){
        navbarComponent = <AppBar position="static" className="menu">
        <Toolbar variant="dense" >

            <Box display="flex" justifyContent="start">
            <Link to="/home" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <HomeIcon className='icons-home'/>
                </Box>
            </Link>    
            </Box>
            

            <Box display="flex" justifyContent="start">
            <Link to="/contato" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <MailOutlineIcon className='icons-home'/>
                </Box>
            </Link>
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to="/contato" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <HelpOutlineIcon className='icons-home'/>
                </Box>
            </Link>    
            </Box>

            <Box display="flex" justifyContent="start" onClick={goLogout}>
            
                <Box mx={1} className='cursor'>
                    <LogoutIcon className='icons-home'/>
                </Box>
                
            </Box>

        </Toolbar>
    </AppBar >
    }
    return (
        <>
        {navbarComponent}
        </>
    );
}

export default Navbar;
