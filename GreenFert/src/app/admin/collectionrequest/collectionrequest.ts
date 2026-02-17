import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collectionrequest',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './collectionrequest.html',
  styleUrl: './collectionrequest.scss',
})
export class Collectionrequest {
  public requests: any[] = [];

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.db.collectionrequestview({}).then((data: any) => {
      if (Array.isArray(data)) {
        this.requests = data.filter((r: any) => !r.reply_message || r.reply_message === '');
      } else {
        this.requests = [];
      }
      this.cdr.detectChanges();
    });
  }

  sendReply(req: any) {
    if (!req.reply_message) {
      Swal.fire({
        icon: 'warning',
        title: 'Reply Required',
        text: 'Please enter a reply message.'
      });
      return;
    }
    this.db.collectionrequestreply({
      collectionrequest_id: req.collectionrequest_id,
      reply_message: req.reply_message
    }).then((res: any) => {
      if (res.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Reply Sent',
          text: 'Reply saved successfully.'
        });
        this.loadRequests();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to save reply.'
        });
      }
    });
  }
}
