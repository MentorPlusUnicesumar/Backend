import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import mongoose from 'mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              access_token: 'test-access-token',
              refresh_token: 'test-refresh-token',
            }),
            refreshToken: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              access_token: 'new-access-token',
              refresh_token: 'new-refresh-token',
            }),
            sendRecoverPasswordEmail: jest.fn().mockResolvedValue(undefined),
            resetPassword: jest.fn().mockResolvedValue(undefined), // Simulando a função resetPassword
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  // Teste da rota POST /auth/login
  it('should sign in a user and return access and refresh tokens', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      senha: 'Password123!',
    };

    const result = await authController.signIn(loginDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
    });
    expect(authService.signIn).toHaveBeenCalledWith(loginDto);
  });

  // Teste da rota POST /auth/refresh
  it('should refresh the tokens', async () => {
    const refreshTokenBody = {
      refresh_token: 'test-refresh-token',
    };

    const result = await authController.refreshToken(refreshTokenBody);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      access_token: 'new-access-token',
      refresh_token: 'new-refresh-token',
    });
    expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenBody);
  });

  // Teste da rota POST /auth/send-recover-email
  it('should send a password recovery email and return a success message', async () => {
    const email = 'test@example.com';

    const result = await authController.sendRecoverPasswordEmail(email);

    expect(result).toEqual({
      message: 'Foi enviado um email com instruções para resetar sua senha',
    });
    expect(authService.sendRecoverPasswordEmail).toHaveBeenCalledWith(email);
  });

  // Teste da rota PATCH /auth/reset-password/:token
  it('should reset the password and return a success message', async () => {
    const token = 'valid-reset-token';
    const changePasswordDto: ChangePasswordDto = {
      senha: 'NewPassword123!',
      confirmasenha: 'NewPassword123!',
    };

    const result = await authController.resetPassword(token, changePasswordDto);

    expect(result).toEqual({
      message: 'Senha alterada com sucesso',
    });
    expect(authService.resetPassword).toHaveBeenCalledWith(
      token,
      changePasswordDto,
    );
  });
});
