import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  imports: [
    CommonModule
  ],
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.css'
})
export class ScrollTop {

  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // เช็คตำแหน่ง scroll ปัจจุบัน
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // 2. ถ้า scroll ลงมามากกว่า 150px ให้แสดงปุ่ม
    if (scrollPosition > 150) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  // 3. Method สำหรับการคลิกปุ่มเพื่อเลื่อนขึ้นไปด้านบนสุด
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // ทำให้การเลื่อนนุ่มนวล
    });
  }

}
