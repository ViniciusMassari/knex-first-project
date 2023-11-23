"use strict";var f=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var R=(a,t)=>{for(var n in t)f(a,n,{get:t[n],enumerable:!0})},E=(a,t,n,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of w(t))!x.call(a,s)&&s!==n&&f(a,s,{get:()=>t[s],enumerable:!(e=A(t,s))||e.enumerable});return a};var I=a=>E(f({},"__esModule",{value:!0}),a);var _={};R(_,{default:()=>u});module.exports=I(_);var o=require("zod");var l=require("knex");var p=require("dotenv"),c=require("zod");process.env.NODE_ENV==="test"?(0,p.config)({path:".env.test"}):(0,p.config)();var S=c.z.object({NODE_ENV:c.z.enum(["development","production","test"]).default("production"),DATABASE_URL:c.z.string(),PORT:c.z.number().default(3333)}),d=S.safeParse(process.env);if(d.success===!1)throw console.error("\u{1F440} invalid enviroment variable ",d.error.format()),new Error("invalid enviroment variable");var y=d.data;if(!process.env.DATABASE_URL)throw new Error("DATABASE_URL is required");var D={client:"sqlite",connection:{filename:y.DATABASE_URL},useNullAsDefault:!0,migrations:{extension:"ts",directory:"./db/migrations"}},m=(0,l.knex)(D);var g=require("crypto"),i=class{static async getAllTransactions(t){return await m("transactions").where("session_id",t).select()}static async getTransactionsSummary(t){return await m("transactions").where("session_id",t).sum("amount",{as:"amount"}).first()}static async getTransaction(t,n){return await m("transactions").where({session_id:n,id:t}).first()}static async createTransaction(t,n){let{title:e,amount:s,type:r}=t;await m("transactions").insert({id:(0,g.randomUUID)(),title:e,amount:r==="credit"?s:s*-1,session_id:n})}};var T=require("crypto"),u=class{static async getTransactionsSummary(t,n){let{sessionId:e}=t.cookies,s=await i.getTransactionsSummary(e);return n.status(200).send({summary:s})}static async createTransaction(t,n){let e=o.z.object({title:o.z.string(),amount:o.z.number(),type:o.z.enum(["credit","debit"])}),s=t.cookies?.sessionId;s||(s=(0,T.randomUUID)(),n.cookie("sessionId",s,{path:"/",maxAge:6048e5}));let r=e.parse(t.body);return await i.createTransaction(r,s),n.status(201).send()}static async getTransaction(t,n){let e=o.z.object({id:o.z.string().uuid()}),{sessionId:s}=t.cookies,{id:r}=e.parse(t.params);return{transaction:await i.getTransaction(r,s)}}static async getAllTransactions(t,n){let{sessionId:e}=t.cookies;return{transactions:await i.getAllTransactions(e)}}};