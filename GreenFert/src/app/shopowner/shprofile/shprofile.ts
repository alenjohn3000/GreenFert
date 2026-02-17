import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-shprofile',
  imports: [RouterModule, CommonModule],
  templateUrl: './shprofile.html',
  styleUrl: './shprofile.scss',
})
export class Shprofile {
  profile: any = null;
  loading = true;
  showImageModal = false;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.db.getshopownerprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.profile = Array.isArray(data) && data.length > 0 ? data[0] : null;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  openImageModal() {
    if (this.profile?.shopimg) {
      this.showImageModal = true;
    }
  }

  closeImageModal() {
    this.showImageModal = false;
  }
}
