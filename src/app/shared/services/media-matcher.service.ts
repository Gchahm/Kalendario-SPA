import {Injectable} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class MediaMatcherService {


  private readonly mobileQuery: MediaQueryList;
  private readonly tabletQuery: MediaQueryList;

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  get isTablet(): boolean {
    return this.tabletQuery.matches;
  }

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    this.tabletQuery = media.matchMedia('(max-width: 959px)');
  }

  addMobileQueryListener(fn) {
    this.mobileQuery.addEventListener('change', () => fn);
  }

  addTabletQueryListener(fn) {
    this.tabletQuery.addEventListener('change', () => fn);
  }

  removeMobileQueryListener(fn) {
    this.mobileQuery.removeEventListener('change', () => fn);
  }

  removeTabletQueryListener(fn) {
    this.tabletQuery.removeEventListener('change', () => fn);
  }
}
