import React from 'react';
import { Typography, Grid, TableCell, TableFooter, GridList } from '@material-ui/core';
import { Box, Button, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, Table, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import './Footer.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { AddLocation, Drafts } from '@mui/icons-material';

function Footer() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;
    if (token != '') {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center" className='container-footer'>


            <Grid item xs={4}>

                <Box paddingLeft={1} paddingBottom={10} display="flex" flexDirection="column">
                    <Typography variant="h6" align="left" gutterBottom className='texto-footer'>Refúgio Mental</Typography>


                    <Typography align="left" gutterBottom className='texto-footer-2'>Um lugar de segurança e fortalecimento da sua saúde mental.</Typography>
                


                <List component="nav" className="root" aria-label="mailbox folders">
                    <ListItem >
                        <ListItemIcon>
                            <AddLocation />
                        </ListItemIcon>
                        <ListItemText primary="São Paulo - SP" />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <ListItemIcon>
                            <Drafts />
                        </ListItemIcon>
                        <ListItemText primary="refugiomental.grupo@outlook.com" />
                    </ListItem>
                </List>
            </Box>
            </Grid>

            <Grid item xs={4}>
                <Box paddingTop={1}  display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h6" align="center" gutterBottom className='texto-footer'>Nos conheça!</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Link href='https://linktr.ee/refugiomental'>
                        <img src="src\assets\img\linktree.png" alt="Link para o Linktree" className="foto" />
                    </Link>
                </Box>
            </Grid>

            <Grid item xs={4}>
                <Box paddingBottom={1} paddingRight={2} paddingTop={2} display="flex" flexDirection="column">
                    <Typography variant="h6" align="center" gutterBottom className='texto-footer'>Atualizações</Typography>
                    <Typography align="center" gutterBottom className='texto-footer-2'>Gostaria de ficar por dentro das nossas atualizações?</Typography>
                    <Typography align="center" gutterBottom className='texto-footer-2'>Insira seu nome e seu melhor e-mail que vamos te notificar a cada atualização da nossa rede social!</Typography>
                    <TextField
                        label="Nome"
                        id="margin-none"
                        defaultValue=""
                        className="bg-white"
                    />
                    <br />
                    <TextField
                        label="E-mail"
                        id="e-mail"
                        defaultValue=""
                        type='email'
                        className="bg-white"
                    />
                    <br /> 
                    <button className='button'>Enviar</button>
                </Box>
                   

            </Grid>

        </Grid>

    }
    return (
        <>
            {footerComponent}
        </>
    );
}

export default Footer;