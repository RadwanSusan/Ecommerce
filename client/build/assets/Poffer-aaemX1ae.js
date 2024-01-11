import{s as w,R as m,r as o,j as u,P as x,a as D}from"./index-whyF57oU.js";const E=w.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`,p={NEWEST:"newest",ASC:"asc",DESC:"desc"},S=m.memo(({filters:i,sort:n})=>{const[d,l]=o.useState([]),f=o.useMemo(()=>{const t=new Date;return d.filter(e=>e.discount&&new Date(e.discount.startDate)<=t&&new Date(e.discount.endDate)>=t).filter(e=>e.variants.some(s=>Object.entries(i).every(([a,r])=>s[a].includes(r)))).sort((e,s)=>{if(n===p.NEWEST)return new Date(s.createdAt)-new Date(e.createdAt);{const a=Math.min(...e.variants.map(c=>c.price)),r=Math.min(...s.variants.map(c=>c.price));return n===p.ASC?a-r:r-a}})},[n,i,d]);return o.useEffect(()=>{(async()=>{try{const e=await D.get("http://localhost:4000/api/products");l(e.data)}catch(e){console.log(e)}})()},[]),u.jsx(E,{children:f.map(t=>u.jsx(x,{item:t},t.id))})});export{S as default};
