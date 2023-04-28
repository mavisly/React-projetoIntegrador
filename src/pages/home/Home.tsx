import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import './Home.css';
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useNavigate } from "react-router-dom";

function Home() {

    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    
    useEffect(() => {
      if (token == "") {
          alert("Você precisa estar logado")
          navigate("/login")
      }
  }, [token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                
                <Grid alignItems="center" item xs={12}>
                    
                    <Box paddingX={20} className="container-header">
                        <Typography variant="h3" gutterBottom component="h3" align="center" className="titulo">Refúgio Mental</Typography>
                        <Typography variant="h5" gutterBottom component="h5" align="center" className="subtitulo-txt-animado">Um lugar de segurança e fortalecimento da sua saúde mental.</Typography>
                    </Box>
                </Grid>

                <Grid xs={12} className="container-fiscalizado">
                    <img src="https://cdn-icons-png.flaticon.com/512/2345/2345454.png" alt="" className="img-fiscalizado"/>
                    <Typography className="txt-fiscalizado">
                    Plataforma gerenciada e fiscalizada por nós!
                    </Typography>
                </Grid>

                <Grid xs={12} className="postagens">

                </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}  className="assuntos-relacionados">
                <Box paddingX={5}>
                    <img src="https://img.freepik.com/fotos-gratis/mulher-feliz-e-relaxada-pega-um-momento-despreocupado-desfruta-da-liberdade-canta-musica-mantem-os-bracos-levantados-fecha-os-olhos-danca-ao-som-da-musica-favorita-usa-camiseta-amarela-casual-isolada-na-parede-branca_273609-53278.jpg" alt="" className="imgs" />
                    <Typography>
                        Dicas de bem estar
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://vivamais.cemigsaude.org.br/wp-content/uploads/2020/10/diferen%C3%A7a-entre-terapia-e-an%C3%A1lise-scaled.jpeg" alt=""  className="imgs"/>
                    <Typography>
                        Anúncios Psicólogs
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://www.psitto.com.br/wp-content/uploads/2021/05/terapia-online-os-cinco-melhores-sites-para-se-consultar-com-psicologo-em-casa.jpg" alt=""  className="imgs" />
                    <Typography>
                        Atendimento on-line
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://pressreleases.scielo.org/wp-content/uploads/2020/11/csc-imagem.jpg" alt=""  className="imgs" />
                    <Typography>
                        Atendimento público
                    </Typography>
                </Box>
                    
                </Grid>
        </>
    );
}

export default Home;