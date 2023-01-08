import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Cliente } from 'src/app/models/cliente';
import { Ordine } from 'src/app/models/ordine';
import { Pizza } from 'src/app/models/pizza';
import { PizzaChecked } from 'src/app/models/pizza-checked';
import { Utente } from 'src/app/models/utente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataSearchService } from 'src/app/services/data-search.service';
import { OrdineService } from 'src/app/services/ordine.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UtenteService } from 'src/app/services/utente.service';




@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css']
})
export class DetailOrdineComponent {

  clienti: Cliente[] = [];
  fattorini: Utente[]=[];
  pizze:Pizza[]=[];
  clienteId?: number;
  //lista pizze boolean
  pizzeC: PizzaChecked[] = [];

  constructor(private ordineService: OrdineService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService,
    private clienteService:ClienteService,
    private fattorinoService: UtenteService,
    private pizzaService: PizzaService) {
  }

  ordineReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    data: this.fb.nonNullable.control('', [Validators.required]),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    costoTotale: this.fb.nonNullable.control(''),
    closed: this.fb.nonNullable.control(''),
    cliente: this.fb.nonNullable.control('', [Validators.required]),
    fattorino: this.fb.nonNullable.control('', [Validators.required]),
    listaPizze: this.fb.nonNullable.array([], [Validators.required])
  });
  
  statsOrdineReactive: FormGroup = this.fb.group({
    dataInizio: this.fb.nonNullable.control('', [Validators.required]),
    dataFine: this.fb.nonNullable.control('', [Validators.required])
  });


  urlFlag: string = "";
  errorMessage: string = "";
  date: any;

  ngOnInit(): void {
    
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    //aggiunta per lista pizze
    this.ordineService.getOrdine(id).subscribe(o => { 
      this.ordineReactive.patchValue(o);
      this.pizzaService.getPizze().subscribe(res => {
        this.pizze = res;
        this.pizzeC.forEach(p => {
          p.checked = this.isPizzaChecked(p.descrizione!);
        })
      });
      // this.ordineReactive.value.listaPizze?.forEach((p: { descrizione: any; }) => {
        // console.log(p.descrizione);
      // })
    }); 
    //fino qua

    if (operation?.includes("readOnly")) {
      this.ordineReactive!.disable();
      this.urlFlag = "readOnlyActivated";
      this.clienteService.getClienti().subscribe(clientiListItem => this.clienti = clientiListItem);
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
      this.ordineReactive.get('data')?.removeValidators([Validators.required]);
      this.ordineReactive.get('codice')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.ordineReactive.get('cliente')?.removeValidators([Validators.required]);
      this.ordineReactive.get('fattorino')?.removeValidators([Validators.required])
      this.ordineReactive.get('listaPizze')?.removeValidators([Validators.required])
    }

    if(this.router.url.includes('report')) {
      this.urlFlag = "reportActivated";
      this.ordineReactive.get('data')?.removeValidators([Validators.required]);
      this.ordineReactive.get('codice')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.ordineReactive.get('cliente')?.removeValidators([Validators.required]);
      this.ordineReactive.get('fattorino')?.removeValidators([Validators.required])
      this.ordineReactive.get('listaPizze')?.removeValidators([Validators.required])
    }

    if(this.router.url.includes('statistiche')) {
      this.urlFlag = "statsActivated";
    }

    if (!operation?.includes("add") && !operation?.includes("search")) {
      this.ordineReactive!.get('id')?.setValue(id);
      this.ordineService.getOrdine(id).subscribe(res => {
        this.ordineReactive!.patchValue(res);
      });
     //aggiunta per lista pizze
      this.pizzaService.getPizze().subscribe(res => {
        this.pizze = res;
        this.pizzeC.forEach(p => {
          p.checked = this.isPizzaChecked(p.descrizione!);
        })
      });
      //fino qua
    }

    if (operation && !operation?.includes("add") && !operation?.includes("search")) {
      const add: FormArray = this.ordineReactive.get('listaPizze') as FormArray;
      this.ordineReactive.get('id')?.setValue(id);
      this.ordineService.getOrdine(id).subscribe(res => {
        this.date = res.data;
        this.ordineReactive.patchValue(res);
        
        res.listaPizze?.forEach(element => {
          add.push(new FormControl(element))
        });
       //aggiunta per lista pizze
        this.pizzaService.getPizze().subscribe(res => {
          this.pizze = res;
          this.pizzeC.forEach(p => {
            p.checked = this.isPizzaChecked(p.descrizione!);
          })
        });
        //fino qua
      });
    }

    this.clienteService.getClienti().subscribe(res => {
      this.clienti = res;
    });

    this.ordineService.getFattorini().subscribe(res => {
      this.fattorini = res;
    });

    this.pizzaService.getPizze().subscribe(res => {
      this.pizze = res;
    });
    //aggiunta per lista pizze
    this.pizzaService.getPizze().subscribe(res => {
      this.pizze = res;
      this.pizzeC.forEach(p => {
        p.checked = this.isPizzaChecked(p.descrizione!);
      })
    });
    //fino qua
    
  }

  handleFormRequest(): void {
    
    if (this.urlFlag == "addActivated") {

      let date = this.ordineReactive.get('data')?.value.toISOString();
      let dateForm = date?.split('T')[0]!;
      this.ordineReactive.get('data')?.setValue(dateForm);

      this.ordineService.addOrdine(this.ordineReactive.getRawValue()).subscribe({
        next: ordineItem => this.ordineReactive.patchValue(ordineItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {

      if(this.date != this.ordineReactive.get('data')?.value) {

      let date = this.ordineReactive.get('data')?.value.toISOString();
      let dateForm = date?.split('T')[0]!;
      this.ordineReactive.get('data')?.setValue(dateForm);

      }
      
      this.ordineService.editOrdine(this.ordineReactive.value).subscribe({
        next: ordineItem => this.ordineReactive.patchValue(ordineItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if(this.urlFlag == "searchActivated" || this.urlFlag == "reportActivated") {

      if(this.ordineReactive.get('data')?.value != '') {

      let date = this.ordineReactive.get('data')?.value.toISOString();
      let dateForm = date?.split('T')[0]!;
      this.ordineReactive.get('data')?.setValue(dateForm);

      }

      if(this.ordineReactive.get('cliente')?.value == '') {
        this.ordineReactive.get('cliente')?.setValue(null);
        // this.ordineReactive.get('cliente')?.disable();
      }

      if(this.ordineReactive.get('fattorino')?.value == '') {
        this.ordineReactive.get('fattorino')?.setValue(null);
        // this.ordineReactive.get('fattorino')?.disable();

      }


      this.ordineService.search(this.ordineReactive.value).subscribe({
        next: ordineItem => this.dataSearchService.setData(ordineItem),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"true"}})
      });

    }
    if(this.urlFlag == "statsActivated") {

      let dateStart = this.statsOrdineReactive.get('dataInizio')?.value.toISOString();
      let dateFormStart = dateStart?.split('T')[0]!;
      this.statsOrdineReactive.get('dataInizio')?.setValue(dateFormStart);

        let dateEnd = this.statsOrdineReactive.get('dataFine')?.value.toISOString();
        let dateFormEnd = dateEnd?.split('T')[0]!;
        this.statsOrdineReactive.get('dataFine')?.setValue(dateFormEnd);
  

      this.ordineService.getRicaviTotali(this.statsOrdineReactive.value).subscribe({
        next: ricaviItem => this.dataSearchService.setRicavi(ricaviItem),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"false"}})
      });

      this.ordineService.getOrdiniTotali(this.statsOrdineReactive.value).subscribe({
        next: ordiniItem => this.dataSearchService.setOrdini(ordiniItem),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"false"}})
      });

      this.ordineService.getPizzeTotali(this.statsOrdineReactive.value).subscribe({
        next: pizzeItem => this.dataSearchService.setPizze(pizzeItem),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"false"}})
      });

      this.ordineService.getClientiVirtuosi(this.statsOrdineReactive.value).subscribe({
        next: clienti => this.dataSearchService.setData(clienti),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"false"}})
      });

    } 
  }

  please(event: MatCheckboxChange) {
    const add: FormArray = this.ordineReactive.get('listaPizze') as FormArray;
    if (event.source.checked) {
      // add.addValidators([Validators.required])
      add.push(new FormControl(event.source.value));
    } else {
      add.removeAt(add.value.indexOf(event.source.value))
    }
    
  }

  compareObjects(o1: any, o2: any): boolean {
    if(o1 && o2) {
    return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  doCheck(pizza: Pizza): boolean {

    const add: FormArray = this.ordineReactive.get('listaPizze') as FormArray;
    if(add.value!.find((e: Pizza) => e != null)){
    // add.addValidators([Validators.required]);
    return add.value.find((element: Pizza) => element.id == pizza.id);
    }
    return false;
  }

  //aggiunta per lista pizze
  isPizzaChecked(pizzaDescription: string): boolean {
    let output: boolean = false;
    if (this.urlFlag == "editActivated") {
      this.ordineReactive.value.pizze?.forEach((p: { descrizione: string; })=> {
        if (pizzaDescription === p.descrizione)
          output = true;
      });
    }
    return output;
  }
  //fino qua

  //metodo conversione Pizze-id[]
  getPizzeid(listaPizze:Pizza[]):number[]{
    let pizzaids:number[]=[];
    listaPizze.forEach(p=>{pizzaids.push(p.id!)});
    return pizzaids;
  }
  pizzeids=this.getPizzeid(this.pizze);
    //metodo check con id
  doCheckId(pizzaId: number): boolean {
    let pizzaids=this.getPizzeid(this.pizze);
    const add: FormArray = this.ordineReactive.get('pizzaIds') as FormArray;
    if(add.value!.find((e: number) => e != null)){
    return add.value.find((element: number) => element == pizzaId);
    }
    return false;
  }

  
}


