import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private repository: Repository<CommentsEntity>,
  ) {}
  async create(dto: CreateCommentDto, userId: number) {
    return this.repository.save({
      text: dto.text,
      book: { id: dto.bookId },
      author: { id: userId },
    });
  }

  async findAll(bookId: number) {
    const qb = this.repository.createQueryBuilder('c');
    if (bookId) {
      qb.where('c.bookId = :bookId', { bookId });
    }

    const result = await qb
      .leftJoinAndSelect('c.book', 'book')
      .leftJoinAndSelect('c.author', 'author')
      .getMany();
    return result.map((obj) => {
      return {
        id: obj.id,
        date: obj.date,
        text: obj.text,
        author: obj.author.email,
        book: obj.book.id,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
