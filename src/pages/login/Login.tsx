import "./Login.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import UserLogin from "../../model/UserLogin";
import { ChangeEvent, useState ,useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addToken } from "../../store/tokens/actions";

function Login() {
  let history = useNavigate();

  const [token, setToken] = useState('');
  
  const dispatch = useDispatch();
  
  
  const [UserLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    email: "",
    senha: "",
    foto: "",
    token: ""
  });

  useEffect(()=>{
    if(token != ''){
        dispatch(addToken(token));
        history('/home')
    }
}, [token])

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...UserLogin,
      [e.target.name]: e.target.value,
    });
  }
 
  

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login (`/usuarios/logar`, UserLogin , setToken);
      
      alert("Usuario logado com sucesso!");
    } catch (error) {
      alert("Usuario e senha incorretos!");
    }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6} alignItems="center">
        <Box px={20}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
            >
              Entrar
            </Typography>
            <TextField
              value={UserLogin.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="email"
              label="email"
              variant="outlined"
              name="email"
              margin="normal"
              fullWidth
            />
            <TextField
              value={UserLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box textAlign="center" marginTop={2}>
              <Button type="submit" variant="contained" color="primary">
                Logar
              </Button>
            </Box>
            </form>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Box marginRight={1}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>

              <Link to="/cadastro" className="text-decorator-none">
                
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
            
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          backgroundImage: `url("/background.png")`,
          backgroundRepeat: "no-repeat",
          width: "100vh",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
}

export default Login;