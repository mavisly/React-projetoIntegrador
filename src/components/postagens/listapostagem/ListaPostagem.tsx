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
import { Box, Container, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import "./ListaPostagem.css";
import { useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CadastroPosts from "../cadastroPosts/CadastroPosts";
import Tema from "../../../model/Tema";
import { ToastContainer, toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  let navigate = useNavigate();



  const { id } = useParams<{ id: string }>();
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
// Abre e fecha botão nova postagem
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
// CadastroPost
  const [temas, setTemas] = useState<Tema[]>([]);

  
    
    useEffect(()=> {
        if (token ==""){
          toast.error('Você precisa estar logado!', {
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
    
    const [tema, setTema] = useState<Tema>({
        id: 0,
        nome: "",
        descricao:""
    })



  useEffect(() => {
    if (token == "") {
        toast.error('Você precisa estar logado!', {
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

  

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    informacoes: "",
    tipo_profissional: "",
    atendimento: "",
    modalidade_categoria: "",
    avaliacao: null,
    image_link: ""
  })


  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema
    })
  }, [tema])

  useEffect(() => {
    getTemas()
    if (id !== undefined) {
      findByIdPostagem(id)
    }
  }, [id])

  async function getTemas() {
    await busca("/temas", setTemas, {
      headers: {
        "Authorization": token
      }
    })
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        "Authorization": token
      }
    })
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema
    })
  }



    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()

      if (id !== undefined) {
          try {
              await put(`/postagens`, postagem, setPostagem, {
                  headers: {
                      'Authorization': token
                  }
              })
              toast.success('Postagem atualizada com sucesso!', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  theme: "light",
                  progress: undefined
                 });
          } catch (error) {
              toast.error('Erro ao atualizar, verifique os campos!', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  theme: "light",
                  progress: undefined
                 });
          }

      } else {
          try {
              await post(`/postagens`, postagem, setPostagem, {
                  headers: {
                      'Authorization': token
                  }
              })
              toast.success('Postagem cadastrada com sucesso!', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  theme: "light",
                  progress: undefined
                 });
                 /* com o home() aqui, se houver erro no cadastro de postagem, não retorna para o home. assim podemos corrigir os dados errados sem precisar voltar para cadastro.  */
                 home();
          } catch (error) {
              toast.error('Erro ao cadastrar, verifique os campos!', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  theme: "light",
                  progress: undefined
                 });
          }
        }
    }

  function home() {
    navigate("/home")
  }

  return (

   <div className="background_listapostagem">
    <>

      <Box display={'flex'} justifyContent={'center'} padding={1}>
            <Button variant="outlined" onClick={handleClickOpen} className="btn-postagem">
              Nova postagem
            </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} className="formulario_fora">
      <DialogContent className="bg-cadastro-postagem" >
        
        
          <DialogContentText style={{color:'white'}}>
            <Typography variant="h4" className="caixa txt-lista-postagem" >Refúgio Mental</Typography>
            Escreva sobre uma avaliação, dica ou outra coisa que esteja pensando.
          </DialogContentText>
          
          <Container maxWidth="sm" className="container_formulario">
            <form onSubmit={onSubmit} className="formulario " >
            <Typography variant="h3" color="textSecondary" component="h1" align="center" className="txt-lista-postagem">Formulário de cadastro postagem</Typography>

              <TextField value={postagem.atendimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="atendimento" label="título, mínimo 15 caracteres *" variant="outlined" name="atendimento" margin="normal" fullWidth />

              <TextField value={postagem.informacoes} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="informacoes" label="texto, mínimo de 5 caracteres *" variant="outlined" name="informacoes" margin="normal" fullWidth />

                <TextField value={postagem.tipo_profissional} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="tipo_profissional" label="tipo profissional, mínimo de 10 caracteres *" name="tipo_profissional" variant="outlined" margin="normal" fullWidth />

                <TextField value={postagem.modalidade_categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="modalidade_categoria" label="modalidade atendimento, mínimo 5 caracteres *" variant="outlined" name="modalidade_categoria" margin="normal" fullWidth />


                <TextField value={postagem.avaliacao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="avaliacao" label="avaliação" variant="outlined" name="avaliacao" margin="normal" fullWidth />
                

                <TextField value={postagem.image_link} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="image_link" label="insira o link da imagem, mínimo 5 caracteres" variant="outlined" name="image_link" margin="normal" fullWidth />


                <FormControl className="form-margin">
                <FormHelperText>escolha um tema para a postagem</FormHelperText>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    onChange={(e => buscaId(`/temas/${e.target.value}`, setTema, {
                      headers: {
                        "Authorization": token
                      }
                    }))}>
                    {
                      temas.map(tema => (
                        <MenuItem value={tema.id} className="list-item">{tema.nome}</MenuItem>
                      ))
                    }
                  </Select>
                  <Button type="submit" variant="contained" color="primary" className="botao-cadastro-post">
                    Finalizar
                  </Button>
                </FormControl>

            </form>
        </Container>
        </DialogContent>
      </Dialog>
       
      
       {posts.map((post) => (
         
         <Grid container  direction={'column'} >
           <Grid item xs={2}/>
           
           <Grid item xs={4}  >
             <Box m={2}>
               <Card variant="outlined" className="posts"   >
                 <CardContent className="item-post">
                   
                   <Typography color="textSecondary" 
                   gutterBottom variant="h5" className="titulo-txt"> 
                     {post.atendimento}
                   </Typography>

                   <Typography  component="h2" className="txt-postagens">
                     {post.informacoes}
                   </Typography>

                   <Typography variant="body2" component="p" className="txt-postagens">
                   <FavoriteBorderIcon /> Eu sou: {post.tipo_profissional}
                   </Typography>
                   
                   <Typography>Modalidade: {post.modalidade_categoria}</Typography>
 
                   <Typography>Avaliação: {post.avaliacao}</Typography> 
 
                  
                   <CardMedia 
                   component="img"
                   alt="imagem post"
                   height="210"
                   image={post.image_link}> 
                   </CardMedia>
                  
 
                   <Typography variant="body2" component="p" className="txt-postagens-tema">
                     #{post.tema?.descricao}
                   </Typography>
                  
                  <Box display="flex" justifyContent="center" mb={1.5}>
                     <Link
                       to={`/formularioPostagem/${post.id}`}
                       className="text-decorator-none"
                     >
                       <Box mx={1} >
                         <Button
                           variant="contained"
                           className="btn-postagem"
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
                           className="btn-postagem">
                           deletar
                         </Button>
                       
            
                       </Box>
                     </Link>
                   </Box>
                 </CardContent>
                 
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



