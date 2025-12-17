import { getUsers } from "../helpers/storage";
import bcrypt from "bcryptjs";


export default function validarCredenciales(username, password) {
    //existe username y password
    //password longitud>8
    //existe user y password en localStorage 
    //nota: siempre, siempre, siempre trimear la data de los formularios.
    if (!username.trim() || !password.trim() || password.length < 3) { return false };
    
    const users = getUsers();
    const user = users.find((user)=> user.username === username );
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const ok = bcrypt.compareSync(username.passwordHash, hash);
    return ok;
    
}