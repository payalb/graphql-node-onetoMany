import { Field, ID,  ObjectType,Int } from "type-graphql"
import { PrimaryGeneratedColumn, BaseEntity, Entity,Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
@ObjectType()
export class Post extends BaseEntity{
    @Field(()=> ID, {nullable: true})
    @PrimaryGeneratedColumn()
    id?: number
    @Field( {nullable: true})
    @Column()
    title: string
    @Field( {nullable: true})
    @Column()
    description?: string
    @ManyToOne(()=> User, {cascade: true})
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    @Field(()=> User,  {nullable: true})
    user: User
    @Column()
    @Field(()=> Int,  {nullable: true})
    user_id: number
}