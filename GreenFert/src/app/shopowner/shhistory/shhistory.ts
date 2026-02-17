import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-shhistory',
  imports: [RouterModule, CommonModule],
  templateUrl: './shhistory.html',
  styleUrl: './shhistory.scss',
})
export class Shhistory {
  loading = true;
  history: any[] = [];

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.db.shopownercollectionhistory({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.history = Array.isArray(data) ? data : [];
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
