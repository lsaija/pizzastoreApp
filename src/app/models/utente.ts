export interface Utente {

    id?:number;
    username:string;
    password?:string;
    confermaPassword?:string;
    nome?:string;
    cognome?:string;
    email?:string;
    dateCreated?: Date;
    token:string;
    role?:string;
    stato?: 'ATTIVO' |'DISABILITATO' |'CREATO';
   
}
