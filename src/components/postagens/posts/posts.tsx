import { useEffect, useState } from "react";
import Loader from "../../loader/loader";
import ListaPostagem from "../listapostagem/ListaPostagem";

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
    {showSpinner && <Loader />}
    {showContent && <ListaPostagem/>}
    </>
)
}
export default Posts;