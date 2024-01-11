import{C as rt,c as Vs,a as Re,j as Ds,r as i,b as e,R as ns,s as a,L as M,S as ot,M as lt,u as Ce,d as Te,e as bs,F as dt,f as ut,B as mt,g as ht,h as pt,G as xt,i as gt,A as ft,k as jt,l as vt,m as bt,n as yt,o as wt,p as _t,q as At,t as St,v as Nt,w as Ct,x as gs,y as kt,z as Et,D as Ms,E as Ws,H as N,I as Us,J as Js,K as Gs,N as Hs,O as Zs,P as Xs,Q as Ue,T as Ks,U as Pt,V as qt,W as Lt,X as It,Y as Ot,Z as Rt,_ as Tt,$ as $t,a0 as Qs,a1 as zt,a2 as Ft,a3 as Bt,a4 as Se,a5 as ys,a6 as Vt,a7 as Dt,a8 as Mt,a9 as Wt,aa as Ut,ab as Jt,ac as Gt,ad as Ht,ae as Zt,af as Xt,ag as Kt,ah as Qt,ai as Yt,aj as ei}from"./.pnpm-Gv23Y5so.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const m of r)if(m.type==="childList")for(const h of m.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function n(r){const m={};return r.integrity&&(m.integrity=r.integrity),r.referrerPolicy&&(m.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?m.credentials="include":r.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function l(r){if(r.ep)return;r.ep=!0;const m=n(r);fetch(r.href,m)}})();const P=t=>rt`
		@media only screen and (max-width: 380px) {
			${t}
		}
	`,Ys=Vs({name:"user",initialState:{currentUser:null,isFetching:!1,error:!1,username:""},reducers:{loginStart:(t,c)=>{t.isFetching=!0,t.error=!1,t.username=c.payload},loginSuccess:(t,c)=>{t.isFetching=!1,t.currentUser=c.payload,t.error=!1},loginFailure:t=>{t.error=!0,t.isFetching=!1}}}),{loginStart:si,loginSuccess:ti,loginFailure:ws}=Ys.actions,ii=t=>{var c;return(c=t.user.currentUser)==null?void 0:c._id},ni=Ys.reducer,et="http://localhost:4000/api/";var Bs;const _s=(Bs=JSON.parse(localStorage.getItem("persist:root")))==null?void 0:Bs.user,us=_s&&JSON.parse(_s).currentUser,ai=us==null?void 0:us.accessToken,ge=Re.create({baseURL:et}),ne=Re.create({baseURL:et,header:{token:`Bearer ${ai}`}}),ci=async(t,c)=>{t(si(c.username));try{const n=await ge.post("/auth/login",c);if(n.data.verified===!1)return t(ws());t(ti(n.data))}catch{t(ws())}},ri=()=>{localStorage.removeItem("persist:root"),window.location.href="/login"},As=async(t,c)=>{try{const n=await ge.put(`/offer/${c}`,t),l=await ge.put(`/products/${c}`,t);return n.data||l.data}catch(n){console.log(n)}},oi=async t=>{try{return(await ge.post("/carts",t)).data}catch(c){console.log(c)}},li=async t=>{try{return(await ge.post("/orders",t)).data}catch(c){console.log(c)}},is=async t=>{let c=localStorage.getItem("persist:root");c=JSON.parse(c),c=c.user,c=JSON.parse(c),c=c.currentUser._id;try{return(await ge.get(`users/wishlist/${c}?pid=${t}`)).data}catch(n){console.log(n)}},fs=async t=>{try{return(await ge.get(`users/userWishListArray/${t}`)).data}catch(c){console.log(c)}},di=async t=>{try{return(await ge.post("auth/sendEmail",t)).data}catch(c){console.log(c)}},ui=async()=>{try{return(await ge.post("auth/sendEmailAdmin")).data}catch(t){console.log(t)}},mi=({children:t,logOut:c})=>{var m;const n=(m=JSON.parse(localStorage.getItem("persist:root")))==null?void 0:m.user,l=n&&JSON.parse(n).currentUser,r=l==null?void 0:l.accessToken;if(r){const h=Ds.decode(r),u=Date.now()/1e3;if(h.exp<u)return c(),null}return t};setInterval(()=>{var l;const t=(l=JSON.parse(localStorage.getItem("persist:root")))==null?void 0:l.user,c=t&&JSON.parse(t).currentUser,n=c==null?void 0:c.accessToken;if(n){const r=Ds.decode(n),m=Date.now()/1e3;r.exp<m&&(localStorage.removeItem("persist:root"),window.location.reload())}},36e5);const js=i.createContext(),hi=({children:t})=>{const[c,n]=i.useState(JSON.parse(localStorage.getItem("darkMode"))||!1),l=()=>{n(!c)};return i.useEffect(()=>{localStorage.setItem("darkMode",c)},[c]),e.jsx(js.Provider,{value:{darkMode:c,toggle:l},children:t})},pi="مرحبًا بكم في متجر فينوس",xi="أضف إلى السلة",gi="الحجم",fi="اللون",ji={S:"صغير",M:"متوسط",L:"كبير",XL:"كبير جدا",XXL:"كبير جدا جدا"},vi={venus:"فينوس - سمة ماجنتو 2 قوية الاستجابة","All Categories":"كل الفئات","- Jeans":"الجينز -","- Coats":"المعاطف -","- Women":"للمرأة -",Jeans:"الجينز",Coats:"المعاطف",Women:"للمرأة","Enter keywords to search...":"ادخل كلمات البحث ...",Search:"بحث","My Cart":"عربة التسوق",Login:"تسجيل الدخول",Home:"الرئيسية",Shop:"المتجر",Blog:"المدونة","About Us":"من نحن","Contact Us":"تواصل معنا","Black Friday!":"الجمعة السوداء!"},bi={welcome:pi,addToCart:xi,size:gi,color:fi,sizes:ji,navbar:vi},yi="Welcome to Venus Store",wi="Add to Cart",_i="Size",Ai="Color",Si={S:"S",M:"M",L:"L",XL:"XL",XXL:"XXL"},Ni={venus:"Venus - Powerful Responsive Magento 2 Theme","All Categories":"All Categories","- Jeans":"- Jeans","- Coats":"- Coats","- Women":"- Women",Jeans:"Jeans",Coats:"Coats",Women:"Women","Enter keywords to search...":"Enter keywords to search...",Search:"Search","My Cart":"My Cart",Login:"Login",Home:"Home",Shop:"Shop",Blog:"Blog","About Us":"About Us","Contact Us":"Contact Us","Black Friday!":"Black Friday!"},Ci={welcome:yi,addToCart:wi,size:_i,color:Ai,sizes:Si,navbar:Ni},ke=ns.createContext(),ki=({children:t})=>{const[c,n]=i.useState("en"),r={en:Ci,ar:bi}[c],m=h=>{n(h),document.documentElement.lang=h};return e.jsx(ke.Provider,{value:{language:c,dictionary:r,changeLanguage:m},children:t})},Ei=a.div`
	height: 60px;
	${P({height:"50px"})}
	user-select: none;
	@media screen and (max-width: 935px) {
		display: none;
	}
	direction: ${({language:t})=>t==="ar"?"rtl":"ltr"};
