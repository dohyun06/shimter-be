import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PlantDto, PlantIdDto } from './dto/plant.dto';
import { PlantService } from './plant.service';
import { CreateDiseaseLogDto, CreateLogDto } from 'src/plant/dto/log.dto';
import { PlantListDto, PlantListQueryDto } from './dto/plantList.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of plant',
    description: 'Get list of plant using cursor and take',
  })
  @ApiOkResponse({
    type: PlantListDto,
    description: 'Return information of a plant',
  })
  @ApiNotFoundResponse({ description: 'Plant id is Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getPostList(@Query() query: PlantListQueryDto): Promise<PlantListDto> {
    return await this.plantService.getPlantList(query);
  }

  @Post()
  @ApiOperation({
    summary: 'create plant',
    description: 'create plant initially',
  })
  @ApiOkResponse({
    type: PlantDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Exception' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createPlant(): Promise<PlantIdDto> {
    return await this.plantService.createPlant();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get plant',
    description: 'Get plant information',
  })
  @ApiParam({ name: 'id', type: String, description: 'Id of a post' })
  @ApiOkResponse({
    type: PlantDto,
  })
  @ApiNotFoundResponse({ description: 'Plant id is Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getPlant(@Param() { id }: PlantIdDto): Promise<PlantDto> {
    return await this.plantService.getPlant(id);
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Add log',
    description: 'Add log',
  })
  @ApiBody({ type: CreateLogDto })
  @ApiOkResponse({
    type: PlantDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Exception' })
  @ApiNotFoundResponse({ description: 'Plant id is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createLog(
    @Param() { id }: PlantIdDto,
    @Body() dto: CreateLogDto,
  ): Promise<PlantDto> {
    return await this.plantService.createLog(id, dto);
  }

  @Post('disease/:id')
  @ApiOperation({
    summary: 'Add disease log',
    description: 'Add log',
  })
  @ApiBody({ type: CreateDiseaseLogDto })
  @ApiOkResponse({
    type: PlantDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Exception' })
  @ApiNotFoundResponse({ description: 'Plant id is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createDiseaseLog(
    @Param() { id }: PlantIdDto,
    @Body() dto: CreateDiseaseLogDto,
  ): Promise<PlantDto> {
    return await this.plantService.createDiseaseLog(id, dto);
  }

  @Patch('disease/:id')
  @ApiOperation({
    summary: 'Change status',
    description:
      'Change status of disease log. id is diseaseLog id, not plant id',
  })
  @ApiOkResponse({
    type: PlantDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Exception' })
  @ApiNotFoundResponse({ description: 'Log id is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async changeStatus(@Param() { id }: PlantIdDto): Promise<PlantDto> {
    return await this.plantService.changeStatus(id);
  }
}
