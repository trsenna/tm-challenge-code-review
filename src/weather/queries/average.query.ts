import { Query } from '@nestjs/cqrs';

export class AverageQuery extends Query<number> {
  constructor(public readonly cityName: string) {
    super();
  }
}
