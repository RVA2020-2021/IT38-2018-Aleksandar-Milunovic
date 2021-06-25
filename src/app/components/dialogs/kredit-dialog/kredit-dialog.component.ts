import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KreditDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data:Kredit,
              public kreditService: KreditService) { }

  ngOnInit(): void {
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.kreditService.addKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat kredit: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog kredita.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.kreditService.updateKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspešno ažuriran kredit: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom ažuriranja kredita.', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.kreditService.deleteKredit(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan kredit: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja kredita.', 'Zatvori', {
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
