import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Shared } from '../../../../sharedServiced/shared';
import { SkillMe } from '../../../../sharedServiced/bean-shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';

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
    workflows: []
  };

  constructor(private service: Backoffice, private sharedService: Shared, private cdr: ChangeDetectorRef) {
  
  }
  
  ngOnInit(): void {
    environment.production ? this.getResumeData() : this.getDumpResumeData()
  }
  
  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }
  
  getDumpResumeData(): void {
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        Object.assign(this.skillSection, data.skill)
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log(`skillSection: ${JSON.stringify(this.skillSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficeSkillPage().subscribe({
      next: (data) => {
        Object.assign(this.skillSection, data.skill)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Skill]:', error)
      },
      complete: () => {
        console.log(`skillSection: ${JSON.stringify(this.skillSection)}`);
        this.cdr.detectChanges();
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
    this.skillSection?.workflows.push('');
  }

  removeWorkflow(index: number) {
    this.skillSection?.workflows.splice(index, 1);
  }

  updateSkills() {
    if(this.skillSection && this.validateDataSection()) {
      this.service.updateSkillPage(this.skillSection).then(() => {
        alert('Skill section updated successfully!');
      }).catch((error) => {
        alert('Error updating skills, please try again later.');
        console.error('Error updating skill:', error);
      }).finally(() => {
        this.ngOnInit();
      });
    }
  }

  resetSkills() {
    this.ngOnInit();
  }

  validateDataSection(): boolean {
    if(this.skillSection?.tools.length == 0) {
      alert('Skill is required.');
      return false;
    }
    for(const [index, tool] of (this.skillSection?.tools ?? []).entries()) {
      if(tool == '') {
        alert(`Skill ${index + 1} is required.`);
        return false  
      }
    }
    if(this.skillSection?.workflows.length == 0) {
      alert('Workflow is required.');
      return false;
    }
    for(const [index, workflow] of (this.skillSection?.workflows ?? []).entries()) {
      if(workflow == '') {
        alert(`Workflow ${index + 1} is required.`);
        return false  
      }
    }
    return true;
  }

  trackByFn(index: number, item: string): number {
    return index;
  }

}
