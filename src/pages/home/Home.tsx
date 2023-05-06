import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { AppBar, Box, Card, CardActionArea, CardMedia, InputAdornment, TextField, Toolbar } from "@mui/material";
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

    async function getTema() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
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

                    <Grid alignItems="center" item xs={12} container justifyContent="center">
                        {
                            temas.map(tema => (
                                <Box display="flex" alignItems="center" justifyContent="center" className="container-temas">

                                    <Box marginRight={2} paddingX={5}>
                                        <Card variant="outlined">
                                            <Box>

                                                <Typography className="txt2">
                                                    <FavoriteBorderIcon className='icons-temas' />
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

                <Grid xs={12} alignItems="center" container justifyContent="center">
                    <AppBar position="static" className="bar-2">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div" className="txt2">
                                Assuntos que podem te interessar.
                            </Typography>
                        </Toolbar>
                    </AppBar>
                   

                        <Box>
                            <Card sx={{ width: 345 }}>
                               
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image="https://img.freepik.com/vetores-gratis/ilustracao-plana-do-dia-mundial-da-saude_23-2149340454.jpg?w=740&t=st=1683121465~exp=1683122065~hmac=14efcbcc91d09f035a964751f4d483bf6a0a8fe285b66dca461eaec75b35d2bf"
                                        alt="green iguana"
                                    />
                                    <CardContent className="card">
                                        <Typography gutterBottom variant="h5" component="div" className="txt2">
                                            ODS 3
                                        </Typography>
                                        <Typography variant="h6" className="txt2">
                                        Saúde e Bem-Estar
                                        </Typography>
                                        <Typography variant="body2" className="txt2">
                                            Garantir o acesso à saúde de qualidade e promover o bem-estar para todos, em todas as idades
                                        </Typography>
                                    </CardContent>
                               
                                <CardActions>
                                    <Link to='https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental' target="_blank">
                                    <Button size="small" color="primary" className="botao">
                                        Ver Artigo Completo
                                    </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>

                        <Box paddingX={5}>
                            <Card sx={{ width: 345 }}>
                                
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image="https://img.freepik.com/fotos-premium/maos-segurando-um-cerebro-e-um-coracao-de-papel-dia-mundial-do-coracao_49149-1474.jpg?w=900"
                                        alt=""
                                        className="card-img"
                                    />
                                    <CardContent className="card">
                                        <Typography gutterBottom variant="h5" component="div" className="txt2">
                                        Saúde Mental
                                        </Typography>
                                        <Typography variant="h6" className="txt2">
                                        Saúde e Bem-Estar
                                        </Typography>
                                        <Typography variant="body2" className="txt2">
                                        A Política Nacional de Saúde Mental é uma ação do Governo Federal, coordenada pelo Ministério da Saúde, que compreende as estratégias e...
                                        </Typography>
                                    </CardContent>
                               
                                <CardActions>
                                    <Link to='https://brasil.un.org/pt-br/sdgs/3' target="_blank">
                                    <Button size="small" color="primary" className="botao">
                                        Ver Artigo Completo
                                    </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>
                </Grid>

            </Grid>
        </>
    );
}

export default Home;