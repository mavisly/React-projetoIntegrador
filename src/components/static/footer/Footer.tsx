import React from 'react';

import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';

import './Footer.css'

function Footer(){
    return(
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='container-footer'>

                <Grid alignItems="center" item xs={12}>
                    <Box>
                        
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                                <Typography variant="h5" align="center" gutterBottom className='texto-footer'>Siga-nos nas redes sociais</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <a href="https://www.instagram.com/" target="_blank">
                            <InstagramIcon className='icons-footer' />
                            </a>
                            
                            <a href="https://www.linkedin.com/">
                            <LinkedInIcon className='icons-footer' />
                            </a>
                        </Box>

                        <Box paddingTop={1}>
                            <Typography variant="subtitle2" align="center" gutterBottom className='texto-footer'>
                                © 2023 Copyright:
                            </Typography>
                        </Box>

                        <Box className='text-decorator-none'>
                            <Typography variant="subtitle2" gutterBottom className='texto-footer' align="center">Gabriela, Maria, Lucas</Typography>                      
                        </Box>

                    </Box>
                </Grid>

            </Grid>
        </>
    );
}

export default Footer;