import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import './Footer.css'

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='container-footer'>

                <Grid alignItems="center" item xs={12}>
                    <Box>

                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom className='texto-footer'>Siga-nos em nossas sociais:</Typography>
                        </Box>

                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography>
                                  <Link href='https://linktr.ee/refugiomental' target="_blank" className='link'><img src="https://raw.githubusercontent.com/soroushchehresa/github-readme-linkedin/master/linkedin-github.png" alt="" className='imgs-footer'/></Link>  
                            </Typography>
                        </Box>

                        <Box className='text-decorator-none'>
                            <Typography variant="subtitle2" gutterBottom className='texto-footer-2' align="center" >Desenvolvido por Lucas, Gabriela, Maria e Julia</Typography>
                        </Box>

                    </Box>
                </Grid>

            </Grid>
        </>
    );
}

export default Footer;