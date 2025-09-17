import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shared } from '../../../../sharedServiced/shared';
import { FormsModule } from '@angular/forms';
import { Backoffice } from '../../../service/backoffice';
import { InterestMe } from '../../../../sharedServiced/bean-shared';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-interest',
  imports: [CommonModule, FormsModule],
  templateUrl: './interest.html',
  styleUrl: './interest.css'
})
export class Interest implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  interestSection: InterestMe | undefined

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
        this.interestSection = {paragraphList: []}
        Object.assign(this.interestSection, data.interest)
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log(`interestSection: ${JSON.stringify(this.interestSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficeInterestPage().subscribe({
      next: (data) => {
        this.interestSection = {paragraphList: []}
        Object.assign(this.interestSection, data.interest)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Interest]:', error)
      },
      complete: () => {
        console.log(`interestSection: ${JSON.stringify(this.interestSection)}`)
        this.cdr.detectChanges();
      }
    })
  }

  addInterest() {
    this.interestSection?.paragraphList.push('');
  }

  removeInterest(index: number) {
    this.interestSection?.paragraphList.splice(index, 1);
  }

  updateInterest() {
    if(this.interestSection && this.validateDataSection()) {
      this.service.updateInterestPage(this.interestSection).then(() => {
        alert('Interests section updated successfully!');
      }).catch((error) => {
        alert('Error updating interest, please try again later.');
        console.error('Error updating interest:', error);
      }).finally(() => {
        this.ngOnInit();
      });
    }
  }

  resetInterest() {
    this.ngOnInit();
  }

  validateDataSection() {
    if(this.interestSection?.paragraphList.length == 0) {
      alert('At least one paragraph is required.');
      return false  
    }
    for(const [index, paragraph] of (this.interestSection?.paragraphList ?? []).entries()) {
      if(paragraph == '') {
        alert(`Paragraph ${index + 1} is required.`);
        return false
      }
    }
    return true;
  }

}
