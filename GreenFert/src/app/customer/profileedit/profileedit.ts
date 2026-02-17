import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-profileedit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profileedit.html',
  styleUrl: './profileedit.scss',
})
export class Profileedit {
  profilefg!: FormGroup;
  savestatus = false;

  constructor(private fb: FormBuilder, private db: DbService, private rout: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.profilefg = this.fb.group({
      customername: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
      customeremail: ['', [Validators.required, Validators.email]],
      customercontact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.minLength(6)]],
    });

    this.db.getcustomerprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profilefg.patchValue({
          customername: data[0].customername,
          customeremail: data[0].customeremail,
          customercontact: data[0].customercontact,
          username: data[0].username,
        });
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
      ...this.profilefg.value,
    };

    this.db.updatecustomerprofile(payload).then((result: any) => {
      if (result.message === 'success') {
        alert('Profile updated successfully');
        this.rout.navigate(['/customermaster/profile']);
      } else {
        alert('Error occurred while updating profile');
      }
    });
  }
}
