import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-adminprofileedit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './adminprofileedit.html',
  styleUrl: './adminprofileedit.scss',
})
export class Adminprofileedit {
  profilefg!: FormGroup;
  savestatus = false;

  constructor(private fb: FormBuilder, private db: DbService, private rout: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.profilefg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.minLength(6)]],
    });

    this.db.getadminprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profilefg.patchValue({ username: data[0].username });
        this.cdr.detectChanges();
      }
    });
  }

  saveProfile() {
    if (!this.profilefg.valid) {
      this.savestatus = true;
      return;
    }

    const payload = {
      loginid: localStorage.getItem('login_id'),
      username: this.profilefg.value.username,
      password: this.profilefg.value.password || '',
    };

    this.db.updateadminprofile(payload).then((result: any) => {
      if (result.message === 'success') {
        alert('Profile updated successfully');
        this.rout.navigate(['/adminmaster/adminprofile']);
      } else {
        alert('Error occurred while updating profile');
      }
    });
  }
}
