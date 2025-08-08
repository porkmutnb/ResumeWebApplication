import { Component } from '@angular/core';
import { ScrollTop } from "../../../sharedComponents/scroll-top/scroll-top";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [ScrollTop, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
