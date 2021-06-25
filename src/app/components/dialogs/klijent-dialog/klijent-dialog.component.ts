import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Klijent } from 'src/app/models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {

  public flag: number;
  krediti: Kredit[];//uraditi

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KlijentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data:Klijent,
              public klijentService: KlijentService,
              public kreditService: KreditService) { }

  ngOnInit(): void {
    this.kreditService.getAllKrediti().subscribe( data =>
      {
        this.krediti = data;
      });
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.klijentService.addKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat klijent: ' + this.data.ime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog klijenta.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.klijentService.updateKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan klijent: ' + this.data.ime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene klijenta.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.klijentService.deleteKlijent(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan klijent: ' + this.data.ime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisnaja klijenta.', 'Zatvori', {
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
