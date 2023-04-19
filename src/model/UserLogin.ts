interface UserLogin {
    id:	number;
    nome:string;
    usuario:string;
    email:string;
    senha:string;
    token?:string | null;
    foto:string;
}

export default UserLogin;