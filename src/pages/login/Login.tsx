import React from "react";
import "./Login.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import background from "./background.png";

function Login() {
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
          <form>
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
              id="usuario"
              label="usuario"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box textAlign="center" marginTop={2}>
              <Link to="/home" className="text-decorator-none">
                <Button type="submit" variant="contained" color="primary">
                  Logar
                </Button>
              </Link>
            </Box>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Box marginRight={1}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                style={{ fontWeight: "bold" }}
              >
                
                <Link to="/cadastro" className="text-decorator-none">
                <Button type="submit"   color="primary" style={{fontWeight:"bold"}}>
                Cadastre-se
                </Button>
              </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
      <Grid item xs={6} style={{
        backgroundImage:`url("/background.png")`,
        backgroundRepeat: 'no-repeat', width:'100vh' , minHeight:'100vh',backgroundSize:'cover',backgroundPosition:'center'
      }}>

      </Grid>
    </Grid>
  );
}

export default Login;