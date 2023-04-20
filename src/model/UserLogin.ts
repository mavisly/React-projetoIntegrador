interface UserLogin {
    id:	number;
    nome:string;
    usuario:string;
    email:string;
    senha:string;
    foto:string;
    token?:string | null;
}

export default UserLogin;