import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SetLikeBookDto } from './dto/setLike-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  async create(@UploadedFiles() files, @Body() dto: CreateBookDto) {
    return this.booksService.create(dto, files.image[0]);
  }
  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './src/upload',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // create(
  //   @Body() createBookDto: CreateBookDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   const imagePath = file.destination + '/' + file.filename;
  //   const fileContent = fs.createWriteStream(imagePath);
  //   console.log(imagePath);
  //   return this.booksService.create({ ...createBookDto, image: fileContent.path });
  // }
  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Patch('like')
  async setLike(@Body() SetLikeBookDto: SetLikeBookDto) {
    return this.booksService.like(SetLikeBookDto);
  }

  @Patch('dislike')
  async setDislike(@Body() SetLikeBookDto: SetLikeBookDto) {
    return this.booksService.dislike(SetLikeBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
