import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriveFile, Special } from '../../service/special';

@Component({
  selector: 'app-home',
  // เพิ่ม CommonModule เพื่อให้ใช้ *ngFor ได้
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  folders: DriveFile[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private specialService: Special,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders(): void {
    this.isLoading = true;
    this.error = null;
    this.specialService.getDriveFolders().subscribe({
      next: (response) => {
        response.files.map((folder) => {
          console.log(folder);

          if (folder.name == 'เป็นต่อ เดอะซีรี่ย์') {
            this.folders.push(folder);
          }
        });
      },
      error: (err) =>
        (this.error = 'Failed to load folders. Please try logging in again.'),
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
