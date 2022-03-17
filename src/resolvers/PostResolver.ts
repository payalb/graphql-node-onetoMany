import { Resolver } from "@nestjs/graphql";
import  {Post}  from "../entity/Post";
import { Arg, Field, InputType, Mutation, Query,Int } from "type-graphql";
import { User } from "../entity/User";

@InputType()
class PostInput{
    @Field(()=> Int, {nullable: true})
    id?: number
    @Field({nullable: true})
    title: string
    @Field(()=> String, {nullable: true})
    description?: string
    @Field(()=> UserInput,{nullable: true})
    user?: User
}
@InputType()
class UserInput{
    @Field(()=> Int, {nullable: true})
    id?: number
    @Field( {nullable: true})
    firstName?: string
    @Field( {nullable: true})
    lastName?: string
    @Field(()=> Int, {nullable: true})
    age?: number
}
@Resolver()
export class PostResolver{

    /*
    query{
    getPosts{
        id
        title
        description
        user{
            id
            firstName
            lastName
        }
    }
}
*/
    @Query(()=> [Post])
    getPosts(): Promise<Post[]>{
        return Post.find({relations: ["user"]});
    }
   /* 
   Below will create a post and a user as using cascade
   mutation {
        insertPost(input: {title: "First Post", description: "This is my first post", user : {firstName: "kanika", lastName: "gupta", age: 35}}){
            id
            user{
                id
            }
        }
    }
    Returns user id as 3. If we pass user id, should not create a new entry in db
    mutation {
    insertPost(input: {title: "Second Post", description: "This is my second post", user : {id: 3}}){
        id
        user{
            id
        }
    }
}
    If we pass user id and other fields, it will update the user object
    mutation {
    insertPost(input: {title: "Second Post", description: "This is my second post", user : {id: 3, firstName: "puja"}}){
        id
        user{
            id
        }
    }
}
Will update name to Puja
    */
    @Mutation(()=> Post)
    insertPost(@Arg("input", ()=> PostInput) input: PostInput): Promise<Post>{
       return Post.create(input).save();
        
    }

 
}