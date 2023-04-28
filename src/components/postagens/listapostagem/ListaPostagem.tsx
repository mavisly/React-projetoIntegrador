import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { busca } from "../../../services/Service";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import "./ListaPostagem.css";
import useLocalStorage from "react-use-localstorage";
import { useNavigate } from "react-router-dom";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [token, setToken] = useLocalStorage("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
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

  return (
    <>
      <Grid  className="left-div" m={2} >
        <Box>
          <h1>filtro</h1>
        </Box>
        <Box></Box>
      </Grid>
      
      {posts.map((post) => (
        <Grid container className="posts">
          <Grid item xs={4}>
            <Box m={2}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Postagens
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {post.informacoes}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.tipo_profissional}
                  </Typography>
                  <Typography>{post.atendimento}</Typography>

                  <Typography>{post.modalidade_categoria}</Typography>

                  <Typography>{post.avaliacao}</Typography>

                  <Typography>{post.image_link}</Typography>

                  <Typography variant="body2" component="p">
                    {post.tema?.descricao}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5}>
                    <Link
                      to={`/formularioPostagem/${post.id}`}
                      className="text-decorator-none"
                    >
                      <Box mx={1}>
                        <Button
                          variant="contained"
                          className="marginLeft"
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
                        >
                          deletar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
        
      ))}
      
    </>
  );
}

export default ListaPostagem;
