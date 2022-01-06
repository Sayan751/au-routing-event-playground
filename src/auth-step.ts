import { NavigationInstruction, Next, PipelineStep, Redirect } from 'aurelia-router';

export class AuthStep implements PipelineStep {
  public run(instruction: NavigationInstruction, next: Next<any>): Promise<any> {
    if (instruction.config.route !== 'foo') return next();
    return next.cancel(new Redirect('welcome'));
  }
}
