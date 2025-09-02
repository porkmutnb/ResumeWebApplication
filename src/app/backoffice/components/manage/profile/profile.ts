import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AboutMe, CelebrityFavorite, ContactMe, ProfileMe, SocialMedia } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe = {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }; 
  profileImagePreview: string = '';
  contactSection: ContactMe = {
    email: '',
    phone: '',
    socialMedia: []
  }
  aboutSection: AboutMe = {
    celebrityFavoriteList: [],
    hobbies: [],
    description: ''
  }

  constructor(private sharedService: Shared, private cdr: ChangeDetectorRef) {

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
    this.profileImagePreview = '';
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        if(this.profileImagePreview == '') {
          this.profileSection = data.profile
          this.contactSection = data.contact
          this.aboutSection = data.about
        }
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        console.log('profileSection', this.profileSection);
        console.log('contactSection', this.contactSection);
        console.log('aboutSection', this.aboutSection);
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
    this.contactSection.socialMedia?.push({
      id: Number(this.contactSection.socialMedia?.length) + 1,
      name: '',
      username: '',
      link: '',
      visible: true
    });
    this.updateSocialMediaIds();
  }

  removeSocialMedia(index: number) {
    this.contactSection.socialMedia?.splice(index, 1);
    this.updateSocialMediaIds();
  }

  updateSocialMediaIds() {
    this.contactSection.socialMedia?.forEach((edu, idx) => {
      edu.id = idx + 1;
    });
  }

  addHobby() {
    this.aboutSection?.hobbies.push('');
  }

  removeHobby(index: number) {
    this.aboutSection?.hobbies.splice(index, 1);
  }

  addCelebrity() {
    this.aboutSection.celebrityFavoriteList?.push({
      id: Number(this.aboutSection.celebrityFavoriteList?.length) + 1,
      name: '',
      link: ''
    });
    this.updateCelebrityIds();
  }

  removeCelebrity(index: number) {
    this.aboutSection.celebrityFavoriteList?.splice(index, 1);
    this.updateCelebrityIds();
  }

  updateCelebrityIds() {
    this.aboutSection.celebrityFavoriteList?.forEach((edu, idx) => {
      edu.id = idx + 1;
    });
  }

}
