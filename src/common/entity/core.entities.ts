// 여기에 모든 entitiy를 넣을 예정

import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updatedAt: Date;
}
