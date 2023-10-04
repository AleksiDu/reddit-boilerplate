import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import path from "path";
import { User } from "./entities/User";
import "dotenv/config";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  entities: [Post, User],
  dbName: "lireddit",
  type: "postgresql",
  debug: !__prod__,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: "localhost",
  port: 5432,
} as Parameters<typeof MikroORM.init>[0];
