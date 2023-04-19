import React, {useEffect, useState, ChangeEvent} from "react";
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Cadastro.css';
import { useNavigate } from "react-router-dom";
import User from "../../model/User";
import { cadastroUsuario } from "../../services/Service";

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
        if(confirmarSenha == User.senha && User.senha.length >=8){
            try{
                await cadastroUsuario('/usuarios/cadastrar', User, setUserResult)
                alert("Usuário cadastrado com sucesso!")
            } catch (error){
                console.log(`Error: ${error}`)
                alert("Erro ao cadastrar o usuário, por favor tente novamente")
            }
        } else{
            alert("Dados inconsistentes. Verifique as informações de cadastro.")

            setUser({...User, senha: ""})
            setConfirmarSenha("")
        }
    }
        


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form  onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={User.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth placeholder="Insira seu nome" required />
                        <TextField value={User.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='email' label='E-mail' variant='outlined' name='email' margin='normal' type='email' fullWidth placeholder="Insira seu melhor e-mail" required />
                        <TextField value={User.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' label='Foto' variant='outlined' name='foto' margin='normal' fullWidth  placeholder='Insira um link de foto' />
                        <TextField value={User.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth placeholder="Insira um nickname" required />
                        <TextField value={User.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' placeholder="Insira uma senha com pelo menos 8 caracteres" fullWidth required />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth placeholder="Repita sua senha" required />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
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