import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> pageSearch', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          transform:'translateY(0)'
        })
      ]),
      query(':enter', [
        style({ transform:'translateY(100%)' }),
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('150ms ease-out', style({ transform:'translateY(100%)' }))
        ],{optional: true}),
        query(':enter', [
          animate('400ms ease-in', style({ transform:'translateY(0)' }))
        ],{optional: true})
      ])
    ])
  ]);