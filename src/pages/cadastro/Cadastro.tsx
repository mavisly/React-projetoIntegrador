import React, {useEffect, useState, ChangeEvent} from "react";
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Cadastro.css';
import { useNavigate } from "react-router-dom";
import User from "../../model/User";

import { cadastroUsuario } from "../../services/Service";
import { toast } from "react-toastify";


function Cadastro() {

    let navigate = useNavigate();
    const[confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [User,setUser] = useState<User>(
    {
        id:0,
        nome: "",
        usuario:"",
        email:"",
        senha: "",
        foto: ""
    })

    const [userResult, setUserResult] = useState<User>({
        id:0,
        nome:"",
        usuario:"",
        email:"",
        senha:"",
        foto:""
    })

    useEffect(()=>{
        if (userResult.id !=0){
            navigate("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...User,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == User.senha){
        cadastroUsuario(`/usuarios/cadastrar`, User, setUserResult)
        toast.success('Usuario cadastrado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
            progress: undefined,
            });
        }else{
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
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
    }
        
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'className="container-img">
            
            <Grid item xs={6} alignItems='center' >
                <Box paddingX={10}>
                    <form  onSubmit={onSubmit} className="bg-cadastro">
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="contato-titulo">Faça parte da nossa Comunidade</Typography>
                        <TextField value={User.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth placeholder="Insira seu nome" required />
                        <TextField value={User.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='email' label='E-mail' variant='outlined' name='email' margin='normal' type='email' fullWidth placeholder="Insira seu melhor e-mail" required />
                        <TextField value={User.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' label='Foto' variant='outlined' name='foto' margin='normal' fullWidth  placeholder='Insira um link de foto' />
                        <TextField value={User.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth placeholder="Insira um nickname" required />
                        <TextField value={User.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' placeholder="Insira uma senha com pelo menos 8 caracteres" fullWidth required />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth placeholder="Repita sua senha" required />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary'  className='botao-contato'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'  className='botao-contato'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Cadastro;