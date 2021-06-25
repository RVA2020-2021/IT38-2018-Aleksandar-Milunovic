import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Kredit } from 'src/app/models/kredit';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { KreditService } from 'src/app/services/kredit.service';
import { MatDialog } from '@angular/material/dialog';
import { KreditDialogComponent } from '../dialogs/kredit-dialog/kredit-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-kredit',
  templateUrl: './kredit.component.html',
  styleUrls: ['./kredit.component.css']
})
export class KreditComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource: MatTableDataSource<Kredit>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private kreditService: KreditService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.kreditService.getAllKrediti().subscribe(
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

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string): void {
    const dialogRef = this.dialog.open(KreditDialogComponent, {data: {id, naziv, oznaka, opis}});
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
