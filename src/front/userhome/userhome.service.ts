import { Injectable } from '@nestjs/common';

@Injectable()
export class UserhomeService {
  public users = [
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

  public async modification_profile(
    username: string,
    mail: string,
  ): Promise<void> {
    this.users[0].username = username;
    this.users[0].mail = mail;
  }
}
