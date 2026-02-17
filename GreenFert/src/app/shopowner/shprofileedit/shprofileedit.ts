import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-shprofileedit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shprofileedit.html',
  styleUrl: './shprofileedit.scss',
})
export class Shprofileedit {
  profilefg!: FormGroup;
  savestatus = false;
  selectedFiles?: FileList;
  currentFile?: File;
  previewUrl: string | ArrayBuffer | null = null;
  showImageModal = false;

  constructor(private fb: FormBuilder, private db: DbService, private rout: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.profilefg = this.fb.group({
      shopname: ['', [Validators.required, Validators.minLength(3)]],
      shopemail: ['', [Validators.required, Validators.email]],
      shopcontact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      shoplicence: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.minLength(6)]],
    });

    this.db.getshopownerprofile({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profilefg.patchValue({
          shopname: data[0].shopname,
          shopemail: data[0].shopemail,
          shopcontact: data[0].shopcontact,
          shoplicence: data[0].shoplicence,
          username: data[0].username,
          image: data[0].shopimg
        });
        // Set preview to existing image
        if (data[0].shopimg) {
          this.previewUrl = 'http://localhost:3000/images/' + data[0].shopimg;
        }
        this.cdr.detectChanges();
      }
    });
  }

  selectFile(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    this.selectedFiles = files;
    this.currentFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    // Upload image
    this.db.upload(this.currentFile).subscribe((event: any) => {
      if (event?.body?.message) {
        console.log('Upload success:', event.body.message);
      }
    });

    // Update form with filename
    this.profilefg.patchValue({
      image: this.currentFile.name
    });
  }

  removePhoto() {
    this.selectedFiles = undefined;
    this.currentFile = undefined;
    this.previewUrl = null;
    this.profilefg.patchValue({
      image: ''
    });
    this.cdr.detectChanges();
  }

  openImageModal() {
    if (this.previewUrl) {
      this.showImageModal = true;
    }
  }

  closeImageModal() {
    this.showImageModal = false;
  }

  saveProfile() {
    if (!this.profilefg.valid) {
      this.savestatus = true;
      return;
    }

    const payload = {
      loginid: localStorage.getItem('login_id'),
      shopname: this.profilefg.value.shopname,
      shopemail: this.profilefg.value.shopemail,
      shopcontact: this.profilefg.value.shopcontact,
      shoplicence: this.profilefg.value.shoplicence,
      shopimg: this.profilefg.value.image || '',
      username: this.profilefg.value.username,
      password: this.profilefg.value.password || ''
    };

    this.db.updateshopownerprofile(payload).then((result: any) => {
      if (result.message === 'success') {
        alert('Profile updated successfully');
        this.rout.navigate(['/smaster/profile']);
      } else {
        alert('Error occurred while updating profile');
      }
    });
  }
}
