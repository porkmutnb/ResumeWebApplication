import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResumeMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  resumeSection: ResumeMe[] = [];

  constructor(private sharedService: Shared) { }

  ngOnInit(): void {
    this.getDumpResumeData()
  }

  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }

  getDumpResumeData(): void {
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.resumeSection = data.myResumeList
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('resumeSection', this.resumeSection)
      }
    })
  }

  addResume(): void {
    const newId = this.resumeSection.length > 0 ? Math.max(...this.resumeSection.map(r => r.id || 0)) + 1 : 1;
    this.resumeSection.push({
      id: newId,
      name: '',
      link: '',
      default: this.resumeSection.length === 0,
      visible: true
    });
    this.updateResumeIds();
  }

  removeResume(indexToRemove: number): void {
    const wasDefault = this.resumeSection[indexToRemove].default;
    this.resumeSection.splice(indexToRemove, 1);
    if (wasDefault && this.resumeSection.length > 0) {
      this.resumeSection[0].default = true;
    }
    this.updateResumeIds();
  }

  setDefaultResume(selectedIndex: number): void {
    this.resumeSection.forEach((resume, index) => {
      resume.default = (index === selectedIndex);
    });
  }

  updateResumeIds() {
    this.resumeSection.forEach((rme, idx) => {
      rme.id = idx + 1;
    });
  }

}
