
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {PostResolver} from "./resolvers/PostResolver";


(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  console.log("options: "+ JSON.stringify(options))
  await createConnection({ ...options, name: "default" })
  console.log("connection obtained : "+ options)
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ PostResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  //connect apollo server to express 
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
