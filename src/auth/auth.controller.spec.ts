// //AUTH

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import mongoose from 'mongoose';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             signIn: jest.fn().mockResolvedValue({
//               _id: new mongoose.Types.ObjectId(),
//               access_token: 'test-access-token',
//               refresh_token: 'test-refresh-token',
//             }),
//             refreshToken: jest.fn().mockResolvedValue({
//               _id: new mongoose.Types.ObjectId(),
//               access_token: 'new-access-token',
//               refresh_token: 'new-refresh-token',
//             }),
//             sendRecoverPasswordEmail: jest.fn().mockResolvedValue(undefined),
//             resetPassword: jest.fn().mockResolvedValue(undefined), // Simulando a função resetPassword
//           },
//         },
//       ],
//     }).compile();

//     authController = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   // Teste da rota POST /auth/login

// });
