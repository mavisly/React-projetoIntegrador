import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { buscaId, deleteId } from "../../../services/Service";
import { Box, Card, CardActions, CardContent, CardMedia, Grid } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from 'react-toastify';
import './DeletarPost.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
function DeletarPost(){
    
    let navigate = useNavigate();

    const {id} = useParams<{id:string}>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  
    const [post, setPosts] = useState<Postagem>()
  
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
  
    useEffect(()=>{
    if (id !== undefined){
        findById(id)
    }
   }, [id])
  
   async function findById(id:string) {
    buscaId(`/postagens/${id}`, setPosts,{
        headers: {
            "Authorization": token
        }
    })
   }
  
   function sim() {
    navigate('/posts')
      deleteId(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      toast.success('Postagem deletada com sucesso', {
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

   function nao(){
    navigate("/posts")
   }
  
    return (
      <>
      <Grid container xs={12} className="container-deletarposts">
        <Box m={2} className="deletar-tema">
          <Card variant="outlined" >
            <CardContent>
              <Box justifyContent="center">
                <Typography color="textSecondary" gutterBottom  variant="h5">
                  Deseja deletar a Postagem:
                </Typography>

                <Typography color="textSecondary" variant="h6">
                {post?.atendimento}
                </Typography>

                <Typography color="textSecondary" >
                {post?.informacoes}
                </Typography>

                <Typography color="textSecondary" >
                <FavoriteBorderIcon />Eu sou: {post?.tipo_profissional}
                </Typography>
                
                <Typography>Modalidade: {post?.modalidade_categoria}</Typography>
 
                <Typography>Avaliação: {post?.avaliacao}</Typography> 
                <CardMedia 
                   component="img"
                   alt="imagem post"
                   height="210"
                   image={post?.image_link}> 
                </CardMedia>
                <Typography variant="body2" component="p" className="txt-postagens-tema">
                     #{post?.tema?.descricao}
                   </Typography>
              </Box>
  
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="start" ml={1.0} mb={1} >
                <Box mx={1}>
                <Button onClick={sim} variant="contained" className="marginLeft btn-postagem" size='large' color="primary" >
                  Sim
                </Button>
                </Box>
                <Box>
                <Button onClick={nao} variant="contained" size='large' color="secondary" className="btn-postagem">
                  Não
                </Button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
        </Grid>
      </>
    );
   }

export default DeletarPost;
