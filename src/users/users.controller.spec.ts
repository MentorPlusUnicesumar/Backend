import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { EnumTypeUser } from './enums/user-type';
import { EnumStatusUser } from './enums/user-status';
import { EstadoUF } from './enums/enum-uf';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findByName: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    filtroUsers: jest.fn(),
    create: jest.fn(),
    resetPassword: jest.fn(),
    update: jest.fn(),
    updateUserStatus: jest.fn(),
    remove: jest.fn(),
    findMentores: jest.fn(),
    findAlunos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should call findByName and return a user', async () => {
    const name = 'Test User';
    const result = { name };
    mockUsersService.findByName.mockResolvedValue(result);

    expect(await usersController.findByName(name)).toBe(result);
    expect(usersService.findByName).toHaveBeenCalledWith(name);
  });

  it('should call findByEmail and return a user', async () => {
    const email = 'test@example.com';
    const result = { email };
    mockUsersService.findByEmail.mockResolvedValue(result);

    expect(await usersController.findByEmail(email)).toBe(result);
    expect(usersService.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error if findByEmail fails', async () => {
    const email = 'test@example.com';
    mockUsersService.findByEmail.mockRejectedValue(
      new HttpException('Erro ao buscar pelo email', HttpStatus.FORBIDDEN),
    );

    await expect(usersController.findByEmail(email)).rejects.toThrowError(
      new HttpException('Erro ao buscar pelo email', HttpStatus.FORBIDDEN),
    );
  });

  it('should call create and return created user', async () => {
    const createUserDto: CreateUserDto = {
      nome: 'New User',
      email: 'newuser@example.com',
      senha: 'Senha123!',
      telefone: '4499775-9999',
      typeUser: EnumTypeUser.Admin,
      status: EnumStatusUser.ANALISANDO,
      cidade: 'Mandaguari',
      uf: EstadoUF.PR,
      cpf: '123.456.789-00',
      mentoriasAtivas: [new mongoose.Types.ObjectId()],
      fotos: 'www.url.com.br',
      areas: [new mongoose.Types.ObjectId()],
      sobre: 'Sou especialista em python',
      competencias: ['Agil', 'Aprendizado Anvançado'],
      experiencias: ['5 anos trabalhando na alura', '2 anos em supermercado'],
      trabDestaque: [{ foto: 'url.com.br', descricao: 'Projeto Finalizado' }],
      instagram: 'instagram.com.br',
      youtube: 'youtube.com.br',
      linkedin: 'linkedin.com.br',
      disponivel: true,
      estrela: [1, 4],
      motivoCadastro: 'Motivo por qual quer se juntar a plataforma',
    };

    const result = { id: '1', ...createUserDto };
    mockUsersService.create.mockResolvedValue(result);

    expect(await usersController.create(createUserDto)).toBe(result);
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw an error if create fails', async () => {
    const createUserDto: CreateUserDto = {
      nome: 'New User',
      email: 'newuser@example.com',
      senha: 'Senha123!',
      telefone: '4499775-9999',
      typeUser: EnumTypeUser.Admin,
      status: EnumStatusUser.ANALISANDO,
      cidade: 'Mandaguari',
      uf: EstadoUF.PR,
      cpf: '123.456.789-00',
      mentoriasAtivas: [new mongoose.Types.ObjectId()],
      fotos: 'www.url.com.br',
      areas: [new mongoose.Types.ObjectId()],
      sobre: 'Sou especialista em python',
      competencias: ['Agil', 'Aprendizado Anvançado'],
      experiencias: ['5 anos trabalhando na alura', '2 anos em supermercado'],
      trabDestaque: [{ foto: 'url.com.br', descricao: 'Projeto Finalizado' }],
      instagram: 'instagram.com.br',
      youtube: 'youtube.com.br',
      linkedin: 'linkedin.com.br',
      disponivel: true,
      estrela: [1, 4],
      motivoCadastro: 'Motivo por qual quer se juntar a plataforma',
    };

    mockUsersService.create.mockRejectedValue(
      new HttpException('Erro ao cadastrar o usuario', HttpStatus.FORBIDDEN),
    );

    await expect(usersController.create(createUserDto)).rejects.toThrowError(
      new HttpException('Erro ao cadastrar o usuario', HttpStatus.FORBIDDEN),
    );
  });
});
