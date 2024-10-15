import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoController } from './reuniao.controller';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
// Fazer import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { EnumStatusReuniao } from './enum/reuniao-status';
import mongoose from 'mongoose';

describe('ReuniaoController', () => {
  let controller: ReuniaoController;
  let service: ReuniaoService;

  const mockReuniaoService = {
    create: jest.fn(),
    updateFeedbackReuniao: jest.fn(),
    updateReuniaoStatus: jest.fn(),
  };

  const reunioes = [
    {
      _id: new mongoose.Types.ObjectId(),
      idMentoria: new mongoose.Types.ObjectId(),
      diaReuniao: new Date(),
      status: EnumStatusReuniao.PENDENTE,
      feedback: '',
      materialAnexado: [],
      link: 'http://link.com',
      resumo: 'Reunião sobre o projeto X.',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      idMentoria: new mongoose.Types.ObjectId(),
      diaReuniao: new Date(),
      status: EnumStatusReuniao.FINALIZADA,
      feedback: 'Muito bom',
      materialAnexado: ['material1.pdf', 'material2.pdf'],
      link: 'http://linkfinal.com',
      resumo: 'Finalização do projeto.',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReuniaoController],
      providers: [
        {
          provide: ReuniaoService,
          useValue: mockReuniaoService,
        },
      ],
    }).compile();

    controller = module.get<ReuniaoController>(ReuniaoController);
    service = module.get<ReuniaoService>(ReuniaoService);
  });

  it('Deve criar uma nova reunião', async () => {
    const createReuniaoDto: CreateReuniaoDto = {
      idMentoria: new mongoose.Types.ObjectId(),
      diaReuniao: new Date(),
      status: EnumStatusReuniao.PENDENTE,
      feedback: '',
      materialAnexado: [],
      link: 'http://link.com',
      resumo: 'Reunião sobre o projeto X.',
    };

    mockReuniaoService.create.mockResolvedValue(reunioes[0]);
    const result = await controller.create(
      createReuniaoDto.idMentoria,
      createReuniaoDto,
    );
    expect(result).toEqual(reunioes[0]);
    expect(service.create).toHaveBeenCalledWith(
      createReuniaoDto.idMentoria,
      createReuniaoDto,
    );
  });

  it('Deve atualizar o feedback de uma reunião', async () => {
    const feedback = 'Reunião foi excelente!';
    const reuniaoId = reunioes[0]._id;

    mockReuniaoService.updateFeedbackReuniao.mockResolvedValue({
      ...reunioes[0],
      feedback: feedback,
    });

    const result = await controller.updateFeedbackReuniao(reuniaoId, feedback);
    expect(result).toEqual({ ...reunioes[0], feedback });
    expect(service.updateFeedbackReuniao).toHaveBeenCalledWith(
      reuniaoId,
      feedback,
    );
  });

  //   it('Deve atualizar o status de uma reunião', async () => {
  //     const status = EnumStatusReuniao.FINALIZADA;
  //     const reuniaoId = reunioes[0]._id.toString();

  //     mockReuniaoService.updateReuniaoStatus.mockResolvedValue({
  //       ...reunioes[0],
  //       status,
  //     });

  //     const result = await controller.updateReuniaoStatus(reuniaoId, status);
  //     expect(result).toEqual({ ...reunioes[0], status });
  //     expect(service.updateReuniaoStatus).toHaveBeenCalledWith(reuniaoId, status);
  //   });
});
