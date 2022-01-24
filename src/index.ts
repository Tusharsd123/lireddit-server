import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";

const main = async () => {
const orm = await MikroORM.init({
  entities: [Post],
  dbName: 'lireddit-server',
  type: 'postgresql',
  debug: !__prod__,
  clientUrl: '...', // defaults to 'mongodb://localhost:27017' for mongodb driver
});
console.log(orm.em); // access EntityManager via `em` property
const post = orm.em.create(Post,{title: 'my first post'} );
await orm.em.persistAndFlush(post);
await orm.em.nativeInsert(Post,{title:"my first post 2"});
};


console.log("hello world");