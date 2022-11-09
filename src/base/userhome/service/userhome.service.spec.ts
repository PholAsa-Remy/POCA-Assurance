import { Test, TestingModule } from '@nestjs/testing';
import { UserHomeService } from './userhome.service';

describe('UserHomeService', () => {
  let userHomeService: UserHomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UserHomeService],
    }).compile();

    userHomeService = module.get<UserHomeService>(UserHomeService);
  });

  it('should be defined', () => {
    expect(userHomeService).toBeDefined();
  });

  describe('modificationP_profile', () => {
    it('it modidy the profile properly', async () => {
      try {
        await userHomeService.modification_profile(
          'jacques',
          'jacques.truc@mail.com',
        );
      } catch (err) {
        expect(userHomeService.users[0].mail).toEqual('jacqus.truc@mail.com');
        expect(userHomeService.users[0].username).toEqual('jacques');
      }
    });
  });
});
