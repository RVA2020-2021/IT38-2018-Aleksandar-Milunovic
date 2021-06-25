import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { MatDialog } from '@angular/material/dialog';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource: MatTableDataSource<TipRacuna>;
  subscription: Subscription;
  selektovaniTipRacuna: TipRacuna;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private tipRacunaService: TipRacunaService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.tipRacunaService.getAllTipoviRacuna().subscribe(
      data => {
          this.dataSource  = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  selectRow(row) {
    console.log(row);
    this.selektovaniTipRacuna = row;
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string): void {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: {id, naziv, oznaka, opis}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res =>  {
      if(res == 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;

  }

}
