import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-pstatus',
  imports: [RouterModule,CommonModule],
  templateUrl: './pstatus.html',
  styleUrl: './pstatus.scss',
})
export class Pstatus {
   public warray: any[] = [];
  public wcdetails: any[] = [];
  public collectedToday = false;
  public collectedDetails: any[] = [];
  showHelp = false;

  constructor(private db: DbService, private cdr: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    console.log(localStorage.getItem('login_id'));
    this.db.wcassign({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.warray = data;
      this.cdr.detectChanges();
      console.log(this.warray);
    });
    this.db.getwcdetails({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.wcdetails = data;
      this.cdr.detectChanges();
      console.log(this.wcdetails);
    });

    this.db.shopownercollectedtoday({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.collectedToday = !!data?.collected;
      this.collectedDetails = Array.isArray(data?.details) ? data.details : [];
      this.cdr.detectChanges();
    });
  }


  cancelWaste() {
    this.db.markcancelled({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (data.message == 'success') {
        alert('cancel successfully');
        window.location.reload();
      }
      else {
        alert('Error Occurred');

      }
    })
  }


}
