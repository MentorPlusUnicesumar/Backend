import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoController } from './reuniao.controller';
import { ReuniaoService } from './reuniao.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { EnumStatusReuniao } from './enum/reuniao-status';

describe('ReuniaoController', () => {
  let reuniaoController: ReuniaoController;
  let reuniaoService: ReuniaoService;

  const mockReuniaoService = {
    create: jest.fn(),
    updateReuniao: jest.fn(),
    updateReuniaoStatus: jest.fn(),
  };

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

    reuniaoController = module.get<ReuniaoController>(ReuniaoController);
    reuniaoService = module.get<ReuniaoService>(ReuniaoService);
  });

  it('should call create and return created reuniao', async () => {
    const createReuniaoDto: CreateReuniaoDto = {
      idMentoria: new mongoose.Types.ObjectId(),
      diaReuniao: new Date('2024-11-06T17:35:00.000Z'),
      status: EnumStatusReuniao.PENDENTE,
      feedback: 'Ótima sessão',
      materialAnexado: ['material1.pdf', 'material2.pdf'],
      link: 'http://meet.example.com',
      resumo: 'Aula sobre AWS e conceitos basicos',
    };

    const result = { id: '1', ...createReuniaoDto };
    mockReuniaoService.create.mockResolvedValue(result);

    expect(await reuniaoController.create(createReuniaoDto)).toBe(result);
    expect(reuniaoService.create).toHaveBeenCalledWith(createReuniaoDto);
  });

  it('should call updateReuniao and return updated reuniao', async () => {
    const id = new mongoose.Types.ObjectId();
    const updateReuniaoDto: UpdateReuniaoDto = {
      status: EnumStatusReuniao.FINALIZADA,
      feedback: 'Atualizado com sucesso',
    };

    const result = { id, ...updateReuniaoDto };
    mockReuniaoService.updateReuniao.mockResolvedValue(result);

    expect(await reuniaoController.updateReuniao(id, updateReuniaoDto)).toBe(
      result,
    );
    expect(reuniaoService.updateReuniao).toHaveBeenCalledWith(
      id,
      updateReuniaoDto,
    );
  });

  it('should call updateReuniaoStatus and return updated status', async () => {
    const id = '507f191e810c19729de860ea'; // Exemplo de ObjectId em string
    const status = EnumStatusReuniao.FINALIZADA;
    const result = { id, status };

    mockReuniaoService.updateReuniaoStatus.mockResolvedValue(result);

    expect(await reuniaoController.updateReuniaoStatus(id, status)).toBe(
      result,
    );
    expect(reuniaoService.updateReuniaoStatus).toHaveBeenCalledWith(id, status);
  });

  it('should throw an error if updateReuniaoStatus fails', async () => {
    const id = '507f191e810c19729de860ea';
    const status = EnumStatusReuniao.FINALIZADA;

    mockReuniaoService.updateReuniaoStatus.mockRejectedValue(
      new HttpException(
        'Erro ao atualizar o status da Reunião',
        HttpStatus.FORBIDDEN,
      ),
    );

    await expect(
      reuniaoController.updateReuniaoStatus(id, status),
    ).rejects.toThrowError(
      new HttpException(
        'Erro ao atualizar o status da Reunião',
        HttpStatus.FORBIDDEN,
      ),
    );
  });
});
