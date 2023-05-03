import { useEffect, useState } from "react";
import Loader from "../../loader/loader";
import ListaPostagem from "../listapostagem/ListaPostagem";
import { Grid } from "@mui/material";

function Posts () {
    const [removeloader, setRemoveLoader] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setTimeout (() => {
          {!removeloader && <Loader />}
        }, 3000)
    } , []);
    useEffect(() => {
        setTimeout(() => {
          setShowSpinner(false);
          setShowContent(true);
        }, 3000); // Tempo em milissegundos
      }, []);
return(
  <>
<Grid container>
    <Grid item xs={6} ></Grid>
    <Grid item xs={2}>{showSpinner && <Loader /> }</Grid>
  
  </Grid>
    <Grid item xs={4} className="background"></Grid>
  <Grid container>
    <Grid item xs={2} className="background"></Grid>
    <Grid item xs={8}>
    {showContent && <ListaPostagem/>}
    </Grid>
    <Grid item xs={2} className="background"></Grid>
</Grid>
  </>
)
}
export default Posts;