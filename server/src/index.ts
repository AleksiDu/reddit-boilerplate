import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createClient } from "redis";
import session from "express-session";
import RedisStore from "connect-redis";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const em = orm.em.fork(); // Create a new EntityManager instance

  const app = express();

  // Initialize client.
  const redisClient = createClient();
  redisClient.connect().catch(console.error);
  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });
  // Initialize sesssion storage.
  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      secret: "abcdefg",
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
  });
  await apolloServer.start();

  app.use(
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ em: em, req, res }),
    })
  );

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));

  console.log("http://localhost:4000/graphql");
};

main().catch((err) => console.log(err));
