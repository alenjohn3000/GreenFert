import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-adminmaster',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './adminmaster.html',
  styleUrl: './adminmaster.scss',
})
export class Adminmaster {
  requestCount = 0;
  requestPreview: any[] = [];
  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadRequestCount();
  }

  loadRequestCount() {
    this.db.collectionrequestview({}).then((data: any) => {
      if (Array.isArray(data)) {
        const pending = data.filter((r: any) => !r.reply_message || r.reply_message === '');
        this.requestCount = pending.length;
        this.requestPreview = pending.slice(0, 3);
      } else {
        this.requestCount = 0;
        this.requestPreview = [];
      }
      this.cdr.detectChanges();
    });
  }
}
