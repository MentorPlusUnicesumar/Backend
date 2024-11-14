import { Test, TestingModule } from '@nestjs/testing';
import { MentoriasController } from './mentorias.controller';
import { MentoriasService } from './mentorias.service';
import mongoose from 'mongoose';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { EnumStatusMentoria } from './enums/mentorias-status';
import { FiltroMentoriaDto } from './dto/filtro-mentoria.dto';
import { MentoriaInterface } from './interface/mentoria.interface';
import { CardMentoria } from './interface/card.interface';

describe('MentoriasController', () => {
  let mentoriasController: MentoriasController;
  let mentoriasService: MentoriasService;

  const mockMentoriasService = {
    getCards: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateFeedbackMentoria: jest.fn(),
    aceitarMentoria: jest.fn(),
    findAllMentorias: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentoriasController],
      providers: [
        {
          provide: MentoriasService,
          useValue: mockMentoriasService,
        },
      ],
    }).compile();

    mentoriasController = module.get<MentoriasController>(MentoriasController);
    mentoriasService = module.get<MentoriasService>(MentoriasService);
  });

  it('should call create and return created mentoria', async () => {
    const createMentoriaDto: CreateMentoriaDto = {
      nome: 'AWS Migrations',
      idMentor: new mongoose.Types.ObjectId(),
      idAluno: new mongoose.Types.ObjectId(),
      reuniao: [new mongoose.Types.ObjectId()],
      status: EnumStatusMentoria.PENDENTE,
      feedback: 'Excelente',
      materialAnexado: ['material1.pdf'],
      qtdtotal: 10,
      descricao: 'Mentoria sobre AWS Migrations',
    };

    const result = { id: new mongoose.Types.ObjectId(), ...createMentoriaDto };
    mockMentoriasService.create.mockResolvedValue(result);

    expect(await mentoriasController.create(createMentoriaDto)).toBe(result);
    expect(mentoriasService.create).toHaveBeenCalledWith(createMentoriaDto);
  });

  it('should call findById and return a mentoria', async () => {
    const id = new mongoose.Types.ObjectId();
    const result: MentoriaInterface = {
      nome: 'AWS Migrations',
      idMentor: new mongoose.Types.ObjectId(),
      idAluno: new mongoose.Types.ObjectId(),
      reuniao: [],
      status: EnumStatusMentoria.PENDENTE,
      materialAnexado: [],
      feedback: 'Feedback de teste',
      qtdtotal: 10,
      descricao: 'Descrição de mentoria',
    };

    mockMentoriasService.findById.mockResolvedValue(result);

    expect(await mentoriasController.findById(id)).toBe(result);
    expect(mentoriasService.findById).toHaveBeenCalledWith(id);
  });

  it('should call getCards and return an array of mentorias cards', async () => {
    const id = new mongoose.Types.ObjectId();
    const result: CardMentoria[] = [
      {
        id: new mongoose.Types.ObjectId(),
        nome: 'AWS Migrations',
        proximoEncontro: new Date(),
        nomeMentor: 'Mentor Name',
        nomeMentorado: 'Student Name',
      },
    ];

    mockMentoriasService.getCards.mockResolvedValue(result);

    expect(await mentoriasController.cardsMentorias(id)).toBe(result);
    expect(mentoriasService.getCards).toHaveBeenCalledWith(id);
  });

  it('should call updateFeedbackMentoria and return updated mentoria', async () => {
    const id = new mongoose.Types.ObjectId();
    const feedback = 'Ótima mentoria';
    const result = { id, feedback };

    mockMentoriasService.updateFeedbackMentoria.mockResolvedValue(result);

    expect(await mentoriasController.updateFeedbackMentoria(id, feedback)).toBe(
      result,
    );
    expect(mentoriasService.updateFeedbackMentoria).toHaveBeenCalledWith(
      id,
      feedback,
    );
  });

  it('should call aceitarMentoria and return accepted mentoria', async () => {
    const id = new mongoose.Types.ObjectId();
    const result = { id, status: EnumStatusMentoria.PENDENTE };

    mockMentoriasService.aceitarMentoria.mockResolvedValue(result);

    expect(await mentoriasController.aceitarMentoria(id)).toBe(result);
    expect(mentoriasService.aceitarMentoria).toHaveBeenCalledWith(id);
  });

  it('should call findAllMentorias and return filtered mentorias', async () => {
    const query: FiltroMentoriaDto = {
      nomeAluno: 'Student Name',
      nomeMentor: 'Mentor Name',
    };
    const result: MentoriaInterface[] = [
      {
        nome: 'AWS Migrations',
        idMentor: new mongoose.Types.ObjectId(),
        idAluno: new mongoose.Types.ObjectId(),
        reuniao: [],
        status: EnumStatusMentoria.PENDENTE,
        materialAnexado: [],
        feedback: 'Feedback de teste',
        qtdtotal: 10,
        descricao: 'Descrição de mentoria',
      },
    ];

    mockMentoriasService.findAllMentorias.mockResolvedValue(result);

    expect(await mentoriasController.findAllMentorias(query)).toBe(result);
    expect(mentoriasService.findAllMentorias).toHaveBeenCalledWith(query);
  });
});
