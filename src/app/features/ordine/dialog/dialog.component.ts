import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ordine } from 'src/app/models/ordine';
import { OrdineService } from 'src/app/services/ordine.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {


  ordineToDelete?: Ordine;

  constructor(private ordineService: OrdineService, private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idOrdine: number }) {
    if (data) {
      this.getOrdine(data.idOrdine);
    }
  }

  getOrdine(idOrdine: number) {
    this.ordineService.getOrdine(idOrdine).subscribe(res => {
      if (res) {
        this.ordineToDelete = { ...res }
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.ordineService.delete(this.data.idOrdine).subscribe(res => {
      this.snackBarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])
    });
    this.dialogRef.close();
  }

}
