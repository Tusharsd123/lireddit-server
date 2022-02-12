import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import mikroConfig from "./mikro-orm.config";
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import session from "express-session";

const main = async () => {
  
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();
  
  let RedisStore = require("connect-redis")(session)
  const { createClient } = require("redis")
  let redisClient = createClient({ 
    legacyMode: true, 
  })
  await redisClient.connect().catch(console.error)
  
  app.use(
  session({
    name: 'qid',
    store: new RedisStore({ 
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000*60*60*24*365*10,//10 years
      httpOnly: true,
      sameSite: 'lax', //csrf
      secure: __prod__, //cookie works only in https
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
)

const apolloServer = new ApolloServer({
  schema: await buildSchema({
    resolvers: [HelloResolver,PostResolver,UserResolver],
    validate: false,
  }),
  context: ({req,res}) => ({em: orm.em , req , res})
})

apolloServer.applyMiddleware({ app });

app.listen(4000,() => {
  console.log("server started on the localhost:4000");
})

};

main();
