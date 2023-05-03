import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useEffect } from "react";

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
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} alignItems='center'>
            <Box paddingX={10}>
                <form>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center'>Entre em contato conosco!</Typography>
                    <TextField id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth placeholder="Insira seu nome completo" required />
                    <TextField id='email' label='E-mail' variant='outlined' name='email' margin='normal' type='email' fullWidth placeholder="Insira seu e-mail para contato" required />
                    
                    <Box marginTop={2} textAlign='center'>
                        
                            <Button variant='contained' color='secondary' className='btnCancelar'>
                                Cancelar
                            </Button>
                        
                        <Button type='submit' variant='contained' color='primary'>
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