import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../model/Tema";
import Postagem from "../../../model/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";


function CadastroPosts(){
    let navigate = useNavigate();

    const {id} = useParams<{id:string}>();

    const [temas, setTemas] = useState<Tema[]>([]);
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    
    
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
        back()
    }

    function back(){
        navigate("/posts")
    }

    return (
        <>
         <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.informacoes} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="informacoes" label="informacoes" variant="outlined" name="informacoes" margin="normal" fullWidth />
                <TextField value={postagem.tipo_profissional} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="tipo_profissional" label="tipo_profissional" name="tipo_profissional" variant="outlined" margin="normal" fullWidth />
                <TextField value={postagem.atendimento} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="atendimento" label="atendimento" variant="outlined" name="atendimento" margin="normal" fullWidth />
                <TextField value={postagem.modalidade_categoria} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="modalidade_categoria" label="modalidade_categoria" variant="outlined" name="modalidade_categoria" margin="normal" fullWidth />
                <TextField value={postagem.avaliacao} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="avaliacao" label="avaliacao" variant="outlined" name="avaliacao" margin="normal" fullWidth />
                <TextField value={postagem.image_link} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedPostagem(e)} id="image_link" label="image_link" variant="outlined" name="image_link" margin="normal" fullWidth />

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
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
        </>
    );
}

export default CadastroPosts;