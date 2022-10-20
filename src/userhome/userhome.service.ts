import { Injectable } from '@nestjs/common';

@Injectable()
export class UserhomeService {
  public readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      mail: 'john@AAAAAAAAAAA.fr',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      mail: 'maria@BBBBBBBB.fr',
    },
  ];
}
