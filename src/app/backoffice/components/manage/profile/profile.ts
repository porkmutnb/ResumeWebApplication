import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AboutMe, CelebrityFavorite, ContactMe, ProfileMe, SocialMedia } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined 
  profileImagePreview: string = '';
  contactSection: ContactMe | undefined 
  aboutSection: AboutMe | undefined

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
    this.profileImagePreview = '';
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        if(this.profileImagePreview == '') {
          this.profileSection = {
            firstName:'',lastName:'',nickName:'',introduce:'',profile:''
          }
          Object.assign(this.profileSection, data.profile)
          this.contactSection = {
            email:'',phone:'',socialMediaList:[]
          }
          Object.assign(this.contactSection, data.contact)
          this.aboutSection = {
            celebrityFavoriteList: [],
            description: '',
            hobbies: []
          }
          Object.assign(this.aboutSection, data.about)
        }
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        console.log(`profileSection: ${JSON.stringify(this.profileSection)}`);
        console.log(`contactSection: ${JSON.stringify(this.contactSection)}`);
        console.log(`aboutSection: ${JSON.stringify(this.aboutSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.profileImagePreview = '';
    this.resumeData = this.service.getResumeDataForBackofficeProfilePage().subscribe({
      next: (data) => {
        this.profileSection = {firstName:'',lastName:'',nickName:'',introduce:'',profile:''}
        Object.assign(this.profileSection, data.profile)
        this.contactSection = {email:'',phone:'',socialMediaList:[]}
        Object.assign(this.contactSection, data.contact)
        this.aboutSection = {celebrityFavoriteList: [],description: '',hobbies: []}
        Object.assign(this.aboutSection, data.about)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Profile]:', error)
      },
      complete: () => {
        if(this.profileSection?.profile == '' || this.profileSection?.profile == undefined) {
          this.profileSection!.profile = '../../../../assets/user.webp'
        }
        console.log(`profileSection: ${JSON.stringify(this.profileSection)}`)
        console.log(`contactSection: ${JSON.stringify(this.contactSection)}`)
        console.log(`aboutSection: ${JSON.stringify(this.aboutSection)}`)
        this.cdr.detectChanges();
      }
    })
  }

  onProfileImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImagePreview = e.target.result;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      } else {
        input.value = '';
        this.profileImagePreview = '';
      }
    }
  }

  addSocialMedia() {
    this.contactSection?.socialMediaList?.push({
      id: Number(this.contactSection.socialMediaList?.length) + 1,
      name: '',
      username: '',
      link: '',
      visible: true
    });
    this.updateSocialMediaIds();
  }

  removeSocialMedia(index: number) {
    this.contactSection?.socialMediaList?.splice(index, 1);
    this.updateSocialMediaIds();
  }

  updateSocialMediaIds() {
    this.contactSection?.socialMediaList?.forEach((edu, idx) => {
      edu.id = idx + 1;
    });
  }

  addHobby() {
    this.aboutSection?.hobbies?.push('');
  }

  removeHobby(index: number) {
    this.aboutSection?.hobbies?.splice(index, 1);
  }

  addCelebrity() {
    this.aboutSection?.celebrityFavoriteList?.push({
      id: Number(this.aboutSection.celebrityFavoriteList?.length) + 1,
      name: '',
      link: ''
    });
    this.updateCelebrityIds();
  }

  removeCelebrity(index: number) {
    this.aboutSection?.celebrityFavoriteList?.splice(index, 1);
    this.updateCelebrityIds();
  }

  updateCelebrityIds() {
    this.aboutSection?.celebrityFavoriteList?.forEach((edu, idx) => {
      edu.id = idx + 1;
    });
  }

  updateProfile() {
    if (
      this.profileSection &&
      this.contactSection &&
      this.aboutSection &&
      this.validateDataSection()
    ) {
      this.service.updateProfilePage(this.profileSection, this.contactSection, this.aboutSection).then(() => {
        
      }).catch((error) => {
        alert('Error updating profile, please try again later.');
        console.error('Error updating profile:', error);
      }).finally(() => {
        this.ngOnInit();
      });
    }
  }

  resetProfile() {
    this.ngOnInit();
  }

  validateDataSection() {
    if (this.profileSection) {
      this.profileSection.profile = this.profileImagePreview != '' ? this.profileImagePreview : this.profileSection.profile;
    }
    if(this.profileSection?.firstName == '') {
      alert('First Name is required.');
      return false
    }
    if(this.profileSection?.lastName == '') {
      alert('Last Name is required.');
      return false  
    }
    if(this.profileSection?.nickName == '') {
      alert('Nick Name is required.');
      return false  
    }
    if(this.profileSection?.introduce == '') {
      alert('Introduce is required.');
      return false  
    }
    if(this.contactSection?.email == '') {
      alert('Email is required.');
      return false  
    }
    if(this.contactSection?.phone == '') {
      alert('Phone is required.');
      return false  
    }
    if(this.contactSection?.socialMediaList?.length == 0) {
      alert('Social Media is required.');
      return false  
    }
    for(const socialMedia of this.contactSection?.socialMediaList!) {
      if(socialMedia.name == '') {
        alert('Social Media Name is required.');
        return false  
      }
      if(socialMedia.username == '') {
        alert('Social Media Username is required.');
        return false  
      }
      if(socialMedia.link == '') {
        alert('Social Media Link is required.');
        return false  
      }
    }
    if(this.aboutSection?.description == '') {
      alert('Description is required.');
      return false  
    }
    if(this.aboutSection?.hobbies?.length == 0) {
      alert('Hobbies is required.');
      return false  
    }
    for(const [index, hobby] of (this.aboutSection?.hobbies ?? []).entries()) {
      if(hobby == '') {
        alert(`Hobby ${index + 1} is required.`);
        return false  
      }
    }
    if(this.aboutSection?.celebrityFavoriteList?.length == 0) {
      alert('Celebrity Favorite is required.');
      return false  
    }
    for(const celebrityFavorite of this.aboutSection?.celebrityFavoriteList!) {
      if(celebrityFavorite.name == '') {
        alert('Celebrity Favorite Name is required.');
        return false  
      }
      if(celebrityFavorite.link == '') {
        alert('Celebrity Favorite Link is required.');
        return false  
      }
    }
    return true;
  }
}
