
import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(()=> Int)
  id: number;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field(()=> Int)
  @Column()
  age: number;

 
}
