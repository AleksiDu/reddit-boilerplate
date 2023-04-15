import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const post = new Post();
  post.title = "my first post";
  console.log("----------sql 2----------");
  await orm.em.persistAndFlush(post);

  await orm.close();
};

main().catch((err) => console.log(err));
