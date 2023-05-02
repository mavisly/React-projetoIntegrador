import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { AppBar, Box, Card, InputAdornment, TextField, Toolbar } from "@mui/material";
import './Home.css';
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Tema from "../../model/Tema";
import { busca } from "../../services/Service";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TabPostagem from "../../components/postagens/tabpostagens/TabPostagem";

function Home() {

    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

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

    const [temas, setTemas] = useState<Tema[]>([]);

    async function getTema(){
        await busca("/temas", setTemas, {
          headers: {
            'Authorization': token
          }
        })
      }

      useEffect(()=>{
        getTema()
      }, [temas.length])
      

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={6} className="header1">
                    <Box sx={{ '& > :not(style)': { m: 1 } }} className="box1">
                        <Typography className="font-txt" >
                            @refugiomental
                        </Typography>
                    </Box>
                    <Box className="box-img">
                        <img src="https://www.pngkit.com/png/full/239-2399943_participacin-y-voluntariado-colegio-sagrada-familia-el-pilar.png" className="img-home" />
                    </Box>

                    <Box sx={{ '& > :not(style)': { m: 1 } }} className="box-search">
                        <TextField
                            id="input-with-icon-textfield"

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Box>
                </Grid>

                <Grid alignItems="center" item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar className="bar-home font-txt">
                                <Link to="/home">
                                    <Button color="inherit">Home</Button>
                                </Link>
                                
                                <Link to="/posts">
                                    <Button color="inherit">Postagens</Button>
                                </Link>
                                <Link to="/formularioPostagem">
                                    <Button color="inherit">Nova Postagem</Button>
                                </Link>
                                
                                
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>

                <Grid alignItems="center" item xs={12}>
                    <Box paddingX={20} className="container-header">
                        <Typography variant="h3" gutterBottom component="h3" align="center" className="titulo">REFÚGIO MENTAL</Typography>
                        <Typography variant="h5" gutterBottom component="h5" align="center" className="subtitulo-txt-animado">Um lugar de segurança e fortalecimento da sua saúde mental.</Typography>
                    </Box>
                </Grid>
                
                <Grid alignItems="center" item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <img src="https://img.freepik.com/fotos-premium/diversas-pessoas-felizes-juntos-no-parque_53876-87107.jpg?w=900" alt="" width={'500px'} />
                    </Box>

                </Grid>

                <Grid alignItems="center" item xs={12}>
                    <Box padding={10} className="container-txts">
                        <Typography variant="h4" gutterBottom component="h4" align="center" className="txt1">Compartilhe dicas, conheça profissionais competentes, desabafe.</Typography>
                        <Typography align="center" className="txt2">
                            Aqui é um lugar seguro para você.
                        </Typography>
                    </Box>

                <Grid alignItems="center" item xs={12}  container justifyContent="center">
                    {
                    temas.map(tema =>(
                        <Box display="flex" alignItems="center" justifyContent="center" className="container-temas">
                        
                        <Box  marginRight={2}  paddingX={5}>
                            <Card variant="outlined">
                                <Box>                            
                                    
                                    <Typography className="txt2">
                                        <FavoriteBorderIcon className='icons-temas'/>
                                        Temas em alta
                                    </Typography>
                                    
                                </Box>

                                <React.Fragment>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" className="txt2">
                                        {tema.nome}
                                        </Typography>
                                        <Typography className="txt2">
                                        {tema.descricao}
                                        </Typography>
                                        
                                    </CardContent>
                                    <CardActions>
                                    <Link to={`/temas`} className="text-decorator-none">
                                        <Button size="small" className="botao">Ver Temas</Button>
                                    </Link>
                                    </CardActions>
                                </React.Fragment>
                            </Card>
                        </Box> 
                    </Box>
                    ))
                }
            </Grid>
            
            <Grid xs={12} >
              <Box display="flex" justifyContent="center" padding={10}>
                <Link to='/formularioTema'>
                    <Button variant="outlined" className="botao">Criar um novo tema</Button>
                </Link>
                        
                </Box>
            </Grid>
        </Grid>
        
        <Grid xs={12} >

        <TabPostagem/>   
       
        </Grid>    

                <Grid xs={12} className="postagens">

                </Grid>

        </Grid>

            <Grid container justifyContent="center" alignItems="center" xs={12} className="assuntos-relacionados">
                <Box paddingX={5}>
                    <img src="https://img.freepik.com/fotos-gratis/mulher-feliz-e-relaxada-pega-um-momento-despreocupado-desfruta-da-liberdade-canta-musica-mantem-os-bracos-levantados-fecha-os-olhos-danca-ao-som-da-musica-favorita-usa-camiseta-amarela-casual-isolada-na-parede-branca_273609-53278.jpg" alt="" className="imgs" />
                    <Typography>
                        Dicas de bem estar
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://vivamais.cemigsaude.org.br/wp-content/uploads/2020/10/diferen%C3%A7a-entre-terapia-e-an%C3%A1lise-scaled.jpeg" alt="" className="imgs" />
                    <Typography>
                        Anúncios Psicólogs
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://www.psitto.com.br/wp-content/uploads/2021/05/terapia-online-os-cinco-melhores-sites-para-se-consultar-com-psicologo-em-casa.jpg" alt="" className="imgs" />
                    <Typography>
                        Atendimento on-line
                    </Typography>
                </Box>
                <Box paddingX={5}>
                    <img src="https://pressreleases.scielo.org/wp-content/uploads/2020/11/csc-imagem.jpg" alt="" className="imgs" />
                    <Typography>
                        Atendimento público
                    </Typography>
                </Box>

            </Grid>
            
        
        </>
    );
}

export default Home;