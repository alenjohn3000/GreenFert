import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-wcprofile',
  imports: [RouterModule, CommonModule],
  templateUrl: './wcprofile.html',
  styleUrl: './wcprofile.scss',
})
export class Wcprofile {
  profile: any = null;
  loading = true;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.db.getcollectorprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.profile = Array.isArray(data) && data.length > 0 ? data[0] : null;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
