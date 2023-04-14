import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button/Button";
import { Box } from "@mui/material";

function Menu() {
    return (
        <AppBar position="static">
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

                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" >
                            Home
                        </Typography>
                    </Box>
                </Box>


                <Box display="flex" justifyContent="start">

                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" >
                            Postagens
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="start">

                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" >
                            Temas
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="start">

                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" >
                            Cadastrar Tema
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="start">

                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" >
                            Logout
                        </Typography>
                    </Box>
                </Box>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

    );
}

export default Menu;
