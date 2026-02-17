import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbService } from '../../db-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collectionrequestreplied',
  imports: [CommonModule,RouterModule],
  templateUrl: './collectionrequestreplied.html',
  styleUrl: './collectionrequestreplied.scss',
})
export class Collectionrequestreplied {
  public replied: any[] = [];

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.db.collectionrequestview({}).then((data: any) => {
      if (Array.isArray(data)) {
        this.replied = data.filter((r: any) => r.reply_message && r.reply_message !== '');
      } else {
        this.replied = [];
      }
      this.cdr.detectChanges();
    });
  }
}
