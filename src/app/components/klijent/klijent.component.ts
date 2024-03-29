import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Klijent } from 'src/app/models/klijent';
import { MatTableDataSource } from '@angular/material/table';
import { KlijentService } from 'src/app/services/klijent.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';
import { Kredit } from 'src/app/models/kredit';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private klijentService: KlijentService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.klijentService.getAllKlijenti().subscribe(
      data => {
          this.dataSource  = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
         this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'kredit': return data.kredit.naziv.toLocaleLowerCase();
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

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, kredit?: Kredit): void {
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data: {id, ime, prezime, brojLk, kredit}});
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
