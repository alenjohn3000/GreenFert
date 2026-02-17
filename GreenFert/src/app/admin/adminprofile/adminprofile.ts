import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-adminprofile',
  imports: [RouterModule, CommonModule],
  templateUrl: './adminprofile.html',
  styleUrl: './adminprofile.scss',
})
export class Adminprofile {
  profile: any = null;
  loading = true;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.db.getadminprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.profile = Array.isArray(data) && data.length > 0 ? data[0] : null;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
