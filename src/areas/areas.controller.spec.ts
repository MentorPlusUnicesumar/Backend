import { Test, TestingModule } from '@nestjs/testing';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import mongoose from 'mongoose';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

describe('AreasController', () => {
  let areasController: AreasController;
  let areasService: AreasService;

  const mockAreasService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [
        {
          provide: AreasService,
          useValue: mockAreasService,
        },
      ],
    }).compile();

    areasController = module.get<AreasController>(AreasController);
    areasService = module.get<AreasService>(AreasService);
  });

  it('should call findAll and return all areas', async () => {
    const result = [{ nome: 'Engenharia de Software' }];
    mockAreasService.findAll.mockResolvedValue(result);

    expect(await areasController.findAll()).toBe(result);
    expect(areasService.findAll).toHaveBeenCalled();
  });

  it('should call findById and return a specific area', async () => {
    const id = new mongoose.Types.ObjectId();
    const result = { nome: 'Engenharia de Software' };
    mockAreasService.findById.mockResolvedValue(result);

    expect(await areasController.findById(id)).toBe(result);
    expect(areasService.findById).toHaveBeenCalledWith(id);
  });

  it('should call findByName and return an area by name', async () => {
    const name = 'Engenharia de Software';
    const result = { nome: name };
    mockAreasService.findByName.mockResolvedValue(result);

    expect(await areasController.findByName(name)).toBe(result);
    expect(areasService.findByName).toHaveBeenCalledWith(name);
  });

  it('should call create and return the created area', async () => {
    const createAreaDto: CreateAreaDto = {
      nome: 'Engenharia de Software',
    };
    const result = { id: new mongoose.Types.ObjectId(), ...createAreaDto };
    mockAreasService.create.mockResolvedValue(result);

    expect(await areasController.create(createAreaDto)).toBe(result);
    expect(areasService.create).toHaveBeenCalledWith(createAreaDto);
  });

  it('should call update and return the updated area', async () => {
    const id = new mongoose.Types.ObjectId();
    const updateAreaDto: UpdateAreaDto = { nome: 'Engenharia de Dados' };
    const result = { id, ...updateAreaDto };

    mockAreasService.update.mockResolvedValue(result);

    expect(await areasController.update(id, updateAreaDto)).toBe(result);
    expect(areasService.update).toHaveBeenCalledWith(id, updateAreaDto);
  });

  it('should call remove and return a confirmation message', async () => {
    const id = '507f191e810c19729de860ea';
    const result = { deleted: true };

    mockAreasService.remove.mockResolvedValue(result);

    expect(await areasController.remove(id)).toBe(result);
    expect(areasService.remove).toHaveBeenCalledWith(id);
  });
});
