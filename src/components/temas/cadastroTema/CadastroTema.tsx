import React, {ChangeEvent, useEffect, useState} from "react"
import {Container, Typography, TextField, Button} from "@material-ui/core"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../model/Tema";
import "./CadastroTema.css";
import useLocalStorage from "react-use-localstorage";
import { buscaId, post, put } from "../../../services/Service";
import { TextFormatSharp } from "@mui/icons-material";

function CadastroTema(){
    const { id } = useParams<{id: string}>();
    const [token, setToken] = useLocalStorage('token');

    const [temas, setTemas] = useState<Tema>({
        id: 0,
        nome: "",
        descricao: " "
    })

    let navigate = useNavigate();

    useEffect(()=>{
        if(token == ''){
          alert("Você precisa estar logado!")
          navigate("/login")
        }
      }, [token]);

      useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTemas, {
            headers: {
              'Authorization': token
            }
          })
        }

      function updatedTema(e: ChangeEvent<HTMLInputElement>){
        setTemas({
            ... temas,
            [e.target.name]: e.target.value,
        })
       }
    
       async function onSubmit(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        console.log("temas "+ JSON.stringify(temas))
    
        if (id !== undefined){
            console.log(temas)
            put(`/temas`, temas, setTemas, {
                headers: {
                    "Authorization": token
                }
            })
            alert("Tema atualizado com sucesso");
        } else {
            post(`/temas`, temas, setTemas, {
                headers: {
                    "Authorization": token
                }
            })
            alert("Tema cadastrado com sucesso")
        }
        back()
    
       }
    
       function back(){
        navigate("/temas")
       }
       
       return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>

                <TextField value={temas.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />

                <TextField value={temas.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
      
    
}

export default CadastroTema;