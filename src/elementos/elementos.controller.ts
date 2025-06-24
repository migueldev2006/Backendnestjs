import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { CreateElementoDto, UpdateElementoDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(JwtGuard)
@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagenElemento', {
      storage: diskStorage({
        destination: './public/img/elementos',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `elemento-${unique}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createElementoDto: CreateElementoDto,
  ) {
    if (file) {
      createElementoDto.imagenElemento = `/img/elementos/${file.filename}`;
    }
    return this.elementosService.create(createElementoDto);
  }

  @Get()
  findAll() {
    return this.elementosService.findAll();
  }

  @Get(':idElemento')
  findOne(@Param('idElemento') idElemento: number) {
    return this.elementosService.findOne(+idElemento);
  }

  @Patch(':idElemento')
  @UseInterceptors(
    FileInterceptor('imagenElemento', {
      storage: diskStorage({
        destination: './public/img/elementos',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `elemento-${unique}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('idElemento') idElemento: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateElementoDto: UpdateElementoDto,
  ) {
    if (file) {
      updateElementoDto.imagenElemento = `/img/elementos/${file.filename}`;
    }
    return this.elementosService.update(+idElemento, updateElementoDto);
  }

  @Patch('state/:idElemento')
  status(@Param('idElemento') idElemento: number) {
    return this.elementosService.changeStatus(+idElemento);
  }
}
