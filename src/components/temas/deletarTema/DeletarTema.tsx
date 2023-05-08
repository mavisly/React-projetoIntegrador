import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import {useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../model/Tema';

import './DeletarTema.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarTema() {

    let navigate = useNavigate();

    const { id } = useParams<{id: string}>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  

    const [tema, setTema] = useState<Tema>()

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

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
          navigate('/temas')
            deleteId(`/temas/${id}`, {
              headers: {
                'Authorization': token
              }
            });
            toast.success('Tema deletado com sucesso', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "light",
              progress: undefined,
              });
          }
        
          function nao() {
            navigate('/temas')
          }
          
  return (
    <>
    <Grid container xs={12} className='bg-deletar-tema'>
      <Box display={'flex'} alignItems={'center'}> 
      
      <div className="paper-tema-deletar">
                <div className="pin-tema-deletar">
                  <div className="shadow-tema-deletar"></div>
                  <div className="metal-tema-deletar"></div>
                  <div className="bottom-circle-tema-deletar"></div>
                </div>
          <CardContent className='box-tema-deletar'>
            <Box justifyContent="center" >
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema: 
              </Typography>
              <Typography>
                {tema?.nome}
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
            
            <Box>
                
                <Button onClick={sim} variant="contained"  size='large' color="primary" className='botao-deletar-tema'>
                  Sim
                </Button>
                
                <Button  onClick={nao} variant="contained" size='large' color="secondary" className='botao-deletar-tema'>
                  Não
                </Button>
              </Box> 
             
          </CardContent>
          
         </div>
      </Box>
      </Grid>
    </>
  );
}
export default DeletarTema;