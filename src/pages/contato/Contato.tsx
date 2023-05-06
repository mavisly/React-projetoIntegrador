import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useEffect } from "react";
import './Contato.css'
function Contato(){
    
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
                progress: undefined,
            });
            navigate("/login")

        }
    }, [token])
return (
    <Grid container direction='row' justifyContent='center' alignItems='center' className="container-img">
        
        <Grid item xs={6} alignItems='center' >
            <Box paddingX={10}>
                <form className="bg">
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="contato-titulo">Entre em contato conosco!</Typography>

                    <Box paddingBottom={1}>
                        <TextField
                    id="email"
                    label="E-mail para contato!"
                    
                    multiline
                    fullWidth
                    variant="filled"
                    />
                 </Box>
                    <Box>

                    
                    <TextField
                    id="mensagem"
                    label="Deixe sua mensagem!"
                    multiline
                    fullWidth
                    rows={4}
                    variant="filled"
                    
                    />
                   </Box>
                    

                    <Box marginTop={2} paddingTop={5} textAlign='center'>
                            <Button variant='contained' color='secondary' className='botao-contato'>
                                Cancelar
                            </Button>
                        
                        <Button variant='contained' color='primary' className='botao-contato'>
                            Enviar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Grid>
    </Grid>
  );
}

export default Contato;