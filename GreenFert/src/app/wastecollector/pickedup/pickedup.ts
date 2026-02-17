import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-pickedup',
  imports: [RouterModule, CommonModule],
  templateUrl: './pickedup.html',
  styleUrl: './pickedup.scss',
})
export class Pickedup {
  public collectedArray: any[] = [];
  constructor(private db: DbService, private cdr: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.db.getstatusview({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.collectedArray = data;
      this.cdr.detectChanges();
    });
  }
}
