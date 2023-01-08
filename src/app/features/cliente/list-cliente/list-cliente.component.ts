import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataSearchService } from 'src/app/services/data-search.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent {
  constructor(private clienteService: ClienteService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, private dataSearchService: DataSearchService) {}
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'indirizzo', 'attivo', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('search');
    this.urlSearchOperationFlag = operation;
    if(operation == 'true') {
      this.dataSource.data = this.dataSearchService.getData();
    } else {
      this.getData();
    }
  }

  openDialog(idCliente: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {idCliente}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clienteService.getClienti().subscribe(res => {
        this.dataSource.data = res;
      })
    });
  }


  getData() {
    this.clienteService.getClienti().subscribe(res => {
      this.dataSource.data = res;
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["cliente/", id], {queryParams: {operation:"readOnly"}});
  }

  onClickDelete(id: number) {
    this.openDialog(id);
  }

  onClickAddNew() {
    this.router.navigate(["cliente/create"], {queryParams: {operation:"add"}});
  }

  onClickUpdate(id: number) {
    this.router.navigate(["cliente/edit/", id], {queryParams: {operation:"edit"}});
  }

  resetDataSource() {
    this.getData();
    this.urlSearchOperationFlag = "";
  }

}
