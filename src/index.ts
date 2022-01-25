import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";

const main = async () => {
const orm = await MikroORM.init({
  entities: [Post],
  dbName: 'postgres',
  type: 'postgresql',
  debug: !__prod__,
  user: 'postgres',
  password: 'postgres'
});
console.log(orm.em); // access EntityManager via `em` property
const post = orm.em.create(Post,{title: 'my first post'} );
await orm.em.persistAndFlush(post);
await orm.em.nativeInsert(Post,{title:"my first post 2"});
};

main();
console.log("hello world");