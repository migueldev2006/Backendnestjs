import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto, UpdateAreaDto } from './dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':idArea')
  findOne(@Param('idArea') idArea: number) {
    return this.areasService.findOne(+idArea);
  }

  @Patch(':idArea')
  update(
    @Param('idArea') idArea: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(+idArea, updateAreaDto);
  }

  @Patch('state/:idArea')
  status(@Param('idArea') idArea: number) {
    return this.areasService.changeStatus(+idArea);
  }
}
