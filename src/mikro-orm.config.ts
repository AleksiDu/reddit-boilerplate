import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

export default {
  entities: [Post],
  dbName: "lireddit",
  type: "postgresql",
  debug: !__prod__,
  user: "",
  password: "",
  host: "localhost",
  port: 5432,
} as Parameters<typeof MikroORM.init>[0];