`,Pi=a.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${P({padding:"10px 0px"})}
`,qi=a.div`
	flex: 1;
	display: flex;
	align-items: center;
`,Li=a.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${P({flex:2,justifyContent:"center"})}
`,Ye=a.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${P({fontSize:"12px",marginLeft:"10px"})}
`,Ii=ns.memo(({isGuest:t,handleLogout:c,darkMode:n,toggle:l,language:r,changeLanguage:m})=>e.jsx(Ei,{language:r,children:e.jsxs(Pi,{children:[e.jsxs(qi,{children:[e.jsx(Ye,{children:r==="en"?"Welcome to Venuse store":"مرحبا بك في متجر فينوس"}),!t&&e.jsx(Ye,{children:e.jsx("button",{onClick:c,children:r==="en"?"LOG OUT":"تسجيل الخروج"})}),t&&e.jsxs(e.Fragment,{children:[e.jsx(Ye,{children:e.jsx(M,{to:"/Register",children:r==="en"?"REGISTER":"انشاء حساب"})}),e.jsx(Ye,{children:e.jsx(M,{to:"/Login",children:r==="en"?"SIGN IN":"تسجيل الدخول"})})]})]}),e.jsxs(Li,{children:[n?e.jsx(ot,{className:"CiDark",onClick:l}):e.jsx(lt,{className:"CiDark",onClick:l}),e.jsxs("select",{className:"languageSelect",value:r,onChange:h=>m(h.target.value),style:r==="ar"?{marginRight:"15px"}:{},children:[e.jsx("option",{value:"en",children:r==="en"?"English":"الانجليزية"}),e.jsx("option",{value:"ar",children:r==="en"?"Arabic":"العربية"})]})]})]})})),$e=()=>{const{toggle:t,darkMode:c}=i.useContext(js),{language:n,changeLanguage:l}=i.useContext(ke),r=Ce(u=>u.user.currentUser),m=Te(),h=()=>{m(ri())};return e.jsx(Ii,{isGuest:!r,handleLogout:h,darkMode:c,toggle:t,language:n,changeLanguage:l})},Oi="/assets/SvgLogo-e4kLxYn3.svg",st=({data:t})=>e.jsx("table",{className:"table1",children:e.jsx("tbody",{children:t.map(c=>e.jsx("tr",{children:e.jsx("a",{href:`/product/${c._id}`,children:e.jsx("td",{children:c.title})})},c.id))})}),Ri=()=>{const{products:t,total:c}=Ce(V=>V.cart),[n,l]=i.useState(""),[r,m]=i.useState([]),[h,u]=i.useState(""),j=i.useMemo(()=>t.reduce((V,S)=>V+S.quantity,0),[t]),[E,k]=i.useState(!1),v=i.useRef(null),{dictionary:R}=i.useContext(ke),[H,ye]=i.useState(),te=async()=>{var V,S,Z,ce,w,_,g,X,K,y,q,Q;try{const B=await localStorage.getItem("persist:root");(B!=null&&B!==""&&((S=JSON.parse((V=JSON.parse(B))==null?void 0:V.user))==null?void 0:S.currentUser)!==void 0&&((ce=JSON.parse((Z=JSON.parse(B))==null?void 0:Z.user))==null?void 0:ce.currentUser)!==null&&((_=JSON.parse((w=JSON.parse(B))==null?void 0:w.user))==null?void 0:_.username)!==void 0&&((X=JSON.parse((g=JSON.parse(B))==null?void 0:g.user))==null?void 0:X.username)!==null&&((y=JSON.parse((K=JSON.parse(B))==null?void 0:K.user))==null?void 0:y.username)!==void 0||((Q=JSON.parse((q=JSON.parse(B))==null?void 0:q.user))==null?void 0:Q.username)!=="")&&ye(B)}catch(B){console.error(B)}};i.useEffect(()=>{te()},[]);const fe=i.useCallback(async(V,S)=>{try{const Z=await Re.get(`http://localhost:4000/api/products/search/${V}?category=${S}`);m(Z.data)}catch(Z){console.error(Z)}},[]),je=i.useRef(bs(fe,350));i.useEffect(()=>(je.current=bs(fe,350),()=>{je.current.cancel()}),[fe]);const ie=V=>{u(V.target.value),l("")};i.useEffect(()=>{const V=S=>{v.current&&!v.current.contains(S.target)&&k(!1)};return document.addEventListener("mousedown",V),()=>{document.removeEventListener("mousedown",V)}},[]);const W=V=>{const S=V.target.value.toLowerCase();l(S),S===""?k(!1):(k(!0),je.current(S,h))},ae=()=>{n&&k(!0)},Ne=()=>{setTimeout(()=>{document.activeElement!==v.current&&k(!1)},150)};return e.jsx("div",{className:"header-middle snipcss-LbbnX",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"middle-content",children:[e.jsx("div",{className:"logo-container",children:e.jsxs("h1",{className:"logo-content",children:[e.jsx("strong",{children:R.navbar.venus}),e.jsx(M,{to:"/",className:"logo",title:R.navbar.venus,children:e.jsx("img",{src:Oi,alt:"Logo",width:"157",height:"35"})})]})}),e.jsx("div",{className:"right-container",children:e.jsxs("div",{className:"right-content",children:[e.jsx("div",{id:"sm_searchbox14558078331679218424",className:"block block-search search-pro",children:e.jsx("div",{className:"block block-content",children:e.jsxs("div",{className:"form minisearch active",id:"searchbox_mini_form",children:[e.jsx("div",{className:"field search",children:e.jsxs("div",{className:"control",children:[e.jsxs("select",{className:"cat searchbox-cat",name:"cat",value:h,onChange:ie,children:[e.jsx("option",{value:"",children:R.navbar["All Categories"]}),e.jsx("option",{value:"jeans",children:R.navbar["- Jeans"]}),e.jsx("option",{value:"coat",children:R.navbar["- Coats"]}),e.jsx("option",{value:"women",children:R.navbar["- Women"]})]}),e.jsx("input",{id:"searchbox",type:"text",placeholder:R.navbar["Enter keywords to search..."],className:"input-text input-searchbox",maxLength:128,autoComplete:"off",value:n,onChange:W,onFocus:ae,onBlur:Ne,ref:v}),E&&e.jsx(st,{data:r})]})}),e.jsx("div",{className:"actions",children:e.jsxs("button",{title:"Search",children:[e.jsx(dt,{}),e.jsx("span",{children:R.navbar.Search})]})})]})})}),e.jsx("div",{className:"minicart-header",children:e.jsx("div",{className:"minicart-wrapper",children:H?e.jsxs(M,{to:"/cart",className:"action showcart",children:[e.jsx(ut,{}),e.jsx("span",{className:"text",children:R.navbar["My Cart"]}),e.jsx("span",{className:"counter qty empty",children:e.jsx("span",{className:"counter-number",children:j})}),e.jsx("span",{className:"price-minicart",children:e.jsx("div",{className:"subtotal",children:e.jsx("div",{className:"amount price-container",children:e.jsx("span",{className:"price-wrapper",children:e.jsxs("span",{className:"price",children:["$",c]})})})})})]}):e.jsxs(M,{to:"/login",className:"action showcart",children:[e.jsx(mt,{}),e.jsx("span",{className:"text",children:R.navbar.Login})]})})})]})})]})})})},ze=ns.memo(Ri),Fe=()=>{const[t,c]=i.useState(!1),{dictionary:n}=i.useContext(ke),l=()=>{c(r=>!r)};return e.jsx("div",{className:"header-bottom ontop-element snipcss-7ocdx",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"desktop-menu",children:[e.jsx("div",{className:"vertical-block",children:e.jsx("div",{className:"vertical-menu",children:e.jsxs("div",{className:"vertical-menu-block",onClick:l,children:[e.jsxs("div",{className:"block-title-menu",children:[n.navbar["All Categories"]," ",e.jsx(ht,{})]}),e.jsx("div",{className:"vertical-menu-content",style:{display:t?"block":""},children:e.jsx("nav",{className:"sm_megamenu_wrapper_vertical_menu sambar",id:"sm_megamenu_menu6416d6f8c6146","data-sam":"9254467321679218424",children:e.jsxs("div",{className:"sambar-inner",children:[e.jsx(M,{to:"/products/women",children:e.jsx("div",{className:"more-w",children:e.jsx("span",{className:"more-view line",children:n.navbar.Women})})}),e.jsx(M,{to:"/products/coat",children:e.jsx("div",{className:"more-w",children:e.jsx("span",{className:"more-view line",children:n.navbar.Coats})})}),e.jsx(M,{to:"/products/jeans",children:e.jsx("div",{className:"more-w",children:e.jsx("span",{className:"more-view",children:n.navbar.Jeans})})})]})})})]})})}),e.jsxs("div",{className:"horizontal-block",children:[e.jsx("div",{className:"horizontal-menu",children:e.jsx("div",{className:"horizontal-megamenu-block",children:e.jsx("nav",{className:"sm_megamenu_wrapper_horizontal_menu sambar",id:"sm_megamenu_menu6416d6fa8700d","data-sam":"2394106391679218426",children:e.jsx("div",{className:"sambar-inner",children:e.jsx("div",{className:"mega-content",children:e.jsxs("ul",{className:"horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black","data-jsapi":"on",children:[e.jsx("li",{className:"home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop",children:e.jsx("a",{className:"sm_megamenu_head sm_megamenu_drop",href:"",children:e.jsx("span",{className:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{className:"sm_megamenu_title",children:n.navbar.Home})})})}),e.jsx("span",{className:"btn-submobile"}),e.jsx("li",{className:"other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ",children:e.jsxs("a",{className:"sm_megamenu_head sm_megamenu_drop ",href:"",id:"sm_megamenu_15",children:[e.jsx("span",{className:"icon_items",children:e.jsx("img",{src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/sale.png",alt:"icon items",width:"1",height:"1"})}),e.jsx("span",{className:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{className:"sm_megamenu_title",children:n.navbar.Shop})})]})}),e.jsx("li",{className:"other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ",children:e.jsx("a",{className:"sm_megamenu_head sm_megamenu_drop ",href:"",id:"sm_megamenu_19",children:e.jsx("span",{className:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{className:"sm_megamenu_title",children:n.navbar.Blog})})})}),e.jsx("li",{className:"other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ",children:e.jsx("a",{className:"sm_megamenu_head sm_megamenu_drop ",href:"",id:"sm_megamenu_17",children:e.jsx("span",{className:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{className:"sm_megamenu_title",children:n.navbar["About Us"]})})})}),e.jsx("li",{className:"other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ",children:e.jsx("a",{className:"sm_megamenu_head sm_megamenu_drop ",href:"",id:"sm_megamenu_18",children:e.jsx("span",{className:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{className:"sm_megamenu_title",children:n.navbar["Contact Us"]})})})})]})})})})})}),e.jsx("div",{className:"promotion-block",children:e.jsx(M,{to:"/offer/offer",children:n.navbar["Black Friday!"]})})]})]})})})},Ti=a.div`
	height: 60vh;
	background-color: #fcf5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`,$i=a.h1`
	font-size: 70px;
	margin-bottom: 20px;
`,zi=a.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
	${P({textAlign:"center"})}
`,Fi=a.div`
	width: 50%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
	${P({width:"80%"})}
`,Bi=a.input`
	border: none;
	flex: 8;
	padding-left: 20px;
`,Vi=a.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
`,as=()=>e.jsxs(Ti,{children:[e.jsx($i,{children:"Newsletter"}),e.jsx(zi,{children:"Get timely updates from your favorite products."}),e.jsxs(Fi,{children:[e.jsx(Bi,{placeholder:"Your email"}),e.jsx(Vi,{children:e.jsx(pt,{})})]})]}),Be=()=>e.jsxs("div",{id:"foodter_v1",class:"footer footer-v1 snipcss-Ehoar tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center",children:[e.jsx("div",{class:"footer-top footer-top-1",children:e.jsx("div",{class:"container",children:e.jsx("aside",{id:"automatic-static-block-2",class:"widget automatic_widget_staticblock",children:e.jsx("div",{class:"automatic-widget automatic-static-block",children:e.jsx("div",{class:"vc_row wpb_row vc_row-fluid",children:e.jsx("div",{class:"wpb_column vc_column_container vc_col-sm-12",children:e.jsx("div",{class:"vc_column-inner",children:e.jsx("div",{class:"wpb_wrapper",children:e.jsx("div",{class:"automatic-icon list au_fadeIn animated fadeIn",children:e.jsx("div",{class:"text-center icon-size-md",children:e.jsxs("div",{class:"line-row",children:[e.jsxs("div",{class:"border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 first",children:[e.jsx("div",{class:"icon",children:e.jsx("span",{class:"icon",children:e.jsx(xt,{})})}),e.jsxs("div",{class:"box-content",children:[e.jsx("h4",{class:"title-icon",children:"GREAT VALUE"}),e.jsx("div",{children:"We offer competitive prices on our 100 million plus product range."})]})]}),e.jsxs("div",{class:"border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ",children:[e.jsx("div",{class:"icon",children:e.jsx("span",{class:"icon",children:e.jsx(gt,{})})}),e.jsxs("div",{class:"box-content",children:[e.jsx("h4",{class:"title-icon",children:"WORLDWIDE DELIVERY"}),e.jsx("div",{children:"With sites in 5 languages, we ship to over 200 countries & regions."})]})]}),e.jsxs("div",{class:"border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ",children:[e.jsx("div",{class:"icon",children:e.jsx("span",{class:"icon",children:e.jsx(ft,{})})}),e.jsxs("div",{class:"box-content",children:[e.jsx("h4",{class:"title-icon",children:"SAFE PAMENT"}),e.jsx("div",{children:"Pay with the world’s most popular and secure payment methods."})]})]}),e.jsxs("div",{class:"border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ",children:[e.jsx("div",{class:"icon",children:e.jsx("span",{class:"icon",children:e.jsx(jt,{})})}),e.jsxs("div",{class:"box-content",children:[e.jsx("h4",{class:"title-icon",children:"SHOP WITH CONFIDENCE"}),e.jsx("div",{children:"Our Buyer Protection covers your purchase from click to delivery."})]})]}),e.jsxs("div",{class:"border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ",children:[e.jsx("div",{class:"icon",children:e.jsx("span",{class:"icon",children:e.jsx(vt,{})})}),e.jsxs("div",{class:"box-content",children:[e.jsx("h4",{class:"title-icon",children:"24/7 HELP CENTER"}),e.jsx("div",{children:"Round-the-clock assistance for a smooth shopping experience."})]})]})]})})})})})})})})})})}),e.jsxs("div",{class:"container",children:[e.jsx("div",{class:"footer-center padding-bottom-100",children:e.jsx("aside",{id:"automatic-static-block-3",class:"widget automatic_widget_staticblock",children:e.jsxs("div",{class:"automatic-widget automatic-static-block",children:[e.jsxs("div",{"data-vc-full-width":"true","data-vc-full-width-init":"true",class:"vc_row wpb_row vc_row-fluid home1-newletter background-default vc_custom_1489394616135 snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center style-4TY4e",id:"style-4TY4e",children:[e.jsx("div",{class:"wpb_column vc_column_container vc_col-sm-7 snipcss0-1-1-2",children:e.jsx("div",{class:"vc_column-inner snipcss0-2-2-3",children:e.jsx("div",{class:"wpb_wrapper snipcss0-3-3-4",children:e.jsx("div",{class:"wpb_widgetised_column wpb_content_element snipcss0-4-4-5",children:e.jsx("div",{class:"wpb_wrapper snipcss0-5-5-6",children:e.jsx("aside",{id:"mc4wp_form_widget-3",class:"widget widget_mc4wp_form_widget snipcss0-6-6-7",children:e.jsxs("form",{id:"mc4wp-form-1",class:"mc4wp-form mc4wp-form-200 snipcss0-7-7-8",method:"post","data-id":"200","data-name":"",children:[e.jsx("div",{class:"mc4wp-form-fields snipcss0-8-8-9",children:e.jsxs("p",{class:"snipcss0-9-9-10",children:[e.jsx("label",{class:"snipcss0-10-10-11",children:"Subscription"}),e.jsx("input",{type:"email",name:"EMAIL",placeholder:"Your email address ...",required:"",class:"snipcss0-10-10-12"}),e.jsx("span",{class:"submit-over snipcss0-10-10-13",children:e.jsx("input",{type:"submit",value:"Subscribe us",class:"snipcss0-11-13-14"})})]})}),e.jsxs("label",{class:"snipcss0-8-8-15 style-U78xg",id:"style-U78xg",children:["Leave this field empty if you're human:",e.jsx("input",{type:"text",name:"_mc4wp_honeypot",value:"",tabindex:"-1",autocomplete:"off",class:"snipcss0-9-15-16"})]}),e.jsx("input",{type:"hidden",name:"_mc4wp_timestamp",value:"1679394145",class:"snipcss0-8-8-17"}),e.jsx("input",{type:"hidden",name:"_mc4wp_form_id",value:"200",class:"snipcss0-8-8-18"}),e.jsx("input",{type:"hidden",name:"_mc4wp_form_element_id",value:"mc4wp-form-1",class:"snipcss0-8-8-19"}),e.jsx("div",{class:"mc4wp-response snipcss0-8-8-20"})]})})})})})})}),e.jsx("div",{class:"wpb_column vc_column_container vc_col-sm-5 snipcss0-1-1-21",children:e.jsx("div",{class:"vc_column-inner vc_custom_1486623379385 snipcss0-2-21-22",children:e.jsx("div",{class:"wpb_wrapper snipcss0-3-22-23",children:e.jsx("div",{class:"wpb_text_column wpb_content_element snipcss0-4-23-24",children:e.jsx("div",{class:"wpb_wrapper snipcss0-5-24-25",children:e.jsxs("div",{class:"call-us snipcss0-6-25-26",children:["GOT QUESTIONS? CALL US 24/7",e.jsx("i",{class:"automaticicon-phone snipcss0-7-26-27"}),e.jsx("span",{class:"call-phone snipcss0-7-26-28",children:"(40) 1257 7058"})]})})})})})})]}),e.jsx("div",{class:"vc_row-full-width vc_clearfix"})]})})}),e.jsx("div",{class:"footer-logo",children:e.jsx("aside",{id:"automatic-logo-2",class:"widget automatic_widget_logo snipcss0-1-1-2",children:e.jsxs("div",{class:"footer-logo",children:[e.jsx("a",{href:"",class:"snipcss0-3-3-4",children:e.jsx("img",{src:"https://emarche.net/wp-content/uploads/2017/02/Logo-resized.png",alt:"eMarche",class:"snipcss0-4-4-5"})}),e.jsx("span",{class:"text snipcss0-3-3-6",children:"everything you love, in one place.."})]})})}),e.jsx("div",{class:"footer-top",children:e.jsxs("div",{class:"row snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center",children:[e.jsx("div",{class:"col-md-8 col-lg-8 col-sm-7 col-xs-12 middle-right snipcss0-1-1-2",children:e.jsxs("div",{class:"row snipcss0-2-2-3",children:[e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-4 ipad",children:e.jsxs("div",{class:"row snipcss0-4-4-5",children:[e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-6",children:e.jsxs("aside",{id:"text-2",class:"widget widget_text snipcss0-6-6-7",children:[e.jsx("h3",{class:"widget-title snipcss0-7-7-8",children:"INFORMATION"}),e.jsx("div",{class:"textwidget snipcss0-7-7-9",children:e.jsxs("ul",{id:"menu-infomation",class:"menu snipcss0-8-9-10",children:[e.jsx("li",{id:"menu-item-2347",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2347 snipcss0-9-10-11",children:e.jsx("a",{href:"https://emarche.net/#",class:"snipcss0-10-11-12",children:"About store"})}),e.jsx("li",{id:"menu-item-2348",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2348 snipcss0-9-10-13",children:e.jsx("a",{href:"#",class:"snipcss0-10-13-14",children:"New collections"})}),e.jsx("li",{id:"menu-item-2349",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2349 snipcss0-9-10-15",children:e.jsx("a",{href:"#",class:"snipcss0-10-15-16",children:"Woman dress"})}),e.jsx("li",{id:"menu-item-2350",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2350 snipcss0-9-10-17",children:e.jsx("a",{href:"#",class:"snipcss0-10-17-18",children:"Contact us"})}),e.jsx("li",{id:"menu-item-2351",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2351 snipcss0-9-10-19",children:e.jsx("a",{href:"#",class:"snipcss0-10-19-20",children:"Latest news"})}),e.jsx("li",{id:"menu-item-2352",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2352 snipcss0-9-10-21",children:e.jsx("a",{href:"#",class:"snipcss0-10-21-22",children:"Our sitemap"})})]})})]})}),e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-23",children:e.jsx("aside",{id:"nav_menu-3",class:"widget widget_nav_menu snipcss0-6-23-24",children:e.jsx("div",{class:"menu-location-container snipcss0-7-24-25",children:e.jsxs("ul",{id:"menu-location",class:"menu snipcss0-8-25-26",children:[e.jsx("li",{id:"menu-item-2375",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2375 snipcss0-9-26-27",children:e.jsx("a",{href:"#",class:"snipcss0-10-27-28",children:"New York"})}),e.jsx("li",{id:"menu-item-2376",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2376 snipcss0-9-26-29",children:e.jsx("a",{href:"#",class:"snipcss0-10-29-30",children:"London SF"})}),e.jsx("li",{id:"menu-item-2377",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2377 snipcss0-9-26-31",children:e.jsx("a",{href:"#",class:"snipcss0-10-31-32",children:"Cockfosters BP"})}),e.jsx("li",{id:"menu-item-2378",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2378 snipcss0-9-26-33",children:e.jsx("a",{href:"#",class:"snipcss0-10-33-34",children:"Los Angeles"})}),e.jsx("li",{id:"menu-item-2379",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2379 snipcss0-9-26-35",children:e.jsx("a",{href:"#",class:"snipcss0-10-35-36",children:"Chicago"})}),e.jsx("li",{id:"menu-item-2380",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2380 snipcss0-9-26-37",children:e.jsx("a",{href:"#",class:"snipcss0-10-37-38",children:"Las Vegas"})})]})})})})]})}),e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-39",children:e.jsxs("div",{class:"row snipcss0-4-39-40",children:[e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-41",children:e.jsx("aside",{id:"nav_menu-4",class:"widget widget_nav_menu snipcss0-6-41-42",children:e.jsx("div",{class:"menu-useful-links-container snipcss0-7-42-43",children:e.jsxs("ul",{id:"menu-useful-links",class:"menu snipcss0-8-43-44",children:[e.jsx("li",{id:"menu-item-2381",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2381 snipcss0-9-44-45",children:e.jsx("a",{href:"#",class:"snipcss0-10-45-46",children:"Privacy Policy"})}),e.jsx("li",{id:"menu-item-2382",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2382 snipcss0-9-44-47",children:e.jsx("a",{href:"#",class:"snipcss0-10-47-48",children:"Returns"})}),e.jsx("li",{id:"menu-item-2383",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2383 snipcss0-9-44-49",children:e.jsx("a",{href:"#",class:"snipcss0-10-49-50",children:"Terms & Conditions"})}),e.jsx("li",{id:"menu-item-2384",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2384 snipcss0-9-44-51",children:e.jsx("a",{href:"#",class:"snipcss0-10-51-52",children:"Contact Us"})}),e.jsx("li",{id:"menu-item-2385",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2385 snipcss0-9-44-53",children:e.jsx("a",{href:"#",class:"snipcss0-10-53-54",children:"Latest News"})}),e.jsx("li",{id:"menu-item-2386",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2386 snipcss0-9-44-55",children:e.jsx("a",{href:"#",class:"snipcss0-10-55-56",children:"Our Sitemap"})})]})})})}),e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-57",children:e.jsx("aside",{id:"nav_menu-5",class:"widget widget_nav_menu snipcss0-6-57-58",children:e.jsx("div",{class:"menu-menu-container snipcss0-7-58-59",children:e.jsxs("ul",{id:"menu-menu",class:"menu snipcss0-8-59-60",children:[e.jsx("li",{id:"menu-item-2387",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2387 snipcss0-9-60-61",children:e.jsx("a",{href:"#",class:"snipcss0-10-61-62",children:"Instagram"})}),e.jsx("li",{id:"menu-item-2388",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2388 snipcss0-9-60-63",children:e.jsx("a",{href:"#",class:"snipcss0-10-63-64",children:"Facebook"})}),e.jsx("li",{id:"menu-item-2389",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2389 snipcss0-9-60-65",children:e.jsx("a",{href:"#",class:"snipcss0-10-65-66",children:"Contact Us"})}),e.jsx("li",{id:"menu-item-2390",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2390 snipcss0-9-60-67",children:e.jsx("a",{href:"#",class:"snipcss0-10-67-68",children:"Latest News"})}),e.jsx("li",{id:"menu-item-2391",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2391 snipcss0-9-60-69",children:e.jsx("a",{href:"#",class:"snipcss0-10-69-70",children:"Purchase Theme"})}),e.jsx("li",{id:"menu-item-2392",class:"menu-item menu-item-type-custom menu-item-object-custom menu-item-2392 snipcss0-9-60-71",children:e.jsx("a",{href:"#",class:"snipcss0-10-71-72",children:"F.A.Q"})})]})})})})]})})]})}),e.jsxs("div",{class:"col-md-4 col-lg-4 col-sm-5 col-xs-12 middle-left snipcss0-1-1-73",children:[e.jsxs("aside",{id:"automatic-contact-2",class:"widget automatic_widget_contact snipcss0-2-73-74",children:[e.jsx("h3",{class:"widget-title snipcss0-3-74-75",children:"Connect Us"}),e.jsx("div",{class:"footer-info-v1 snipcss0-3-74-76",children:e.jsx("div",{class:"links snipcss0-4-76-77",children:e.jsxs("ul",{class:"snipcss0-5-77-78",children:[e.jsxs("li",{class:"snipcss0-6-78-79",children:[e.jsx("em",{class:"automaticicon-home snipcss0-7-79-80",children:e.jsx(bt,{})}),e.jsx("span",{class:"text snipcss0-7-79-81",children:"Pasig City, Philippines"})]}),e.jsxs("li",{class:"snipcss0-6-78-82",children:[e.jsx("em",{class:"automaticicon-phone snipcss0-7-82-83",children:e.jsx(yt,{})}),e.jsxs("a",{href:"tel:+639668461690",class:"snipcss0-7-82-84",children:["Tel.",e.jsx("span",{class:"text snipcss0-8-84-85",children:"+639668461690"})]})]}),e.jsxs("li",{class:"snipcss0-6-78-86",children:[e.jsx("em",{class:"automaticicon-mail snipcss0-7-86-87",children:e.jsx(wt,{})}),e.jsxs("a",{href:"mailto:support@emarche.net",class:"snipcss0-7-86-88",children:["Mail.",e.jsx("span",{class:"text snipcss0-8-88-89",children:"support@emarche.net"})]})]})]})})})]}),e.jsx("aside",{id:"automatic-social-2",class:"widget automatic_widget_social snipcss0-2-73-90",children:e.jsxs("div",{class:"social-login-options snipcss0-3-90-91",children:[e.jsx("div",{class:"social snipcss0-4-91-92",children:e.jsx("a",{href:"#",target:"_blank",class:"snipcss0-5-92-93",children:e.jsx(_t,{})})}),e.jsx("div",{class:"social snipcss0-4-91-95",children:e.jsx("a",{href:"#",target:"_blank",class:"snipcss0-5-95-96",children:e.jsx(At,{})})}),e.jsx("div",{class:"social snipcss0-4-91-98",children:e.jsx("a",{href:"#",target:"_blank",class:"snipcss0-5-98-99",children:e.jsx(St,{})})}),e.jsx("div",{class:"social snipcss0-4-91-101",children:e.jsx("a",{href:"#",target:"_blank",class:"snipcss0-5-101-102",children:e.jsx(Nt,{})})}),e.jsx("div",{class:"social snipcss0-4-91-104",children:e.jsx("a",{href:"#",target:"_blank",class:"snipcss0-5-104-105",children:e.jsx(Ct,{})})})]})})]})]})})]}),e.jsx("div",{class:"bottom-footer",children:e.jsx("div",{class:"container",children:e.jsxs("div",{class:"row",children:[e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-12",children:e.jsxs("div",{class:"pull-left footercopyright",children:["© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY",e.jsx("a",{href:"#",children:"PME"})]})}),e.jsx("div",{class:"col-md-6 col-lg-6 col-sm-6 col-xs-12",children:e.jsx("div",{class:"pull-right",children:e.jsx("img",{class:"alignnone wp-image-368 size-medium",src:"https://emarche.net/wp-content/uploads/2017/01/bank-2-300x26.png",alt:"",width:"300",height:"26"})})})]})})})]}),tt=Vs({name:"cart",initialState:{products:[],quantity:0,total:0},reducers:{addProduct:(t,c)=>{const n=c.payload;console.log("newProduct",n),console.log("state",t.products);const l=t.products.find(r=>{var m,h;return(r==null?void 0:r._id)===(n==null?void 0:n._id)&&((m=r.selectedVariant)==null?void 0:m._id)===((h=n.selectedVariant)==null?void 0:h._id)});console.log("existingProduct",l),l?l.quantity+=n.quantity:t.products.push(n),t.total=t.products.reduce((r,m)=>r+m.price*m.quantity,0)},removeProduct:(t,c)=>{const{productId:n,variantId:l}=c.payload;t.products=t.products.filter(r=>r._id!==n||r.selectedVariant._id!==l)},increase:(t,c)=>{const n=c.payload;console.log("variantId",n),console.log("state.products",t.products);const l=t.products.findIndex(r=>r.selectedVariant._id===n);console.log("cartItem",l),t.products[l].quantity+=1},decrease:(t,c)=>{const n=c.payload;console.log("variantId",n),console.log("state.products",t.products);const l=t.products.findIndex(r=>r.selectedVariant._id===n);console.log("cartItem",l),t.products[l].quantity-=1},clear:t=>{t.products=[],t.total=0},reset:(t,c)=>{const n=c.payload;console.log("variantId",n),console.log("state.products",t.products);const l=t.products.findIndex(r=>r.selectedVariant._id===n);console.log("cartItem",l),t.products[l].quantity=1},getAllProduct:t=>{let c=t.products;t.cartProducts=c},calc:(t,c)=>{let{total:n,quantity:l}=t.products.reduce((r,m)=>{const{price:h,quantity:u}=m,j=h*u;return r.total+=j,r.quantity+=u,r},{total:0,quantity:0});t.total=n}}}),{addProduct:vs,removeProduct:Di,increase:Mi,decrease:Wi,calc:Ui,reset:Ss,getAllProduct:_c,clear:Ji}=tt.actions,Gi=tt.reducer,Hi=a.div`
	user-select: none;
`,Zi=a.div`
	padding: 50px;
	display: flex;
	${P({padding:"10px",flexDirection:"column"})}
	${t=>t.language==="ar"&&"flex-direction: row-reverse"}
`,Xi=a.div`
	flex: 1;
`;a.img`
	width: 90%;
	height: 70vh;
	object-fit: cover;
	${P({height:"40vh"})}
`;const Ki=a.img`
	height: 500px;
	width: 900px;
`,Qi=a.div`
	flex: 1;
	padding: 0px 50px;

	${P({padding:"10px"})}
	${t=>t.language==="ar"&&`
    text-align: -webkit-right;

  `}
`,Yi=a.h1`
	font-weight: 200;
`,en=a.p`
	margin: 20px 0px;
`,Ns=a.span`
	font-weight: 100;
	font-size: 40px;
`,sn=a.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${P({width:"100%"})}
`,Cs=a.div`
	display: flex;
	align-items: center;
	flex-direction: ${t=>t.language==="ar"?"row-reverse":"row"};
`,ks=a.span`
	font-size: 20px;
	font-weight: 200;
`,tn=a.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${t=>t.color};
	cursor: pointer;
	margin-left: 10px;
	&:hover {
		outline: 3px solid #292931;
	}
	> * {
		&:first-child {
			outline: 3px solid #292931;
		}
	}
	${t=>t.language==="ar"&&`
    margin-right: 10px; /* margin for RTL */
    margin-left: 0; /* reset default margin for RTL */
  `}
`,nn=a.select`
	margin-left: 10px;
	padding: 5px;
	${t=>t.language==="ar"&&`
	margin-right: 10px;
	margin-left: 0;
 `}
`,an=a.option``,cn=a.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${P({width:"100%"})}
`,rn=a.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`,on=a.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0px;
`,ln=a.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`,dn=a.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`,un=t=>t.cart,it=()=>{const[t,c]=i.useState({}),[n,l]=i.useState(1),[r,m]=i.useState(""),[h,u]=i.useState(""),j=Te(),k=gs().pathname.split("/")[2],[v,R]=i.useState(!1),H=Ce(ii),[ye,te]=i.useState(!1),fe=Ce(un),[je,ie]=i.useState(0),[W,ae]=i.useState([]),[Ne,V]=i.useState([]),[S,Z]=i.useState(null),[ce,w]=i.useState(S==null?void 0:S.quantity),{language:_}=i.useContext(ke),{dictionary:g}=i.useContext(ke),[X,K]=i.useState(null);i.useEffect(()=>{H!==void 0&&R(!0)},[H]),i.useEffect(()=>{(async()=>{try{let A=await ge.get("/products/find/"+k);A.data==null&&(A=await ge.get("/offer/find/"+k)),c(A.data);const f=Array.from(new Set(A.data.variants.flatMap(z=>z.color)));V(f);const T=Array.from(new Set(A.data.variants.flatMap(z=>z.size)));ae(T),K(A.data.variants[0].img)}catch{}})()},[k]),document.querySelectorAll(".Color").forEach(b=>b.addEventListener("click",A=>{document.querySelectorAll(".Color").forEach(f=>{f.style.outline="none"}),A.target.style.outline="3px solid #292931"}));const y=b=>{const A=q.find(z=>z._id===t._id&&z.selectedVariant._id===S._id),f=A?A.quantity:0,T=S?S.quantity-f:0;b==="dec"?n>1&&l(n-1):n>=T?N("Info","You have exceeded the number of available products!","info"):l(n+1)},q=fe.products.reduce((b,A)=>{const f=b.find(T=>T._id===A._id&&T.selectedVariant._id===A.selectedVariant._id);return f?f.quantity+=A.quantity:b.push({...A}),b},[]);let Q=S?S.quantity:0;const B=i.useCallback(()=>{if(S&&console.log("🚀  file: Product.jsx:267  selectedVariant =>",S._id),S&&q){const A=q.find(f=>f.variants.find(T=>T._id===S._id));A&&fe.products.map(f=>{f.selectedVariant._id===A.selectedVariant._id&&w(f.selectedVariant.quantity-f.quantity)})}S&&q&&q.map(A=>{if(A.variants.find(T=>T._id===S._id))return{...A,variants:A.variants.map(T=>{if(T._id===S._id){const z=T.quantity-ce;Q=Q-z,z<=0&&te(!0)}else return te(!1),T})}});let b;ce>0?b=ce:b=Q,te(b<=0)},[q,t._id,S,n,ce]);i.useEffect(()=>{B()},[q,t._id,S,n,B,ce]),i.useEffect(()=>{const b=q.find(A=>{var f;return(A==null?void 0:A._id)===(t==null?void 0:t._id)&&((f=A==null?void 0:A.selectedVariant)==null?void 0:f._id)===(S==null?void 0:S._id)});w(b?S.quantity-b.quantity:S?S.quantity:0)},[S,q,t._id]);const re=b=>{const A=t.variants.filter(oe=>oe.color.includes(b)),f=A.flatMap(oe=>oe.size);ae(f);const T=A[0];Z(T),l(1),m(b);const z=f[0];u(z),A.find(oe=>oe.size.includes(z));const me=q.find(oe=>oe._id===t._id&&oe.selectedVariant._id===T._id);w(me?T.quantity-me.quantity:T?T.quantity:0),K(T.img),B()},we=b=>{const A=t.variants.filter(me=>me.size.includes(b)),f=A.flatMap(me=>me.color);V(f),Z(A[0]);const T=A[0];Z(T),l(1),u(b);const z=q.find(me=>me._id===t._id&&me.selectedVariant._id===T._id);w(z?T.quantity-z.quantity:T?T.quantity:0),B()};function Le(b,A){return new Intl.NumberFormat(A==="ar"?"ar-EG":"en-US",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:0}).format(b)}const ve=()=>{if(!S){N("Please select a variant");return}v===!1?N({title:"You have to login !",icon:"warning",buttons:!0,confirmButtonColor:"#42A5F5",confirmButtonText:"Login",showCancelButton:!0,closeOnConfirm:!1}).then(b=>{b&&(window.location.href="/login")}):(console.log(t),j(vs({...t,price:t.offerPrice||t.price,quantity:n,selectedVariant:S})),l(1),w(S.quantity-n),N("Success","Product added to cart!","success"),B())},Je=()=>{if(t&&t.variants&&W.length===1&&Ne.length===1){const b=t.variants.find(A=>A.size.includes(W[0])&&A.color.includes(Ne[0]));Z(b)}else if(t&&t.variants){const b=t.variants.find(A=>A.size.includes(h)&&A.color.includes(r));Z(b)}};function _e(b){return new Intl.NumberFormat("ar-EG").format(b)}return i.useEffect(()=>{Je()},[h,r,t.variants,B,ce,m,re]),e.jsxs(Hi,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsxs(Zi,{language:_,children:[e.jsx(Xi,{children:it?e.jsxs(e.Fragment,{children:[e.jsx(Ki,{src:X,alt:`product-${je}`}),e.jsxs(on,{children:[e.jsx("button",{style:{marginRight:"10px"},children:e.jsx(kt,{})}),e.jsx("button",{style:{marginLeft:"10px"},children:e.jsx(Et,{})})]})]}):e.jsx("p",{children:"No images available"})}),e.jsxs(Qi,{language:_,children:[e.jsx(Yi,{children:_==="ar"?t.title_ar:t.title}),e.jsx(en,{children:_==="ar"?t.desc_ar:t.desc}),t.offerPrice!==void 0&&t.offerPrice!==null&&t.offerPrice!==""?e.jsx(e.Fragment,{children:e.jsxs(Ns,{className:"price55",children:[" ",t.price]})}):e.jsx(Ns,{children:_==="ar"?`${Le(t.price,_)} $`:`$ ${Le(t.price,_)}`}),e.jsxs(sn,{children:[e.jsxs(Cs,{language:_,children:[e.jsxs(ks,{language:_,children:[g.color," "]}),Ne.map(b=>e.jsx(tn,{className:"Color",color:b,language:_,onClick:()=>re(b)},b))]}),e.jsxs(Cs,{language:_,children:[e.jsx(ks,{language:_,children:g.size}),e.jsx(nn,{language:_,onChange:b=>we(b.target.value),children:W.map(b=>e.jsx(an,{children:g.sizes[b]||b},b))})]})]}),e.jsxs(cn,{children:[e.jsxs(rn,{children:[e.jsx(Ms,{onClick:()=>y("dec")}),e.jsx(ln,{children:_==="ar"?_e(n):n}),e.jsx(Ws,{onClick:()=>y("inc")})]}),e.jsx(dn,{className:"AddCart",onClick:ve,disabled:ye,children:g.addToCart})]})]})]}),e.jsx(as,{}),e.jsx(Be,{})]})},mn="modulepreload",hn=function(t){return"/"+t},Es={},pn=function(c,n,l){let r=Promise.resolve();if(n&&n.length>0){const m=document.getElementsByTagName("link");r=Promise.all(n.map(h=>{if(h=hn(h),h in Es)return;Es[h]=!0;const u=h.endsWith(".css"),j=u?'[rel="stylesheet"]':"";if(!!l)for(let v=m.length-1;v>=0;v--){const R=m[v];if(R.href===h&&(!u||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${j}`))return;const k=document.createElement("link");if(k.rel=u?"stylesheet":mn,u||(k.as="script",k.crossOrigin=""),k.href=h,document.head.appendChild(k),u)return new Promise((v,R)=>{k.addEventListener("load",v),k.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${h}`)))})}))}return r.then(()=>c()).catch(m=>{const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=m,window.dispatchEvent(h),!h.defaultPrevented)throw m})},xn=i.lazy(()=>pn(()=>import("./Poffer-7iIgomZo.js"),__vite__mapDeps([0,1,2]))),gn=a.div``,fn=a.h1`
  margin: 20px;
`,jn=a.div`
  display: flex;
  justify-content: space-between;
`,Ps=a.div`
  margin: 20px;
  ${P({width:"0px 20px",display:"flex",flexDirection:"column"})}
`,qs=a.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${P({marginRight:"0px"})}
`,ms=a.select`
  padding: 10px;
  margin-right: 20px;
  ${P({margin:"10px 0px"})}
`,de=a.option``,vn=()=>{const[t,c]=i.useState({}),[n,l]=i.useState("newest"),r=i.useCallback(m=>{const h=m.target.value;c(u=>({...u,[m.target.name]:h}))},[]);return e.jsxs(gn,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsx(fn,{children:"Offers"}),e.jsxs(jn,{children:[e.jsxs(Ps,{children:[e.jsx(qs,{children:"Filter Products:"}),e.jsxs(ms,{name:"color",onChange:r,children:[e.jsx(de,{disabled:!0,children:"Color"}),e.jsx(de,{children:"White"}),e.jsx(de,{children:"Black"}),e.jsx(de,{children:"Red"}),e.jsx(de,{children:"Blue"}),e.jsx(de,{children:"Yellow"}),e.jsx(de,{children:"Green"})]}),e.jsxs(ms,{name:"size",onChange:r,children:[e.jsx(de,{disabled:!0,children:"Size"}),e.jsx(de,{children:"XS"}),e.jsx(de,{children:"S"}),e.jsx(de,{children:"M"}),e.jsx(de,{children:"L"}),e.jsx(de,{children:"XL"})]})]}),e.jsxs(Ps,{children:[e.jsx(qs,{children:"Sort Products:"}),e.jsxs(ms,{onChange:m=>l(m.target.value),children:[e.jsx(de,{value:"newest",children:"Newest"}),e.jsx(de,{value:"asc",children:"Price (asc)"}),e.jsx(de,{value:"desc",children:"Price (desc)"})]})]})]}),e.jsx(i.Suspense,{fallback:null,children:e.jsx(xn,{filters:t,sort:n})}),e.jsx(as,{}),e.jsx(Be,{})]})},bn=ns.memo(vn),yn=[{id:1,img:"https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",title:"SUMMER SALE",desc:"DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",bg:"f5fafd"},{id:2,img:"https://i.ibb.co/DG69bQ4/2.png",title:"AUTUMN COLLECTION",desc:"DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",bg:"fcf1ed"},{id:3,img:"https://i.ibb.co/cXFnLLV/3.png",title:"LOUNGEWEAR LOVE",desc:"DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",bg:"fbf0f4"}],wn=[{id:1,img:"https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",title:"تخفيضات الصيف",desc:"لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد",bg:"fbf0f4"},{id:2,img:"https://i.ibb.co/DG69bQ4/2.png",title:"مجموعة الخريف",desc:"لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد.",bg:"fcf1ed"},{id:3,img:"https://i.ibb.co/cXFnLLV/3.png",title:"حب ملابس الاسترخاء",desc:"لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد.",bg:"fbf0f4"}],_n=[{id:1,img:"https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",title:"SHIRT STYLE!",title_ar:"ستايل القميص!",cat:"women"},{id:2,img:"https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",title:"LOUNGEWEAR LOVE",title_ar:"ملابس الاسترخاء",cat:"coat"},{id:3,img:"https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",title:"LIGHT JACKETS",title_ar:"جاكيتات خفيفة",cat:"jeans"}],We=[{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true",alt:"headphones"}],An=()=>{const[t,c]=i.useState(0),n=i.useCallback(()=>{c(r=>r===We.length-1?0:r+1)},[We.length]),l=i.useCallback(()=>{c(r=>r===0?We.length-1:r-1)},[We.length]);return i.useEffect(()=>{const r=setInterval(n,3e3);return()=>clearInterval(r)},[n]),e.jsxs("div",{className:"sliderBlock",children:[e.jsx("ul",{className:"sliderBlock_items50",children:We.map((r,m)=>e.jsx("li",{className:`sliderBlock_items__itemPhoto2 ${m===t?"sliderBlock_items__showing2":""}`,children:e.jsx("img",{src:r.image,alt:r.alt})},r.image))}),e.jsxs("div",{className:"sliderBlock_controls",children:[e.jsx("div",{className:"sliderBlock_controls__navigatin",children:e.jsxs("div",{className:"sliderBlock_controls__wrapper",children:[e.jsx("div",{className:"sliderBlock_controls__arrow sliderBlock_controls__arrowForward2",onClick:n,children:e.jsx(Us,{className:"sliderBlock_controls__arrowForward2"})}),e.jsx("div",{className:"sliderBlock_controls__arrow sliderBlock_controls__arrowBackward2",onClick:l,children:e.jsx(Js,{className:"sliderBlock_controls__arrowBackward2"})})]})}),e.jsx("ul",{className:"sliderBlock_positionControls",children:We.map((r,m)=>e.jsx("li",{className:`sliderBlock_positionControls__paginatorItem2 ${m===t?"sliderBlock_positionControls__active2":""}`},m))})]})]})},Sn=a.select`
	margin-left: 10px;
	padding: 5px;
`,Nn=t=>t.cart,Cn=({item:t})=>{const[c,n]=i.useState(0),[l,r]=i.useState(0),[m,h]=i.useState(0),[u,j]=i.useState(1),[E,k]=i.useState(""),[v,R]=i.useState([]),[H,ye]=i.useState({}),[te,fe]=i.useState({}),[je,ie]=i.useState([]),[W,ae]=i.useState(!1),[Ne,V]=i.useState(""),[S,Z]=i.useState(null),ce=Ce(Nn),[w,_]=i.useState([]),[g,X]=i.useState(null),[K,y]=i.useState(!1),[q,Q]=i.useState([]),[B,re]=i.useState(!1),[we,Le]=i.useState(0),ve=document.querySelector(".FilterSizeCatog1"),Je=Array.from(document.querySelectorAll(".show-cart2")),_e=document.querySelector(".CatogallColors2"),b=i.useRef(),A=i.useRef(!0),{language:f}=i.useContext(ke),{dictionary:T}=i.useContext(ke),z=T.sizes,me=Te();i.useEffect(()=>{W&&re(rs())},[W]),i.useEffect(()=>{(async()=>{try{const p=await Re.get(t!=null&&t.cat?`http://localhost:4000/api/products?category=${t==null?void 0:t.cat}`:"http://localhost:4000/api/products");ie(p.data)}catch(p){console.error("Error fetching data:",p)}})()},[t==null?void 0:t.cat]),i.useEffect(()=>{(async()=>{try{const[p,L]=await Promise.all([ne.get("/products"),ne.get("/offer")]);R(p.data),ye(p.data),fe(L.data)}catch(p){console.error("Error fetching data:",p)}})().then(()=>{}).catch(p=>{console.error("Error fetching data:",p),ae(!1)}).finally(()=>{v.length===0&&ae(!0)})},[v.length]);const oe=d=>{const p=document.createElement("input");p.classList.add("radio_button2"),p.setAttribute("id",`radioColor ${d}`),p.setAttribute("name","colorOfItem"),p.setAttribute("checked","checked"),p.setAttribute("value",d);const L=document.createElement("label");return L.setAttribute("for",`radioColor ${d}`),L.classList.add("block_goodColor__radio","block_goodColor__black"),L.style.backgroundColor=d,{input:p,label:L}},He=i.useCallback((d,p)=>{d.preventDefault(),document.querySelectorAll(".AddCart").forEach(O=>{O.removeAttribute("color")});const L=p.getAttribute("catog-id");X(W?[...H,...te].find(O=>O._id===L):v==null?void 0:v.find(O=>O._id===L)),V(""),Z(null)},[v,W,te,H]);i.useEffect(()=>{g&&(b.current=g.variants[0])},[g]),i.useEffect(()=>{if(g){const d=document.querySelector(".CatogCard"),p=document.querySelector(".backLayerForShowCart");d.style.display="block",d.style.overflow="hidden",p.style.display="block",p.style.overflow="hidden",document.body.style.overflow="hidden",document.querySelector(".CatogCardDesc").textContent=f==="en"?g.desc:g.desc_ar,_e.innerHTML="",n(g._id),h(g._id),document.querySelector(".nameProducts2").innerHTML=f==="en"?g.title:g.title_ar,document.querySelector(".block_product__advantagesProduct").append(f==="en"?g.desc:g.desc_ar)}},[g]);const cs=()=>{var he;const d=document.querySelector("label.selectedColor"),p=(he=document==null?void 0:document.getElementById(d==null?void 0:d.getAttribute("for")))==null?void 0:he.value,L=document.querySelector(".FilterSizeCatog1"),O=L.options[L.length-1].getAttribute("selected");if(!p){N("Error",f==="en"?"Please select a color":"يرجى تحديد اللون","error");return}if(!S&&!O){N("Error",f==="en"?"Please select a size":"يرجى تحديد الحجم","error");return}const J=L.options[L.length-1],U=parseInt(J.getAttribute("quantity"));if(!U){N("Error",f==="en"?"Please select a size":"يرجى تحديد الحجم","error");return}g&&(U-1<=0?N("Error","The maximum quantity is "+u,"error"):j(D=>{const o=D+1;return J.setAttribute("quantity",U-1),o}))};i.useEffect(()=>{if(!g||S)return;_e.innerHTML="",ve.innerHTML="";const d=new Set,p=new Set;g.variants.forEach(J=>{J.color.forEach(U=>{if(!d.has(U)){d.add(U),p.add(...J.size);const{input:he,label:D}=oe(U);_e.appendChild(he),_e.appendChild(D)}})}),Array.from(p).forEach(J=>{const U=z[J],he=new Option(U,J);k(J),ve.appendChild(he)});const O=J=>{Z(J.target.value);const U=g.variants.find(he=>he.size.includes(J.target.value));b.current=U,U&&(_([U]),r(U==null?void 0:U._id),j(1),U.quantity>0?Xe(Ie):Ve(Ie))};ve.addEventListener("click",O)},[g,b,V,_,Z,j]);const Ee=i.useMemo(()=>ce.products.reduce((d,p)=>{const L=d.find(O=>O._id===p._id&&O.selectedVariant._id===p.selectedVariant._id);return L?L.quantity+=p.quantity:d.push({...p}),d},[]),[ce]),Ie=document.querySelector(".AddCart");i.useEffect(()=>{if(g&&!S){_e.innerHTML="";let d;const p=new Set;g.variants.forEach(L=>{L.color.forEach(O=>{if(!p.has(O)){p.add(O);const{input:J,label:U}=oe(O);_e.appendChild(J),_e.appendChild(U),J.addEventListener("click",he=>{V(he.target.value);const D=document.querySelector(".selectedColor");D&&D.classList.remove("selectedColor"),U.classList.add("selectedColor");const o=g.variants.filter(C=>C.color.includes(he.target.value)),x=Array.from(new Set(o.flatMap(C=>C.size)));document.querySelectorAll(".block_quantity__number").forEach(C=>{C.value=1}),j(1),ve.innerHTML="",ve.addEventListener("click",C=>{k(C.target.value);const F=o.find(I=>I.size.includes(C.target.value));b.current=F,_([F]),r(F==null?void 0:F._id),j(1),x.find(I=>{if(I===C.target.value){d.setAttribute("selected","selected");const $=Ee.find(pe=>pe.selectedVariant._id===F._id),ee=$&&$.quantity?$.quantity:we;d.setAttribute("quantity",F.quantity-ee),d.getAttribute("quantity")==="0"&&Ve(Ie)}})}),x.forEach(C=>{const F=z[C];d=new Option(F,C),k(C),ve.appendChild(d)}),Xe(Ie)})}})})}},[g,b,V,Z,j,we]),Je.forEach(d=>{d.addEventListener("click",p=>{j(1),He(p,d)})}),document.querySelectorAll(".CloseCatogCard").forEach(d=>d.addEventListener("click",p=>{document.querySelector(".CatogCard").style.display="none",document.body.style.overflow="",document.querySelector(".CatogCard").style.overflow="",document.querySelector(".backLayerForShowCart").style.display="none"}));const Pe=(d,p,L)=>{N(d,p,L)},Ze=()=>{const d=ve.options[ve.length-1],p=parseInt(d.getAttribute("quantity"));u<=1?Pe("Info",f==="en"?"The minimum quantity is 1":"الحد الادنى للكمية هو 1","info"):(j(u-1),d.setAttribute("quantity",p+1))},rs=()=>!0,os=d=>[...H,...te].find(L=>L._id===d),ls=d=>{var F;const p=d.target.getAttribute("product_id"),L=document.querySelector(".selectedColor"),O=L?L.htmlFor:null,U=document.getElementById(O).value,he=document.querySelector(".FilterSizeCatog1").value,D=os(p),o=D.variants.find(I=>I.color[0]===U&&I.size[0]===he);if(!D){Ke(f==="en"?"Product not found!":"المنتج غير موجود!",s);return}const x=Ee.find(I=>I.selectedVariant._id===o._id),C=x&&x.quantity?x.quantity:0;if(u>o.quantity-C){Ve(Ie);return}if(u>0){const I={...D,quantity:u,selectedVariant:o};let $=localStorage.getItem("persist:root");$=$?JSON.parse($):[],Array.isArray($)||($=[]);const ee=$.find(le=>le._id===I._id);ee?ee.quantity+=I.quantity:$.push(I);const pe=document.querySelector("label.selectedColor"),Ae=(F=document==null?void 0:document.getElementById(pe==null?void 0:pe.getAttribute("for")))==null?void 0:F.value,be=document.querySelector(".FilterSizeCatog1"),se=be.options[be.length-1].getAttribute("selected");if(!Ae){N("Error",f==="en"?"Please select a color":"يرجى تحديد لون","error");return}if(!S&&!se){N("Error",f==="en"?"Please select a size":"يرجى تحديد حجم","error");return}const G=be.options[be.length-1];if(!parseInt(G.getAttribute("quantity"))){N("Error",f==="en"?"Please select a size":"يرجى تحديد حجم","error");return}me(vs(I)),G.setAttribute("quantity",o.quantity-u),Le(o.quantity-u),j(1),ds(f==="en"?"Product added to cart!":"تمت اضافة المنتج للعربة!"),G.getAttribute("quantity")==="0"&&Ve(Ie)}else Ke(f==="en"?"Try with a different amount!":"يرجى تحديد مبلغ مختلف")},Ve=d=>{d.pointerEvents="none",d.style.opacity="0.5",d.style.cursor="not-allowed"},Xe=d=>{d.pointerEvents="auto",d.style.opacity="1",d.style.cursor="pointer"},Ke=d=>{N("Info",d,"info")},ds=d=>{N("Success",d,"success")},De=async(d,p,L)=>{if(!K){await N({title:f==="en"?"You have to login !":"يجب تسجيل الدخول",icon:"warning"}),window.location.href="/login";return}let O=L.target;O.tagName==="path"&&(O=O.parentNode);const J=O.classList[0];try{await is(d,Y),p==="remove"?(J==="add-to-wish2"&&(O.style.display="none",O.previousSibling.style.display="block"),N("Success",f==="en"?"Product removed from wishlist!":"تمت ازالة المنتج من قائمة الرغبات","success")):p==="addCatog"&&(J==="add-to-wish"&&(O.style.display="none",O.nextSibling.children[0].style.display="block",O.nextSibling.style.display="block"),N("Success",f==="en"?"Product added to wishlist!":"تمت اضافة المنتج الى قائمة الرغبات","success"))}catch{N("Error",f==="en"?"Something went wrong!":"حدث خطأ","error")}};let Y=localStorage.getItem("persist:root");if(i.useEffect(async()=>{var d;if(JSON.parse(Y).user)try{Y=JSON.parse(Y),Y=Y==null?void 0:Y.user,Y=JSON.parse(Y),Y=(d=Y==null?void 0:Y.currentUser)==null?void 0:d._id,Y!==void 0&&y(!0);const p=await fs(Y);A.current&&Q([...p])}catch(p){console.error(p)}return()=>{A.current=!1}},[Y]),i.useEffect(()=>{j(1)},[Ne,S]),!A.current)return null;const Qe=d=>{const p=new Date,L=new Date(d.discount.startDate),O=new Date(d.discount.endDate);return p>=L&&p<=O?d.price*(100-d.discount.discount)/100:d.price};function qe(d,p){return new Intl.NumberFormat(p==="ar"?"ar-EG":"en-US",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:0}).format(d)}return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"backLayerForShowCart"}),e.jsx("div",{className:"column small-centered",children:e.jsx("div",{className:"productCard_block CatogCard",children:e.jsxs("div",{className:"row11",children:[e.jsx("div",{className:"small-12 large-6 columns11",children:e.jsx("div",{className:"productCard_leftSide clearfix",children:e.jsx(An,{})})}),e.jsxs("div",{className:"small-12 large-6 columns11",children:[e.jsx("div",{className:"AiFillCloseCircle CloseCatogCard",children:e.jsx(Gs,{})}),e.jsxs("div",{className:"productCard_rightSide",children:[e.jsx("div",{className:"block_specification",children:e.jsx("div",{className:"block_specification__specificationShow",children:e.jsx("i",{className:"fa fa-cog block_specification__button block_specification__button__rotate","aria-hidden":"true"})})}),e.jsxs("div",{className:"block_product",children:[e.jsx("h2",{className:"block_name block_name__mainName nameProducts2"}),e.jsx("p",{className:"block_product__advantagesProduct CatogCardDesc"}),e.jsx("div",{className:"block_informationAboutDevice",children:e.jsxs("div",{className:"row11 ",children:[e.jsxs("div",{className:"large-6 small-12 column left-align",children:[e.jsxs("div",{className:"block_price",children:[e.jsx("p",{className:"block_price__currency currency",children:f==="ar"?`${qe(g==null?void 0:g.price,f)} $`:`$ ${qe(g==null?void 0:g.price,f)}`}),e.jsx("p",{className:"block_price__shipping",children:f==="en"?"Shipping and taxes extra":"الشحن والضريبة"})]}),e.jsxs("div",{className:"block_quantity clearfix",children:[e.jsx("span",{className:"text_specification",children:f==="en"?"Quantity":"الكمية:"}),e.jsxs("div",{className:"block_quantity__chooseBlock",readOnly:!0,children:[e.jsx("input",{className:"block_quantity__number block_quantity__number2",name:"quantityNumber",type:"text",min:"1",value:u,readOnly:!0}),e.jsx("button",{className:"block_quantity__button block_quantity__up",children:e.jsx(Hs,{onClick:()=>{Ze()},className:"AiOutlineArrowUpanddown down5"})}),e.jsx("button",{className:"block_quantity__button block_quantity__down",children:e.jsx(Zs,{onClick:()=>{cs()},className:"AiOutlineArrowUpanddown up5"})})]})]})]}),e.jsxs("div",{className:"large-6 small-12 column end",children:[e.jsxs("div",{className:"block_goodColor",children:[e.jsx("span",{className:"text_specification",children:f==="en"?"Choose your colors:":"اختر الالوان:"}),e.jsx("div",{className:"zaid",style:{display:"hidden"}}),e.jsx("div",{className:"block_goodColor__allColors2 CatogallColors2"}),e.jsx(Sn,{className:"FilterSizeCatog1",onClick:d=>k(d.target.value)})]}),W?B?e.jsx("button",{className:"AddCart",product_id:m,onClick:d=>{ls(d)},children:f==="en"?"Add to cart":"اضف الى السلة"}):e.jsx("button",{className:"AddCart",disabled:!0,children:f==="en"?"Out of stock":"غير متوفر"}):e.jsx("p",{children:f==="en"?"Loading":"جاري التحميل"})]})]})})]})]})]})]})})}),e.jsxs("div",{id:"listingtabs_0",className:"block sm-listing-tabs tab-cms-block slider snipcss-X3nN9",children:[e.jsx("h2",{children:f==="en"?t==null?void 0:t.title:t==null?void 0:t.title_ar}),e.jsx("div",{className:"block-content",children:e.jsxs("div",{className:"ltabs-wrap",children:[e.jsx("div",{className:"ltabs-tabs-container",children:e.jsx("div",{className:"ltabs-tabs-wrap",tabindex:"-1",children:e.jsx("span",{className:"ltabs-current-select",children:f==="en"?"Accessories for iPhone":"إكسسوارات للايفون"})})}),e.jsxs("div",{className:"listingtabs-cms",children:[e.jsx("div",{className:"cms-container",children:e.jsx("div",{className:"banner-image container-hidd",children:e.jsx(M,{to:`/products/${t==null?void 0:t.cat}`,children:e.jsx("img",{className:"mark-lazy new-lazy",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg",alt:"BannerImage",width:"350",height:"370"})})})}),e.jsx("div",{className:"ltabs-items-container",children:e.jsx("div",{className:"ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15",children:e.jsx("div",{className:"ltabs-items-inner",children:e.jsx("div",{className:"products wrapper grid products-grid",children:e.jsxs("ol",{className:"products list items product-items owl-carousel owl-theme owl-loaded owl-drag",children:[e.jsx("div",{className:"owl-stage-outer",children:e.jsx("div",{className:"owl-stage style-pO7ki",id:"style-pO7ki",children:je.slice(0,4).map(d=>e.jsx("div",{className:"owl-item active style-SmoEo",id:"style-SmoEo",children:e.jsx("li",{className:"item product product-item",children:e.jsxs("div",{className:"product-item-info","data-container":"product-grid",children:[e.jsx(M,{to:`/product/${d._id}`,className:"action quickview-handler sm_quickview_handler",title:"Quick View",href:"",children:e.jsxs("div",{className:"image-product",children:[e.jsx("a",{href:"#",className:"product photo product-item-photo",tabindex:"-1",children:e.jsx("span",{className:"product-image-container product-image-container-1 style-bH5WH",id:"style-bH5WH",children:e.jsx("span",{className:"product-image-wrapper style-MbttD",id:"style-MbttD",children:e.jsx("img",{className:"product-image-photo",src:d.variants[0].img,"data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg",loading:"lazy",width:"300",height:"300",alt:f==="en"?d.title:d.title_ar})})})}),e.jsxs(M,{to:"",className:"action quickview-handler sm_quickview_handler show-cart2",title:"Quick View",href:"","catog-id":d._id,children:[e.jsx(Xs,{}),e.jsx("span",{children:f==="en"?"Quick View":"مشاهدة سريعة"})]})]})}),e.jsxs("div",{className:"product details product-item-details",children:[e.jsxs("strong",{className:"product name product-item-name",children:[f==="en"?d.title:d.title_ar,e.jsx("a",{className:"product-item-link",href:"#"})]}),e.jsx("div",{className:"price-box price-final_price","data-role":"priceBox","data-product-id":"1","data-price-box":"product-id-1",children:e.jsx("span",{className:"price-container price-final_price tax weee",children:e.jsx("span",{id:"product-price-1","data-price-amount":"250","data-price-type":"finalPrice",className:"price-wrapper",children:e.jsx("span",{className:"price",children:f==="ar"?`${qe(Qe(d),f)} $`:`$ ${qe(Qe(d),f)}`})})})}),e.jsx("div",{className:"product-item-inner",children:e.jsxs("div",{className:"product actions product-item-actions",children:[e.jsx("div",{className:"actions-primary"}),e.jsx("div",{"data-role":"add-to-links",className:"actions-secondary"}),e.jsx(M,{to:`/product/${d._id}`,children:e.jsx("button",{className:"Add-to-Cart-new",children:f==="en"?"Add to Cart":"اضف الى السلة"})}),e.jsxs("div",{className:"actions-secondary","data-role":"add-to-links",children:[e.jsxs("div",{className:"action towishlist","data-action":"add-to-wishlist",title:"Add to Wish List",children:[q.includes(d._id)?e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:p=>{De(d._id,"addCatog",p)},style:{display:"none"}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z",onClick:p=>{De(d._id,"remove",p)}})})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:p=>{De(d._id,"addCatog",p)}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z",onClick:p=>{De(d._id,"remove",p)},style:{display:"none"}})})]}),e.jsx("span",{children:f==="en"?"Add to Wish List":"اضف الى القائمة المفضلة"})]}),e.jsxs("div",{className:"action tocompare","data-post":'{"action":"http:\\/\\/magento2.magentech.com\\/themes\\/sm_venuse\\/pub\\/french\\/catalog\\/product_compare\\/add\\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}',title:"Add to Compare",children:[e.jsx(Ks,{}),e.jsx("span",{children:f==="en"?"Add to Compare":"اضف للمقارنة"})]})]})]})})]})]})})}))})}),e.jsxs("div",{className:"owl-nav",children:[e.jsx("div",{role:"presentation",className:"owl-prev disabled",children:e.jsx("span",{"aria-label":"Previous",children:"‹"})}),e.jsx("div",{role:"presentation",className:"owl-next",children:e.jsx("span",{"aria-label":"Next",children:"›"})})]}),e.jsx("div",{className:"owl-dots disabled"})]})})})})})]})]})})]})]})},kn=a.div`
	display: flex;
	padding: 20px;
	justify-content: space-between;
	${P({padding:"0px",flexDirection:"column"})}
	flex-direction: column;
`,En=()=>e.jsx(kn,{children:_n.map(t=>e.jsx(Cn,{item:t},t.id))}),Pn=()=>e.jsx("div",{class:"sidebar-nav-mobile snipcss-JRPk3",children:e.jsx("div",{class:"tab-content-mobile",id:"nav-tabContent",children:e.jsx("div",{class:"tab-panel fade show active",id:"menu-mobile",role:"tabpanel","aria-labelledby":"menu-mobile-tab",children:e.jsx("div",{class:"nav-mobile-container sidebar-type",children:e.jsx("nav",{id:"navigation-mobile",class:"navigation-mobile",children:e.jsxs("ul",{class:"horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black","data-jsapi":"on",children:[e.jsx("li",{class:"home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop",children:e.jsx(M,{to:"/products/women",children:e.jsx("span",{class:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{class:"sm_megamenu_title",children:"Women"})})})}),e.jsxs("li",{class:"other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item",children:[e.jsxs(M,{to:"/products/coat",children:[e.jsx("span",{class:"icon_items",children:e.jsx("img",{src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png",alt:"icon items",width:"1",height:"1"})}),e.jsx("span",{class:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{class:"sm_megamenu_title",children:"Coat"})})]}),e.jsx("span",{class:"btn-submobile"})]}),e.jsxs("li",{class:"other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item",children:[e.jsxs(M,{to:"/products/jeans",children:[e.jsx("span",{class:"icon_items",children:e.jsx("img",{src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png",alt:"icon items",width:"1",height:"1"})}),e.jsx("span",{class:"sm_megamenu_icon sm_megamenu_nodesc",children:e.jsx("span",{class:"sm_megamenu_title",children:"Jeans"})})]}),e.jsx("span",{class:"btn-submobile"})]})]})})})})})});function qn({children:t}){const[c,n]=i.useState(!0),l=()=>{n(!c)};return e.jsxs(e.Fragment,{children:[e.jsx("a",{onClick:l,id:"btn-nav-mobile",children:e.jsx(Pt,{})}),!c&&t]})}const Ln=()=>e.jsx("div",{class:"mobile-top snipcss-OsEnD",children:e.jsx("div",{class:"container",children:e.jsxs("div",{class:"mobile-header-content",children:[e.jsx("div",{class:"mobile-menu",children:e.jsx(qn,{children:e.jsx(Pn,{})})}),e.jsx("div",{class:"mobile-logo",children:e.jsx("img",{src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/logomobile/default/logo-mobile.png",width:"157",height:"35"})}),e.jsx("div",{class:"mobile-cart",children:e.jsxs("div",{id:"minicart-mobile",class:"minicart-mobile",children:[e.jsx("span",{class:"hidden",children:"Cart Mobile"}),e.jsxs("div",{"data-block":"minicart",class:"mobile-wrapper",children:[e.jsx(M,{to:"/cart",class:"mobile action showcart","data-bind":"scope: 'minicart_content'",children:e.jsx(qt,{})}),e.jsx("div",{tabindex:"-1",role:"dialog",class:"ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-pwEon","aria-describedby":"ui-id-1",id:"style-pwEon",children:e.jsx("div",{class:"block block-minicart ui-dialog-content ui-widget-content style-fjlot","data-role":"dropdownDialog",id:"ui-id-1",children:e.jsxs("div",{id:"minicart-content-wrapper","data-bind":"scope: 'minicart_content'",children:[e.jsx("div",{class:"block-title",children:e.jsxs("strong",{children:[e.jsx("span",{class:"text","data-bind":"i18n: 'My Cart'",children:"My Cart"}),e.jsx("span",{class:"qty empty",title:"Items in Cart"})]})}),e.jsxs("div",{class:"block-content",children:[e.jsx("button",{type:"button",id:"btn-minicart-close",class:"action close","data-action":"close",title:"Close",children:e.jsx("span",{"data-bind":"i18n: 'Close'",children:"Close"})}),e.jsx("strong",{class:"subtitle empty","data-bind":"i18n: 'You have no items in your shopping cart.'",children:"You have no items in your shopping cart."}),e.jsx("div",{id:"minicart-widgets",class:"minicart-widgets"})]})]})})})]})]})})]})})}),In=()=>{const[t,c]=i.useState(""),[n,l]=i.useState([]);return i.useEffect(()=>{const r=async()=>{if(t===""){l([]);return}const m=await Re.get(`http://localhost:4000/api/products/search/${t}`);l(m.data)};(t.length===0||t.length>=1)&&r()},[t]),e.jsx("div",{class:"mobile-bottom snipcss-LAYO2",children:e.jsx("div",{class:"container",children:e.jsx("div",{class:"block-search-mobile",children:e.jsx("div",{class:"block-content",children:e.jsx("div",{class:"field search",children:e.jsxs("div",{class:"control",children:[e.jsx("input",{id:"searchbox",type:"text",name:"q",placeholder:"Enter keywords to search...",className:"input-text input-searchbox",maxlength:"128",role:"combobox","aria-haspopup":"false","aria-expanded":"true","aria-autocomplete":"both",autocomplete:"off",value:t,onChange:r=>c(r.target.value.toLowerCase())}),e.jsx(st,{data:n})]})})})})})})},On=a.div`
	height: 100%;
	display: flex;
	transition: all 2s ease;
	transform: translateX(
		${t=>t.slideIndex*(t.language==="ar"?-1:1)*-30}vw
	);
`,Rn=a.select`
	margin-left: 10px;
	padding: 5px;
`,Tn=()=>{const[t,c]=i.useState([]),[n,l]=i.useState(!1),[r,m]=i.useState(0),[h,u]=i.useState(0),[j,E]=i.useState(0),[k,v]=i.useState(1),[R,H]=i.useState(""),ye=Te(),[te,fe]=i.useState([]),[je,ie]=i.useState({}),[W,ae]=i.useState({}),[Ne,V]=i.useState([]),[S,Z]=i.useState(!1),[ce,w]=i.useState(""),[_,g]=i.useState(null),[X,K]=i.useState([]),[y,q]=i.useState(null),[Q,B]=i.useState(0),[re,we]=i.useState(0),[Le,ve]=i.useState(0),[Je,_e]=i.useState(0),b=document.querySelector(".FilterSizeCatog2"),[A,f]=i.useState(!1);let T=[];const{language:z}=i.useContext(ke),me=[{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true",alt:"headphones"},{image:"https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true",alt:"headphones"}];i.useEffect(()=>{const o=setInterval(He,3e3);return()=>{clearInterval(o)}},[]);const oe=me.length;document.querySelectorAll(".CloseCatogCard").forEach(o=>o.addEventListener("click",x=>{document.querySelector(".CatogCard2").style.display="none",document.body.style.overflow="",document.querySelector(".CatogCard2").style.overflow="",document.querySelector(".backLayerForShowCart2").style.display="none"}));const He=()=>{_e(o=>o===oe-1?0:o+1),ve(o=>o===oe-1?0:o+1)},cs=()=>{_e(o=>o===0?oe-1:o-1),ve(o=>o===0?oe-1:o-1)};i.useEffect(()=>{v(1),B(o=>o+1)},[ce]);const Ee=i.useRef();i.useEffect(()=>{(async()=>{try{const[x,C]=await Promise.all([ne.get("/products"),ne.get("/offer")]);fe(x.data),ie(x.data),ae(C.data)}catch(x){console.error("Error fetching data:",x)}})().then(()=>{}).catch(x=>{console.error("Error fetching data:",x),Z(!1)}).finally(()=>{te.length===0&&Z(!0)})},[te.length]);const Ie=Array.from(document.querySelectorAll(".show-cart3")),Pe=document.querySelector(".CatogallColors");document.querySelector(".currency");const Ze=o=>{const x=document.createElement("input");x.classList.add("radio_button"),x.setAttribute("id",`radioColor ${o}`),x.setAttribute("name","colorOfItem"),x.setAttribute("checked","checked"),x.setAttribute("value",o);const C=document.createElement("label");return C.setAttribute("for",`radioColor ${o}`),C.classList.add("block_goodColor__radio","block_goodColor__black"),C.style.backgroundColor=o,{input:x,label:C}},rs=i.useCallback((o,x)=>{o.preventDefault(),document.querySelectorAll(".AddCart2").forEach(F=>{F.removeAttribute("color")});const C=x.getAttribute("catog-id");q(S?[...je,...W].find(F=>F._id===C):te==null?void 0:te.find(F=>F._id===C)),w(""),g(null)},[te,S,W,je]);i.useEffect(()=>{y&&(Ee.current=y.variants[0])},[y]),i.useEffect(()=>{if(y){document.querySelector(".selectedColor");const o=document.querySelector(".CatogCard2"),x=document.querySelector(".productCard_block2"),C=document.querySelector(".backLayerForShowCart2");document.querySelector(".sliderBlock_items50"),o.style.display="block",o.style.overflow="hidden",C.style.display="block",C.style.overflow="hidden",x.style.display="block",x.style.overflow="hidden",document.body.style.overflow="hidden",document.querySelector(".CatogCardDesc2").textContent=y.desc,Pe.innerHTML="",m(y._id),E(y._id),document.querySelector(".nameProducts2").innerHTML=y.title,document.querySelector(".block_product__advantagesProduct").append(y.desc)}},[y]);const os=(o,x,C)=>{N(o,x,C)},ls=o=>{N("Info",o,"info")},Ve=o=>{N("Success",o,"success")},Xe=o=>{o.pointerEvents="none",o.style.opacity="0.5",o.style.cursor="not-allowed"},Ke=()=>{k<=1?os("Info","The minimum quantity is 1","info"):v(k-1)},ds=()=>{var ee;const o=document.querySelector("label.selectedColor"),x=(ee=document==null?void 0:document.getElementById(o==null?void 0:o.getAttribute("for")))==null?void 0:ee.value,C=document.querySelector(".FilterSizeCatog2"),F=C.options[C.length-1].getAttribute("selected");if(!x){N("Error","Please select a color","error");return}if(!_&&!F){N("Error","Please select a size","error");return}const I=C.options[C.length-1],$=parseInt(I.getAttribute("quantity"));if(!$){N("Error","Please select a size","error");return}y&&($<k+1?N("Error","The maximum quantity is "+k,"error"):v(pe=>pe+1))};i.useEffect(()=>{if(y&&!_){Pe.innerHTML="";let o;const x=new Set;y.variants.forEach(I=>{I.color.forEach($=>{if(!x.has($)){x.add($);const{input:ee,label:pe}=Ze($);Pe.appendChild(ee),Pe.appendChild(pe),ee.addEventListener("click",Ae=>{w(Ae.target.value);const be=document.querySelector(".selectedColor");be&&be.classList.remove("selectedColor"),pe.classList.add("selectedColor");const se=y.variants.filter(xe=>xe.color.includes(Ae.target.value)),G=Array.from(new Set(se.flatMap(xe=>xe.size)));v(1),b.innerHTML="",G.forEach(xe=>{o=new Option(xe,xe),b.appendChild(o),b.addEventListener("change",le=>{g(le.target.value);const Oe=y.variants.find(Me=>Me.size.includes(le.target.value));Ee.current=Oe,o.setAttribute("quantity",Oe.quantity),K([Oe]),u(Oe._id),v(1),G.forEach(Me=>{Me===le.target.value&&o.setAttribute("selected","selected")})})})})}})});const C=y.variants.flatMap(I=>I.size),F=Array.from(new Set(C));b.innerHTML="",F.forEach(I=>{const $=new Option(I,I);b.appendChild($),I===F[0]&&($.selected=!0,H(I))}),b.addEventListener("change",I=>{g(I.target.value);const $=y.variants.find(ee=>ee.size.includes(I.target.value));Ee.current=$,K([$]),u($==null?void 0:$._id),v(1)})}},[y,Ee,w,K,g,v]),i.useEffect(()=>{if(y&&!_){Pe.innerHTML="";let o;const x=new Set;y.variants.forEach(C=>{C.color.forEach(F=>{if(!x.has(F)){x.add(F);const{input:I,label:$}=Ze(F);Pe.appendChild(I),Pe.appendChild($),I.addEventListener("click",ee=>{w(ee.target.value);const pe=document.querySelector(".selectedColor");pe&&pe.classList.remove("selectedColor"),$.classList.add("selectedColor");const Ae=y.variants.filter(se=>se.color.includes(ee.target.value)),be=Array.from(new Set(Ae.flatMap(se=>se.size)));v(1),b.innerHTML="",b.addEventListener("click",se=>{const G=Ae.find(xe=>xe.size.includes(se.target.value));Ee.current=G,K([G]),u(G==null?void 0:G._id),v(1),be.find(xe=>{xe===se.target.value&&(o.setAttribute("selected","selected"),o.setAttribute("quantity",G.quantity))})}),be.forEach(se=>{o=new Option(se,se),H(se),b.appendChild(o)})})}})})}},[y,Ee,w,g,v]),Ie.forEach(o=>{o.addEventListener("click",x=>{v(1),rs(x,o)})});const De=o=>[...je,...W].find(C=>C._id===o),Y=document.querySelector(".AddCart2");new Map(T.map(o=>[o._id,o]));const Qe=o=>{const x=o.target.getAttribute("product_id"),C=T.map(le=>le.quantity)[0],I=document.querySelector(".selectedColor").htmlFor,ee=document.getElementById(I).value,pe=document.querySelector(".FilterSizeCatog2").value,Ae=De(x),be=Ae.variants.find(le=>le.color[0]===ee&&le.size[0]===pe);if(k>Ae.quantity){ls("You already have the maximum amount!");return}const se={...Ae,quantity:k,selectedVariant:be};let G=localStorage.getItem("persist:root");G=G?JSON.parse(G):[],Array.isArray(G)||(G=[]);const xe=G.find(le=>le._id===se._id);xe?xe.quantity+=se.quantity:G.push(se),localStorage.setItem("persist:root",JSON.stringify(G)),p=G,T=p.reduce((le,Oe)=>{const Me=le.find(ct=>ct._id===Oe._id);return Me?Me.quantity+=Oe.quantity:le.push({...Oe}),le},[]),ye(vs(se)),v(1),Ve("Product added to cart!"),C>=be.quantity&&(Xe(Y),N("Info","You already have the maximum amount!","info"))},qe=i.useRef(null),d=o=>{qe.current&&(clearInterval(qe.current),qe.current=null),we(z==="ar"?o==="left"?re>0?re-1:2:re<2?re+1:0:o==="left"?re<2?re+1:0:re>0?re-1:2)};i.useEffect(()=>{(async()=>{try{const x=await Re.get("http://localhost:4000/api/products"),C=Date.parse(new Date),F=x.data.filter(I=>{const $=Date.parse(I.discount.startDate),ee=Date.parse(I.discount.endDate);return I.discount&&$<=C&&ee>=C}).slice(0,4);c(F),V(x.data)}catch(x){console.error("Error fetching data:",x)}})()},[]);let p=JSON.parse(localStorage.getItem("persist:root"));(p==null||p==="")&&(localStorage.setItem("persist:root",JSON.stringify({cart:[]})),p=JSON.parse(localStorage.getItem("persist:root"))),p=p.cart;const L=(o,x)=>{x.target.classList[0]==="add-to-wish"&&n==!0&&(x.target.style.display="none",x.target.nextSibling.style.display="block"),x.target.classList[0]==="add-to-wish2"&&n==!0&&(x.target.parentNode.style.display="none",x.target.parentNode.previousSibling.style.display="block")},O=(o,x)=>{if(n===!1){N({title:"You have to login !",icon:"warning"}).then(C=>{C&&(window.location.href="/login")});return}if(x==="remove"&&n===!0){N("Success","Product removed from wishlist!","success"),is(o);return}N("Success","Product added to wishlist!","success"),is(o)},J=i.useRef(!0),[U,he]=i.useState([]);let D=localStorage.getItem("persist:root");return i.useEffect(async()=>{var o;if(JSON.parse(D).user)try{D=JSON.parse(D),D=D==null?void 0:D.user,D=JSON.parse(D),D=(o=D==null?void 0:D.currentUser)==null?void 0:o._id,D!==void 0&&l(!0);const x=await fs(D);J.current&&he([...x])}catch(x){console.error(x)}return()=>{J.current=!1}},[D]),J.current?(i.useEffect(()=>{A||clearInterval(qe.current)},[A]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"backLayerForShowCart2"}),e.jsx("div",{className:"column small-centered",children:e.jsx("div",{className:"productCard_block2 CatogCard2",children:e.jsxs("div",{className:"row11",children:[e.jsx("div",{className:"small-12 large-6 columns11",children:e.jsx("div",{className:"productCard_leftSide clearfix",children:e.jsxs("div",{className:"sliderBlock",children:[e.jsx("ul",{className:"sliderBlock_items50",children:me.map((o,x)=>e.jsx("li",{className:`sliderBlock_items__itemPhoto2 ${x===Je?"sliderBlock_items__showing2":""}`,children:e.jsx("img",{src:o.image,alt:o.alt})},x))}),e.jsxs("div",{className:"sliderBlock_controls",children:[e.jsx("div",{className:"sliderBlock_controls__navigatin",children:e.jsxs("div",{className:"sliderBlock_controls__wrapper",children:[e.jsx("div",{className:"sliderBlock_controls__arrow sliderBlock_controls__arrowForward2",onClick:He,children:e.jsx(Us,{className:"sliderBlock_controls__arrowForward2"})}),e.jsx("div",{className:"sliderBlock_controls__arrow sliderBlock_controls__arrowBackward2",onClick:cs,children:e.jsx(Js,{className:"sliderBlock_controls__arrowBackward2"})})]})}),e.jsx("ul",{className:"sliderBlock_positionControls",children:me.map((o,x)=>e.jsx("li",{className:`sliderBlock_positionControls__paginatorItem2 ${x===Le?"sliderBlock_positionControls__active2":""}`},x))})]})]})})}),e.jsxs("div",{className:"small-12 large-6 columns11",children:[e.jsx("div",{className:"AiFillCloseCircle CloseCatogCard",children:e.jsx(Gs,{})}),e.jsxs("div",{className:"productCard_rightSide",children:[e.jsx("div",{className:"block_specification",children:e.jsx("div",{className:"block_specification__specificationShow",children:e.jsx("i",{className:"fa fa-cog block_specification__button block_specification__button__rotate","aria-hidden":"true"})})}),e.jsxs("div",{className:"block_product",children:[e.jsx("h2",{className:"block_name block_name__mainName nameProducts2"}),e.jsx("p",{className:"block_product__advantagesProduct CatogCardDesc2"}),e.jsx("div",{className:"block_informationAboutDevice",children:e.jsxs("div",{className:"row11 ",children:[e.jsxs("div",{className:"large-6 small-12 column left-align",children:[e.jsxs("div",{className:"block_price",children:[e.jsxs("p",{className:"block_price__currency currency",children:["$ ",y==null?void 0:y.price]}),e.jsx("p",{className:"block_price__shipping",children:"Shipping and taxes extra"})]}),e.jsxs("div",{className:"block_quantity clearfix",children:[e.jsx("span",{className:"text_specification",children:"Quantity"}),e.jsxs("div",{zaid:Q,className:"block_quantity__chooseBlock",readOnly:!0,children:[e.jsx("input",{className:"block_quantity__number block_quantity__number2",name:"quantityNumber",type:"text",min:"1",value:k,readOnly:!0}),e.jsx("button",{className:"block_quantity__button block_quantity__up",children:e.jsx(Hs,{onClick:()=>{Ke()},className:"AiOutlineArrowUpanddown down5"})}),e.jsx("button",{className:"block_quantity__button block_quantity__down",children:e.jsx(Zs,{onClick:()=>{ds()},className:"AiOutlineArrowUpanddown up5"})})]},Q)]})]}),e.jsxs("div",{className:"large-6 small-12 column end",children:[e.jsxs("div",{className:"block_goodColor",children:[e.jsx("span",{className:"text_specification",children:"Choose your colors:"}),e.jsx("div",{className:"zaid",style:{display:"hidden"}}),e.jsx("div",{className:"block_goodColor__allColors CatogallColors"}),e.jsx(Rn,{className:"FilterSizeCatog2",onChange:o=>H(o.target.value)})]}),S?e.jsx("button",{className:"AddCart2",product_id:j,onClick:o=>{Qe(o)},children:"Add to Cart"}):e.jsx("p",{children:"loading"})]})]})})]})]})]})]})})}),e.jsx("div",{className:"group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC",id:"style-sCNUC",children:e.jsx("div",{children:e.jsxs("div",{className:"block block-list-products",children:[e.jsx("div",{className:"block-title",children:e.jsx("strong",{children:"Hot Deals"})}),e.jsx("div",{className:"block-content",children:e.jsxs("div",{id:"filterproducts_1",className:`product-deal-list ${z==="ar"?"product-deal-list-ar":""}`,children:[e.jsx(M,{to:"/",children:e.jsxs("div",{className:"deal-left",children:[e.jsx("div",{className:"deal-description",children:e.jsxs("div",{children:[z==="ar"?"عرض خاص":"Special Offer!",e.jsx("br",{}),z==="ar"?" أعلى من":"up to",e.jsx("span",{id:"style-Leion",className:"style-Leion",children:"50%"}),z==="ar"?" خصم":" off"]})}),e.jsx("div",{className:"timer-content",children:e.jsx("div",{className:"timer-title",children:z==="ar"?" أسرع - بسرعة! انقر هنا لإظهار كافة العروض":"Hurry Up! Click here to show All Offer"})})]})}),e.jsxs("div",{className:z==="ar"?"deal-contentAr":"deal-content",children:[e.jsxs("div",{className:"owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag",children:[e.jsx("div",{className:"owl-stage-outer",children:e.jsx(On,{className:"owl-stage style-FUF77",id:"style-FUF77",slideIndex:re,language:z,children:t.map(o=>e.jsx("div",{className:"owl-item active style-Ke3kW",id:"style-Ke3kW",onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:e.jsx("div",{className:"item product product-item",children:e.jsxs("div",{className:`product-item-info ${z==="ar"?"product-item-info-ar":""} `,"data-container":"product-grid",children:[e.jsx(M,{to:`/product/${o._id}`,className:`action quickview-handler\r
																	sm_quickview_handler`,title:"Quick View",href:"",children:e.jsxs("div",{className:"image-product",children:[e.jsx("div",{className:"product photo product-item-photo",tabindex:"-1",children:e.jsx("span",{className:"product-image-container product-image-container-13 style-j6oeg",id:"style-j6oeg",children:e.jsx("span",{className:"product-image-wrapper style-gKGpW",id:"style-gKGpW",children:e.jsx("img",{className:"product-image-photo",src:o.variants[0].img,"data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /",loading:"lazy",width:"250",height:"250",alt:o.title})})})}),e.jsxs(M,{to:"",className:`action quickview-handler\r
																	sm_quickview_handler show-cart3`,title:"Quick View","catog-id":o._id,children:[e.jsx(Xs,{}),e.jsx("span",{children:"Quick View"})]})]})}),e.jsxs("div",{className:"product details product-item-details",children:[e.jsx("strong",{className:"product name product-item-name",children:e.jsx("div",{className:"product-item-link",children:z==="ar"?o.title_ar:o.title})}),e.jsx("div",{className:"price-box price-final_price","data-role":"priceBox","data-product-id":"13","data-price-box":"product-id-13",children:e.jsx("span",{className:"price-container price-final_price tax weee",children:e.jsxs("span",{id:"product-price-13","data-price-amount":"250","data-price-type":"finalPrice",className:"price-wrapper ",children:[e.jsxs("span",{className:"price55",children:["$ ",o.price]}),e.jsxs("span",{className:"priceOffer",children:["$"," ",o.discount.discount]})]})})}),e.jsx("div",{className:"time-countdown-slide",children:e.jsxs("div",{className:"time-wrapper",children:[e.jsxs("div",{className:"time-label clearfix",children:[e.jsxs("div",{className:"stock-qty",children:["Availability:",e.jsx("span",{children:"150"})]}),e.jsxs("div",{className:z==="ar"?"time-leftAr":"time-left",children:[z==="ar"?"الوقت المتبقي:":"Time left:",e.jsx("span",{children:Lt(o.discount.endDate)})]})]}),e.jsx("div",{className:"time-ranger",children:e.jsx("div",{className:"time-pass style-Tx4nd",id:"style-Tx4nd"})})]})}),e.jsxs("div",{className:"product-item-actions",children:[e.jsx("div",{className:"actions-primary",children:e.jsx(M,{to:`/product/${o._id}`,children:e.jsx("button",{className:"action tocart primary","data-post":'{"action":"http:\\/\\/magento2.magentech.com\\/themes\\/sm_venuse\\/pub\\/french\\/checkout\\/cart\\/add\\/uenc\\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\\/product\\/13\\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}',type:"button",title:"Add to Cart",children:e.jsx("span",{children:"Add to Cart"})})})}),e.jsxs("div",{className:"actions-secondary","data-role":"add-to-links",children:[e.jsxs("div",{className:"action towishlist",children:[U.includes(o._id)?e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:x=>{L(o._id,x),O(o._id,"remove")},style:{display:"none"}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",onClick:x=>{L(o._id,x),O(o._id,"add")},children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:x=>{L(o._id,x),O(o._id,"add")}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",onClick:x=>{L(o._id,x),O(o._id,"remove")},style:{display:"none"},children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"})})]}),e.jsx("span",{children:"Add to Wish List"})]}),e.jsxs("div",{href:"#",className:"action tocompare",title:"Add to Compare",children:[e.jsx(Ks,{}),e.jsx("span",{children:"Add to Compare"})]})]})]})]})]})})}))})}),e.jsxs("div",{className:"owl-nav",children:[e.jsx("div",{role:"presentation",className:"owl-prev disabled",onClick:()=>d("left"),children:e.jsx(It,{})}),e.jsx("div",{role:"presentation",className:"owl-next",onClick:()=>d("right"),children:e.jsx(Ot,{})})]}),e.jsx("div",{className:"owl-dots disabled"})]}),e.jsx("div",{className:"loading-content",children:e.jsx("span",{className:"hidden",children:"Loading..."})})]})]})})]})})})]})):null},$n=()=>e.jsx("img",{class:"cutter",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-5.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-5.jpg",alt:"Banner Image",width:"1650",height:"165"}),zn=a.div`
	width: 100%;
	height: 90vh;
	display: flex;
	position: relative;
	overflow: hidden;
`,Ls=a.div`
	width: 50px;
	height: 50px;
	background-color: #f0cba4;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${t=>t.direction==="left"&&"10px"};
	right: ${t=>t.direction==="right"&&"10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.4;
	z-index: 2;
`,Fn=a.div`
	height: 100%;
	display: flex;
	transition: all 2s ease;

	transform: translateX(${t=>t.slideIndex*-100}vw);
`,Bn=a.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: #${t=>t.bg};
`,Vn=a.div`
	height: 100%;
	flex: 1;
	${P({display:"none"})}
`,Dn=a.img`
	height: 80%;
	width: 100%;
	background-size: cover;
`,Mn=a.div`
	flex: 1;
	padding: 50px;
`,Wn=a.h1`
	font-size: 70px;
`,Un=a.p`
	margin: 50px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`,Jn=a.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	cursor: pointer;
`,Gn=()=>{const[t,c]=i.useState(0),{language:n}=i.useContext(ke),l=n==="ar",r=n==="ar"?wn:yn;i.useEffect(()=>{const h=setInterval(()=>{c(u=>(u+1)%r.length)},5e3);return()=>clearInterval(h)},[r.length]);const m=h=>{c(h==="left"?t>0?t-1:2:t<2?t+1:0)};return e.jsxs(zn,{children:[e.jsx(Ls,{direction:"left",onClick:()=>m("left"),children:e.jsx(Rt,{style:{fontSize:"2em"}})}),e.jsx(Fn,{slideIndex:t,children:r.map(h=>e.jsxs(Bn,{bg:h.bg,children:[e.jsx(Vn,{className:"slideImag",children:e.jsx(Dn,{src:h.img})}),e.jsxs(Mn,{children:[e.jsx(Wn,{children:h.title}),e.jsx(Un,{children:h.desc}),e.jsx(Jn,{children:l?"مشاهدة":"Watch Now"})]})]},h.id))}),e.jsx(Ls,{direction:"right",onClick:()=>m("right"),children:e.jsx(Tt,{style:{fontSize:"2em"}})})]})},Hn=()=>e.jsxs("div",{className:"text-branner snipcss-gfhgY style-E5bOJ",id:"style-E5bOJ",children:[e.jsx("div",{className:"hot-item",children:"Welcome to Venuse Store!"}),e.jsxs("div",{className:"text-offer",children:["Wrap new offers / gift every single day on Weekends >>>>> New Coupon code: T0mly81x9z0334c1",e.jsx("div",{className:"explorer",children:"Explorer Now"})]})]}),Zn=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{class:"blog_title",children:e.jsx("h2",{children:"Latest Blogs"})}),e.jsx("div",{class:"block block-slider-post snipcss-Pb3fd",children:e.jsxs("div",{class:"block-content",children:[e.jsxs("div",{class:"owl-carousel owl-theme owl-loaded owl-drag",children:[e.jsx("div",{class:"owl-stage-outer",children:e.jsxs("div",{class:"owl-stage style-MG8jI",id:"style-MG8jI",children:[e.jsx("div",{class:"owl-item active style-3lVoL",id:"style-3lVoL",children:e.jsxs("div",{class:"item",children:[e.jsx("div",{class:"image-post",children:e.jsx("a",{href:"",title:"Join millions of others",children:e.jsx("img",{class:"",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg",width:"1",height:"1",alt:"Join millions of others"})})}),e.jsxs("div",{class:"info-post",children:[e.jsxs("div",{class:"post-date",children:[e.jsx("span",{class:"label",children:"Posted:"}),e.jsx("span",{class:"value",children:"June 17, 2019"})]}),e.jsx("div",{class:"post-title",children:e.jsx("div",{class:"post-item-link",children:"Join millions of others"})}),e.jsx("div",{class:"post-short-description",children:e.jsx("p",{children:"Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam"})}),e.jsx("div",{class:"post-read-more",children:e.jsx("a",{href:"",title:"Join millions of others",children:"Read more"})})]})]})}),e.jsx("div",{class:"owl-item active style-7pgTY",id:"style-7pgTY",children:e.jsxs("div",{class:"item",children:[e.jsx("div",{class:"image-post",children:e.jsx("a",{href:"",title:"Choose the perfect design",children:e.jsx("img",{class:"",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg",width:"1",height:"1",alt:"Choose the perfect design"})})}),e.jsxs("div",{class:"info-post",children:[e.jsxs("div",{class:"post-date",children:[e.jsx("span",{class:"label",children:"Posted:"}),e.jsx("span",{class:"value",children:"June 17, 2019"})]}),e.jsx("div",{class:"post-title",children:e.jsx("div",{class:"post-item-link",children:"Choose the perfect design"})}),e.jsx("div",{class:"post-short-description",children:e.jsx("p",{children:"Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam"})}),e.jsx("div",{class:"post-read-more",children:e.jsx("a",{href:"",title:"Choose the perfect design",children:"Read more"})})]})]})}),e.jsx("div",{class:"owl-item style-Tg8VU",id:"style-Tg8VU",children:e.jsxs("div",{class:"item",children:[e.jsx("div",{class:"image-post",children:e.jsx("a",{href:"",title:"What are some good electronic",children:e.jsx("img",{class:"",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg",width:"1",height:"1",alt:"What are some good electronic"})})}),e.jsxs("div",{class:"info-post",children:[e.jsxs("div",{class:"post-date",children:[e.jsx("span",{class:"label",children:"Posted:"}),e.jsx("span",{class:"value",children:"May 16, 2019"})]}),e.jsx("div",{class:"post-title",children:e.jsx("div",{class:"post-item-link",children:"What are some good electronic"})}),e.jsx("div",{class:"post-short-description",children:e.jsx("p",{children:"Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam"})}),e.jsx("div",{class:"post-read-more",children:e.jsx("a",{href:"",title:"What are some good electronic",children:"Read more"})})]})]})}),e.jsx("div",{class:"owl-item style-PoS2p",id:"style-PoS2p",children:e.jsxs("div",{class:"item",children:[e.jsx("div",{class:"image-post",children:e.jsx("a",{href:"",title:"Standard Blog Post Examples",children:e.jsx("img",{class:"",src:"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg","data-src":"http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg",width:"1",height:"1",alt:"Standard Blog Post Examples"})})}),e.jsxs("div",{class:"info-post",children:[e.jsxs("div",{class:"post-date",children:[e.jsx("span",{class:"label",children:"Posted:"}),e.jsx("span",{class:"value",children:"May 16, 2019"})]}),e.jsx("div",{class:"post-title",children:e.jsx("div",{class:"post-item-link",children:"Standard Blog Post Examples"})}),e.jsx("div",{class:"post-short-description",children:e.jsx("p",{children:"Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam"})}),e.jsx("div",{class:"post-read-more",children:e.jsx("a",{href:"",title:"Standard Blog Post Examples",children:"Read more"})})]})]})})]})}),e.jsxs("div",{class:"owl-nav",children:[e.jsx("div",{role:"presentation",class:"owl-prev disabled",children:e.jsx("span",{"aria-label":"Previous",children:"‹"})}),e.jsx("div",{role:"presentation",class:"owl-next",children:e.jsx("span",{"aria-label":"Next",children:"›"})})]}),e.jsx("div",{class:"owl-dots disabled"})]}),e.jsx("div",{class:"loading-content",children:e.jsx("span",{class:"hidden",children:"Loading..."})})]})})]}),Xn=()=>e.jsxs("div",{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsx(Ln,{}),e.jsx(In,{}),e.jsx(Gn,{}),e.jsx(Tn,{}),e.jsx(Hn,{}),e.jsx(En,{}),e.jsx($n,{}),e.jsx(Zn,{}),e.jsx(Be,{})]}),nt=a.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`,Kn=a.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
	&:hover ${nt} {
		opacity: 1;
	}
`,Qn=a.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`,Yn=a.img`
	height: 75%;
	z-index: 2;
`,Is=a.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
	transition: all 0.5s ease;
	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`,xs=({item:t})=>{const[c,n]=i.useState(!1),l=async(j,E,k)=>{if(!c){await N({title:"You have to login !",icon:"warning",buttons:!0,confirmButtonColor:"#42a5f5",confirmButtonText:"Login",showCancelButton:!0,closeOnConfirm:!1}),window.location.href="/login";return}let v=k.target;v.tagName==="path"&&(v=v.parentNode);const R=v.classList[0];try{await is(j,u),E==="remove"?(R==="add-to-wish2"&&(v.style.display="none",v.previousSibling.style.display="block"),N("Success","Product removed from wishlist!","success")):E==="addCatog"&&(R==="add-to-wish"&&(v.style.display="none",v.nextSibling.children[0].style.display="block",v.nextSibling.style.display="block"),N("Success","Product added to wishlist!","success"))}catch{N("Error","Something went wrong","error")}},r=i.useRef(!0),[m,h]=i.useState([]);let u=localStorage.getItem("persist:root");return i.useEffect(async()=>{var j;if(JSON.parse(u).user)try{u=JSON.parse(u),u=u==null?void 0:u.user,u=JSON.parse(u),u=(j=u==null?void 0:u.currentUser)==null?void 0:j._id,u!==void 0&&n(!0);const E=await fs(u);r.current&&h([...E])}catch(E){console.error(E)}return()=>{r.current=!1}},[u]),r.current?e.jsxs(Kn,{children:[e.jsx(Qn,{}),e.jsx(Yn,{src:t.variants[0].img[0]}),e.jsxs(nt,{children:[e.jsx(Is,{children:e.jsx(M,{to:`/product/${t._id}`,children:e.jsx($t,{})})}),e.jsx(Is,{children:e.jsx("div",{className:"action towishlist1",children:m.includes(t._id)?e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:j=>{l(t._id,"addCatog",j)},style:{display:"none"}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z",onClick:j=>{l(t._id,"remove",j)}})})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ue,{className:"add-to-wish list-wish",onClick:j=>{l(t._id,"addCatog",j)}}),e.jsx("svg",{className:"add-to-wish2 list-wish bi bi-heart-fill",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",style:{display:"none"},children:e.jsx("path",{className:"add-to-wish2","fill-rule":"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z",onClick:j=>{l(t._id,"remove",j)}})})]})})})]})]}):null},ea=a.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`,sa=({cat:t,filters:c,sort:n})=>{const[l,r]=i.useState([]),[m,h]=i.useState([]);return i.useEffect(()=>{(async()=>{try{const j=await Re.get(t?`http://localhost:4000/api/products?category=${t}`:"http://localhost:4000/api/products");r(j.data)}catch{}})()},[t]),i.useEffect(()=>{t&&h(l.filter(u=>Object.entries(c).every(([j,E])=>u[j].includes(E))))},[l,t,c]),i.useEffect(()=>{h(n==="newest"?u=>[...u].sort((j,E)=>j.createdAt-E.createdAt):n==="asc"?u=>[...u].sort((j,E)=>j.price-E.price):u=>[...u].sort((j,E)=>E.price-j.price))},[n]),e.jsx(ea,{children:t?m.map(u=>e.jsx(xs,{item:u},u.id)):l.map(u=>e.jsx(xs,{item:u},u.id))})},ta=a.div``,ia=a.h1`
	margin: 20px;
`,na=a.div`
	display: flex;
	justify-content: space-between;
`,Os=a.div`
	margin: 20px;
	${P({width:"0px 20px",display:"flex",flexDirection:"column"})}
`,Rs=a.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${P({marginRight:"0px"})}
`,hs=a.select`
	padding: 10px;
	margin-right: 20px;
	${P({margin:"10px 0px"})}
`,ue=a.option``,aa=()=>{const c=gs().pathname.split("/")[2],[n,l]=i.useState({}),[r,m]=i.useState("newest"),h=u=>{const j=u.target.value;l({...n,[u.target.name]:j})};return e.jsxs(ta,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsx(ia,{children:c}),e.jsxs(na,{children:[e.jsxs(Os,{children:[e.jsx(Rs,{children:"Filter Products:"}),e.jsxs(hs,{name:"color",onChange:h,children:[e.jsx(ue,{disabled:!0,children:"Color"}),e.jsx(ue,{children:"White"}),e.jsx(ue,{children:"Black"}),e.jsx(ue,{children:"Red"}),e.jsx(ue,{children:"Blue"}),e.jsx(ue,{children:"Yellow"}),e.jsx(ue,{children:"Green"})]}),e.jsxs(hs,{name:"size",onChange:h,children:[e.jsx(ue,{disabled:!0,children:"Size"}),e.jsx(ue,{children:"XS"}),e.jsx(ue,{children:"S"}),e.jsx(ue,{children:"M"}),e.jsx(ue,{children:"L"}),e.jsx(ue,{children:"XL"})]})]}),e.jsxs(Os,{children:[e.jsx(Rs,{children:"Sort Products:"}),e.jsxs(hs,{onChange:u=>m(u.target.value),children:[e.jsx(ue,{value:"newest",children:"Newest"}),e.jsx(ue,{value:"asc",children:"Price (asc)"}),e.jsx(ue,{value:"desc",children:"Price (desc)"})]})]})]}),e.jsx(sa,{cat:c,filters:n,sort:r}),e.jsx(as,{}),e.jsx(Be,{})]})},ca=a.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://images.pexels.com/photos/3839432/pexels-photo-3839432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&fbclid=IwAR0CUEhHnUuQcPqabtvtvz6d9HoxWvm3FB3k54iuowLURwoS6fOKKrDGcqQ')
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`,ra=a.div`
	width: 40%;
	padding: 20px;
	background-color: white;
	${P({width:"75%"})}
	box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
`,oa=a.h1`
	font-size: 24px;
	font-weight: 300;
`,la=a.form`
	display: flex;
	flex-wrap: wrap;
`,Ge=a.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`,da=a.span`
	font-size: 12px;
	margin: 20px 0px;
`,ua=a.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`,ma=()=>{const[t,c]=i.useState(""),[n,l]=i.useState(""),[r,m]=i.useState(""),[h,u]=i.useState(""),[j,E]=i.useState(""),k=async v=>{if(v.preventDefault(),n===r){if((await ge.get(`/auth/checkEmail/${h}`)).data==="Email already exists!")return N("Email already exists please try again!");if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(n))return N("Password must contain at least one lowercase letter, one uppercase letter, one number and one special character!");(await ge.post("/auth/register",{username:t,password:n,confirmPassword:r,email:h,phoneNumber:j})).statusText==="Created"&&(N("should be make verification email"),c(""),l(""),m(""),u(""),setTimeout(()=>{window.location.href="/login"},1e3))}else if(n!==r){N("Please check for password!");return}};return e.jsx(ca,{children:e.jsxs(ra,{children:[e.jsx(oa,{children:"CREATE AN ACCOUNT"}),e.jsxs(la,{children:[e.jsx(Ge,{placeholder:"Username",onChange:v=>c(v.target.value),required:!0}),e.jsx(Ge,{type:"email",placeholder:"Email",onChange:v=>u(v.target.value),required:!0}),e.jsx(Ge,{placeholder:"Password",type:"password",onChange:v=>l(v.target.value),required:!0}),e.jsx(Ge,{placeholder:"Confirm password",type:"password",onChange:v=>m(v.target.value),required:!0}),e.jsx(Ge,{placeholder:"Phone Number",onChange:v=>E(v.target.value),required:!0}),e.jsxs(da,{children:["By creating an account, I consent to the processing of my personal data in accordance with the ",e.jsx("b",{children:"PRIVACY POLICY"})]}),e.jsx(ua,{onClick:k,children:"CREATE"})]})]})})},ha=a.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://images.pexels.com/photos/823059/pexels-photo-823059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&fbclid=IwAR0zsSOLR8Rr6qk1JfnpyLxq65qil9fOZtLG99RldVesF9m-4fS_vNBr2l0')
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`,pa=a.div`
	width: 400px;
	padding: 20px;
	background-color: white;
	${P({width:"75%"})}
	box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
`,xa=a.h1`
	font-size: 24px;
	font-weight: 300;
`,ga=a.form`
	display: flex;
	flex-direction: column;
`,Ts=a.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
`,fa=a.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
	&:disabled {
		color: green;
		cursor: not-allowed;
	}
`,$s=a.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
`,ja=()=>{const[t,c]=i.useState(""),[n,l]=i.useState(""),{isFetching:r,error:m}=Ce(E=>E.user),h=Te(),u=E=>{if(E.preventDefault(),!t||!n){N("Please fill in all fields");return}ci(h,{email:t,password:n})};i.useEffect(()=>{m&&(N("Invalid Credentials Try Again!"),c(""),l(""),document.getElementById("email").value="",document.getElementById("password").value="")},[m]);const j=Qs();return i.useEffect(()=>j.listen(E=>{E.pathname!=="/forgot"&&(l(""),c(""))}),[j]),i.useEffect(()=>j.listen(()=>{c(""),l("")}),[j]),e.jsx(ha,{children:e.jsxs(pa,{children:[e.jsx(xa,{children:"SIGN IN"}),e.jsxs(ga,{children:[e.jsx(Ts,{placeholder:"email",id:"email",autoComplete:"email",onChange:E=>c(E.target.value)}),e.jsx(Ts,{placeholder:"password",id:"password",type:"password",autoComplete:"current-password",onChange:E=>l(E.target.value)}),e.jsx(fa,{onClick:u,disabled:r,children:"LOGIN"}),e.jsx($s,{href:"/forgot",children:"DO NOT YOU REMEMBER THE PASSWORD?"}),e.jsx($s,{href:"/register",children:"CREATE A NEW ACCOUNT"})]})]})})},va=()=>{const[t,c]=i.useState("");Te();const n=async l=>{if(l.preventDefault(),t.length<1)return N("Please fill email");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return N("Please enter a valid email address!");N("We have sent you a link to your email address..."),await ge.post("/auth/forgot-password",{email:t})};return e.jsx("section",{className:"container501",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-md-44 col-md-offset-4 col-sm-66 col-sm-offset-3",children:e.jsx("div",{className:"account-wall",children:e.jsx("div",{id:"my-tab-content",className:"tab-content",children:e.jsxs("div",{className:"tab-pane",id:"forgot",children:[e.jsx("img",{className:"profile-img",src:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEg8QEBARFhIVFhYVFhUXEBUXFhUSFRUWGBgRExUYHiggGBolHRYWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPkAywMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgUGBAMBB//EAD8QAAIBAgIFCAYIBgMBAAAAAAABAgMRBCEFEjFBUQYiYXGBkaGxE1JicsHRIzIzgqKy4fAkQlOSk8IVc/EW/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP1EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiJJARAAAAAAAAAAEKtWMFeTSRVYjTO6Ee1/BHHpDFupJ581bF8es5QO3/la3rLq1UShpeqnnqtcLW8jgAGmwWKVWOssrZNcDoMlGTTum0+Kdi80Xj9fmT+stj9ZfMCxAAAAAAAAAAAAACSIkkBEAAAAAAAA5NKVdWnK2183v2+FzrOTSsL0p9Fn3P5XA5+T2ilU+lqK8FlFbpPi+hGheBo/0qf+OPyIaIjahR9yL71f4nWBzf8AHUP6NL/HH5H1YGj/AEqf+OPyOgAZ/lDoynGDqwSi01dLY03bZuZn8PNxlFramvM1/KGN8PU6NV/iRkMNG84LjJeYGqAAAAAAAAAAAAACSIkkBEAAAAAAAAOi6ilFb013qwPfBStLrVu0D00RK9Ci/YS7lb4HWfIxSSSVkskuC4H0AAAIzgpJxkrpqzXFMxmjaFq+r6jl4ZeZtTnwuDp0tZxWcm5Sk9ru72vw6AOEAAAAAAAAAAAAAJIiSQEQAAAAAAAAmABaU56yTJHNgZ5NcPJnSAAAA5sbVy1Vv29R0Sdrt7EVbnrXfHMD4AAAAAAAAAAAAAEkRJICIAAAAAAAAAAlTm4u6LGnUUvkV1ON2kdXowOo+SkltPDPi+8+OAHniKrlktnmc7Vjr1DzxkdWnUlleMXJfdV7eAHODxwmJjUjrR7VvT4M9gAAAAAAAAAAAEkRJICIAAAAAAVlfTVOLaipSa6ku/8AQCzI1JqKcpOyW1mfraaqv6qjFdV33v5HBVrSm7yk31u/cBotFY11sQksoRjJ24vKN3/dsNEkZjkjDnVpcFFd7b/1L3HYz0MHPVlK25eb4IDs1BqFB/8AWR/oy/vW3uOjR+m44iTjqSi9q3q3S9zAtGVvKGvqUJ8ZWiu15+CZYIz/ACuq5UodLk+yyXmwKLCYqVKWtHtW5rgyzWnuNP8AH+hSgC+jp2G+Euxp/I6KGlqU2o85N5K638LozJ9QGzBwaM0iqq1ZZTW71ulfI7wAAAAAASREkgIgAAAAK3TWM1I6kXzpeEd77dneZ09sZXdScp8Xl1bkeIBgMIDVckofR1JcZ27or5lvOF9uwruTcdWhF8dZ/ia+BZymkrvLf2cQMRpDBunVlSWea1c90tifeafRmjlRgo/zPOT6eC6EZPG13UqTqbLu66FuXYrI22CxHpKcJ75JX69/jcD1RlOVFS9e3qxiu+8viaxSMTpmetXrP2mv7eb8AONK4aGwMD4D60GgEZNNNOzWxmk0XpBVVqy+utvSuKM0Sp1HFqUXZrNMDZA5tH4xVY33rKS4P5HSAAAAkiJJARAAA8cZK1Oo+EZeTPY49LTtRqdSXe0gMuAAAQAG50TStQo9MIvvV/iePKKtqUJW2ytDse3wTLChDVjGPBJdysU/K1/RQXtr8sgMrc1PJWetSlH1ZZdTSfncyppuSD5tZdMfJ/IC+UD8/wATPWnN8ZN97b+J+hSdk3wzPzlAGfXvPgA+veGz4AAAA6MFinSkpLtXFcDU0asZxUou6f7sY479FY70UrS+o9vQ/WA0oCYAEkRJICIAAFVyhqWhCPF37Ev1Ramf5QVL1Ix4R8W//AKsAAD0w8NaUI8ZRXe0jzOvREL1qK9tPud/gBvGUHK58ykvafgv1L8znLB/YL3/APQDNmk5Hv7de5/uZs0PJB86suiPnL5gaDFu1Oo+EZP8LPz5G+0k7Ua3/XP8rMCAAAA+uLVm07PZlt3ZHw1OFw8ZUKMJJNat/wC5t3XDaBlgdmkcDKk+MHsfwfScYAAAXOhMfspTfuv/AF+RdmMNHonHekjqy+vHb0r1gLAkiJJARAABmSx1b0lSc1sby6lkvI0GmKjjSnbfZdjefgZgAfT4WLwtsO5va5Rf3c0vNsCuLLk7C+Ip9Gs/wsrS55KxvWb4Qk/GK+IGuMzyvfOorol4tfI0xleVr+kpr2POT+QFEX3JF/SVV7K8JfqUJd8kn9LP/rf5ogaHSz+gre5LyMGbvS/2Fb3JeRhAAAAGxoxtGC4Riu6KRj0r5ccjZgRqU1JOMldPajOaS0a6XOjdw4710P5mlPjV8mBjAd2l8PCnO0N6u1wvuRwgCdGq4SUouzRAAa3B4lVYqS7VwfA6UUXJ2bvUjbKyd+DzVu2/gXqAiAAOLTMb0Z9Gq/xIzBrcdDWp1F7L77XRkgBeqp6TCPjFWf3WreFiiLPRFS8a9P1oNrrs0/NdwFYX/JGPPqvhFLvf6FAaXkhHKs+mC7tb5gaIyPKt/TLohH80jXGO5Tv6eXRGPlf4gVJc8lX9O/cl5xKYtuTD+nXuy8gNPpON6NZexL8rMEfos43TT2NNd5+duLV09qyfWgPgAA9cM1rwvs1o36ro15kMLCMpRU5asXtf72dZrwABwaZxOpTaW2XNXVvfd5gZ/FVtecp8X4bl3WPIAAfUr5LafC00Fhdaeu9kdnTL9NvcBbaOwnooJfzPOXXw7DsREkgIgAAZLHUPR1Jw3J5dTzRrSh5Q0rShLirdqf6+AFSeuGq6klLrXY00/M8gANZyThalN8ZvuSX6mTN3onD+jo0o77XfXLN+YHYYrlE74ir938kTamH0474it73kkgOAs+Tb/iKfVL8kisLDk+/4il1y/JIDbmH05Q1K9Vbm9ZdUs/O/cbgzvK3C5U6q3cx9TzXx7wM0AABqdFVtelB71zX2ZeVjLFxyerZzhx5y61k/h3AXFesoRcpbF+7Iy2MxUqstaXYuC4HVpjG+klqxfMj4y4lcAAAHpQouclGO1/u7NXhqCpxUI7F4vezk0RgfRx1pLny8FwLAASREkgIgAAcGmqOtSbW2PO7N/h5HefGr5MDGxTbSSu3klxfBFrLQFaMJVJOEdWLlq3bdkr2yVr9p6cn8NbEuMv5FJrrTUU/G5pcRZqSlbVs077Lb7gYvRWG9LVpw3N3furN+CN4VGidFKjUqTTumkocUm7tPuWZbgDB6VletW9+Xg2jeGE0tRlCtVUlZuUpLpUm2mgOM7tCP6ej73mmcJY6Bw851qbisotSk9yS+IG2PHGYdVYTpvZJW6nufY7HqRdQD8+q03CUoyVmm0+tHZi9H6tOnWi24yS1vZlv7Lmg0hoinWnrtyi7JO1s7b81t+R74TBRp0/RXco55Ss8ntWzZ8wMSWGjNG16l5U+arNazdk7pqy4l7W0FQlsi4+7J+Tujt0XhfQw9HrOSu2r7r7kv3vAw84OLcWrNOzXBrcRNTyj0Vrp1qa5yXOXrJb10ryMsALjQuAvarNZfyri/WOTReC9LLP6i29Pso0yVslsA+gAASREkgIgAAAAOeFHUrxrR2Nas10bpLqsu4s6+q1LWtqtZ32WfHoOQlqRnGcJK6krNXtdPKyA+LE0MMqdOc3HbquV3fPZfouvA6aePoy+rVpv76v3GI0vhq8EqDqa9JPWp3WdldWvtVr2aKl0Zrc+z9AP1WLT2NMr9N6M9PDL7SOcXx9l9DPznWmt8l3lzovGVIUK9WK15qdOK1k5JRkpttR60swGDwU6s/RxWe+6+rba5G2wGCjRgoQXW98nxZh1p7Eq7VKld7f4dZ9fE8uUEpRxFaEXJRTVld2V4ptLtbA39WpFbZRXXJIVKiim8kltb+Zi+S9BJ1MTVvq0lkn6z3pcdy6ZFvRzjHFYtrjTp7YwTzTt/NNrfu6NwXd75g5sDXnUWvKCjF/VV7ya9aW5dWZ0t22gD6cmL0jSpfWmr+qs5d27tM7pLTE6t4rmw4J5v3n8PMDW0MXCacoyTSdm1xRnNKaJ1p61JJRk816r3yXR0FZo2vqVIO+V7PqeVzVAeWGoRpxUI7F4viz1AAAAASREkgIgAAAABxaZlajP7v5kdpwab+yl1x8wM5Obk7ybb4tt/vYiJIARPXD4mpTbdOcot7dWTV+uxAAdX/K4j+vV/vZyyk222228227tvi2AAUnbVu9W97XyvxtxOrSWNdaSy1YRVox4Lj1nKALPTekdeerTm9SKtk2k3vfkuwqmSAEQSAETW4Gtr04S3tZ9ayfiZQ0WgvsvvMCwAAAAACSIkkB//2Q==",alt:"zaid"}),e.jsxs("form",{className:"form-signin",action:"",method:"",children:[e.jsx("input",{type:"text",className:"form-control",placeholder:"Email id",autofocus:!0,required:!0,onChange:l=>c(l.target.value)}),e.jsx("p",{children:" "}),e.jsx("button",{onClick:n,className:"btn btn-lg btn-info btn-block submit",children:"submit"})]}),e.jsx("p",{className:"text-center",children:e.jsxs("a",{href:"/login","data-toggle":"tab",children:[e.jsx("i",{className:"fa fa-hand-o-left"})," Back to Login"]})})]})})})})})})};var ba={};const ya=ba.REACT_APP_STRIPE,wa=a.div`
	user-select: none;
`,_a=a.div`
	padding: 20px;
	${P({padding:"10px"})}
`,Aa=a.h1`
	font-weight: 300;
	text-align: center;
`,Sa=a.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`,Na=a.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${t=>t.type==="filled"&&"none"};
	background-color: ${t=>t.type==="filled"?"black":"transparent"};
	color: ${t=>t.type==="filled"&&"white"};
`,Ca=a.div`
	${P({display:"none"})}
`,zs=a.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`,ka=a.div`
	display: flex;
	justify-content: space-between;
	${P({flexDirection:"column"})}
`,Ea=a.div`
	flex: 3;
	padding: 5px;
`,Pa=a.div`
	display: flex;
	justify-content: space-between;
	${P({flexDirection:"column"})};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
`,qa=a.div`
	flex: 2;
	display: flex;
`,La=a.img`
	width: 200px;
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
`,Ia=a.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`,Oa=a.span``,Ra=a.span`
	${P({display:"none"})};
`,Ta=a.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${t=>t.color};
`,Fs=a.span``,$a=a.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`,za=a.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`,Fa=a.div`
	font-size: 24px;
	margin: 5px;
	${P({margin:"5px 15px"})}
	border-bottom:1px solid black;
`,Ba=a.div`
	font-size: 30px;
	font-weight: 200;
	${P({marginBottom:"20px"})}
`,Va=a.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`,Da=a.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`,Ma=a.h1`
	font-weight: 200;
`,es=a.div`
	margin: 20px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${t=>t.type==="total"&&"500"};
	font-size: ${t=>t.type==="total"&&"24px"};
`,ss=a.span``,ts=a.span``,Wa=a.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`,Ua=a.button`
	width: 40%;
	padding: 10px;
	background-color: #eee;
	color: black;
	font-weight: 800;
	cursor: pointer;
	margin-top: 5px;
	font-size: 12px;
	border-radius: 10%;
	${P({width:"100%"})};
`,Ja=()=>{const t=Ce(w=>w.cart);Ce(w=>w.total);const[c,n]=i.useState({});i.useState({});const l=Te(),[r,m]=i.useState(1);let[h,u]=i.useState({}),[j,E]=i.useState({});t.products;const[k,v]=i.useState(null),[R,H]=i.useState([]),[ye,te]=i.useState([]),fe=Qs(),je=w=>{v(w)};let ie=localStorage.getItem("persist:root");ie=JSON.parse(ie),ie=ie.user,ie=JSON.parse(ie),ie=ie.currentUser._id;let W=localStorage.getItem("persist:root");W=JSON.parse(W),W=W.user,W=JSON.parse(W),W=W.currentUser.email;const ae=t.products.reduce((w,_)=>{const g=w.find(X=>{var K,y,q,Q;return(X==null?void 0:X._id)===(_==null?void 0:_._id)&&((K=X.selectedVariant)==null?void 0:K.color)===((y=_.selectedVariant)==null?void 0:y.color)&&((q=X.selectedVariant)==null?void 0:q.size)===((Q=_.selectedVariant)==null?void 0:Q.size)});return g?g.quantity+=_.quantity:w.push({..._}),w},[]);i.useEffect(()=>{(async()=>{try{const g=await ne.get("/products");H(g.data),u(g.data)}catch(g){console.log("🚀 ~ file: Cart.jsx:209 ~ getAllProducts ~ err:",g)}})(),(async()=>{try{const g=await ne.get("/offer");te(g.data),E(g.data)}catch(g){console.log("🚀 ~ file: Cart.jsx:216 ~ getAllOffers ~ err:",g)}})()},[]),i.useEffect(()=>{k&&(async()=>{if(t.total*100===0){N("Your cart is empty");return}try{const _=await ne.post("/checkout/payment",{tokenId:k.id,amount:t.total*100});n(_.data),ae.map(y=>{R.map(q=>{if(q._id===y._id){const Q=q.variants.find(B=>B.color===y.selectedVariant.color&&B.size===y.selectedVariant.size);Q.quantity-=y.quantity,As({quantity:Q.quantity},y._id)}}),ye.map(q=>{q._id===y._id&&(q.quantity-=y.quantity,As({quantity:q.quantity},y._id))})}),fe.push("/success",{stripeData:_.data,products:t});let g=0;ae.map(y=>{g+=y.originalPrice*y.quantity});let X={userId:ie,products:ae};l(Ji());let K={userId:ie,products:ae,amountOrgin:g,amount:_.data.amount/100,address:_.data.billing_details.address,status:"pending"};oi(X),li(K),di(W),ui()}catch(_){console.log("🚀 ~ file: Cart.jsx:245 ~ makeRequest ~ err:",_)}})()},[k,t.total,fe]);const Ne=(w,_,g)=>{const K=h.find(q=>q._id===_).variants.find(q=>q._id===g),y=t.products.find(q=>q.selectedVariant._id===g);w==="dec"?y.quantity<=1?(l(Ss(g)),N("Info","The minimum quantity is 1","info")):m(y.quantity-1):y.quantity>=K.quantity&&(l(Ss(g)),N("Info","You have exceeded the number of available products!, the quantity will be reset","info"))},[V,S]=i.useState([]);i.useState([]),i.useEffect(()=>{l(Ui())},[t.products]),i.useEffect(()=>{(async()=>{try{const _=await ne.get("/orders/find/"+ie);S(_.data)}catch{console.log("error")}})()},[]);const[Z,ce]=i.useState([]);return i.useEffect(()=>{(async()=>{try{const _=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser._id,[g,X,K]=await Promise.all([ne.get(`/users/userWishListArray/${_}`),ne.get("/products"),ne.get("/offer")]),y=g.data,q=X.data,Q=K.data,B=[];for(const re of y){const we=[...q,...Q].find(Le=>Le._id===re);we&&B.push({...we})}ce(B)}catch(_){console.error(_)}})()},[]),e.jsxs(wa,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsxs(_a,{children:[e.jsx(Aa,{children:"YOUR BAG"}),e.jsxs(Sa,{children:[e.jsx(M,{to:"/",children:e.jsx(Na,{children:"CONTINUE SHOPPING"})}),e.jsxs(Ca,{children:[e.jsx(M,{to:"/orderHave",children:e.jsxs(zs,{children:["Shopping Bag(",V.length,")"]})}),e.jsx(M,{to:"/wishList",children:e.jsxs(zs,{children:["Your Wishlist (",Z.length,")"]})})]})]}),e.jsxs(ka,{children:[e.jsxs(Ea,{children:[ae.length===0?e.jsx("div",{children:"No products in the cart"}):ae.map(w=>{var _,g,X;return e.jsxs(Pa,{children:[e.jsxs(qa,{children:[e.jsx(La,{src:(_=w.selectedVariant)==null?void 0:_.img[0]}),e.jsxs(Ia,{children:[e.jsxs(Oa,{children:[e.jsx("b",{children:"Product:"})," ",w.title]}),e.jsxs(Ra,{children:[e.jsx("b",{children:"ID:"})," ",w._id]}),e.jsx(Ta,{color:(g=w.selectedVariant)==null?void 0:g.color}),e.jsxs(Fs,{children:[e.jsx("b",{children:"Size:"})," ",(X=w.selectedVariant)==null?void 0:X.size]}),e.jsx(Fs,{children:e.jsx(Ua,{onClick:()=>{l(Di({productId:w._id,variantId:w.selectedVariant._id}))},children:"Remove"})})]})]}),e.jsxs($a,{children:[e.jsxs(za,{children:[e.jsx(Ms,{className:`DecQuantity${w._id}`,onClick:()=>{l(Wi(w.selectedVariant._id)),Ne("dec",w._id,w.selectedVariant._id)}}),e.jsx(Fa,{children:w.quantity}),e.jsx(Ws,{className:`AddQuantity${w._id}`,onClick:()=>{l(Mi(w.selectedVariant._id)),Ne("inc",w._id,w.selectedVariant._id)}})]}),e.jsxs(Ba,{children:["$ ",w.price*w.quantity]})]})]})}),e.jsx(Va,{})]}),e.jsxs(Da,{children:[e.jsx(Ma,{children:"ORDER SUMMARY"}),e.jsxs(es,{children:[e.jsx(ss,{children:"Subtotal"}),e.jsxs(ts,{children:["$ ",t.total]})]}),e.jsxs(es,{children:[e.jsx(ss,{children:"Estimated Shipping"}),e.jsx(ts,{children:"$ 5.90"})]}),e.jsxs(es,{children:[e.jsx(ss,{children:"Shipping Discount"}),e.jsx(ts,{children:"$ -5.90"})]}),e.jsxs(es,{type:"total",children:[e.jsx(ss,{children:"Total"}),e.jsxs(ts,{children:["$ ",t.total]})]}),e.jsx(zt,{name:"PME Shop",image:"https://avatars.githubusercontent.com/u/1486366?v=4",billingAddress:!0,shippingAddress:!0,description:`Your total is $${t.total}`,amount:t.total*100,token:je,stripeKey:ya,children:e.jsx(Wa,{children:"CHECKOUT NOW"})})]})]})]}),e.jsx(Be,{})]})},Ga=a.div`
	user-select: none;
`,Ha=a.div`
	padding: 20px;
	${P({padding:"10px"})}
`,Za=a.h1`
	font-weight: 300;
	text-align: center;
`,Xa=a.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`,Ka=a.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${t=>t.type==="filled"&&"none"};
	background-color: ${t=>t.type==="filled"?"black":"transparent"};
	color: ${t=>t.type==="filled"&&"white"};
`,Qa=a.div`
	display: flex;
	justify-content: space-between;
	${P({flexDirection:"column"})}
`,Ya=a.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-wrap: wrap;
`,ec=a.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	${P({flexDirection:"column"})};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
`,sc=a.div`
	flex: 2;
	display: flex;
`,tc=a.img`
	width: 200px;
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
`,ic=a.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`,nc=a.span``;a.span`
	${P({display:"none"})};
`;const ac=a.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${t=>t.color};
`,ps=a.span``,cc=a.div`
	font-size: 30px;
	font-weight: 200;
	${P({marginBottom:"20px"})}
`,rc=a.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`,oc=a.hr`
  background-color: #bbb;
  border: none;
  height: 5px;
`,lc=()=>{const[t,c]=i.useState([]);return i.useEffect(()=>{(async()=>{try{const l=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser._id,[r,m,h]=await Promise.all([ne.get(`/orders/find/${l}`),ne.get("/products"),ne.get("/offer")]),u=r.data,j=m.data,E=h.data,k=[];for(const v of u){for(const R of v.products){const H=[...j,...E].find(ye=>ye._id===R._id);H&&k.push({...H,amount:R.quantity*H.price,quantity:R.quantity,seperator:!1})}k.push({seperator:!0})}c(k)}catch(l){console.error(l)}})()},[]),e.jsxs(Ga,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsxs(Ha,{children:[e.jsx(Za,{children:"YOUR ORDERS"}),e.jsx(Xa,{children:e.jsx(M,{to:"/",children:e.jsx(Ka,{children:"CONTINUE SHOPPING"})})}),t.length!==0?e.jsx(Qa,{children:e.jsxs(Ya,{children:[t.map(n=>n.seperator===!0?e.jsx(oc,{}):e.jsxs(ec,{className:"product_hr",children:[e.jsxs(sc,{children:[e.jsx(tc,{src:n.img}),e.jsxs(ic,{children:[e.jsxs(nc,{children:[e.jsx("b",{children:"Product:"})," ",n.title]}),e.jsx(ac,{}),e.jsxs(ps,{children:[e.jsx("b",{children:"Price:"})," ",n.amount]}),e.jsxs(ps,{children:[e.jsx("b",{children:"Quantity:"})," ",n.quantity]}),e.jsx(ps,{})]})]}),e.jsxs(cc,{children:["$",n.price]})]},n._id)),e.jsx(rc,{})]})}):e.jsx("div",{style:{display:"flex",padding:"70px",fontSize:"30px",justifyContent:"center"},children:"No Orders Yet!"})]}),e.jsx(Be,{})]})},dc=a.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`,uc=()=>{const[t,c]=i.useState([]);return i.useEffect(()=>{(async()=>{try{const l=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser._id,[r,m,h]=await Promise.all([ne.get(`/users/userWishListArray/${l}`),ne.get("/products"),ne.get("/offer")]),u=r.data,j=m.data,E=h.data,k=[];for(const v of u){const R=[...j,...E].find(H=>H._id===v);R&&k.push({...R})}c(k)}catch(l){console.error(l)}})()},[t]),e.jsx(dc,{children:t.length!==0?t.map(n=>e.jsx(xs,{item:n},n._id)):e.jsx("div",{style:{margin:"auto",padding:"100px",fontSize:"30px"},children:"No Products in Wishlist!"})})},mc=a.div``,hc=a.h1`
	margin: 20px;
`;a.div`
	display: flex;
	justify-content: space-between;
`;a.div`
	margin: 20px;
	${P({width:"0px 20px",display:"flex",flexDirection:"column"})}
`;a.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${P({marginRight:"0px"})}
`;a.select`
	padding: 10px;
	margin-right: 20px;
	${P({margin:"10px 0px"})}
`;a.option``;const pc=()=>e.jsxs(mc,{children:[e.jsx($e,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsx(hc,{children:"Wishlist"}),e.jsx(uc,{}),e.jsx(as,{}),e.jsx(Be,{})]}),xc=()=>{const t=gs(),c=t.state.stripeData,n=t.state.cart,l=Ce(h=>h.user.currentUser),[r,m]=i.useState(null);return i.useEffect(()=>{c&&(async()=>{try{const u=await ne.post("/orders",{userId:l._id,products:n.products.map(j=>({productId:j._id,quantity:j._quantity})),amount:n.total,address:c.billing_details.address});m(u.data._id)}catch{}})()},[n,c,l]),e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[r?`Order has been created successfully. Your order number is ${r}`:"Successfull. Your order is being prepared...",e.jsx(M,{to:"/",children:e.jsx("button",{style:{padding:10,marginTop:20},children:"Go to Homepage"})})]})},gc=()=>(i.useEffect(()=>{(async()=>{const n=new URLSearchParams(window.location.search).get("token");if(console.log(n),n)try{const l=await Re.get(`http://localhost:4000/api/auth/verifyEmail?token=${n}`);console.log(l.data),l.data.message==="Email verified!"?(N("Your email has been verified!"),window.location.href="/login"):N("Failed to verify email. Invalid or expired token.")}catch(l){console.error("Failed to verify email:",l),N("An error occurred while verifying your email. Please try again later.")}else N("No verification token provided.")})()},[]),e.jsx("div",{children:"Verifying email..."})),fc=()=>{const t=Ce(l=>l.user.currentUser),{darkMode:c}=i.useContext(js),n=()=>{localStorage.removeItem("persist:root"),window.location.href="/login"};return e.jsx("div",{className:c?"app dark":"app",children:e.jsx(Ft,{children:e.jsx(Bt,{children:e.jsxs(mi,{logOut:n,children:[e.jsx(Se,{path:"/forgot",children:e.jsx(va,{})}),e.jsx(Se,{path:"/verifyEmail",children:e.jsx(gc,{})}),e.jsx(Se,{exact:!0,path:"/",children:e.jsx(Xn,{})}),e.jsx(Se,{path:"/products/:category",children:e.jsx(aa,{})}),e.jsx(Se,{path:"/product/:id",children:e.jsx(it,{})}),e.jsx(Se,{path:"/offer/:category",children:e.jsx(bn,{})}),e.jsx(Se,{path:"/orderHave",children:e.jsx(lc,{})}),e.jsx(Se,{path:"/wishList",children:e.jsx(pc,{})}),e.jsx(Se,{path:"/cart",children:e.jsx(Ja,{})}),e.jsx(Se,{path:"/success",children:e.jsx(xc,{})}),e.jsx(Se,{path:"/login",children:t?e.jsx(ys,{to:"/"}):e.jsx(ja,{})}),e.jsx(Se,{path:"/register",children:t?e.jsx(ys,{to:"/"}):e.jsx(ma,{})})]})})})})},jc={key:"root",version:1,storage:Ut},vc=Vt({user:ni,cart:Gi}),bc=Dt(jc,vc),at=Mt({reducer:bc,middleware:t=>t({serializableCheck:{ignoredActions:[Jt,Gt,Ht,Zt,Xt,Kt]}})});let yc=Wt(at);Qt.render(e.jsx(Yt,{store:at,children:e.jsx(ei,{loading:null,persistor:yc,children:e.jsx(hi,{children:e.jsx(ki,{children:e.jsx(fc,{})})})})}),document.getElementById("root"));export{xs as P};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Poffer-7iIgomZo.js","assets/.pnpm-Gv23Y5so.js","assets/.pnpm-eqTA7-MZ.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
