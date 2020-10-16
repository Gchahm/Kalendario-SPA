import {
  animate,
  animateChild, animation, AUTO_STYLE, group, keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

export const staggeredFadeInAnimation = trigger('staggeredFadeIn', [
  // Transition from any state to any state
  transition('0 <=> 1, :enter', [
    query(':enter', style({opacity: 0}), {optional: true}),
    // Each card will appear sequentially with the delay of 300ms
    query(':enter', stagger('100ms', [
        animate('.5s ease-in', style({opacity: 1}))]),
      {optional: true}),
  ]),
]);

export const expandCollapseAnimation = trigger('expandCollapse', [
  state('0', style({
    height: 0,
    overflow: 'hidden'
  })),

  state('1', style({
    height: '*',
    overflow: 'auto'
  })),

  transition('0 => 1', [
    animate('0.3s ease-out')
  ]),

  transition('1 => 0', [
    animate('0.3s ease-in')
  ])
]);
