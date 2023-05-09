import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../model/Tema";
import Postagem from "../../../model/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import './CadastroPosts.css'
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";


function CadastroPosts(){
    let navigate = useNavigate();

    const {id} = useParams<{id:string}>();



    const [temas, setTemas] = useState<Tema[]>([]);
    
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
              theme: "colored",
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

    const [postagem, setPostagem] = useState<Postagem>({
        id:0,
        informacoes:"",
        tipo_profissional:"",
        atendimento: "",
        modalidade_categoria: "",
        avaliacao: "",
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

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            await put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
                progress: undefined,
            });
        } else {
            await post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso', {
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
        back()
    }

    function back(){
        navigate("/posts")
    }  

    return (
        <>
        
            <Grid container xs={12} justifyContent="center" className="bg-lista-postagem ">
            
            <Grid item xs={6} alignItems="center"  className="bg-form">

               
            <form onSubmit={onSubmit} className="bg-dentro-form">
            <Typography variant="h5" color="textSecondary" component="h1" align="center" className="txt-cadastro-postagem">Formulário de cadastro postagem</Typography>

                <TextField value={postagem.atendimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="atendimento" label="título, mínimo 15 caracteres *" variant="outlined" name="atendimento" margin="normal" fullWidth/>

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
            </Grid>
            </Grid>
        
        </>
    );
}

export default CadastroPosts;