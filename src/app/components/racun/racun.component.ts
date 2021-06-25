import { Component, OnInit, Input, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RacunService } from 'src/app/services/racun.service';
import { MatDialog } from '@angular/material/dialog';
import { Racun } from 'src/app/models/racun';
import { Klijent } from 'src/app/models/klijent';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnChanges, OnDestroy  {

  @Input() selektovaniTipRacuna: TipRacuna
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'tipRacuna', 'klijent', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private racunService: RacunService,
              private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    }


  ngOnChanges(): void {
    if(this.selektovaniTipRacuna.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
   // this.loadData();
  }

  public loadData() {
    this.subscription = this.racunService.getRacuniZaTipRacuna(this.selektovaniTipRacuna.id).subscribe(
      data => {
          this.dataSource  = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
         this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'klijent' ? currentTerm + (data.klijent.ime + ' ' + data.klijent.prezime) : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'klijent': return (data.klijent.ime + ' ' + data.klijent.prezime).toLocaleLowerCase();
            default: return data[property];
          }
        };

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string, tipRacuna?: TipRacuna, klijent?: Klijent) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id, naziv, oznaka, opis, tipRacuna, klijent}});
    dialogRef.componentInstance.flag = flag;
    if(flag == 1 ){
      dialogRef.componentInstance.data.tipRacuna = this.selektovaniTipRacuna;
    }
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
