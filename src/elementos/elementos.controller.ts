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
import { CreateElementoDto, } from './dto/create-elemento.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { UpdateElementoDto } from './dto/update-elemento.dto';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  @Permiso(18)
  @UseInterceptors(
    FileInterceptor('imagenElemento', {
      storage: diskStorage({
        destination: './public/img/elementos',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `elemento-${unique}${ext}`
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createElementoDto: CreateElementoDto,
  ) {
    console.log(file)
    return this.elementosService.create(createElementoDto,file?.filename);
  }

  @Get()
  @Permiso(19)
  findAll() {
    return this.elementosService.findAll();
  }

  @Get(':idElemento')
  findOne(@Param('idElemento') idElemento: number) {
    return this.elementosService.findOne(+idElemento);
  }

  @Patch(':idElemento')
  @Permiso(20)
  @UseInterceptors(
    FileInterceptor('imagen', {
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
      updateElementoDto.imagen = file.filename;
    }
    return this.elementosService.update(+idElemento, updateElementoDto);
  }

  @Patch('state/:idElemento')
  @Permiso(21)
  status(@Param('idElemento') idElemento: number) {
    return this.elementosService.changeStatus(+idElemento);
  }
}
