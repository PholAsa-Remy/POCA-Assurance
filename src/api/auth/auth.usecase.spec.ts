import { Test, TestingModule } from '@nestjs/testing';
import { AuthUseCase } from './auth.usecase';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { UsersUsecase } from "../users/users.usecase";
import { MockUsersUsecase } from "../users/users.mockusecase";

describe('AuthUseCase', () => {
  let service: AuthUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule.register({ secret: "test"})],
      providers: [AuthUseCase],
    })
      .overrideProvider(UsersUsecase)
      .useClass(MockUsersUsecase)
      .compile();

    service = module.get<AuthUseCase>(AuthUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should refuse unregistered user', async () =>{
    const result = null
    const user = await service.validateUser("uncreated","uncreated");
    expect(user).toBe(result);
  });

  it('should return details of registered user', async () =>{
    const user = await service.validateUser("user","password");
    expect(user).toBeDefined()
  });

  it ('should sign the user' , async() => {
    const sign = await service.login( {});
    expect(sign).toBeDefined()
  });
});
