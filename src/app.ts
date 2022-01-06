import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { NavigationInstruction, Router, RouterConfiguration, RouterEvent } from 'aurelia-router';
import { AuthStep } from 'auth-step';

interface $RouterEvent {
  instruction: NavigationInstruction;
  result: {
    completed: boolean;
    status: string;
  };
}

@autoinject
export class App {
  public router: Router;

  public constructor(
    ea: EventAggregator,
  ) {
    ea.subscribe(RouterEvent.Success, (event: $RouterEvent) => {
      console.log('Success', event.instruction.config.route);
    });
    ea.subscribe(RouterEvent.Canceled, (event: $RouterEvent) => {
      console.log('Canceled', event.instruction.config.route);
    });
    ea.subscribe(RouterEvent.Complete, (event: $RouterEvent) => {
      console.log('Complete', event.instruction.config.route);
    });
  }

  public configureRouter(config: RouterConfiguration, router: Router): Promise<void> | PromiseLike<void> | void {
    config.title = 'Aurelia';
    config.addAuthorizeStep(new AuthStep());
    config.map([
      {
        moduleId: PLATFORM.moduleName('./welcome'),
        route: ['', 'welcome'], name: 'welcome', nav: true, title: 'Welcome'
      },
      {
        moduleId: PLATFORM.moduleName('./users'),
        route: 'users', name: 'users', nav: true, title: 'Github Users'
      },
      {
        moduleId: PLATFORM.moduleName('./users'),
        route: 'foo', name: 'foo', nav: true, title: 'Non-existent'
      },
    ]);

    this.router = router;
  }
}
