import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto, UpdateAreaDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

@UseGuards(JwtGuard, PermisoGuard)
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @Permiso(10)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  @Permiso(11)
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':idArea')
  findOne(@Param('idArea') idArea: number) {
    return this.areasService.findOne(+idArea);
  }

  @Patch(':idArea')
  @Permiso(12)
  update(
    @Param('idArea') idArea: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(+idArea, updateAreaDto);
  }

  @Patch('state/:idArea')
  @Permiso(13)
  status(@Param('idArea') idArea: number) {
    return this.areasService.changeStatus(+idArea);
  }
}
