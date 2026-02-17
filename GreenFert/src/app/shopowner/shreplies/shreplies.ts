import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-shreplies',
  imports: [RouterModule, CommonModule],
  templateUrl: './shreplies.html',
  styleUrl: './shreplies.scss',
})
export class Shreplies {
  loading = true;
  replies: any[] = [];

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadReplies();
  }

  loadReplies() {
    this.loading = true;
    this.db.collectionrequestbyowner({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data)) {
        this.replies = data.filter((r: any) => r.reply_message && r.reply_message !== '');
      } else {
        this.replies = [];
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
