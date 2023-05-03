
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
 
} from "@material-ui/core";
import { Box, CircularProgress, Container, Dialog, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import "./ListaPostagem.css";
import { MdFilledButton } from '@material/web/button/filled-button.js';
import {MdOutlinedButton} from'@material/web/button/outlined-button.js';
import {MdCheckbox} from '@material/web/checkbox/checkbox.js';

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
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CadastroPosts from "../cadastroPosts/CadastroPosts";
import Tema from "../../../model/Tema";


import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
 
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  let navigate = useNavigate();


  
  const {id} = useParams<{id:string}>();
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [temas, setTemas] = useState<Tema[]>([]);
  
    
    useEffect(()=> {
        if (token ==""){
            alert ("Você precisa estar logado")
            navigate("/login")
        }
    }, [token])
    
    const [tema, setTema] = useState<Tema>({
        id: 0,
        nome: "",
        descricao:""
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id:0,
        informacoes:"",
        tipo_profissional:"",
        atendimento: "",
        modalidade_categoria: "",
        avaliacao: 0,
        image_link: ""
    })
    useEffect(()=>{
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(()=> {
        getTemas()
        if (id !== undefined){
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas(){
        await busca("/temas", setTemas, {
            headers: {
                "Authorization": token
            }
        })
    }

    async function findByIdPostagem(id:string){
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {
                "Authorization": token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>){
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema:tema
        })
    }

    /** ADICIONAR TOASTFY */
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        if (id !== undefined){
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    "Authorization": token
                }
            })
            alert("Postagem atualizada com sucesso");
        } else {
            post(`/postagens`, postagem, setPostagem,{
                headers: {
                    "Authorization": token
                }
            })
            alert("Postagem cadastrada com sucesso");
        }
        // back()
        home();
        /*reloadPage();*/
    }
/*
    function back(){
        navigate("/posts")
    } 
    function reloadPage() {
      window.location.reload();
    }
    */

    function home(){
      navigate("/home")
  }
  return (
   <div className="background">
    <>

    <Button variant="outlined" className="btn-postagem" onClick={handleClickOpen}>
        Nova postagem
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Refugio Mental</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escreva sobre uma avaliação, dica ou outro coisa que esteja pensando.
          </DialogContentText>
          
          <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
            <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.informacoes} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="informacoes" label="informacoes" variant="outlined" name="informacoes" margin="normal" fullWidth />
                <FormHelperText>min =</FormHelperText>
                <TextField value={postagem.tipo_profissional} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="tipo_profissional" label="tipo_profissional" name="tipo_profissional" variant="outlined" margin="normal" fullWidth />
                <FormHelperText>min =</FormHelperText>
                <TextField value={postagem.atendimento} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="atendimento" label="atendimento" variant="outlined" name="atendimento" margin="normal" fullWidth />
                <FormHelperText>min =</FormHelperText>
                <TextField value={postagem.modalidade_categoria} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="modalidade_categoria" label="modalidade_categoria" variant="outlined" name="modalidade_categoria" margin="normal" fullWidth />
                <FormHelperText>min =</FormHelperText>
                <TextField value={postagem.avaliacao} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="avaliacao" label="avaliacao" variant="outlined" name="avaliacao" margin="normal" fullWidth />
                <FormHelperText>min = 0 a 10</FormHelperText>
                <TextField value={postagem.image_link} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="image_link" label="image_link" variant="outlined" name="image_link" margin="normal" fullWidth />
                <FormHelperText>Usar que nem blogPessoal</FormHelperText>
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e => buscaId(`/temas/${e.target.value}`, setTema,{
                            headers: {
                                "Authorization": token
                            }
                        }))}>
                          {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                          }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary" >
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
       
      
       
      
       {posts.map((post) => (
         
         <Grid container  direction={'column'} >
           <Grid item xs={2}/>
           
           <Grid item xs={4}  >
             <Box m={2}>
               <Card variant="outlined" className="posts"   >
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
                           className="marginLeft"
                           size="small"
                           
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
           <Grid item xs={2}/>
           </Grid>
        
       ))}
     
    </>
    </div>
  );
}

export default ListaPostagem; 



