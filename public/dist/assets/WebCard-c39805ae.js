import{r as a,a as e,c as s,b as t,w as l,g as n,N as u,h as r,j as d,k as o,l as p,_ as c,u as i,m,t as v,n as _}from"./index-e19c5bd5.js";const h={__name:"InputSearch",emits:["search","add"],setup(c,{emit:i}){const m=a(""),v=i,_=()=>{v("search",m.value)};return(a,c)=>(e(),s("div",null,[t(n(p),null,{default:l((()=>[t(n(u),{onKeyup:c[0]||(c[0]=r((a=>_()),["enter","native"])),placeholder:"请输入网址",style:{width:"60%"},value:m.value,"onUpdate:value":c[1]||(c[1]=a=>m.value=a)},null,8,["value"]),t(n(d),{type:"primary",onClick:c[2]||(c[2]=a=>_())},{default:l((()=>c[3]||(c[3]=[o(" 搜索 ")]))),_:1})])),_:1})]))}},y=["onClick"],k=c({__name:"WebCard",props:{data:{type:Object,default:()=>[]}},setup(a){const t=i();return(l,n)=>(e(!0),s(_,null,m(a.data,((a,l)=>(e(),s("div",{class:"light-green",key:l,onClick:e=>(a=>{console.log("item",a),t.push({path:"/web",query:a})})(a)},v(a.name),9,y)))),128))}},[["__scopeId","data-v-7d414856"]]);export{k as W,h as _};