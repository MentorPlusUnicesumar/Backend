import { Test, TestingModule } from '@nestjs/testing';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import mongoose from 'mongoose';
import { EstadoUF } from '../users/enums/enum-uf';
import { EnumStatusUser } from '../users/enums/user-status';
import { EnumTypeUser } from '../users/enums/user-type';

describe('MentorController', () => {
  let mentorController: MentorController;
  let mentorService: MentorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorController],
      providers: [
        {
          provide: MentorService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              idUser: new mongoose.Types.ObjectId(),
              sobre: 'Test Mentor',
              competencias: ['JavaScript', 'Node.js'],
              experiencias: ['5 anos de desenvolvimento'],
              disponivel: true,
            }),
            findAll: jest.fn().mockResolvedValue([
              {
                _id: new mongoose.Types.ObjectId(),
                idUser: new mongoose.Types.ObjectId(),
                sobre: 'Mentor 1',
                competencias: ['JavaScript', 'Node.js'],
                experiencias: ['3 anos de desenvolvimento'],
                disponivel: true,
              },
              {
                _id: new mongoose.Types.ObjectId(),
                idUser: new mongoose.Types.ObjectId(),
                sobre: 'Mentor 2',
                competencias: ['Python', 'Django'],
                experiencias: ['5 anos de desenvolvimento'],
                disponivel: false,
              },
            ]),
            update: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              idUser: new mongoose.Types.ObjectId(),
              sobre: 'Updated Mentor',
              competencias: ['JavaScript', 'React'],
              experiencias: ['6 anos de desenvolvimento'],
              disponivel: true,
            }),
            remove: jest
              .fn()
              .mockResolvedValue({ acknowledged: true, deletedCount: 1 }),
          },
        },
      ],
    }).compile();

    mentorController = module.get<MentorController>(MentorController);
    mentorService = module.get<MentorService>(MentorService);
  });

  // Teste da rota POST /mentor
  it('should create a new mentor', async () => {
    const createMentorDto: CreateMentorDto = {
      name: 'Test Mentor',
      email: 'test@example.com',
      senha: 'Password123!',
      telefone: '123456789',
      sobre: 'Test Mentor',
      competencias: ['JavaScript', 'Node.js'],
      experiencias: ['5 anos de desenvolvimento'],
      areaDeEnsino: [new mongoose.Types.ObjectId()],
      disponivel: true,
      estrela: [5],
      trabDestaque: [],
      instagram: '',
      youtube: '',
      linkedin: '',
      typeUser: EnumTypeUser.Admin,
      status: EnumStatusUser.APROVADO,
      cidade: '',
      uf: EstadoUF.AC,
      cpf: '',
      mentoriasAtivas: [],
      fotos: '',
    };

    const result = await mentorController.create(createMentorDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      idUser: expect.any(mongoose.Types.ObjectId),
      sobre: 'Test Mentor',
      competencias: ['JavaScript', 'Node.js'],
      experiencias: ['5 anos de desenvolvimento'],
      disponivel: true,
    });
    expect(mentorService.create).toHaveBeenCalledWith(createMentorDto);
  });

  // Teste da rota GET /mentor
  it('should return all mentors', async () => {
    const result = await mentorController.findAll();

    expect(result).toEqual([
      {
        _id: expect.any(mongoose.Types.ObjectId),
        idUser: expect.any(mongoose.Types.ObjectId),
        sobre: 'Mentor 1',
        competencias: ['JavaScript', 'Node.js'],
        experiencias: ['3 anos de desenvolvimento'],
        disponivel: true,
      },
      {
        _id: expect.any(mongoose.Types.ObjectId),
        idUser: expect.any(mongoose.Types.ObjectId),
        sobre: 'Mentor 2',
        competencias: ['Python', 'Django'],
        experiencias: ['5 anos de desenvolvimento'],
        disponivel: false,
      },
    ]);
    expect(mentorService.findAll).toHaveBeenCalled();
  });

  // Teste da rota PATCH /mentor/:id
  it('should update a mentor by id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const updateMentorDto: UpdateMentorDto = {
      sobre: 'Updated Mentor',
      competencias: ['JavaScript', 'React'],
      experiencias: ['6 anos de desenvolvimento'],
      areaDeEnsino: [new mongoose.Types.ObjectId()],
      disponivel: true,
      estrela: [4],
      trabDestaque: [],
      instagram: '',
      youtube: '',
      linkedin: '',
    };

    const result = await mentorController.update(id, updateMentorDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      idUser: expect.any(mongoose.Types.ObjectId),
      sobre: 'Updated Mentor',
      competencias: ['JavaScript', 'React'],
      experiencias: ['6 anos de desenvolvimento'],
      disponivel: true,
    });
    expect(mentorService.update).toHaveBeenCalledWith(id, updateMentorDto);
  });

  // Teste da rota DELETE /mentor/:id
  it('should remove a mentor by id', async () => {
    const id = '507f1f77bcf86cd799439011'; // ID de exemplo

    const result = await mentorController.remove(id);

    expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
    expect(mentorService.remove).toHaveBeenCalledWith(id);
  });
});
