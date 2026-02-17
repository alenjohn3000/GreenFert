import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wchome',
  imports: [RouterModule, CommonModule],
  templateUrl: './wchome.html',
  styleUrl: './wchome.scss',
})
export class Wchome {
  public sarray: any[] = [];
  public sdetails: any[] = [];
  constructor(private db: DbService, private cdr: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.db.wcshops({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.sarray = data;
      for (let i = 0; i < this.sarray.length; i++) {
        this.db.getwstatus({ id: this.sarray[i].owner_id }).then((statusData: any) => {
            this.sarray[i].wstatus = statusData[0].wstatus;
            console.log(this.sarray);
            this.cdr.detectChanges();
        });
      }
      this.cdr.detectChanges();
      console.log(this.sarray);
    });

  }
}
