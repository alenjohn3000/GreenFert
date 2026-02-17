import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todayview',
  imports: [RouterModule, CommonModule],
  templateUrl: './todayview.html',
  styleUrl: './todayview.scss',
})
export class Todayview {
  public wcarray: any[] = [];
  wc_id: any;
  date: any;
  todayDate: any;

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    rout: ActivatedRoute
  ) {
    rout.paramMap.subscribe((params: ParamMap) => {
      this.wc_id = params.get('id');
      this.todayDate = params.get('date');
    });
  }

  ngOnInit(): void {
    this.viewdata();
  }

  viewdata() {
    this.db.wctodayview({
      id: this.wc_id,
      date: this.todayDate
    }).then((data: any) => {
      this.wcarray = data;
      this.cdr.detectChanges();
    });
  }


}
