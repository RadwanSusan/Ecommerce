import{s as m,R as w,r as o,b as u,a as x}from"./.pnpm-o1UN5waG.js";import{P as D}from"./index-bOJ8VqUs.js";const E=m.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`,p={NEWEST:"newest",ASC:"asc",DESC:"desc"},h=w.memo(({filters:i,sort:n})=>{const[d,l]=o.useState([]),f=o.useMemo(()=>{const e=new Date;return d.filter(t=>t.discount&&new Date(t.discount.startDate)<=e&&new Date(t.discount.endDate)>=e).filter(t=>t.variants.some(s=>Object.entries(i).every(([a,r])=>s[a].includes(r)))).sort((t,s)=>{if(n===p.NEWEST)return new Date(s.createdAt)-new Date(t.createdAt);{const a=Math.min(...t.variants.map(c=>c.price)),r=Math.min(...s.variants.map(c=>c.price));return n===p.ASC?a-r:r-a}})},[n,i,d]);return o.useEffect(()=>{(async()=>{try{const t=await x.get("http://localhost:4000/api/products");l(t.data)}catch(t){console.log(t)}})()},[]),u.jsx(E,{children:f.map(e=>u.jsx(D,{item:e},e.id))})});export{h as default};
