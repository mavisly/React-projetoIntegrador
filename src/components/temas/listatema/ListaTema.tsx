import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../model/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaTema.css';
import { Create, Delete } from '@mui/icons-material';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([]);

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  let navigate = useNavigate();

  useEffect(() => {
    if (token == '') {
      alert("Você precisa estar logado!")
      navigate("/login")
    }
  }, [token]);

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
      {
        temas.map(tema => (
          <Grid xs={12} className='container-lista-temas'>
            
            <Box paddingTop={1} paddingBottom={1} paddingLeft={1} >
              <div className="paper">
                <div className="pin">
                  <div className="shadow"></div>
                  <div className="metal"></div>
                  <div className="bottom-circle"></div>
                </div>
                <Typography align="center">{tema.nome}</Typography>
                <Typography align="center" className="descricao">{tema.descricao}</Typography>

            <Box display="flex" justifyContent="flex-end" className="bt">
                <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none" >
                  <Button 
                  variant="contained" 
                  size='small' 
                  color="primary" 
                  startIcon={<Create />}
                  className='botao-tema'
                  
                  >
                    Atualizar
                  </Button>
                </Link>

                <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                    size="small"
                    className='botao-tema'
                  >
                    Deletar
                  </Button>

                </Link>
                </Box>
              </div>
            </Box>
           
          </Grid>


        ))
      }

    </>
  );
}


export default ListaTema;