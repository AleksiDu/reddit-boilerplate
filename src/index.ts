import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const em = orm.em.fork(); // Create a new EntityManager instance
  const post = em.create(Post, {
    title: "my first post",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await em.persistAndFlush(post);
};

main().catch((err) => console.log(err));
