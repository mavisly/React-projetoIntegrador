import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';
import CadastroPosts from '../cadastroPosts/CadastroPosts';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className='bg-tbpostagem'>
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" id='posts'/>
            <Tab label="Nova postagem" value="2" id='novapostagem'/>
          </Tabs>
        </AppBar>

        <TabPanel value="1">  
                <Box className='container-listaposts' display={'flex'} alignContent={'flex-start'} flexWrap={'wrap'}>
                    <ListaPostagem />
                </Box>        
        </TabPanel>

        <TabPanel value="2">
          <CadastroPosts />
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;