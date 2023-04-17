import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const em = orm.em.fork(); // Create a new EntityManager instance

  const app = express();

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => console.log(err));
