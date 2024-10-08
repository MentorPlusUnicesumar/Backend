import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('usersController', () => {
  let controller: UsersController;
  //let service: UsersService
  const users = [
    {
      name: 'Alice Silva',
      email: 'alice.silva@example.com',
      telefone: '11999999999',
      typeUser: 'Mentor',
      status: 'Aprovado',
      cidade: 'São Paulo',
      uf: 'São Paulo',
      cpf: '123.456.789-00',
      mentoriasAtivas: [],
      fotos: 'url_da_foto_de_alice.jpg',
    },
    {
      name: 'Bob Pereira',
      email: 'bob.pereira@example.com',
      telefone: '11888888888',
      typeUser: 'Mentor',
      status: 'Aprovado',
      cidade: 'Rio de Janeiro',
      uf: 'Rio de Janeiro',
      cpf: '987.654.321-00',
      mentoriasAtivas: [],
      fotos: 'url_da_foto_de_bob.jpg',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(() => users),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    //service = module.get<UsersService>(UsersService);
  });

  it('Deve retornar todos os usuários', async () => {
    const findAll = await controller.findAll();
    expect(findAll).toEqual(users);
  });
});
