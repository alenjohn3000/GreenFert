import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pcategoryedit',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './pcategoryedit.html',
  styleUrl: './pcategoryedit.scss',
})
export class Pcategoryedit {

  category_id: any;
  categoryarray: any[] = [];
  categoryfg!: FormGroup;
  savestatus=false;

  selectedFiles?: FileList;
  currentFile?: File;
  message: any;

  // 🔥 IMAGE PREVIEW
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private rout: Router,
    private dbservice: DbService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.category_id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.categoryfg = this.fb.group({
      categoryid: this.category_id,
      categoryname: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
      image: ['']
    });

    // Load existing category
    this.dbservice.getCategorydetailsbyid({ id: this.category_id }).then((data: any) => {
      this.categoryarray = data;

      this.categoryfg.patchValue({
        categoryid: data[0].category_id,
        categoryname: data[0].categoryname,
        image: data[0].image
      });

      // 🔥 SHOW EXISTING IMAGE AS PREVIEW
      this.previewUrl = `http://localhost:3000/images/${data[0].image}`;
      this.cdr.detectChanges();
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
    this.currentFile = file;

    // Preview new image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    // Upload image immediately
    this.dbservice.upload(this.currentFile).subscribe((event: any) => {
      if (event?.body?.message) {
        this.message = event.body.message;
      }
    });

    this.categoryfg.patchValue({
      image: this.currentFile.name
    });
  }

  /* ===============================
     UPDATE CATEGORY
  ================================ */
  ecategory() {
    if (!this.categoryfg.valid) {
      this.savestatus = true;
      return;
    }

    // If no new image selected, keep old image
    if (!this.categoryfg.value.image) {
      this.categoryfg.patchValue({
        image: this.categoryarray[0].image
      });
    }

    this.dbservice.updatecategory(this.categoryfg.value).then((result: any) => {

      if (result.message === 'Success') {

        Swal.fire({
          icon: 'success',
          title: 'Category Updated',
          text: 'Category details have been updated successfully.',
          confirmButtonText: 'Back to Categories',
          confirmButtonColor: '#4f46e5'
        }).then(() => {
          this.rout.navigate(['/adminmaster/pcategoryview']);
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Unable to update category. Please try again.',
          confirmButtonColor: '#dc2626'
        });

      }

    });
  }
}
