import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Shared } from '../../../../sharedServiced/shared';
import { SkillMe } from '../../../../sharedServiced/bean-shared';

@Component({
  selector: 'app-skill',
  imports: [CommonModule, FormsModule],
  templateUrl: './skill.html',
  styleUrl: './skill.css'
})
export class Skill implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  skillSection: SkillMe = {
    tools: [],
    workflow: []
  };

  constructor(private sharedService: Shared) {
  
  }
  
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
        this.skillSection = data.skill
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('skillSection', this.skillSection);
      }
    })
  }

  addSkill() {
    this.skillSection?.tools.push('');
  }

  removeSkill(index: number) {
    this.skillSection?.tools.splice(index, 1);
  }

  addWorkflow() {
    this.skillSection?.workflow.push('');
  }

  removeWorkflow(index: number) {
    this.skillSection?.workflow.splice(index, 1);
  }

}
