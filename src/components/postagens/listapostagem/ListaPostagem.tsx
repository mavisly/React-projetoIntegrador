import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { busca } from "../../../services/Service";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box, CircularProgress, Grid } from "@mui/material";
import "./ListaPostagem.css";
import useLocalStorage from "react-use-localstorage";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import ListaTema from "../../temas/listatema/ListaTema";


 function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [token, setToken] = useLocalStorage("token");
 
  let navigate = useNavigate();



  useEffect(() => {

      if (token == "") {
        alert("Você precisa estar logado");
        navigate("/login");
       
      }
    
  }, [token]);

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
      getPost();
    
  }, [posts.length]);
 
  return (

    
    <>
      
      <Grid container direction="row"  m={2}  >
       
       <Grid item className="left-div" lg={3} m={2}  >
         <Card variant="outlined">
           <h1>Filtro</h1>
         </Card>
        
       </Grid>
       <Grid item className="cria-post" lg={5} m={1}  >
         <Box>
           <h1>Criar postagem</h1>
         </Box>
        
       </Grid>
       
       </Grid>
       
       
       <Grid container className="teste_posts">
     
       {posts.map((post) => (
         
         <Grid container className="posts" >
           
           <Grid item xs={4} >
             <Box m={2}>
               <Card variant="outlined">
                 <CardContent>
                   <Typography color="textSecondary" gutterBottom>
                     Postagens
                   </Typography>
                   <Typography variant="h5" component="h2">
                     {post.informacoes}
                   </Typography>
                   <Typography variant="body2" component="p">
                     {post.tipo_profissional}
                   </Typography>
                   <Typography>{post.atendimento}</Typography>
 
                   <Typography>{post.modalidade_categoria}</Typography>
 
                   <Typography>{post.avaliacao}</Typography>
                   <CardMedia> {post.image_link}</CardMedia>
                  
 
                   <Typography variant="body2" component="p">
                     {post.tema?.descricao}
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Box display="flex" justifyContent="center" mb={1.5}>
                     <Link
                       to={`/formularioPostagem/${post.id}`}
                       className="text-decorator-none"
                     >
                       <Box mx={1}>
                         <Button
                           variant="contained"
                           className="marginLeft"
                           size="small"
                           color="primary"
                         >
                           atualizar
                         </Button>
                       </Box>
                     </Link>
                     <Link
                       to={`/deletarPostagem/${post.id}`}
                       className="text-decorator-none"
                     >
                       <Box mx={1}>
                         <Button
                           variant="contained"
                           size="small"
                           color="secondary"
                         >
                           deletar
                         </Button>
                       </Box>
                     </Link>
                   </Box>
                 </CardActions>
               </Card>
             </Box>
             
           </Grid>
           
         </Grid>
         
  
       ))}
       
       
     </Grid>
   
    </>
  );
}

export default ListaPostagem; 



