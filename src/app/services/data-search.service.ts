import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {
  constructor() { }

  data: any;
  ricavi: number = 0;
  ordini: number= 0;
  pizze: number = 0;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  setRicavi(ricaviInput: number) {
    this.ricavi = ricaviInput
  }

  getRicavi(): number {
    return this.ricavi;
  }

  setOrdini(ordiniInput: number) {
    this.ordini = ordiniInput;
  }

  getOrdini(): number {
    return this.ordini;
  }

  setPizze(pizzeInput: number) {
    this.pizze = pizzeInput;
  }

  getPizze(): number {
    return this.pizze;
  }
}
