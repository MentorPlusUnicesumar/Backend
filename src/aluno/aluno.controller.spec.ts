import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { FiltroMentorDto } from './dto/filtro-mentor.dto';
import mongoose from 'mongoose';
import { EnumTypeUser } from '../users/enums/user-type';
import { EnumStatusUser } from '../users/enums/user-status';
import { EstadoUF } from '../users/enums/enum-uf';
import { DeleteResult } from 'mongodb';

describe('AlunoController', () => {
  let alunoController: AlunoController;
  let alunoService: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              name: 'Test Aluno',
              email: 'test@example.com',
              telefone: '123456789',
              areasInteresse: [new mongoose.Types.ObjectId()],
            }),
            findAll: jest.fn().mockResolvedValue([]),
            filtroMentores: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({}),
            remove: jest
              .fn()
              .mockResolvedValue({ acknowledged: true, deletedCount: 1 }), // Mock do remove
          },
        },
      ],
    }).compile();

    alunoController = module.get<AlunoController>(AlunoController);
    alunoService = module.get<AlunoService>(AlunoService);
  });

  // Teste da rota POST /aluno
  it('should create a new aluno', async () => {
    const createAlunoDto: CreateAlunoDto = {
      name: 'Test Aluno',
      email: 'test@example.com',
      senha: 'Password123!',
      telefone: '123456789',
      typeUser: EnumTypeUser.Aluno,
      status: EnumStatusUser.APROVADO,
      cidade: 'São Paulo',
      uf: EstadoUF.SP,
      cpf: '12345678900',
      areasInteresse: [new mongoose.Types.ObjectId()],
      mentoriasAtivas: [],
      fotos: '',
    };

    const result = await alunoController.create(createAlunoDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Test Aluno',
      email: 'test@example.com',
      telefone: '123456789',
      areasInteresse: expect.any(Array),
    });
    expect(alunoService.create).toHaveBeenCalledWith(createAlunoDto);
  });

  // Teste da rota GET /aluno
  it('should return all alunos', async () => {
    const alunos: any = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Aluno 1',
        email: 'aluno1@example.com',
        telefone: '123456789',
        areasInteresse: [new mongoose.Types.ObjectId()],
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Aluno 2',
        email: 'aluno2@example.com',
        telefone: '987654321',
        areasInteresse: [new mongoose.Types.ObjectId()],
      },
    ];

    // Mockando o retorno do método findAll do serviço
    jest.spyOn(alunoService, 'findAll').mockResolvedValue(alunos);

    // Chamando o método do controller e verificando o resultado
    const result = await alunoController.findAll();
    expect(result).toEqual(alunos);
    expect(alunoService.findAll).toHaveBeenCalled();
  });

  // Teste da rota GET /aluno/filtro
  it('should return filtered mentores', async () => {
    const filtroMentorDto: FiltroMentorDto = {
      name: 'Test Mentor',
      areadeinterese: ['Desenvolvimento'],
    };

    const mentores = [
      {
        _id: new mongoose.Types.ObjectId(),
        idUser: new mongoose.Types.ObjectId(),
        sobre: 'Sobre Mentor 1',
        competencias: ['Competência 1'],
        experiencias: ['Experiência 1'],
        areaDeEnsino: [new mongoose.Types.ObjectId()],
        disponivel: true,
        estrela: [5],
        instagram: 'https://instagram.com/mentor1',
        youtube: 'https://youtube.com/mentor1',
        linkedin: 'https://linkedin.com/mentor1',
        trabDestaque: [],
      },
      {
        _id: new mongoose.Types.ObjectId(),
        idUser: new mongoose.Types.ObjectId(),
        sobre: 'Sobre Mentor 2',
        competencias: ['Competência 2'],
        experiencias: ['Experiência 2'],
        areaDeEnsino: [new mongoose.Types.ObjectId()],
        disponivel: true,
        estrela: [4],
        instagram: 'https://instagram.com/mentor2',
        youtube: 'https://youtube.com/mentor2',
        linkedin: 'https://linkedin.com/mentor2',
        trabDestaque: [],
      },
    ];

    // Mockando o retorno do método filtroMentores do serviço
    jest.spyOn(alunoService, 'filtroMentores').mockResolvedValue(mentores);

    // Chamando o método do controller e verificando o resultado
    const result = await alunoController.filtroUsers(filtroMentorDto);
    expect(result).toEqual(mentores);
    expect(alunoService.filtroMentores).toHaveBeenCalledWith(filtroMentorDto);
  });

  // Teste da rota PATCH /aluno/:id
  it('should update an aluno by id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const updateAlunoDto: UpdateAlunoDto = {
      name: 'Updated Aluno',
      email: 'updated@example.com',
      telefone: '987654321',
      cidade: 'Rio de Janeiro',
      uf: EstadoUF.RJ,
      areasInteresse: [new mongoose.Types.ObjectId()],
    };

    const updatedAluno = {
      _id: id,
      idUser: new mongoose.Types.ObjectId(), // Adicionando idUser
      name: 'Updated Aluno',
      email: 'updated@example.com',
      telefone: '987654321',
      cidade: 'Rio de Janeiro',
      uf: EstadoUF.RJ,
      areasInteresse: [new mongoose.Types.ObjectId()],
    };

    // Mockando o retorno do método update do serviço
    jest.spyOn(alunoService, 'update').mockResolvedValue(updatedAluno);

    // Chamando o método do controller e verificando o resultado
    const result = await alunoController.update(id, updateAlunoDto);
    expect(result).toEqual(updatedAluno);
    expect(alunoService.update).toHaveBeenCalledWith(id, updateAlunoDto);
  });

  // Teste da rota DELETE /aluno/:id
  it('should remove an aluno by id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const deleteResult: DeleteResult = {
      acknowledged: true,
      deletedCount: 1,
    };

    // Mockando o retorno do método remove do serviço
    jest.spyOn(alunoService, 'remove').mockResolvedValue(deleteResult);

    // Chamando o método do controller e verificando o resultado
    const result = await alunoController.remove(id);
    expect(result).toEqual(deleteResult);
    expect(alunoService.remove).toHaveBeenCalledWith(id);
  });
});
