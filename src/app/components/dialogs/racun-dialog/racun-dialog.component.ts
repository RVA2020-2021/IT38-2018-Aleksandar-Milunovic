import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { Klijent } from 'src/app/models/klijent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RacunComponent } from '../../racun/racun.component';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';
import { Subscription } from 'rxjs';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { KlijentService } from 'src/app/services/klijent.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styles: [
  ]
})
export class RacunDialogComponent implements OnInit, OnDestroy {

  klijenti: Klijent[];
  public flag: number;
  klijentSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public klijentService: KlijentService,
              public racunService: RacunService) { }


  ngOnDestroy(): void {
    this.klijentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.klijentSubscription = this.klijentService.getAllKlijenti().subscribe(
      data => {
        this.klijenti = data;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat račun: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog računa.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno ažuriran račun: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom ažuriranja računa.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan račun: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja računa.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }

}
