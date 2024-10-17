jest.mock('../auth/decorator/roles.decorator', () => ({
  Roles: () => () => {},
}));

jest.mock('../auth/decorator/auth.decorator', () => ({
  Public: () => () => {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EstadoUF } from './enums/enum-uf';
import { EnumStatusUser } from './enums/user-status';
import { EnumTypeUser } from './enums/user-type';
import { UserReturnInterface } from './dto/return-user.dto'; // Certifique-se de importar o UserReturnInterface
import mongoose from 'mongoose'; // Importar mongoose para usar o ObjectId
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto'; // Certifique-se de importar o DTO corretamente

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              name: 'Test User',
              email: 'test@example.com',
              telefone: '123456789',
              typeUser: 'Admin',
              status: 'Aprovado',
              cidade: 'São Paulo',
              uf: 'SP',
              cpf: '12345678900',
              mentoriasAtivas: [],
              fotos: null,
            }),
            findByName: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            resetPassword: jest.fn(),
            updateUserStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // Teste da rota POST /users
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      senha: 'Password123!',
      telefone: '123456789',
      typeUser: EnumTypeUser.Admin,
      status: EnumStatusUser.APROVADO,
      cidade: 'São Paulo',
      uf: EstadoUF.SP,
      cpf: '12345678900',
      mentoriasAtivas: [],
      fotos: null,
    };

    const result = await usersController.create(createUserDto);
    expect(result).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      telefone: '123456789',
      typeUser: 'Admin',
      status: 'Aprovado',
      cidade: 'São Paulo',
      uf: 'SP',
      cpf: '12345678900',
      mentoriasAtivas: [],
      fotos: null,
    });
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });

  // Teste da rota GET /users/name
  it('should find a user by name', async () => {
    const name = 'Test User';

    // Criamos um mock do usuário retornado
    const result = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Test User',
      email: 'test@example.com',
      telefone: '123456789',
    };

    // Mockando o retorno do método findByName do serviço
    jest.spyOn(usersService, 'findByName').mockResolvedValue(result as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.findByName(name)).toEqual(result);
    expect(usersService.findByName).toHaveBeenCalledWith(name);
  });

  // Teste da rota GET /users/email
  it('should find a user by email', async () => {
    const email = 'test@example.com';

    // Criamos um mock do usuário retornado
    const result = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Test User',
      email: 'test@example.com',
      telefone: '123456789',
    };

    // Mockando o retorno do método findByEmail do serviço
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(result as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.findByEmail(email)).toEqual(result);
    expect(usersService.findByEmail).toHaveBeenCalledWith(email);
  });

  // Teste da rota GET /users
  it('should return all users', async () => {
    // Criamos um mock de múltiplos usuários retornados
    const users = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User 1',
        email: 'test1@example.com',
        telefone: '123456789',
        typeUser: 'Admin',
        status: 'Aprovado',
        cidade: 'São Paulo',
        uf: 'SP',
        cpf: '12345678900',
        mentoriasAtivas: [],
        fotos: null,
        toObject: jest.fn().mockReturnThis(), // Simulando um método toObject
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User 2',
        email: 'test2@example.com',
        telefone: '987654321',
        typeUser: 'Aluno',
        status: 'Analisando',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
        cpf: '98765432100',
        mentoriasAtivas: [],
        fotos: null,
        toObject: jest.fn().mockReturnThis(), // Simulando um método toObject
      },
    ];

    // Mockando o retorno do método findAll do serviço
    jest.spyOn(usersService, 'findAll').mockResolvedValue(users as any);

    // Criamos o esperado retorno mapeado
    const expectedReturn = users.map(
      (user) => new UserReturnInterface(user.toObject()),
    );

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.findAll()).toEqual(expectedReturn);
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('should find a user by id', async () => {
    const id = '507f1f77bcf86cd799439011'; // ID de exemplo

    // Criamos um mock do usuário retornado
    const result = {
      _id: new mongoose.Types.ObjectId(id),
      name: 'Test User',
      email: 'test@example.com',
      telefone: '123456789',
      typeUser: 'Admin',
      status: 'Aprovado',
      cidade: 'São Paulo',
      uf: 'SP',
      cpf: '12345678900',
      mentoriasAtivas: [],
      fotos: null,
      toObject: jest.fn().mockReturnThis(), // Simulando o método toObject
    };

    // Mockando o retorno do método findById do serviço
    jest.spyOn(usersService, 'findById').mockResolvedValue(result as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.findById(id)).toEqual(result);
    expect(usersService.findById).toHaveBeenCalledWith(id);
  });

  it('should update a user', async () => {
    const id = '507f1f77bcf86cd799439011'; // ID de exemplo

    // Criamos um DTO de exemplo para a atualização do usuário
    const updateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
      telefone: '987654321',
      cidade: 'Rio de Janeiro',
      uf: EstadoUF.RJ, // Usando o enum EstadoUF ao invés de string
    };

    // Criamos um mock do usuário atualizado
    const result = {
      _id: new mongoose.Types.ObjectId(id),
      name: 'Updated User',
      email: 'updated@example.com',
      telefone: '987654321',
      cidade: 'Rio de Janeiro',
      uf: EstadoUF.RJ, // Usando o enum EstadoUF
      typeUser: 'Aluno',
      status: 'Analisando',
      cpf: '98765432100',
      mentoriasAtivas: [],
      fotos: null,
      toObject: jest.fn().mockReturnThis(), // Simulando o método toObject
    };

    // Mockando o retorno do método update do serviço
    jest.spyOn(usersService, 'update').mockResolvedValue(result as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.update(id, updateUserDto)).toEqual(result);
    expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
  });

  it('should remove a user by id', async () => {
    const id = new mongoose.Types.ObjectId(); // ID de exemplo

    // Mockando o retorno do método remove do serviço
    jest
      .spyOn(usersService, 'remove')
      .mockResolvedValue({ deleted: true } as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.remove(id)).toEqual({ deleted: true });
    expect(usersService.remove).toHaveBeenCalledWith(id);
  });

  it('should reset user password', async () => {
    const id = new mongoose.Types.ObjectId(); // ID de exemplo

    // Criamos um DTO de exemplo para a nova senha
    const newSenhaUserDto: NewSenhaUserDto = {
      senha: 'OldPassword123!',
      novasenha: 'NewPassword456!',
      confirmasenha: 'NewPassword456!',
    };

    // Mockando o retorno do método resetPassword do serviço
    jest
      .spyOn(usersService, 'resetPassword')
      .mockResolvedValue({ result: 'Senha alterada com sucesso' } as any);

    // Chamando o método do controller e verificando o resultado
    expect(await usersController.redefinirSenha(id, newSenhaUserDto)).toEqual({
      result: 'Senha alterada com sucesso',
    });
    expect(usersService.resetPassword).toHaveBeenCalledWith(
      id,
      newSenhaUserDto,
    );
  });

  it('should update user status', async () => {
    const id = '507f1f77bcf86cd799439011'; // ID de exemplo

    // Criamos um DTO de exemplo para a atualização do status
    const updateUserStatusDto: UpdateUserStatusDto = {
      status: EnumStatusUser.APROVADO,
    };

    // Mockando o retorno do método updateUserStatus do serviço
    jest.spyOn(usersService, 'updateUserStatus').mockResolvedValue({
      _id: new mongoose.Types.ObjectId(id),
      status: EnumStatusUser.APROVADO,
    } as any);

    // Chamando o método do controller e verificando o resultado
    expect(
      await usersController.updateUserStatus(id, updateUserStatusDto),
    ).toEqual({
      _id: new mongoose.Types.ObjectId(id),
      status: EnumStatusUser.APROVADO,
    });
    expect(usersService.updateUserStatus).toHaveBeenCalledWith(
      id,
      EnumStatusUser.APROVADO,
    );
  });
});
