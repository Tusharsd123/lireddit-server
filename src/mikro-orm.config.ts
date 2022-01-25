import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"; 
import path from "path/posix";


export default {
  migrations: {
    path: path.join(__dirname,'/migrations'),  // path to folder with migration files
    pattern: /^[\w-]+\d+\.[tj]s$/, // how to match migration files
  },
  entities: [Post],
  dbName: "postgres",
  type: "postgresql",
  debug: !__prod__,
  user: "postgres",
  password: "postgres",
} as Parameters<typeof MikroORM.init>[0];

