import React, {ChangeEvent, useEffect, useState} from "react"
import {Container, Typography, TextField, Button} from "@material-ui/core"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../model/Tema";
import "./CadastroTema.css";
import { buscaId, post, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function CadastroTema(){
    const { id } = useParams<{id: string}>();
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    
    const [temas, setTemas] = useState<Tema>({
        id: 0,
        nome: "",
        descricao: " "
    })

    let navigate = useNavigate();

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
      
      useEffect(() => {
        if (id !== undefined) {
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
    
       async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(temas))

        if (id !== undefined) {
            console.log(temas)
            await put(`/temas`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema atualizado com sucesso', {
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
            post(`/temas`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema cadastrado com sucesso', {
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