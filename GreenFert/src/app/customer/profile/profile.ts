import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  profile: any = null;
  loading = true;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.db.getcustomerprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.profile = Array.isArray(data) && data.length > 0 ? data[0] : null;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
