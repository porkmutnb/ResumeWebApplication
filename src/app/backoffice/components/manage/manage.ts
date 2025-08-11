import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage',
  imports: [CommonModule, RouterLink],
  templateUrl: './manage.html',
  styleUrl: './manage.css'
})
export class Manage {

}
