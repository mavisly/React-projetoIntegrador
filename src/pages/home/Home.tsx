import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import './Home.css';

function Home() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="container-home">
                
                <Grid alignItems="center" item xs={6}>
                    
                    <Box paddingX={20}>
                        <Typography variant="h3" gutterBottom component="h3" align="center" className="titulo">Refúgio Mental</Typography>

                        <Typography variant="h5" gutterBottom component="h5" align="center" className="subtitulo">Um lugar de segurança e fortalecimento da sua saúde mental.</Typography>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        </Box>
                        <Button variant="outlined" className="botao">Ver Postagens</Button>
                    </Box>
                </Grid>

                <Grid item xs={6} >
                    <img src="https://img.freepik.com/free-vector/boy-mental-health-with-flowers_603843-975.jpg" alt="Animação de um homem, moreno, com flores em sua cabeça"  className="img-home"/>
                </Grid>

                <Grid xs={12} className="postagens">

                </Grid>

            </Grid>
        </>
    );
}

export default Home;