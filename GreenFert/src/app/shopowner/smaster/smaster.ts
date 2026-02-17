import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-smaster',
  imports: [RouterModule, CommonModule],
  templateUrl: './smaster.html',
  styleUrl: './smaster.scss',
})
export class Smaster {
  replyCount = 0;
  replyPreview: any[] = [];
  cartCount: any;
  profile: any = null;
  
  constructor(private db: DbService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadReplies();
    this.loadProfile();
    this.db.cartnum({
      loginid: localStorage.getItem('login_id')
    }).then((data: any) => {

      this.cartCount = data[0]?.cartCount || 0;
      this.cdr.detectChanges();
    });
  }

  loadProfile() {
    this.db.getshopownerprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profile = data[0];
      }
      this.cdr.detectChanges();
    });
  }

  loadReplies() {
    this.db.collectionrequestbyowner({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data)) {
        const replied = data.filter((r: any) => r.reply_message && r.reply_message !== '');
        this.replyCount = replied.length;
        this.replyPreview = replied.slice(0, 3);
      } else {
        this.replyCount = 0;
        this.replyPreview = [];
      }
      this.cdr.detectChanges();
    });
  }
}
