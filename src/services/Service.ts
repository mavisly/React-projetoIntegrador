import axios from "axios";

export const api = axios.create({
    baseURL:"https://refugiomental.onrender.com"
})

export const cadastroUser = async(url:any,dados:any,setDado:any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data)
}