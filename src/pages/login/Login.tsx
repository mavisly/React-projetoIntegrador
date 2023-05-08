import "./Login.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import UserLogin from "../../model/UserLogin";
import { ChangeEvent, useState ,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

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
 
  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    try{
        await login(`/usuarios/logar`, UserLogin, setToken)
        toast.success('Usuário logado com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
            progress: undefined,
            });
    }catch(error){
        toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
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
/**   <div className="center">
 <h1>
   
   </h1>
</div> 


<div className="slider-thumb"></div>
/////////////////////////////////

<Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6} alignItems="center" className="login">
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
      
    </Grid>
*/

/**
 * <div className="slider-thumb"></div>
 
  <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <button>Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
    

  ////////////////////////////////////


   <>
    <div className="slider-thumb"></div>
 
  <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    
    <div className="page">
  <div className="container">
    <div className="left">
      <div className="login">Login</div>
      <div className="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
    </div>
    <div className="right">
      <svg viewBox="0 0 320 300">
        <defs>
        <linearGradient
  id="linearGradient"
  x1="13"
  y1="193.49992"
  x2="307"
  y2="193.49992"
  gradientUnits="userSpaceOnUse"
>
  <stop
    style={{ stopColor: "#ff00ff" }}
    offset="0"
    id="stop876"
  />
  <stop
    style={{ stopColor: "#ff0000" }}
    offset="1"
    id="stop878"
  />
</linearGradient>
        </defs>
        <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
      </svg>
      <div className="form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"/>
        <input type="submit" id="submit" value="Submit"/>
      </div>
    </div>
  </div>
</div>




 */
    
  return (
   
    <div className="background_login">
    <>
   
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6} alignItems="center" className="login">
        <Box px={20}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
            className="font-txt">
              Entrar
            </Typography>
            <TextField
              value={UserLogin.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="email"
              label="nome de usuário"
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
              <Button type="submit" variant="contained" color="primary" className="botao">
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
                  style={{ fontWeight: "bold", color:'rgb(19, 49, 49)' }}
                  className="font-txt"
                >
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
            
        </Box>
      </Grid>
      
    </Grid>
    
    </>
    </div>
    
  );
}

export default Login;