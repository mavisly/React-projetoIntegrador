import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Grid, Link, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useEffect, useState } from "react";
import './DuvidasFrequentes.css'
import { TabContext, TabPanel } from "@material-ui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function DuvidasFrequentes() {

    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }

    return (
        <Grid  xs={12} container direction='row' justifyContent='center' alignItems='center' className="container-img">

            <Grid item xs={8} justifyContent={'center'} alignItems='center' className="container-tab">
              
                    <TabContext value={value}>
                        <AppBar position="static" className='bg-tab-contato'>
                            <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                                <Tab label="Dúvidas Postagens" value="1" id='posts' />
                                <Tab label="Dúvidas Temas" value="2" id='temas' />
                            </Tabs>
                        </AppBar>
                        
                        <TabPanel value="1" >
                            <Box flexWrap="wrap" justifyContent="center" className="container-duvidas">

                            <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>Como visualizo as minhas postagens?</Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Typography>
                                            Na sua página inicial, clique no botão "Postagens".
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>Não consigo cadastrar/atualizar uma postagem</Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Typography>
                                            Para cadastrar/atualizar uma postagem, fique atento à quantidade de caracteres  inseridos em cada campo, pois por motivos de segurança, são definidas quantidades mínimas de caracteres.
                                            
                                        </Typography>
                                    </AccordionDetails>
                                    
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>Preciso preencher todos os campos do Cadastro de Postagem?</Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Typography>
                                            Não. Ao cadastrar uma postagem, apenas os campos marcados com um asterisco ( * ) são obrigatórios.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>


                            </Box>
                        </TabPanel>
                        <TabPanel value="2">

                    <Box flexWrap="wrap" justifyContent="center" className="container-duvidas">

                    <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>Como visualizo todos os Temas?</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    Na página inicial, em "Temas em Alta", clique no botão "Ver Temas"
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>Não consigo cadastrar/atualizar um Tema</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    Para cadastrar/atualizar um Tema, fique atento à quantidade de caracteres  inseridos em cada campo, pois por motivos de segurança, são definidas quantidades mínimas de caracteres.
                                    
                                </Typography>
                            </AccordionDetails>
                            
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>Preciso preencher todos os campos do Cadastro de Temas?</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    Não. Ao cadastrar um Tema, apenas os campos marcados com um asterisco ( * ) são obrigatórios.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>


    </Box>


                        </TabPanel>
                    </TabContext>
                
            </Grid>
        </Grid>
    );
}

export default DuvidasFrequentes;