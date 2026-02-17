import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pcategory',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './pcategory.html',
  styleUrl: './pcategory.scss',
})
export class Pcategory {
   categoryfg!: FormGroup;
  savestatus=false;

  selectedFiles?: FileList;
  currentfile?: File;
  fileinfos?: Observable<any>;
  message = '';

  // 🔥 IMAGE PREVIEW
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryfg = this.fb.group({
      categoryname: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
      image: ['',[Validators.required]],
    });
  }

  /* ===============================
     FILE SELECT + PREVIEW
  ================================ */
  selectFile(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    if (!file.type.startsWith('image/')) {
      Swal.fire('Invalid File', 'Please select an image file', 'warning');
      return;
    }

    this.selectedFiles = files;
    this.currentfile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /* ===============================
     ADD CATEGORY
  ================================ */
  scategory() {
    if (!this.categoryfg.valid) {
      this.savestatus = true;
      return;
    }

    if (!this.currentfile) {
      Swal.fire('Image Required', 'Please upload a category image', 'warning');
      return;
    }

    // Upload image
    this.dbservice.upload(this.currentfile).subscribe((event: any) => {
      if (event?.body?.message) {
        this.message = event.body.message;
      }
    });

    // Set image name
    this.categoryfg.patchValue({
      image: this.currentfile.name
    });

    // Save category
    this.dbservice.getcategory(this.categoryfg.value).then((result: any) => {
   if (result.message === 'success') {
  
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Category added successfully',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    });
  
          this.router.navigate(['/adminmaster/pcategoryview']);
  
  } else {
  
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Failed to add category',
      showConfirmButton: false,
      timer: 2500
    });
  
  }
  
    })
  }
}
