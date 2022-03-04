import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @ManyToOne(() => BookEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'bookId' })
  book: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  date: string;

  @Column()
  text: string;
}
