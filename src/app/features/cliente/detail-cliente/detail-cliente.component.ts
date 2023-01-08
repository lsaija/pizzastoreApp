import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataSearchService } from 'src/app/services/data-search.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface ClienteForm extends FormGroup<{
  id: FormControl<any>;
  nome: FormControl<string>;
  cognome: FormControl<string>;
  indirizzo: FormControl<string>;
  attivo: FormControl<any>;
}> { }

@Component({
  selector: 'app-detail-cliente',
  templateUrl: './detail-cliente.component.html',
  styleUrls: ['./detail-cliente.component.css']
})
export class DetailClienteComponent {

  constructor(private clienteService: ClienteService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService) {
  }

  clienteReactive: ClienteForm = this.fb.group({
    id: this.fb.control(null),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    indirizzo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    attivo: this.fb.nonNullable.control('', [Validators.required])
  });

  urlFlag: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.clienteReactive!.disable();
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
      this.clienteReactive!.get('id')?.setValue(id);
      this.clienteService.getCliente(id).subscribe(res => {
        this.clienteReactive!.patchValue(res);
      });
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
      this.clienteReactive.get('nome')?.removeValidators([Validators.required,Validators.minLength(4)]);
      this.clienteReactive.get('cognome')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.clienteReactive.get('indirizzo')?.removeValidators([Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
      this.clienteReactive.get('attivo')?.removeValidators([Validators.required])
    }

  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.clienteService.addCliente(this.clienteReactive!.getRawValue()).subscribe({
        next: clienteItem => this.clienteReactive!.patchValue(clienteItem),
        complete: () => this.router.navigate([`/cliente/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.clienteService.editCliente(this.clienteReactive!.value).subscribe({
        next: clienteItem => this.clienteReactive!.patchValue(clienteItem),
        complete: () => this.router.navigate([`/cliente/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if(this.urlFlag == "searchActivated") {
      this.clienteService.search(this.clienteReactive!.value).subscribe({
        next: clienteItem => this.dataSearchService.setData(clienteItem),
        complete: () => this.router.navigate(['/cliente/list'], {queryParams: {search:"true"}})
      });
    }
  }


}
