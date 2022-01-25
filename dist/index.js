"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constant_1 = require("./constant");
const Post_1 = require("./entities/Post");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [Post_1.Post],
        dbName: 'postgres',
        type: 'postgresql',
        debug: !constant_1.__prod__,
        user: 'postgres',
        password: 'postgres'
    });
    console.log(orm.em);
    const post = orm.em.create(Post_1.Post, { title: 'my first post' });
    await orm.em.persistAndFlush(post);
    await orm.em.nativeInsert(Post_1.Post, { title: "my first post 2" });
};
main();
console.log("hello world");
//# sourceMappingURL=index.js.map