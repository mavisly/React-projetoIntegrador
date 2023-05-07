import Tema from "./Tema";
import User from "./User";

interface Postagem{
    id:number, 
    informacoes:string, 
    tipo_profissional:string, 
    atendimento:string,
    modalidade_categoria:string,
    avaliacao?:string | null,
    image_link: string,
    tema?: Tema | null,
    usuario?: User | null 
}

export default Postagem;