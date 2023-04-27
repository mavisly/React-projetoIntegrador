import Tema from "./Tema";

interface Postagem{
    id:number, 
    informacoes:string, 
    tipo_profissional:string, 
    atendimento:string,
    modalidade_categoria:string,
    avaliacao:string,
    image_link: string,
    tema?: Tema | null
}

export default Postagem;