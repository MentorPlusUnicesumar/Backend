import { Test, TestingModule } from '@nestjs/testing';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import mongoose from 'mongoose';

describe('AreasController', () => {
  let areasController: AreasController;
  let areasService: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [
        {
          provide: AreasService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              nome: 'Test Area',
            }),
            findAll: jest.fn().mockResolvedValue([
              {
                _id: new mongoose.Types.ObjectId(),
                nome: 'Area 1',
              },
              {
                _id: new mongoose.Types.ObjectId(),
                nome: 'Area 2',
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              nome: 'Specific Area',
            }),
            findByName: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              nome: 'Area by Name',
            }),
            update: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              nome: 'Updated Area',
            }),
            remove: jest
              .fn()
              .mockResolvedValue({ acknowledged: true, deletedCount: 1 }),
          },
        },
      ],
    }).compile();

    areasController = module.get<AreasController>(AreasController);
    areasService = module.get<AreasService>(AreasService);
  });

  // Teste da rota POST /areas
  it('should create a new area', async () => {
    const createAreaDto: CreateAreaDto = { nome: 'Test Area' };

    const result = await areasController.create(createAreaDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      nome: 'Test Area',
    });
    expect(areasService.create).toHaveBeenCalledWith(createAreaDto);
  });

  // Teste da rota GET /areas
  it('should return all areas', async () => {
    const result = await areasController.findAll();

    expect(result).toEqual([
      {
        _id: expect.any(mongoose.Types.ObjectId),
        nome: 'Area 1',
      },
      {
        _id: expect.any(mongoose.Types.ObjectId),
        nome: 'Area 2',
      },
    ]);
    expect(areasService.findAll).toHaveBeenCalled();
  });

  // Teste da rota GET /areas/:id
  it('should return a specific area by id', async () => {
    const id = new mongoose.Types.ObjectId();

    const result = await areasController.findOne(id);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      nome: 'Specific Area',
    });
    expect(areasService.findOne).toHaveBeenCalledWith(id);
  });

  // Teste da rota GET /areas/nome
  it('should return a specific area by name', async () => {
    const name = 'Area by Name';

    const result = await areasController.findByName(name);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      nome: 'Area by Name',
    });
    expect(areasService.findByName).toHaveBeenCalledWith(name);
  });

  // Teste da rota PATCH /areas/:id
  it('should update an area by id', async () => {
    const id = new mongoose.Types.ObjectId();
    const updateAreaDto: UpdateAreaDto = { nome: 'Updated Area' };

    const result = await areasController.update(id, updateAreaDto);

    expect(result).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      nome: 'Updated Area',
    });
    expect(areasService.update).toHaveBeenCalledWith(id, updateAreaDto);
  });

  // Teste da rota DELETE /areas/:id
  it('should remove an area by id', async () => {
    const id = '507f1f77bcf86cd799439011'; // ID de exemplo

    const result = await areasController.remove(id);

    expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
    expect(areasService.remove).toHaveBeenCalledWith(id);
  });
});
