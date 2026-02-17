import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-wcprofileedit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './wcprofileedit.html',
  styleUrl: './wcprofileedit.scss',
})
export class Wcprofileedit {
  profilefg!: FormGroup;
  savestatus = false;

  constructor(private fb: FormBuilder, private db: DbService, private rout: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.profilefg = this.fb.group({
      collectorname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
      collectoremail: ['', [Validators.required, Validators.email]],
      collectorcontact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.minLength(6)]],
    });

    this.db.getcollectorprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profilefg.patchValue({
          collectorname: data[0].collectorname,
          collectoremail: data[0].collectoremail,
          collectorcontact: data[0].collectorcontact,
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

    this.db.updatecollectorprofile(payload).then((result: any) => {
      if (result.message === 'success') {
        alert('Profile updated successfully');
        this.rout.navigate(['/wcmaster/profile']);
      } else {
        alert('Error occurred while updating profile');
      }
    });
  }
}
