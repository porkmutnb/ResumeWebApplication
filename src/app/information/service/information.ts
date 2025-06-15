import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ResumeData {
  interest: string[],
  education: Education[],
  experince: Experince[]
  skill: Skills,
  award: string[]
}

interface Education {
  name: string,
  major: string,
  startYear: string,
  endYear: string,
  gpa: string
}

interface Experince {
  name: string,
  position: string,
  startDate: string,
  endDate: string
}

interface Skills {
  tools: string[],
  workflow: string[]
}

@Injectable({
  providedIn: 'root'
})
export class Information {

  private resumeData!: ResumeData;

  constructor() { }

  getDumpResumeData(): Observable<ResumeData> {
    this.resumeData.interest.push('Paragraph 1')
    this.resumeData.interest.push('Paragraph 2')
    this.resumeData.award.push('Training Cordova Cross-Platform')
    var edu1: Education = { name: 'King Mongkut University of Technology North Bangkok', major: 'Computer Engineering',startYear: '2013', endYear: '2018', gpa: '2.29' }
    this.resumeData.education.push(edu1)
    var exp1: Experince = { name: 'TechsoftHolding onsite EasyBuy', position: 'Java Developer', startDate: 'Mar 2025', endDate: 'Jun 2025' }
    this.resumeData.experince.push(exp1)
    this.resumeData.skill.tools.push('HTML')
    this.resumeData.skill.workflow.push('develop following requirement using Angular ang Java SpringBoot')
    return of(this.resumeData)
  }

}
