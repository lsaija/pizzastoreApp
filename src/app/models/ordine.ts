import { Cliente } from "./cliente";
import { Pizza } from "./pizza";
import { Utente } from "./utente";

export interface Ordine {

    id?:number;
    data:Date;
    closed:boolean;
    codice:string;
    costoTotale:number;
    cliente:Cliente;
    fattorino?:Utente;
    listaPizze?:Pizza[];
}
