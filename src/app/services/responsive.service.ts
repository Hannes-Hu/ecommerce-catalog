import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export enum ScreenSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private screenSizeSubject = new BehaviorSubject<ScreenSize>(this.getScreenSize());
  public screenSize$ = this.screenSizeSubject.asObservable();

  constructor() {
    // Listen to window resize events
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.screenSizeSubject.next(this.getScreenSize());
      });
  }

  private getScreenSize(): ScreenSize {
    const width = window.innerWidth;
    
    if (width < 576) return ScreenSize.XS;
    if (width < 768) return ScreenSize.SM;
    if (width < 992) return ScreenSize.MD;
    if (width < 1200) return ScreenSize.LG;
    return ScreenSize.XL;
  }

  isMobile(): boolean {
    const size = this.screenSizeSubject.value;
    return size === ScreenSize.XS || size === ScreenSize.SM;
  }

  isTablet(): boolean {
    return this.screenSizeSubject.value === ScreenSize.MD;
  }

  isDesktop(): boolean {
    const size = this.screenSizeSubject.value;
    return size === ScreenSize.LG || size === ScreenSize.XL;
  }
}