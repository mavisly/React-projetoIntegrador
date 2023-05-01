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
        navbarComponent = <AppBar position="static" style={{ background: 'rgb(46,154,255' }}>
        <Toolbar variant="dense">
            <IconButton edge="start" className="menuButton" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Box className='cursor'>
                <Typography variant="h5" color="inherit" >
                    Refúgio Mental
                </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to="/home" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit" style={{color:'white'}}>
                        Home
                    </Typography>
                </Box>
            </Link>    
            </Box>
            

            <Box display="flex" justifyContent="start">
            <Link to="/posts" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit" style={{color:'white'}}>
                        Postagens
                    </Typography>
                </Box>
            </Link>
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to="/temas" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit" style={{color:'white'}}>
                        Temas
                    </Typography>
                </Box>
            </Link>    
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit" style={{color:'white'}}>
                        Cadastrar Tema
                    </Typography>
                </Box>
            </Link>    
            </Box>

            <Box display="flex" justifyContent="start" onClick={goLogout}>

                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit" style={{color:'white', cursor:'pointer'}}>
                        Logout
                    </Typography>
                </Box>
            </Box>

                <Button color="inherit">Login</Button>
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
