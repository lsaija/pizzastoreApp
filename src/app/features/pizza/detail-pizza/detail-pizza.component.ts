import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataSearchService } from 'src/app/services/data-search.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


export interface PizzaForm extends FormGroup<{
  id: FormControl<any>;
  descrizione: FormControl<string>;
  ingredienti: FormControl<string>;
  prezzo: FormControl<any>;
  attivo: FormControl<any>;
}> { }


@Component({
  selector: 'app-detail-pizza',
  templateUrl: './detail-pizza.component.html',
  styleUrls: ['./detail-pizza.component.css']
})
export class DetailPizzaComponent {


  constructor(private pizzaService: PizzaService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService) {
  }

  pizzaReactive: PizzaForm = this.fb.group({
    id: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    ingredienti: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    prezzo: this.fb.nonNullable.control('', [Validators.required]),
    attivo: this.fb.nonNullable.control('', [Validators.required])
  });

  urlFlag: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.pizzaReactive!.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
    }
    if (!operation?.includes("add") && !operation?.includes("search")) {
      this.pizzaReactive!.get('id')?.setValue(id);
      this.pizzaService.getPizza(id).subscribe(res => {
        this.pizzaReactive!.patchValue(res);
      });
    }

    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
      this.pizzaReactive.get('descrizione')?.removeValidators([Validators.required,Validators.minLength(4)]);
      this.pizzaReactive.get('ingredienti')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.pizzaReactive.get('prezzo')?.removeValidators([Validators.required]);
      this.pizzaReactive.get('attivo')?.removeValidators([Validators.required])
    }

  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.pizzaService.addPizza(this.pizzaReactive!.getRawValue()).subscribe({
        next: clienteItem => this.pizzaReactive!.patchValue(clienteItem),
        complete: () => this.router.navigate([`/pizza/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.pizzaService.editPizza(this.pizzaReactive!.value).subscribe({
        next: clienteItem => this.pizzaReactive!.patchValue(clienteItem),
        complete: () => this.router.navigate([`/pizza/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if(this.urlFlag == "searchActivated") {
      this.pizzaService.search(this.pizzaReactive!.value).subscribe({
        next: clienteItem => this.dataSearchService.setData(clienteItem),
        complete: () => this.router.navigate(['/pizza/list'], {queryParams: {search:"true"}})
      });
    }
  }

}
