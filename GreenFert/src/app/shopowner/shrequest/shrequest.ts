import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-shrequest',
  imports: [RouterModule, CommonModule],
  templateUrl: './shrequest.html',
  styleUrl: './shrequest.scss',
})
export class Shrequest {
  requestMessage = '';
  pendingDate = new Date().toISOString().split('T')[0];

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  sendCollectionRequest() {
    if (!this.requestMessage || !this.pendingDate) {
      alert('Please enter message and pending date');
      return;
    }
    this.db.collectionrequest({
      loginid: localStorage.getItem('login_id'),
      message: this.requestMessage,
      pending_date: this.pendingDate
    }).then((data: any) => {
      if (data.message === 'success') {
        alert('Request sent to admin');
        this.requestMessage = '';
      } else {
        alert('Error Occurred');
      }
      this.cdr.detectChanges();
    });
  }
}
