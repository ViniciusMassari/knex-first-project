"use strict";var o=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var u=(e,s)=>{for(var t in s)o(e,t,{get:s[t],enumerable:!0})},y=(e,s,t,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let i of a(s))!f.call(e,i)&&i!==t&&o(e,i,{get:()=>s[i],enumerable:!(n=r(s,i))||n.enumerable});return e};var c=e=>y(o({},"__esModule",{value:!0}),e);var p={};u(p,{checkSessionIdExists:()=>d});module.exports=c(p);async function d(e,s){let t=e.cookies.sessionId;return t?!t:s.status(401).send({error:"Unathourized"})}0&&(module.exports={checkSessionIdExists});