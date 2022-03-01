import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileService } from '../file/file.service';
import { SetLikeBookDto } from './dto/setLike-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateBookDto, image): Promise<BookEntity> {
    const imageBook = this.fileService.createFile(image);
    return this.repository.save({ ...dto, image: imageBook });
  }

  // async create(dto: CreateBookDto) {
  //   return this.repository.save(dto);
  // }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const find = await this.repository.findOne(id);
    if (find) {
      return find;
    }
    throw new NotFoundException('Книга не найдена');
  }

  async update(id: number, dto: UpdateBookDto) {
    const find = await this.repository.findOne(id);
    if (find) {
      return await this.repository.update(id, dto);
    }
    throw new NotFoundException('Книга не найдена');
  }

  async like(dto: SetLikeBookDto) {
    const find = await this.repository.findOne(dto.id);
    if (find) {
      return await this.repository.update(dto.id, {
        likes: Array.from(new Set([...find.likes, dto.userId])),
      });
    }
    throw new NotFoundException('Книга не найдена');
  }

  async dislike(dto: SetLikeBookDto) {
    const find = await this.repository.findOne(dto.id);
    if (find) {
      return await this.repository.update(dto.id, {
        likes: find.likes.filter((id) => id !== dto.userId),
      });
    }
    throw new NotFoundException('Книга не найдена');
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
