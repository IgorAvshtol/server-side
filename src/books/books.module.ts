import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), FileModule],
  controllers: [BooksController],
  providers: [BooksService, FileService],
})
export class BooksModule {}
