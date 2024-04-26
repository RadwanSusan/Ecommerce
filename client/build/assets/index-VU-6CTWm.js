import {
	C as et,
	c as Is,
	a as Ee,
	j as Rs,
	r as n,
	b as e,
	R as Ve,
	d as rs,
	s as r,
	L as M,
	S as st,
	M as tt,
	u as Ne,
	e as Fe,
	f as ps,
	F as it,
	g as nt,
	B as at,
	h as rt,
	i as ct,
	G as ot,
	k as lt,
	A as dt,
	l as ut,
	m as mt,
	n as ht,
	o as pt,
	p as xt,
	q as gt,
	t as ft,
	v as jt,
	w as vt,
	x as yt,
	y as os,
	z as bt,
	D as wt,
	E as Ts,
	H as zs,
	I as w,
	J as At,
	K as St,
	N as Fs,
	O as $s,
	P as Ds,
	Q as Vs,
	T as ze,
	U as Bs,
	V as _t,
	W as Nt,
	X as Ct,
	Y as Ws,
	Z as kt,
	_ as Et,
	$ as Pt,
	a0 as Ms,
	a1 as Ot,
	a2 as Lt,
	a3 as qt,
	a4 as we,
	a5 as xs,
	a6 as It,
	a7 as Rt,
	a8 as Tt,
	a9 as zt,
	aa as Ft,
	ab as $t,
	ac as Dt,
	ad as Vt,
	ae as Bt,
	af as Wt,
	ag as Mt,
	ah as Ut,
	ai as Gt,
	aj as Ht,
} from './.pnpm-o1UN5waG.js';
(function () {
	const i = document.createElement('link').relList;
	if (i && i.supports && i.supports('modulepreload')) return;
	for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
	new MutationObserver((c) => {
		for (const h of c)
			if (h.type === 'childList')
				for (const p of h.addedNodes)
					p.tagName === 'LINK' && p.rel === 'modulepreload' && o(p);
	}).observe(document, { childList: !0, subtree: !0 });
	function a(c) {
		const h = {};
		return (
			c.integrity && (h.integrity = c.integrity),
			c.referrerPolicy && (h.referrerPolicy = c.referrerPolicy),
			c.crossOrigin === 'use-credentials'
				? (h.credentials = 'include')
				: c.crossOrigin === 'anonymous'
				? (h.credentials = 'omit')
				: (h.credentials = 'same-origin'),
			h
		);
	}
	function o(c) {
		if (c.ep) return;
		c.ep = !0;
		const h = a(c);
		fetch(c.href, h);
	}
})();
const R = (t) => et`
		@media only screen and (max-width: 380px) {
			${t}
		}
	`,
	Us = Is({
		name: 'user',
		initialState: {
			currentUser: null,
			isFetching: !1,
			error: !1,
			username: '',
		},
		reducers: {
			loginStart: (t, i) => {
				(t.isFetching = !0), (t.error = !1), (t.username = i.payload);
			},
			loginSuccess: (t, i) => {
				(t.isFetching = !1), (t.currentUser = i.payload), (t.error = !1);
			},
			loginFailure: (t) => {
				(t.error = !0), (t.isFetching = !1);
			},
		},
	}),
	{ loginStart: Jt, loginSuccess: Yt, loginFailure: gs } = Us.actions,
	Kt = (t) => {
		var i;
		return (i = t.user.currentUser) == null ? void 0 : i._id;
	},
	Qt = Us.reducer,
	Gs = 'http://194.195.86.67:4000/api/';
var qs;
const fs =
		(qs = JSON.parse(localStorage.getItem('persist:root'))) == null
			? void 0
			: qs.user,
	ts = fs && JSON.parse(fs).currentUser,
	Zt = ts == null ? void 0 : ts.accessToken,
	je = Ee.create({ baseURL: Gs }),
	ce = Ee.create({ baseURL: Gs, header: { token: `Bearer ${Zt}` } }),
	Xt = async (t, i) => {
		t(Jt(i.username));
		try {
			const a = await je.post('/auth/login', i);
			if (a.data.verified === !1) return t(gs());
			t(Yt(a.data));
		} catch {
			t(gs());
		}
	},
	ei = () => {
		localStorage.removeItem('persist:root'),
			(window.location.href = '/login');
	},
	js = async (t, i) => {
		try {
			const a = await je.put(`/offer/${i}`, t),
				o = await je.put(`/products/${i}`, t);
			return a.data || o.data;
		} catch (a) {
			console.log(a);
		}
	},
	si = async (t) => {
		try {
			return (await je.post('/carts', t)).data;
		} catch (i) {
			console.log(i);
		}
	},
	ti = async (t) => {
		try {
			return (await je.post('/orders', t)).data;
		} catch (i) {
			console.log(i);
		}
	},
	ls = async (t) => {
		let i = localStorage.getItem('persist:root');
		(i = JSON.parse(i)),
			(i = i.user),
			(i = JSON.parse(i)),
			(i = i.currentUser._id);
		try {
			return (await je.get(`users/wishlist/${i}?pid=${t}`)).data;
		} catch (a) {
			console.log(a);
		}
	},
	ds = async (t) => {
		try {
			return (await je.get(`users/userWishListArray/${t}`)).data;
		} catch (i) {
			console.log(i);
		}
	},
	ii = async (t) => {
		try {
			return (await je.post('auth/sendEmail', t)).data;
		} catch (i) {
			console.log(i);
		}
	},
	ni = async () => {
		try {
			return (await je.post('auth/sendEmailAdmin')).data;
		} catch (t) {
			console.log(t);
		}
	},
	ai = ({ children: t, logOut: i }) => {
		var h;
		const a =
				(h = JSON.parse(localStorage.getItem('persist:root'))) == null
					? void 0
					: h.user,
			o = a && JSON.parse(a).currentUser,
			c = o == null ? void 0 : o.accessToken;
		if (c) {
			const p = Rs(c),
				d = Date.now() / 1e3;
			if (p.exp < d) return i(), null;
		}
		return t;
	};
setInterval(() => {
	var o;
	const t =
			(o = JSON.parse(localStorage.getItem('persist:root'))) == null
				? void 0
				: o.user,
		i = t && JSON.parse(t).currentUser,
		a = i == null ? void 0 : i.accessToken;
	if (a) {
		const c = Rs(a),
			h = Date.now() / 1e3;
		c.exp < h &&
			(localStorage.removeItem('persist:root'), window.location.reload());
	}
}, 36e5);
const us = n.createContext(),
	ri = ({ children: t }) => {
		const [i, a] = n.useState(
				JSON.parse(localStorage.getItem('darkMode')) || !1,
			),
			o = () => {
				a(!i);
			};
		return (
			n.useEffect(() => {
				localStorage.setItem('darkMode', i);
			}, [i]),
			e.jsx(us.Provider, { value: { darkMode: i, toggle: o }, children: t })
		);
	},
	ci = 'مرحبًا بكم في متجر فينوس',
	oi = 'أضف إلى السلة',
	li = 'الحجم',
	di = 'اللون',
	ui = {
		S: 'صغير',
		M: 'متوسط',
		L: 'كبير',
		XL: 'كبير جدا',
		XXL: 'كبير جدا جدا',
	},
	mi = {
		venus: 'فينوس - سمة ماجنتو 2 قوية الاستجابة',
		'All Categories': 'كل الفئات',
		'- Jeans': 'الجينز -',
		'- Coats': 'المعاطف -',
		'- Women': 'للمرأة -',
		Jeans: 'الجينز',
		Coats: 'المعاطف',
		Women: 'للمرأة',
		'Enter keywords to search...': 'ادخل كلمات البحث ...',
		Search: 'بحث',
		'My Cart': 'عربة التسوق',
		Login: 'تسجيل الدخول',
		Home: 'الرئيسية',
		Shop: 'المتجر',
		Blog: 'المدونة',
		'About Us': 'من نحن',
		'Contact Us': 'تواصل معنا',
		'Black Friday!': 'الجمعة السوداء!',
	},
	hi = {
		'Latest Blogs': 'اخر المدونات',
		'Read more': 'اقرأ أكثر',
		title1: 'انضم إلى الملايين من الآخرين',
		title2: 'اختر التصميم المثالي',
		title3: 'ما هي بعض الإلكترونية الجيدة',
		title4: 'أمثلة على منشورات المدونة القياسية',
		Posted: 'تم النشر:',
		'post-short-description1':
			'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص',
		'post-short-description2':
			'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص',
		'post-short-description3':
			'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص',
		'post-short-description4':
			'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص',
	},
	pi = {
		'Welcome to Venus Store': 'مرحبًا بكم في متجر فينوس',
		'Wrap new offers':
			'قم بتغطية العروض / الهدايا الجديدة كل يوم في عطلات نهاية الأسبوع',
		'Explorer Now': 'استكشف الآن',
		'New Coupon code': 'كود الكوبون الجديد',
	},
	xi = {
		'YOUR BAG': 'السلة الخاصة بك',
		'CONTINUE SHOPPING': 'متابعة التسوق',
		'Shopping Bag': 'السلة الخاصة بك',
		'Your Wishlist': 'قائمة المفضلة الخاصة بك',
		'No products in the cart.': 'لا توجد منتجات في السلة.',
		'Product:': 'منتج:',
		'Size:': 'الحجم:',
		Remove: 'ازالة',
		'ORDER SUMMARY': 'ملخص الطلب',
		Subtotal: 'المجموع الكلي',
		'Estimated Shipping': 'الشحن المتوقع',
		'Shipping Discount': 'خصم الشحن',
		Total: 'المجموع',
		'CHECKOUT NOW': 'تأكيد الطلب',
	},
	gi = {
		'GREAT VALUE': 'القيمة العالية',
		desc1: 'نحن نقدم أسعارًا تنافسية على مجموعة منتجاتنا التي تزيد عن 100 مليون.',
		'WORLDWIDE DELIVERY': 'تسليم جميع أنحاء العالم',
		desc2: 'من خلال مواقع بخمس لغات، نقوم بالشحن إلى أكثر من 200 دولة',
		'SAFE PAMENT': 'الدفع الآمن',
		desc3: 'ادفع باستخدام طرق الدفع الأكثر شهرة وأمانًا في العالم',
		'SHOP WITH CONFIDENCE': 'تسوق مع التوثيق',
		desc4: 'تغطي حماية المشتري لدينا عملية الشراء الخاصة بك من النقر إلى التسليم',
		'HELP CENTER': 'مركز المساعدة',
		desc5: 'مساعدة على مدار الساعة لتجربة تسوق سلسة.',
		SUBSCRIPTION: 'الاشتراك',
		'Your email address': '...عنوان بريدك  الإلكتروني',
		'Leave this field': 'اترك هذا الحقل فارغًا إذا كنت إنسانًا:',
		'GOT QUESTIONS? CALL US 24/7': 'هل حصلت على الاسئلة؟ اتصل بنا 24/7',
		'Subscribe us': 'اشترك معنا',
		'everything you love, in one place': '...كل ما تحبه، في مكان واحد',
		INFORMATION: 'معلومة',
		'About store': 'حول المتجر',
		'New collections': 'مجموعات جديدة',
		'Woman dress': 'فستان امرأة',
		'Contact us': 'اتصل بنا',
		'Latest news': 'أحدث الأخبار',
		'Our sitemap': 'خريطة موقعنا',
		'New York': 'نيويورك',
		'London SF': 'لندن إس إف',
		'Cockfosters BP': 'كوكفوسترز بي بي',
		'Los Angeles': 'لوس أنجلوس',
		Chicago: 'شيكاغو',
		'Las Vegas': 'لاس فيجاس',
		'Privacy Policy': 'سياسة الخصوصية',
		Returns: 'عائدات',
		'Terms & Conditions': 'الأحكام والشروط',
		Instagram: 'انستغرام',
		Facebook: 'فيسبوك',
		Purchase: 'شراء',
		'Pasig City, Philippines': 'مدينة باسيج، الفلبين',
		Tel: 'هاتف',
		Mail: 'بريد',
		'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY':
			'© 2022 إي مارش. جميع الحقوق محفوظة | مشغل بواسطة',
	},
	fi = {
		Newsletter: 'النشرة الإخبارية',
		'Get timely updates from your favorite products':
			'احصل على التحديثات في الوقت المناسب من المنتجات المفضلة لديك',
		'Enter your email address': 'أدخل عنوان بريدك الالكتروني',
	},
	ji = {
		welcome: ci,
		addToCart: oi,
		size: li,
		color: di,
		sizes: ui,
		navbar: mi,
		blog: hi,
		Welcom: pi,
		cart: xi,
		footer: gi,
		newsletter: fi,
	},
	vi = 'Welcome to Venus Store',
	yi = 'Add to Cart',
	bi = 'Size',
	wi = 'Color',
	Ai = { S: 'S', M: 'M', L: 'L', XL: 'XL', XXL: 'XXL' },
	Si = {
		venus: 'Venus - Powerful Responsive Magento 2 Theme',
		'All Categories': 'All Categories',
		'- Jeans': '- Jeans',
		'- Coats': '- Coats',
		'- Women': '- Women',
		Jeans: 'Jeans',
		Coats: 'Coats',
		Women: 'Women',
		'Enter keywords to search...': 'Enter keywords to search...',
		Search: 'Search',
		'My Cart': 'My Cart',
		Login: 'Login',
		Home: 'Home',
		Shop: 'Shop',
		Blog: 'Blog',
		'About Us': 'About Us',
		'Contact Us': 'Contact Us',
		'Black Friday!': 'Black Friday!',
	},
	_i = {
		'Latest Blogs': 'Latest Blogs',
		'Read more': 'Read more',
		title1: 'Join millions of others',
		title2: 'Choose the perfect design',
		title3: 'What are some good electronic',
		title4: 'Standard Blog Post Examples',
		Posted: 'Posted:',
		'post-short-description1':
			'Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam',
		'post-short-description2':
			'Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam',
		'post-short-description3':
			'Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam',
		'post-short-description4':
			'Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam',
	},
	Ni = {
		'YOUR BAG': 'YOUR BAG',
		'CONTINUE SHOPPING': 'CONTINUE SHOPPING',
		'Shopping Bag': 'Shopping Bag',
		'Your Wishlist': 'Your Wishlist',
		'No products in the cart.': 'No products in the cart.',
		'Product:': 'Product:',
		'Size:': 'Size:',
		Remove: 'Remove',
		'ORDER SUMMARY': 'ORDER SUMMARY',
		Subtotal: 'Subtotal',
		'Estimated Shipping': 'Estimated Shipping',
		'Shipping Discount': 'Shipping Discount',
		Total: 'Total',
		'CHECKOUT NOW': 'CHECKOUT NOW',
	},
	Ci = {
		'Welcome to Venus Store': 'Welcome to Venus Store',
		'Wrap new offers': 'Wrap new offers / gift every single day on Weekends',
		'Explorer Now': 'Explorer Now',
		'New Coupon code': 'New Coupon code',
	},
	ki = {
		'GREAT VALUE': 'GREAT VALUE',
		desc1: 'We offer competitive prices on our 100 millionplus product range.',
		'WORLDWIDE DELIVERY': 'WORLDWIDE DELIVERY',
		desc2: 'With sites in 5 languages, we ship to over 200 countries &amp; regions.',
		'SAFE PAMENT': 'SAFE PAMENT',
		desc3: 'Pay with the world’s most popular and secure payment methods.',
		'SHOP WITH CONFIDENCE': 'SHOP WITH CONFIDENCE',
		desc4: 'Our Buyer Protection covers your purchase from click to delivery.',
		'HELP CENTER': '24/7 HELP CENTER',
		desc5: 'Round-the-clock assistance for a smooth shopping experience.',
		SUBSCRIPTION: 'SUBSCRIPTION',
		'Your email address': 'Your email address ...',
		'Leave this field': "Leave this field empty if you're human:",
		'GOT QUESTIONS? CALL US 24/7': 'GOT QUESTIONS? CALL US 24/7',
		'Subscribe us': 'Subscribe us',
		'everything you love, in one place':
			'everything you love, in one place..',
		INFORMATION: 'INFORMATION',
		'About store': 'About store',
		'New collections': 'New collections',
		'Woman dress': 'Woman dress',
		'Contact us': 'Contact us',
		'Latest news': 'Latest news',
		'Our sitemap': 'Our sitemap',
		'New York': 'New York',
		'London SF': 'London SF',
		'Cockfosters BP': 'Cockfosters BP',
		'Los Angeles': 'Los Angeles',
		Chicago: 'Chicago',
		'Las Vegas': 'Las Vegas',
		'Privacy Policy': 'Privacy Policy',
		Returns: 'Returns',
		'Terms & Conditions': 'Terms &amp; Conditions',
		Instagram: 'Instagram',
		Facebook: 'Facebook',
		Purchase: 'Purchase',
		'Pasig City, Philippines': 'Pasig City, Philippines',
		Tel: 'Tel',
		Mail: 'Mail',
		'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY':
			'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY',
	},
	Ei = {
		Newsletter: 'Newsletter',
		'Get timely updates from your favorite products':
			'Get timely updates from your favorite products.',
		'Enter your email address': 'Enter your email address',
	},
	Pi = {
		welcome: vi,
		addToCart: yi,
		size: bi,
		color: wi,
		sizes: Ai,
		navbar: Si,
		blog: _i,
		cart: Ni,
		Welcom: Ci,
		footer: ki,
		newsletter: Ei,
	},
	se = Ve.createContext(),
	Oi = ({ children: t }) => {
		const [i, a] = n.useState('en'),
			c = { en: Pi, ar: ji }[i],
			h = (p) => {
				a(p), rs.locale(p), (document.documentElement.lang = p);
			};
		return e.jsx(se.Provider, {
			value: { language: i, dictionary: c, changeLanguage: h },
			children: t,
		});
	},
	Li = r.div`
	height: 60px;
	${R({ height: '50px' })}
	user-select: none;
	@media screen and (max-width: 935px) {
		display: none;
	}
	direction: ${({ language: t }) => (t === 'ar' ? 'rtl' : 'ltr')};
`,
	qi = r.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${R({ padding: '10px 0px' })}
`,
	Ii = r.div`
	flex: 1;
	display: flex;
	align-items: center;
`,
	Ri = r.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${R({ flex: 2, justifyContent: 'center' })}
`,
	Ge = r.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${R({ fontSize: '12px', marginLeft: '10px' })}
`,
	Ti = Ve.memo(
		({
			isGuest: t,
			handleLogout: i,
			darkMode: a,
			toggle: o,
			language: c,
			changeLanguage: h,
		}) =>
			e.jsx(Li, {
				language: c,
				children: e.jsxs(qi, {
					children: [
						e.jsxs(Ii, {
							children: [
								e.jsx(Ge, {
									children:
										c === 'en'
											? 'Welcome to Venuse store'
											: 'مرحبا بك في متجر فينوس',
								}),
								!t &&
									e.jsx(Ge, {
										children: e.jsx('button', {
											onClick: i,
											children:
												c === 'en' ? 'LOG OUT' : 'تسجيل الخروج',
										}),
									}),
								t &&
									e.jsxs(e.Fragment, {
										children: [
											e.jsx(Ge, {
												children: e.jsx(M, {
													to: '/Register',
													children:
														c === 'en'
															? 'REGISTER'
															: 'انشاء حساب',
												}),
											}),
											e.jsx(Ge, {
												children: e.jsx(M, {
													to: '/Login',
													children:
														c === 'en'
															? 'SIGN IN'
															: 'تسجيل الدخول',
												}),
											}),
										],
									}),
							],
						}),
						e.jsxs(Ri, {
							children: [
								a
									? e.jsx(st, { className: 'CiDark' })
									: e.jsx(tt, { className: 'CiDark' }),
								e.jsxs('select', {
									className: 'languageSelect',
									value: c,
									onChange: (p) => h(p.target.value),
									style: c === 'ar' ? { marginRight: '15px' } : {},
									children: [
										e.jsx('option', {
											value: 'en',
											children:
												c === 'en' ? 'English' : 'الانجليزية',
										}),
										e.jsx('option', {
											value: 'ar',
											children: c === 'en' ? 'Arabic' : 'العربية',
										}),
									],
								}),
							],
						}),
					],
				}),
			}),
	),
	Oe = () => {
		const { toggle: t, darkMode: i } = n.useContext(us),
			{ language: a, changeLanguage: o } = n.useContext(se),
			c = Ne((d) => d.user.currentUser),
			h = Fe(),
			p = () => {
				h(ei());
			};
		return e.jsx(Ti, {
			isGuest: !c,
			handleLogout: p,
			darkMode: i,
			toggle: t,
			language: a,
			changeLanguage: o,
		});
	},
	zi = '/assets/SvgLogo-e4kLxYn3.svg',
	Hs = ({ data: t }) =>
		e.jsx('table', {
			className: 'table1',
			children: e.jsx('tbody', {
				children: t.map((i) =>
					e.jsx(
						'tr',
						{
							children: e.jsx('a', {
								href: `/product/${i._id}`,
								children: e.jsx('td', { children: i.title }),
							}),
						},
						i.id,
					),
				),
			}),
		}),
	Fi = () => {
		const { products: t, total: i } = Ne((q) => q.cart),
			[a, o] = n.useState(''),
			[c, h] = n.useState([]),
			[p, d] = n.useState(''),
			[v, k] = n.useState(!1),
			E = n.useRef(null),
			{ dictionary: A } = n.useContext(se),
			[T, ne] = n.useState(),
			ye = n.useMemo(() => {
				const q = new Set();
				return (
					t.forEach((x) => {
						const V = x.selectedVariant._id;
						if (V && x.quantity > 0) {
							const X = `${x.productId}-${V}`;
							q.add(X);
						}
					}),
					q.size
				);
			}, [t]),
			Ae = async () => {
				var q, x, V, X, de, H, xe, Se, f, O, C, $;
				try {
					const L = await localStorage.getItem('persist:root');
					((L != null &&
						L !== '' &&
						((x = JSON.parse(
							(q = JSON.parse(L)) == null ? void 0 : q.user,
						)) == null
							? void 0
							: x.currentUser) !== void 0 &&
						((X = JSON.parse(
							(V = JSON.parse(L)) == null ? void 0 : V.user,
						)) == null
							? void 0
							: X.currentUser) !== null &&
						((H = JSON.parse(
							(de = JSON.parse(L)) == null ? void 0 : de.user,
						)) == null
							? void 0
							: H.username) !== void 0 &&
						((Se = JSON.parse(
							(xe = JSON.parse(L)) == null ? void 0 : xe.user,
						)) == null
							? void 0
							: Se.username) !== null &&
						((O = JSON.parse(
							(f = JSON.parse(L)) == null ? void 0 : f.user,
						)) == null
							? void 0
							: O.username) !== void 0) ||
						(($ = JSON.parse(
							(C = JSON.parse(L)) == null ? void 0 : C.user,
						)) == null
							? void 0
							: $.username) !== '') &&
						ne(L);
				} catch (L) {
					console.error(L);
				}
			};
		n.useEffect(() => {
			Ae();
		}, []);
		const te = n.useCallback(async (q, x) => {
				try {
					const V = await Ee.get(
						`http://194.195.86.67:4000/api/products/search/${q}?category=${x}`,
					);
					h(V.data);
				} catch (V) {
					console.error(V);
				}
			}, []),
			F = n.useRef(ps(te, 350));
		n.useEffect(
			() => (
				(F.current = ps(te, 350)),
				() => {
					F.current.cancel();
				}
			),
			[te],
		);
		const Y = (q) => {
			d(q.target.value), o('');
		};
		n.useEffect(() => {
			const q = (x) => {
				E.current && !E.current.contains(x.target) && k(!1);
			};
			return (
				document.addEventListener('mousedown', q),
				() => {
					document.removeEventListener('mousedown', q);
				}
			);
		}, []);
		const pe = (q) => {
				const x = q.target.value.toLowerCase();
				o(x), x === '' ? k(!1) : (k(!0), F.current(x, p));
			},
			ae = () => {
				a && k(!0);
			},
			J = () => {
				setTimeout(() => {
					document.activeElement !== E.current && k(!1);
				}, 150);
			};
		return e.jsx('div', {
			className: 'header-middle snipcss-LbbnX',
			children: e.jsx('div', {
				className: 'container',
				children: e.jsxs('div', {
					className: 'middle-content',
					children: [
						e.jsx('div', {
							className: 'logo-container',
							children: e.jsxs('h1', {
								className: 'logo-content',
								children: [
									e.jsx('strong', { children: A.navbar.venus }),
									e.jsx(M, {
										to: '/',
										className: 'logo',
										title: A.navbar.venus,
										children: e.jsx('img', {
											src: zi,
											alt: 'Logo',
											width: '157',
											height: '35',
										}),
									}),
								],
							}),
						}),
						e.jsx('div', {
							className: 'right-container',
							children: e.jsxs('div', {
								className: 'right-content',
								children: [
									e.jsx('div', {
										id: 'sm_searchbox14558078331679218424',
										className: 'block block-search search-pro',
										children: e.jsx('div', {
											className: 'block block-content',
											children: e.jsxs('div', {
												className: 'form minisearch active',
												id: 'searchbox_mini_form',
												children: [
													e.jsx('div', {
														className: 'field search',
														children: e.jsxs('div', {
															className: 'control',
															children: [
																e.jsxs('select', {
																	className:
																		'cat searchbox-cat',
																	name: 'cat',
																	value: p,
																	onChange: Y,
																	children: [
																		e.jsx('option', {
																			value: '',
																			children:
																				A.navbar[
																					'All Categories'
																				],
																		}),
																		e.jsx('option', {
																			value: 'jeans',
																			children:
																				A.navbar['- Jeans'],
																		}),
																		e.jsx('option', {
																			value: 'coat',
																			children:
																				A.navbar['- Coats'],
																		}),
																		e.jsx('option', {
																			value: 'women',
																			children:
																				A.navbar['- Women'],
																		}),
																	],
																}),
																e.jsx('input', {
																	id: 'searchbox',
																	type: 'text',
																	placeholder:
																		A.navbar[
																			'Enter keywords to search...'
																		],
																	className:
																		'input-text input-searchbox',
																	maxLength: 128,
																	autoComplete: 'off',
																	value: a,
																	onChange: pe,
																	onFocus: ae,
																	onBlur: J,
																	ref: E,
																}),
																v && e.jsx(Hs, { data: c }),
															],
														}),
													}),
													e.jsx('div', {
														className: 'actions',
														children: e.jsxs('button', {
															title: 'Search',
															children: [
																e.jsx(it, {}),
																e.jsx('span', {
																	children: A.navbar.Search,
																}),
															],
														}),
													}),
												],
											}),
										}),
									}),
									e.jsx('div', {
										className: 'minicart-header',
										children: e.jsx('div', {
											className: 'minicart-wrapper',
											children: T
												? e.jsxs(M, {
														to: '/cart',
														className: 'action showcart',
														children: [
															e.jsx(nt, {}),
															e.jsx('span', {
																className: 'text',
																children: A.navbar['My Cart'],
															}),
															e.jsx('span', {
																className: 'counter qty empty',
																children: e.jsx('span', {
																	className: 'counter-number',
																	children: ye,
																}),
															}),
															e.jsx('span', {
																className: 'price-minicart',
																children: e.jsx('div', {
																	className: 'subtotal',
																	children: e.jsx('div', {
																		className:
																			'amount price-container',
																		children: e.jsx('span', {
																			className:
																				'price-wrapper',
																			children: e.jsxs(
																				'span',
																				{
																					className:
																						'price',
																					children: [
																						'$',
																						i,
																					],
																				},
																			),
																		}),
																	}),
																}),
															}),
														],
												  })
												: e.jsxs(M, {
														to: '/login',
														className: 'action showcart',
														children: [
															e.jsx(at, {}),
															e.jsx('span', {
																className: 'text',
																children: A.navbar.Login,
															}),
														],
												  }),
										}),
									}),
								],
							}),
						}),
					],
				}),
			}),
		});
	},
	Le = Ve.memo(Fi),
	qe = () => {
		const [t, i] = n.useState(!1),
			{ dictionary: a } = n.useContext(se),
			{ language: o } = n.useContext(se),
			c = () => {
				i((h) => !h);
			};
		return e.jsx('div', {
			className: 'header-bottom ontop-element snipcss-7ocdx',
			children: e.jsx('div', {
				className: 'container',
				children: e.jsxs('div', {
					className: 'desktop-menu',
					children: [
						e.jsx('div', {
							className: 'vertical-block',
							children: e.jsx('div', {
								className: 'vertical-menu',
								children: e.jsxs('div', {
									className: 'vertical-menu-block',
									onClick: c,
									children: [
										e.jsxs('div', {
											className: 'block-title-menu',
											children: [
												a.navbar['All Categories'],
												' ',
												e.jsx(rt, {}),
											],
										}),
										e.jsx('div', {
											className: 'vertical-menu-content',
											style: { display: t ? 'block' : '' },
											children: e.jsx('nav', {
												className:
													'sm_megamenu_wrapper_vertical_menu sambar',
												children: e.jsxs('div', {
													className: 'sambar-inner',
													children: [
														e.jsx(M, {
															to: '/products/women',
															children: e.jsx('div', {
																className: 'more-w',
																children: e.jsx('span', {
																	className: 'more-view line',
																	children: a.navbar.Women,
																}),
															}),
														}),
														e.jsx(M, {
															to: '/products/coat',
															children: e.jsx('div', {
																className: 'more-w',
																children: e.jsx('span', {
																	className: 'more-view line',
																	children: a.navbar.Coats,
																}),
															}),
														}),
														e.jsx(M, {
															to: '/products/jeans',
															children: e.jsx('div', {
																className: 'more-w',
																children: e.jsx('span', {
																	className: 'more-view',
																	children: a.navbar.Jeans,
																}),
															}),
														}),
													],
												}),
											}),
										}),
									],
								}),
							}),
						}),
						e.jsxs('div', {
							className: 'horizontal-block',
							children: [
								e.jsx('div', {
									className: 'horizontal-menu',
									children: e.jsx('div', {
										className: 'horizontal-megamenu-block',
										children: e.jsx('nav', {
											className:
												'sm_megamenu_wrapper_horizontal_menu sambar',
											children: e.jsx('div', {
												className: 'sambar-inner',
												children: e.jsx('div', {
													className: 'mega-content',
													children: e.jsxs('ul', {
														className: `horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black ${
															o === 'ar'
																? 'sm_megamenu_menuAr'
																: ''
														}`,
														'data-jsapi': 'on',
														children: [
															e.jsx('li', {
																className:
																	'home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop',
																children: e.jsx('a', {
																	className:
																		'sm_megamenu_head sm_megamenu_drop',
																	href: '',
																	children: e.jsx('span', {
																		className:
																			'sm_megamenu_icon sm_megamenu_nodesc',
																		children: e.jsx('span', {
																			className:
																				'sm_megamenu_title',
																			children:
																				a.navbar.Home,
																		}),
																	}),
																}),
															}),
															e.jsx('span', {
																className: 'btn-submobile',
															}),
															e.jsx('li', {
																className:
																	'other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ',
																children: e.jsxs('a', {
																	className:
																		'sm_megamenu_head sm_megamenu_drop ',
																	href: '',
																	children: [
																		e.jsx('span', {
																			className:
																				'icon_items',
																			children: e.jsx(
																				'img',
																				{
																					src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/sale.png',
																					alt: 'icon items',
																					width: '1',
																					height: '1',
																				},
																			),
																		}),
																		e.jsx('span', {
																			className:
																				'sm_megamenu_icon sm_megamenu_nodesc',
																			children: e.jsx(
																				'span',
																				{
																					className:
																						'sm_megamenu_title',
																					children:
																						a.navbar.Shop,
																				},
																			),
																		}),
																	],
																}),
															}),
															e.jsx('li', {
																className:
																	'other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ',
																children: e.jsx('a', {
																	className:
																		'sm_megamenu_head sm_megamenu_drop ',
																	href: '',
																	children: e.jsx('span', {
																		className:
																			'sm_megamenu_icon sm_megamenu_nodesc',
																		children: e.jsx('span', {
																			className:
																				'sm_megamenu_title',
																			children:
																				a.navbar.Blog,
																		}),
																	}),
																}),
															}),
															e.jsx('li', {
																className:
																	'other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ',
																children: e.jsx('a', {
																	className:
																		'sm_megamenu_head sm_megamenu_drop ',
																	href: '',
																	children: e.jsx('span', {
																		className:
																			'sm_megamenu_icon sm_megamenu_nodesc',
																		children: e.jsx('span', {
																			className:
																				'sm_megamenu_title',
																			children:
																				a.navbar[
																					'About Us'
																				],
																		}),
																	}),
																}),
															}),
															e.jsx('li', {
																className:
																	'other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ',
																children: e.jsx('a', {
																	className:
																		'sm_megamenu_head sm_megamenu_drop ',
																	href: '',
																	children: e.jsx('span', {
																		className:
																			'sm_megamenu_icon sm_megamenu_nodesc',
																		children: e.jsx('span', {
																			className:
																				'sm_megamenu_title',
																			children:
																				a.navbar[
																					'Contact Us'
																				],
																		}),
																	}),
																}),
															}),
														],
													}),
												}),
											}),
										}),
									}),
								}),
								e.jsx('div', {
									className: 'promotion-block',
									children: e.jsx(M, {
										to: '/offer/new-offers',
										children: a.navbar['Black Friday!'],
									}),
								}),
							],
						}),
					],
				}),
			}),
		});
	},
	$i = r.div`
	height: 60vh;
	background-color: #fcf5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`,
	Di = r.h1`
	font-size: 70px;
	margin-bottom: 20px;
`,
	Vi = r.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
	${R({ textAlign: 'center' })}
`,
	Bi = r.div`
	width: 50%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
	${R({ width: '80%' })}
`,
	Wi = r.input`
	border: none;
	flex: 8;
	padding-left: 20px;
`,
	Mi = r.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
`,
	Ke = () => {
		n.useContext(se);
		const { dictionary: t } = n.useContext(se);
		return e.jsxs($i, {
			children: [
				e.jsx(Di, { children: t.newsletter.Newsletter }),
				e.jsx(Vi, {
					children:
						t.newsletter[
							'Get timely updates from your favorite products'
						],
				}),
				e.jsxs(Bi, {
					children: [
						e.jsx(Wi, {
							placeholder: t.newsletter['Enter your email address'],
						}),
						e.jsx(Mi, { children: e.jsx(ct, {}) }),
					],
				}),
			],
		});
	},
	Ie = () => {
		const { language: t } = n.useContext(se),
			{ dictionary: i } = n.useContext(se);
		return e.jsxs('div', {
			id: 'foodter_v1',
			class: 'footer footer-v1 snipcss-Ehoar tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center',
			children: [
				e.jsx('div', {
					class: 'footer-top footer-top-1',
					children: e.jsx('div', {
						class: 'container',
						children: e.jsx('aside', {
							id: 'automatic-static-block-2',
							class: 'widget automatic_widget_staticblock',
							children: e.jsx('div', {
								class: 'automatic-widget automatic-static-block',
								children: e.jsx('div', {
									class: 'vc_row wpb_row vc_row-fluid',
									children: e.jsx('div', {
										class: 'wpb_column vc_column_container vc_col-sm-12',
										children: e.jsx('div', {
											class: 'vc_column-inner',
											children: e.jsx('div', {
												class: 'wpb_wrapper',
												children: e.jsx('div', {
													class: 'automatic-icon list au_fadeIn animated fadeIn',
													children: e.jsx('div', {
														class: 'text-center icon-size-md',
														children: e.jsxs('div', {
															class: 'line-row',
															children: [
																e.jsxs('div', {
																	class: 'border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 first',
																	children: [
																		e.jsx('div', {
																			class: 'icon',
																			children: e.jsx(
																				'span',
																				{
																					class: 'icon',
																					children: e.jsx(
																						ot,
																						{},
																					),
																				},
																			),
																		}),
																		e.jsxs('div', {
																			class: 'box-content',
																			children: [
																				e.jsx('h1', {
																					class: 'title-icon',
																					children:
																						i.footer[
																							'GREAT VALUE'
																						],
																				}),
																				e.jsx('div', {
																					children:
																						i.footer
																							.desc1,
																				}),
																			],
																		}),
																	],
																}),
																e.jsxs('div', {
																	class: 'border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ',
																	children: [
																		e.jsx('div', {
																			class: 'icon',
																			children: e.jsx(
																				'span',
																				{
																					class: 'icon',
																					children: e.jsx(
																						lt,
																						{},
																					),
																				},
																			),
																		}),
																		e.jsxs('div', {
																			class: 'box-content',
																			children: [
																				e.jsx('h4', {
																					class: 'title-icon',
																					children:
																						i.footer[
																							'WORLDWIDE DELIVERY'
																						],
																				}),
																				e.jsx('div', {
																					children:
																						i.footer
																							.desc2,
																				}),
																			],
																		}),
																	],
																}),
																e.jsxs('div', {
																	class: 'border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ',
																	children: [
																		e.jsx('div', {
																			class: 'icon',
																			children: e.jsx(
																				'span',
																				{
																					class: 'icon',
																					children: e.jsx(
																						dt,
																						{},
																					),
																				},
																			),
																		}),
																		e.jsxs('div', {
																			class: 'box-content',
																			children: [
																				e.jsx('h4', {
																					class: 'title-icon',
																					children:
																						i.footer[
																							'SAFE PAMENT'
																						],
																				}),
																				e.jsx('div', {
																					children:
																						i.footer
																							.desc3,
																				}),
																			],
																		}),
																	],
																}),
																e.jsxs('div', {
																	class: 'border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ',
																	children: [
																		e.jsx('div', {
																			class: 'icon',
																			children: e.jsx(
																				'span',
																				{
																					class: 'icon',
																					children: e.jsx(
																						ut,
																						{},
																					),
																				},
																			),
																		}),
																		e.jsxs('div', {
																			class: 'box-content',
																			children: [
																				e.jsx('h4', {
																					class: 'title-icon',
																					children:
																						i.footer[
																							'SHOP WITH CONFIDENCE'
																						],
																				}),
																				e.jsx('div', {
																					children:
																						i.footer
																							.desc4,
																				}),
																			],
																		}),
																	],
																}),
																e.jsxs('div', {
																	class: 'border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 ',
																	children: [
																		e.jsx('div', {
																			class: 'icon',
																			children: e.jsx(
																				'span',
																				{
																					class: 'icon',
																					children: e.jsx(
																						mt,
																						{},
																					),
																				},
																			),
																		}),
																		e.jsxs('div', {
																			class: 'box-content',
																			children: [
																				e.jsx('h4', {
																					class: 'title-icon',
																					children:
																						i.footer[
																							'HELP CENTER'
																						],
																				}),
																				e.jsx('div', {
																					children:
																						i.footer
																							.desc5,
																				}),
																			],
																		}),
																	],
																}),
															],
														}),
													}),
												}),
											}),
										}),
									}),
								}),
							}),
						}),
					}),
				}),
				e.jsxs('div', {
					class: 'container',
					children: [
						e.jsx('div', {
							class: 'footer-center padding-bottom-100',
							children: e.jsx('aside', {
								id: 'automatic-static-block-3',
								class: 'widget automatic_widget_staticblock',
								children: e.jsxs('div', {
									class: 'automatic-widget automatic-static-block',
									children: [
										e.jsxs('div', {
											'data-vc-full-width': 'true',
											'data-vc-full-width-init': 'true',
											class: 'vc_row wpb_row vc_row-fluid home1-newletter background-default vc_custom_1489394616135 snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center style-4TY4e',
											id: 'style-4TY4e',
											children: [
												e.jsx('div', {
													class: 'wpb_column vc_column_container vc_col-sm-7 snipcss0-1-1-2',
													children: e.jsx('div', {
														class: 'vc_column-inner snipcss0-2-2-3',
														children: e.jsx('div', {
															class: 'wpb_wrapper snipcss0-3-3-4',
															children: e.jsx('div', {
																class: 'wpb_widgetised_column wpb_content_element snipcss0-4-4-5',
																children: e.jsx('div', {
																	class: 'wpb_wrapper snipcss0-5-5-6',
																	children: e.jsx('aside', {
																		id: 'mc4wp_form_widget-3',
																		class: 'widget widget_mc4wp_form_widget snipcss0-6-6-7',
																		children: e.jsxs('form', {
																			id: 'mc4wp-form-1',
																			class: 'mc4wp-form mc4wp-form-200 snipcss0-7-7-8',
																			method: 'post',
																			'data-id': '200',
																			'data-name': '',
																			children: [
																				e.jsx('div', {
																					class: 'mc4wp-form-fields snipcss0-8-8-9',
																					children: e.jsxs(
																						'p',
																						{
																							class: 'snipcss0-9-9-10',
																							children: [
																								e.jsx(
																									'label',
																									{
																										class: 'snipcss0-10-10-11',
																										children:
																											i
																												.footer
																												.SUBSCRIPTION,
																									},
																								),
																								e.jsx(
																									'input',
																									{
																										type: 'email',
																										name: 'EMAIL',
																										placeholder:
																											i
																												.footer[
																												'Your email address'
																											],
																										required:
																											'',
																										class: 'snipcss0-10-10-12',
																									},
																								),
																								e.jsx(
																									'span',
																									{
																										class: 'submit-over snipcss0-10-10-13',
																										children:
																											e.jsx(
																												'input',
																												{
																													type: 'submit',
																													value: i
																														.footer[
																														'Subscribe us'
																													],
																													class: 'snipcss0-11-13-14',
																												},
																											),
																									},
																								),
																							],
																						},
																					),
																				}),
																				e.jsxs('label', {
																					class: 'snipcss0-8-8-15 style-U78xg',
																					id: 'style-U78xg',
																					children: [
																						i.footer[
																							'Leave this field'
																						],
																						e.jsx(
																							'input',
																							{
																								type: 'text',
																								name: '_mc4wp_honeypot',
																								value: '',
																								tabindex:
																									'-1',
																								autocomplete:
																									'off',
																								class: 'snipcss0-9-15-16',
																							},
																						),
																					],
																				}),
																				e.jsx('input', {
																					type: 'hidden',
																					name: '_mc4wp_timestamp',
																					value: '1679394145',
																					class: 'snipcss0-8-8-17',
																				}),
																				e.jsx('input', {
																					type: 'hidden',
																					name: '_mc4wp_form_id',
																					value: '200',
																					class: 'snipcss0-8-8-18',
																				}),
																				e.jsx('input', {
																					type: 'hidden',
																					name: '_mc4wp_form_element_id',
																					value: 'mc4wp-form-1',
																					class: 'snipcss0-8-8-19',
																				}),
																				e.jsx('div', {
																					class: 'mc4wp-response snipcss0-8-8-20',
																				}),
																			],
																		}),
																	}),
																}),
															}),
														}),
													}),
												}),
												e.jsx('div', {
													class: 'wpb_column vc_column_container vc_col-sm-5 snipcss0-1-1-21',
													children: e.jsx('div', {
														class: 'vc_column-inner vc_custom_1486623379385 snipcss0-2-21-22',
														children: e.jsx('div', {
															class: 'wpb_wrapper snipcss0-3-22-23',
															children: e.jsx('div', {
																class: 'wpb_text_column wpb_content_element snipcss0-4-23-24',
																children: e.jsx('div', {
																	class: 'wpb_wrapper snipcss0-5-24-25',
																	children: e.jsxs('div', {
																		class: 'call-us snipcss0-6-25-26',
																		children: [
																			i.footer[
																				'GOT QUESTIONS? CALL US 24/7'
																			],
																			e.jsx('i', {
																				class: 'automaticicon-phone snipcss0-7-26-27',
																			}),
																			e.jsx('span', {
																				class: 'call-phone snipcss0-7-26-28',
																				children:
																					'(40) 1257 7058',
																			}),
																		],
																	}),
																}),
															}),
														}),
													}),
												}),
											],
										}),
										e.jsx('div', {
											class: 'vc_row-full-width vc_clearfix',
										}),
									],
								}),
							}),
						}),
						e.jsx('div', {
							class: 'footer-logo',
							children: e.jsx('aside', {
								id: 'automatic-logo-2',
								class: 'widget automatic_widget_logo snipcss0-1-1-2',
								children: e.jsxs('div', {
									class: 'footer-logo',
									children: [
										e.jsx('a', {
											href: '',
											class: 'snipcss0-3-3-4',
											children: e.jsx('img', {
												src: 'https://emarche.net/wp-content/uploads/2017/02/Logo-resized.png',
												alt: 'eMarche',
												class: 'snipcss0-4-4-5',
											}),
										}),
										e.jsx('span', {
											class: 'text snipcss0-3-3-6',
											children:
												i.footer[
													'everything you love, in one place'
												],
										}),
									],
								}),
							}),
						}),
						e.jsx('div', {
							class: 'footer-top',
							children: e.jsxs('div', {
								class: 'row snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center snipcss0-0-0-1Ar ',
								children: [
									e.jsx('div', {
										class: 'col-md-8 col-lg-8 col-sm-7 col-xs-12 middle-right snipcss0-1-1-2',
										children: e.jsxs('div', {
											class: 'row snipcss0-2-2-3 snipcss0-2-2-3Ar',
											children: [
												e.jsx('div', {
													class: 'col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-4 ipad',
													children: e.jsxs('div', {
														class: 'row snipcss0-4-4-5 snipcss0-4-4-5Ar',
														children: [
															e.jsx('div', {
																class: 'col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-6',
																children: e.jsxs('aside', {
																	id: 'text-2',
																	class: 'widget widget_text snipcss0-6-6-7',
																	children: [
																		e.jsx('h3', {
																			class: 'widget-title snipcss0-7-7-8',
																			children:
																				i.footer
																					.INFORMATION,
																		}),
																		e.jsx('div', {
																			class: 'textwidget snipcss0-7-7-9',
																			children: e.jsxs(
																				'ul',
																				{
																					id: 'menu-infomation',
																					class: 'menu snipcss0-8-9-10',
																					children: [
																						e.jsx('li', {
																							id: 'menu-item-2347',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2347 snipcss0-9-10-11',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: 'https://emarche.net/#',
																										class: 'snipcss0-10-11-12',
																										children:
																											i
																												.footer[
																												'About store'
																											],
																									},
																								),
																						}),
																						e.jsx('li', {
																							id: 'menu-item-2348',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2348 snipcss0-9-10-13',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: '#',
																										class: 'snipcss0-10-13-14',
																										children:
																											i
																												.footer[
																												'New collections'
																											],
																									},
																								),
																						}),
																						e.jsx('li', {
																							id: 'menu-item-2349',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2349 snipcss0-9-10-15',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: '#',
																										class: 'snipcss0-10-15-16',
																										children:
																											i
																												.footer[
																												'Woman dress'
																											],
																									},
																								),
																						}),
																						e.jsx('li', {
																							id: 'menu-item-2350',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2350 snipcss0-9-10-17',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: '#',
																										class: 'snipcss0-10-17-18',
																										children:
																											i
																												.footer[
																												'Contact us'
																											],
																									},
																								),
																						}),
																						e.jsx('li', {
																							id: 'menu-item-2351',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2351 snipcss0-9-10-19',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: '#',
																										class: 'snipcss0-10-19-20',
																										children:
																											i
																												.footer[
																												'Latest news'
																											],
																									},
																								),
																						}),
																						e.jsx('li', {
																							id: 'menu-item-2352',
																							class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2352 snipcss0-9-10-21',
																							children:
																								e.jsx(
																									'a',
																									{
																										href: '#',
																										class: 'snipcss0-10-21-22',
																										children:
																											i
																												.footer[
																												'Our sitemap'
																											],
																									},
																								),
																						}),
																					],
																				},
																			),
																		}),
																	],
																}),
															}),
															e.jsx('div', {
																class: 'col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-23',
																children: e.jsx('aside', {
																	id: 'nav_menu-3',
																	class: 'widget widget_nav_menu snipcss0-6-23-24',
																	children: e.jsx('div', {
																		class: 'menu-location-container snipcss0-7-24-25',
																		children: e.jsxs('ul', {
																			id: 'menu-location',
																			class: 'menu snipcss0-8-25-26',
																			children: [
																				e.jsx('li', {
																					id: 'menu-item-2375',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2375 snipcss0-9-26-27',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-27-28',
																							children:
																								i
																									.footer[
																									'New York'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2376',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2376 snipcss0-9-26-29',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-29-30',
																							children:
																								i
																									.footer[
																									'London SF'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2377',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2377 snipcss0-9-26-31',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-31-32',
																							children:
																								i
																									.footer[
																									'Cockfosters BP'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2378',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2378 snipcss0-9-26-33',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-33-34',
																							children:
																								i
																									.footer[
																									'Los Angeles'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2379',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2379 snipcss0-9-26-35',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-35-36',
																							children:
																								i.footer
																									.Chicago,
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2380',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2380 snipcss0-9-26-37',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-37-38',
																							children:
																								i
																									.footer[
																									'Las Vegas'
																								],
																						},
																					),
																				}),
																			],
																		}),
																	}),
																}),
															}),
														],
													}),
												}),
												e.jsx('div', {
													class: 'col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-39',
													children: e.jsxs('div', {
														class: 'row snipcss0-4-39-40',
														children: [
															e.jsx('div', {
																class: 'col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-41',
																children: e.jsx('aside', {
																	id: 'nav_menu-4',
																	class: 'widget widget_nav_menu snipcss0-6-41-42',
																	children: e.jsx('div', {
																		class: 'menu-useful-links-container snipcss0-7-42-43',
																		children: e.jsxs('ul', {
																			id: 'menu-useful-links',
																			class: 'menu snipcss0-8-43-44',
																			children: [
																				e.jsx('li', {
																					id: 'menu-item-2381',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2381 snipcss0-9-44-45',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-45-46',
																							children:
																								i
																									.footer[
																									'Privacy Policy'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2382',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2382 snipcss0-9-44-47',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-47-48',
																							children:
																								i.footer
																									.Returns,
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2383',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2383 snipcss0-9-44-49',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-49-50',
																							children:
																								i
																									.footer[
																									'Terms & Conditions'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2384',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2384 snipcss0-9-44-51',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-51-52',
																							children:
																								i
																									.footer[
																									'Contact us'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2385',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2385 snipcss0-9-44-53',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-53-54',
																							children:
																								i
																									.footer[
																									'Latest news'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2386',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2386 snipcss0-9-44-55',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-55-56',
																							children:
																								i
																									.footer[
																									'Our sitemap'
																								],
																						},
																					),
																				}),
																			],
																		}),
																	}),
																}),
															}),
															e.jsx('div', {
																class: 'col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-57',
																children: e.jsx('aside', {
																	id: 'nav_menu-5',
																	class: 'widget widget_nav_menu snipcss0-6-57-58',
																	children: e.jsx('div', {
																		class: 'menu-menu-container snipcss0-7-58-59',
																		children: e.jsxs('ul', {
																			id: 'menu-menu',
																			class: 'menu snipcss0-8-59-60',
																			children: [
																				e.jsx('li', {
																					id: 'menu-item-2387',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2387 snipcss0-9-60-61',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-61-62',
																							children:
																								i.footer
																									.Instagram,
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2388',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2388 snipcss0-9-60-63',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-63-64',
																							children:
																								i.footer
																									.Facebook,
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2389',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2389 snipcss0-9-60-65',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-65-66',
																							children:
																								i
																									.footer[
																									'Contact us'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2390',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2390 snipcss0-9-60-67',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-67-68',
																							children:
																								i
																									.footer[
																									'Latest news'
																								],
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2391',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2391 snipcss0-9-60-69',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-69-70',
																							children:
																								i.footer
																									.Purchase,
																						},
																					),
																				}),
																				e.jsx('li', {
																					id: 'menu-item-2392',
																					class: 'menu-item menu-item-type-custom menu-item-object-custom menu-item-2392 snipcss0-9-60-71',
																					children: e.jsx(
																						'a',
																						{
																							href: '#',
																							class: 'snipcss0-10-71-72',
																							children:
																								'F.A.Q',
																						},
																					),
																				}),
																			],
																		}),
																	}),
																}),
															}),
														],
													}),
												}),
											],
										}),
									}),
									e.jsxs('div', {
										class: 'col-md-4 col-lg-4 col-sm-5 col-xs-12 middle-left snipcss0-1-1-73',
										children: [
											e.jsxs('aside', {
												id: 'automatic-contact-2',
												class: 'widget automatic_widget_contact snipcss0-2-73-74',
												children: [
													e.jsx('h3', {
														class: 'widget-title snipcss0-3-74-75',
														children: i.footer['Contact us'],
													}),
													e.jsx('div', {
														class: 'footer-info-v1 snipcss0-3-74-76',
														children: e.jsx('div', {
															class: 'links snipcss0-4-76-77',
															children: e.jsxs('ul', {
																class: 'snipcss0-5-77-78',
																children: [
																	e.jsxs('li', {
																		class: 'snipcss0-6-78-79',
																		children: [
																			e.jsx('em', {
																				class: 'automaticicon-home snipcss0-7-79-80',
																				children: e.jsx(
																					ht,
																					{},
																				),
																			}),
																			e.jsx('span', {
																				class: 'text snipcss0-7-79-81',
																				children:
																					i.footer[
																						'Pasig City, Philippines'
																					],
																			}),
																		],
																	}),
																	e.jsxs('li', {
																		class: 'snipcss0-6-78-82',
																		children: [
																			e.jsx('em', {
																				class: 'automaticicon-phone snipcss0-7-82-83',
																				children: e.jsx(
																					pt,
																					{},
																				),
																			}),
																			e.jsxs('a', {
																				href: 'tel:+639668461690',
																				class: 'snipcss0-7-82-84',
																				children: [
																					i.footer.Tel,
																					e.jsx('span', {
																						class: 'text snipcss0-8-84-85',
																						children:
																							'+639668461690',
																					}),
																				],
																			}),
																		],
																	}),
																	e.jsxs('li', {
																		class: 'snipcss0-6-78-86',
																		children: [
																			e.jsx('em', {
																				class: 'automaticicon-mail snipcss0-7-86-87',
																				children: e.jsx(
																					xt,
																					{},
																				),
																			}),
																			e.jsxs('a', {
																				href: 'mailto:support@emarche.net',
																				class: 'snipcss0-7-86-88',
																				children: [
																					i.footer.Mail,
																					e.jsx('span', {
																						class: 'text snipcss0-8-88-89',
																						children:
																							'support@emarche.net',
																					}),
																				],
																			}),
																		],
																	}),
																],
															}),
														}),
													}),
												],
											}),
											e.jsx('aside', {
												id: 'automatic-social-2',
												class: 'widget automatic_widget_social snipcss0-2-73-90',
												children: e.jsxs('div', {
													class: 'social-login-options snipcss0-3-90-91 snipcss0-3-90-91Ar',
													children: [
														e.jsx('div', {
															class: 'social snipcss0-4-91-92',
															children: e.jsx('a', {
																href: '#',
																target: '_blank',
																class: 'snipcss0-5-92-93',
																children: e.jsx(gt, {}),
															}),
														}),
														e.jsx('div', {
															class: 'social snipcss0-4-91-95',
															children: e.jsx('a', {
																href: '#',
																target: '_blank',
																class: 'snipcss0-5-95-96',
																children: e.jsx(ft, {}),
															}),
														}),
														e.jsx('div', {
															class: 'social snipcss0-4-91-98',
															children: e.jsx('a', {
																href: '#',
																target: '_blank',
																class: 'snipcss0-5-98-99',
																children: e.jsx(jt, {}),
															}),
														}),
														e.jsx('div', {
															class: 'social snipcss0-4-91-101',
															children: e.jsx('a', {
																href: '#',
																target: '_blank',
																class: 'snipcss0-5-101-102',
																children: e.jsx(vt, {}),
															}),
														}),
														e.jsx('div', {
															class: 'social snipcss0-4-91-104',
															children: e.jsx('a', {
																href: '#',
																target: '_blank',
																class: 'snipcss0-5-104-105',
																children: e.jsx(yt, {}),
															}),
														}),
													],
												}),
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
				e.jsx('div', {
					class: 'bottom-footer',
					children: e.jsx('div', {
						class: 'container',
						children: e.jsxs('div', {
							class: 'row',
							children: [
								e.jsx('div', {
									class: 'col-md-6 col-lg-6 col-sm-6 col-xs-12',
									children: e.jsx('div', {
										className: 'pull-left footercopyright',
										children:
											t === 'ar'
												? e.jsxs(e.Fragment, {
														children: [
															e.jsx('a', {
																href: '#',
																children: 'PME',
															}),
															i.footer[
																'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY'
															],
														],
												  })
												: e.jsxs(e.Fragment, {
														children: [
															i.footer[
																'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY'
															],
															e.jsx('a', {
																href: '#',
																children: 'PME',
															}),
														],
												  }),
									}),
								}),
								e.jsx('div', {
									class: 'col-md-6 col-lg-6 col-sm-6 col-xs-12',
									children: e.jsx('div', {
										class: 'pull-right',
										children: e.jsx('img', {
											class: 'alignnone wp-image-368 size-medium',
											src: 'https://emarche.net/wp-content/uploads/2017/01/bank-2-300x26.png',
											alt: '',
											width: '300',
											height: '26',
										}),
									}),
								}),
							],
						}),
					}),
				}),
			],
		});
	},
	Js = Is({
		name: 'cart',
		initialState: { products: [], quantity: 0, total: 0 },
		reducers: {
			addProduct: (t, i) => {
				const a = i.payload,
					o = t.products.find((c) => {
						var h, p;
						return (
							(c == null ? void 0 : c._id) ===
								(a == null ? void 0 : a._id) &&
							((h = c.selectedVariant) == null ? void 0 : h._id) ===
								((p = a.selectedVariant) == null ? void 0 : p._id)
						);
					});
				o ? (o.quantity += a.quantity) : t.products.push(a),
					(t.total = t.products.reduce(
						(c, h) => c + h.price * h.quantity,
						0,
					));
			},
			removeProduct: (t, i) => {
				const { productId: a, variantId: o } = i.payload;
				t.products = t.products.filter(
					(c) => c._id !== a || c.selectedVariant._id !== o,
				);
			},
			increase: (t, i) => {
				const a = i.payload,
					o = t.products.findIndex((c) => c.selectedVariant._id === a);
				t.products[o].quantity += 1;
			},
			decrease: (t, i) => {
				const a = i.payload,
					o = t.products.findIndex((c) => c.selectedVariant._id === a);
				t.products[o].quantity -= 1;
			},
			clear: (t) => {
				(t.products = []), (t.total = 0);
			},
			reset: (t, i) => {
				const a = i.payload,
					o = t.products.findIndex((c) => c.selectedVariant._id === a);
				t.products[o].quantity = 1;
			},
			getAllProduct: (t) => {
				let i = t.products;
				t.cartProducts = i;
			},
			calc: (t, i) => {
				let { total: a, quantity: o } = t.products.reduce(
					(c, h) => {
						const { price: p, quantity: d } = h,
							v = p * d;
						return (c.total += v), (c.quantity += d), c;
					},
					{ total: 0, quantity: 0 },
				);
				t.total = a;
			},
		},
	}),
	{
		addProduct: ms,
		removeProduct: Ui,
		increase: Gi,
		decrease: Hi,
		calc: Ji,
		reset: vs,
		getAllProduct: _r,
		clear: Yi,
	} = Js.actions,
	Ki = Js.reducer,
	Qi = r.div`
	user-select: none;
`,
	Zi = r.div`
	padding: 50px;
	display: flex;
	${R({ padding: '10px', flexDirection: 'column' })}
	${(t) => t.language === 'ar' && 'flex-direction: row-reverse'}
`,
	Xi = r.div`
	flex: 1;
`;
r.img`
	width: 90%;
	height: 70vh;
	object-fit: cover;
	${R({ height: '40vh' })}
`;
const en = r.img`
	height: 650px;
	width: 900px;
	object-fit: contain;
`,
	sn = r.div`
	flex: 1;
	padding: 0px 50px;
	${R({ padding: '10px' })}
	${(t) =>
		t.language === 'ar' &&
		`
    text-align: -webkit-right;

  `}
`,
	tn = r.h1`
	font-weight: 200;
`,
	nn = r.p`
	margin: 20px 0px;
`,
	ys = r.span`
	font-weight: 100;
	font-size: 40px;
`,
	an = r.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${R({ width: '100%' })}
`,
	bs = r.div`
	display: flex;
	align-items: center;
	flex-direction: ${(t) => (t.language === 'ar' ? 'row-reverse' : 'row')};
`,
	ws = r.span`
	font-size: 20px;
	font-weight: 200;
`,
	rn = r.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(t) => t.color};
	cursor: pointer;
	margin-left: 10px;
	border: 1px solid #000;
	&:hover {
		outline: 3px solid #4e3f34;
	}
	> * {
		&:first-child {
			outline: 3px solid #4e3f34;
		}
	}
	${(t) =>
		t.language === 'ar' &&
		`
    margin-right: 10px; /* margin for RTL */
    margin-left: 0; /* reset default margin for RTL */
  `}
`,
	cn = r.select`
	margin-left: 10px;
	padding: 5px;
	${(t) =>
		t.language === 'ar' &&
		`
	margin-right: 10px;
	margin-left: 0;
 `}
`,
	on = r.option``,
	ln = r.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${R({ width: '100%' })}
`,
	dn = r.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`,
	un = r.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0px;
`,
	mn = r.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`,
	hn = r.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`,
	pn = (t) => t.cart,
	Ys = () => {
		const [t, i] = n.useState({}),
			[a, o] = n.useState(1),
			[c, h] = n.useState(''),
			[p, d] = n.useState(''),
			v = Fe(),
			E = os().pathname.split('/')[2],
			[A, T] = n.useState(!1),
			ne = Ne(Kt),
			[ye, Ae] = n.useState(!1),
			te = Ne(pn),
			[F, Y] = n.useState(0),
			[pe, ae] = n.useState([]),
			[J, q] = n.useState([]),
			[x, V] = n.useState(null),
			[X, de] = n.useState(x == null ? void 0 : x.quantity),
			{ language: H } = n.useContext(se),
			{ dictionary: xe } = n.useContext(se),
			[Se, f] = n.useState(null);
		n.useEffect(() => {
			ne !== void 0 && T(!0);
		}, [ne]),
			n.useEffect(() => {
				window.scrollTo(0, 0);
			}, []),
			n.useEffect(() => {
				(async () => {
					try {
						let b = await je.get('/products/find/' + E);
						b.data == null && (b = await je.get('/offer/find/' + E)),
							i(b.data);
						const D = Array.from(
							new Set(b.data.variants.flatMap((Q) => Q.color)),
						);
						q(D);
						const z = Array.from(
							new Set(b.data.variants.flatMap((Q) => Q.size)),
						);
						ae(z), f(b.data.variants[0].img);
					} catch {}
				})();
			}, [E]),
			document.querySelectorAll('.Color').forEach((_) =>
				_.addEventListener('click', (b) => {
					document.querySelectorAll('.Color').forEach((D) => {
						D.style.outline = 'none';
					}),
						(b.target.style.outline = '3px solid #4e3f34');
				}),
			);
		const O = (_) => {
				const b = C.find(
						(Q) => Q._id === t._id && Q.selectedVariant._id === x._id,
					),
					D = b ? b.quantity : 0,
					z = x ? x.quantity - D : 0;
				_ === 'dec'
					? a > 1 && o(a - 1)
					: a >= z
					? w(
							'Info',
							'You have exceeded the number of available products!',
							'info',
					  )
					: o(a + 1);
			},
			C = te.products.reduce((_, b) => {
				const D = _.find(
					(z) =>
						z._id === b._id &&
						z.selectedVariant._id === b.selectedVariant._id,
				);
				return D ? (D.quantity += b.quantity) : _.push({ ...b }), _;
			}, []);
		let $ = x ? x.quantity : 0;
		const L = n.useCallback(() => {
			if (x && C) {
				const b = C.find((D) => D.variants.find((z) => z._id === x._id));
				b &&
					te.products.map((D) => {
						D.selectedVariant._id === b.selectedVariant._id &&
							de(D.selectedVariant.quantity - D.quantity);
					});
			}
			x &&
				C &&
				C.map((b) => {
					if (b.variants.find((z) => z._id === x._id))
						return {
							...b,
							variants: b.variants.map((z) => {
								if (z._id === x._id) {
									const Q = z.quantity - X;
									($ = $ - Q), Q <= 0 && Ae(!0);
								} else return Ae(!1), z;
							}),
						};
				});
			let _;
			X > 0 ? (_ = X) : (_ = $), Ae(_ <= 0);
		}, [C, t._id, x, a, X]);
		n.useEffect(() => {
			L();
		}, [C, t._id, x, a, L, X]),
			n.useEffect(() => {
				const _ = C.find((b) => {
					var D;
					return (
						(b == null ? void 0 : b._id) ===
							(t == null ? void 0 : t._id) &&
						((D = b == null ? void 0 : b.selectedVariant) == null
							? void 0
							: D._id) === (x == null ? void 0 : x._id)
					);
				});
				de(_ ? x.quantity - _.quantity : x ? x.quantity : 0);
			}, [x, C, t._id]);
		const g = (_) => {
				const b = t.variants.filter((ve) => ve.color.includes(_)),
					D = b.flatMap((ve) => ve.size);
				ae(D);
				const z = b[0];
				V(z), o(1), h(_);
				const Q = D[0];
				d(Q), b.find((ve) => ve.size.includes(Q));
				const fe = C.find(
					(ve) => ve._id === t._id && ve.selectedVariant._id === z._id,
				);
				de(fe ? z.quantity - fe.quantity : z ? z.quantity : 0),
					f(z.img),
					L();
			},
			W = (_) => {
				const b = t.variants,
					D = [...new Set(b.flatMap((fe) => fe.color))];
				q(D), V(b[0]);
				const z = b[0];
				V(z), o(1), d(_);
				const Q = C.find(
					(fe) => fe._id === t._id && fe.selectedVariant._id === z._id,
				);
				de(Q ? z.quantity - Q.quantity : z ? z.quantity : 0), L();
			};
		function K(_, b) {
			return new Intl.NumberFormat(b === 'ar' ? 'ar-EG' : 'en-US', {
				style: 'decimal',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(_);
		}
		const ge = () => {
				if (!x) {
					w('Please select a variant');
					return;
				}
				A === !1
					? w({
							title: 'You have to login !',
							icon: 'warning',
							confirmButtonColor: '#42A5F5',
							confirmButtonText: 'Login',
							showCancelButton: !0,
							closeOnConfirm: !1,
					  }).then((_) => {
							_ && (window.location.href = '/login');
					  })
					: (v(
							ms({
								...t,
								price: t.offerPrice || t.price,
								quantity: a,
								selectedVariant: x,
							}),
					  ),
					  o(1),
					  de(x.quantity - a),
					  w('Success', 'Product added to cart!', 'success'),
					  L());
			},
			N = () => {
				if (t && t.variants && pe.length === 1 && J.length === 1) {
					const _ = t.variants.find(
						(b) => b.size.includes(pe[0]) && b.color.includes(J[0]),
					);
					V(_);
				} else if (t && t.variants) {
					const _ = t.variants.find(
						(b) => b.size.includes(p) && b.color.includes(c),
					);
					V(_);
				}
			};
		function be(_) {
			return new Intl.NumberFormat('ar-EG').format(_);
		}
		return (
			n.useEffect(() => {
				N();
			}, [p, c, t.variants, L, X, h, g]),
			e.jsxs(Qi, {
				children: [
					e.jsx(Oe, {}),
					e.jsx(Le, {}),
					e.jsx(qe, {}),
					e.jsxs(Zi, {
						language: H,
						children: [
							e.jsx(Xi, {
								children: Ys
									? e.jsxs(e.Fragment, {
											children: [
												e.jsx(en, { src: Se, alt: `product-${F}` }),
												e.jsxs(un, {
													children: [
														e.jsx('button', {
															style: { marginRight: '10px' },
															children: e.jsx(bt, {}),
														}),
														e.jsx('button', {
															style: { marginLeft: '10px' },
															children: e.jsx(wt, {}),
														}),
													],
												}),
											],
									  })
									: e.jsx('p', { children: 'No images available' }),
							}),
							e.jsxs(sn, {
								language: H,
								children: [
									e.jsx(tn, {
										children: H === 'ar' ? t.title_ar : t.title,
									}),
									e.jsx(nn, {
										children: H === 'ar' ? t.desc_ar : t.desc,
									}),
									t.offerPrice !== void 0 &&
									t.offerPrice !== null &&
									t.offerPrice !== ''
										? e.jsx(e.Fragment, {
												children: e.jsxs(ys, {
													className: 'price55',
													children: [' ', t.price],
												}),
										  })
										: e.jsx(ys, {
												children:
													H === 'ar'
														? `${K(t.price, H)} $`
														: `$ ${K(t.price, H)}`,
										  }),
									e.jsxs(an, {
										children: [
											e.jsxs(bs, {
												language: H,
												children: [
													e.jsx(ws, {
														language: H,
														children: xe.color,
													}),
													J.map((_) =>
														e.jsx(
															rn,
															{
																className: 'Color',
																color: _,
																language: H,
																onClick: () => g(_),
															},
															_,
														),
													),
												],
											}),
											e.jsxs(bs, {
												language: H,
												children: [
													e.jsx(ws, {
														language: H,
														children: xe.size,
													}),
													e.jsx(cn, {
														language: H,
														onChange: (_) => W(_.target.value),
														children: pe.map((_) =>
															e.jsx(
																on,
																{
																	value: _,
																	children:
																		(H === 'ar' &&
																			xe.sizes[_]) ||
																		_,
																},
																_,
															),
														),
													}),
												],
											}),
										],
									}),
									e.jsxs(ln, {
										children: [
											e.jsxs(dn, {
												children: [
													e.jsx(Ts, { onClick: () => O('dec') }),
													e.jsx(mn, {
														children: H === 'ar' ? be(a) : a,
													}),
													e.jsx(zs, { onClick: () => O('inc') }),
												],
											}),
											e.jsx(hn, {
												className: 'AddCart',
												onClick: ge,
												disabled: ye,
												children: xe.addToCart,
											}),
										],
									}),
								],
							}),
						],
					}),
					e.jsx(Ke, {}),
					e.jsx(Ie, {}),
				],
			})
		);
	},
	xn = 'modulepreload',
	gn = function (t) {
		return '/' + t;
	},
	As = {},
	fn = function (i, a, o) {
		let c = Promise.resolve();
		if (a && a.length > 0) {
			const h = document.getElementsByTagName('link');
			c = Promise.all(
				a.map((p) => {
					if (((p = gn(p)), p in As)) return;
					As[p] = !0;
					const d = p.endsWith('.css'),
						v = d ? '[rel="stylesheet"]' : '';
					if (!!o)
						for (let A = h.length - 1; A >= 0; A--) {
							const T = h[A];
							if (T.href === p && (!d || T.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${p}"]${v}`)) return;
					const E = document.createElement('link');
					if (
						((E.rel = d ? 'stylesheet' : xn),
						d || ((E.as = 'script'), (E.crossOrigin = '')),
						(E.href = p),
						document.head.appendChild(E),
						d)
					)
						return new Promise((A, T) => {
							E.addEventListener('load', A),
								E.addEventListener('error', () =>
									T(new Error(`Unable to preload CSS for ${p}`)),
								);
						});
				}),
			);
		}
		return c
			.then(() => i())
			.catch((h) => {
				const p = new Event('vite:preloadError', { cancelable: !0 });
				if (((p.payload = h), window.dispatchEvent(p), !p.defaultPrevented))
					throw h;
			});
	},
	jn = n.lazy(() =>
		fn(() => import('./Poffer-kCR5oKba.js'), __vite__mapDeps([0, 1, 2])),
	),
	vn = r.div``,
	yn = r.h1`
	margin: 20px;
`,
	bn = r.div`
	display: flex;
	justify-content: space-between;
`,
	Ss = r.div`
	margin: 20px;
	${R({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`,
	_s = r.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${R({ marginRight: '0px' })}
`,
	is = r.select`
	padding: 10px;
	margin-right: 20px;
	${R({ margin: '10px 0px' })}
`,
	ue = r.option``,
	wn = () => {
		const [t, i] = n.useState({}),
			[a, o] = n.useState('newest'),
			c = n.useCallback((h) => {
				const p = h.target.value;
				i((d) => ({ ...d, [h.target.name]: p }));
			}, []);
		return e.jsxs(vn, {
			children: [
				e.jsx(Oe, {}),
				e.jsx(Le, {}),
				e.jsx(qe, {}),
				e.jsx(yn, { children: 'Offers' }),
				e.jsxs(bn, {
					children: [
						e.jsxs(Ss, {
							children: [
								e.jsx(_s, { children: 'Filter Products:' }),
								e.jsxs(is, {
									name: 'color',
									onChange: c,
									children: [
										e.jsx(ue, { disabled: !0, children: 'Color' }),
										e.jsx(ue, { children: 'White' }),
										e.jsx(ue, { children: 'Black' }),
										e.jsx(ue, { children: 'Red' }),
										e.jsx(ue, { children: 'Blue' }),
										e.jsx(ue, { children: 'Yellow' }),
										e.jsx(ue, { children: 'Green' }),
									],
								}),
								e.jsxs(is, {
									name: 'size',
									onChange: c,
									children: [
										e.jsx(ue, { disabled: !0, children: 'Size' }),
										e.jsx(ue, { children: 'XS' }),
										e.jsx(ue, { children: 'S' }),
										e.jsx(ue, { children: 'M' }),
										e.jsx(ue, { children: 'L' }),
										e.jsx(ue, { children: 'XL' }),
									],
								}),
							],
						}),
						e.jsxs(Ss, {
							children: [
								e.jsx(_s, { children: 'Sort Products:' }),
								e.jsxs(is, {
									onChange: (h) => o(h.target.value),
									children: [
										e.jsx(ue, {
											value: 'newest',
											children: 'Newest',
										}),
										e.jsx(ue, {
											value: 'asc',
											children: 'Price (asc)',
										}),
										e.jsx(ue, {
											value: 'desc',
											children: 'Price (desc)',
										}),
									],
								}),
							],
						}),
					],
				}),
				e.jsx(n.Suspense, {
					fallback: null,
					children: e.jsx(jn, { filters: t, sort: a }),
				}),
				e.jsx(Ke, {}),
				e.jsx(Ie, {}),
			],
		});
	},
	An = Ve.memo(wn),
	Sn = [
		{
			id: 1,
			img: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			title: 'SUMMER SALE',
			desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
			bg: 'f5fafd',
		},
		{
			id: 2,
			img: 'https://i.ibb.co/DG69bQ4/2.png',
			title: 'AUTUMN COLLECTION',
			desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
			bg: 'fcf1ed',
		},
		{
			id: 3,
			img: 'https://i.ibb.co/cXFnLLV/3.png',
			title: 'LOUNGEWEAR LOVE',
			desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
			bg: 'fbf0f4',
		},
	],
	_n = [
		{
			id: 1,
			img: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			title: 'تخفيضات الصيف',
			desc: 'لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد',
			bg: 'fbf0f4',
		},
		{
			id: 2,
			img: 'https://i.ibb.co/DG69bQ4/2.png',
			title: 'مجموعة الخريف',
			desc: 'لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد.',
			bg: 'fcf1ed',
		},
		{
			id: 3,
			img: 'https://i.ibb.co/cXFnLLV/3.png',
			title: 'حب ملابس الاسترخاء',
			desc: 'لا تتنازل عن الأسلوب! احصل على خصم ثابت بنسبة 30% للوافدين الجدد.',
			bg: 'fbf0f4',
		},
	],
	Nn = [
		{
			id: 1,
			img: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			title: 'abayas style',
			title_ar: 'ستايل  العباءات',
			cat: 'women',
		},
		{
			id: 2,
			img: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			title: 'Sweater Womens',
			title_ar: 'سترة نسائية',
			cat: 'coat',
		},
		{
			id: 3,
			img: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
			title: 'LIGHT JACKETS',
			title_ar: 'جاكيتات خفيفة',
			cat: 'jeans',
		},
	],
	Ks = ({ viewArrCatog: t }) => {
		const [i, a] = n.useState(0),
			o = ((t == null ? void 0 : t.variants) || []).map((p) => ({
				image: p.img[0],
				alt: t.title,
			}));
		console.log(o);
		const c = n.useCallback(() => {
				a((p) => (p >= o.length - 1 ? 0 : p + 1));
			}, [o.length]),
			h = n.useCallback(() => {
				a((p) => (p <= 0 ? o.length - 1 : p - 1));
			}, [o.length]);
		return (
			n.useEffect(() => {
				const p = setInterval(c, 3e3);
				return () => clearInterval(p);
			}, [c]),
			e.jsxs('div', {
				className: 'sliderBlock',
				children: [
					e.jsx('ul', {
						className: 'sliderBlock_items50',
						children: o.map((p, d) =>
							e.jsx(
								'li',
								{
									className: `sliderBlock_items__itemPhoto2 ${
										d === i ? 'sliderBlock_items__showing2' : ''
									}`,
									children: e.jsx('img', {
										src: p.image,
										loading: 'lazy',
										alt: p.alt,
										style: { width: '240px', height: '380px' },
									}),
								},
								p.image,
							),
						),
					}),
					e.jsxs('div', {
						className: 'sliderBlock_controls',
						children: [
							e.jsx('div', {
								className: 'sliderBlock_controls__navigatin',
								children: e.jsxs('div', {
									className: 'sliderBlock_controls__wrapper',
									children: [
										e.jsx('div', {
											className:
												'sliderBlock_controls__arrow sliderBlock_controls__arrowForward2',
											onClick: c,
											children: e.jsx(At, {
												className:
													'sliderBlock_controls__arrowForward2',
											}),
										}),
										e.jsx('div', {
											className:
												'sliderBlock_controls__arrow sliderBlock_controls__arrowBackward2',
											onClick: h,
											children: e.jsx(St, {
												className:
													'sliderBlock_controls__arrowBackward2',
											}),
										}),
									],
								}),
							}),
							e.jsx('ul', {
								className: 'sliderBlock_positionControls',
								children: o.map((p, d) =>
									e.jsx(
										'li',
										{
											className: `sliderBlock_positionControls__paginatorItem2 ${
												d === i
													? 'sliderBlock_positionControls__active2'
													: ''
											}`,
										},
										d,
									),
								),
							}),
						],
					}),
				],
			})
		);
	},
	Cn = r.select`
	margin-left: 10px;
	padding: 5px;
`,
	kn = ({ item: t }) => {
		const i = (u) => u.cart,
			[a, o] = n.useState(0),
			[c, h] = n.useState(1),
			[p, d] = n.useState(''),
			[v, k] = n.useState([]),
			[E, A] = n.useState({}),
			[T, ne] = n.useState({}),
			[ye, Ae] = n.useState([]),
			[te, F] = n.useState(!1),
			[Y, pe] = n.useState(''),
			[ae, J] = n.useState(null),
			q = Ne(i),
			[x, V] = n.useState(null),
			[X, de] = n.useState(!1),
			[H, xe] = n.useState([]),
			[Se, f] = n.useState(!1),
			[O, C] = n.useState(0),
			$ = document.querySelector('.FilterSizeCatog1'),
			L = Array.from(document.querySelectorAll('.show-cart2')),
			g = document.querySelector('.CatogallColors2'),
			W = document.querySelector('.AddCart'),
			K = n.useRef(),
			ge = n.useRef(!0),
			{ language: N } = n.useContext(se),
			{ dictionary: be } = n.useContext(se),
			_ = be.sizes,
			b = Fe();
		n.useEffect(() => {
			te && f(Ze());
		}, [te]),
			n.useEffect(() => {
				(async () => {
					try {
						const j = await Ee.get(
							t != null && t.cat
								? `http://194.195.86.67:4000/api/products?category=${
										t == null ? void 0 : t.cat
								  }`
								: 'http://194.195.86.67:4000/api/products',
						);
						Ae(j.data);
					} catch (j) {
						console.error('Error fetching data:', j);
					}
				})();
			}, [t == null ? void 0 : t.cat]),
			n.useEffect(() => {
				(async () => {
					try {
						const [j, l] = await Promise.all([
							ce.get('/products'),
							ce.get('/offer'),
						]);
						k(j.data), A(j.data), ne(l.data);
					} catch (j) {
						console.error('Error fetching data:', j);
					}
				})()
					.then(() => {})
					.catch((j) => {
						console.error('Error fetching data:', j), F(!1);
					})
					.finally(() => {
						v.length === 0 && F(!0);
					});
			}, [v.length]);
		const D = (u) => {
				(u.pointerEvents = 'none'),
					(u.style.opacity = '0.5'),
					(u.style.cursor = 'not-allowed');
			},
			z = (u) => {
				(u.pointerEvents = 'auto'),
					(u.style.opacity = '1'),
					(u.style.cursor = 'pointer');
			},
			Q = (u) => {
				w('Info', u, 'info');
			},
			fe = (u) => {
				w('Success', u, 'success');
			},
			ve = (u) => {
				const j = document.createElement('input');
				j.classList.add('radio_button2'),
					j.setAttribute('id', `radioColor ${u}`),
					j.setAttribute('name', 'colorOfItem'),
					j.setAttribute('checked', 'checked'),
					j.setAttribute('value', u);
				const l = document.createElement('label');
				return (
					l.setAttribute('for', `radioColor ${u}`),
					l.classList.add(
						'block_goodColor__radio',
						'block_goodColor__black',
					),
					(l.style.backgroundColor = u),
					{ input: j, label: l }
				);
			},
			Re = n.useCallback(
				(u, j) => {
					u.preventDefault(),
						document.querySelectorAll('.AddCart').forEach((m) => {
							m.removeAttribute('color');
						});
					const l = j.getAttribute('catog-id');
					V(
						te
							? [...E, ...T].find((m) => m._id === l)
							: v == null
							? void 0
							: v.find((m) => m._id === l),
					),
						pe(''),
						J(null);
				},
				[v, te, T, E],
			);
		n.useEffect(() => {
			x && (K.current = x.variants[0]);
		}, [x]),
			n.useEffect(() => {
				if (x) {
					const u = document.querySelector('.CatogCard'),
						j = document.querySelector('.backLayerForShowCart');
					(u.style.display = 'block'),
						(u.style.overflow = 'hidden'),
						(j.style.display = 'block'),
						(j.style.overflow = 'hidden'),
						(document.body.style.overflow = 'hidden'),
						(document.querySelector('.CatogCardDesc').textContent =
							N === 'en' ? x.desc : x.desc_ar),
						(document.querySelector('.nameProducts4').textContent =
							N === 'en' ? x.title : x.title_ar),
						(g.innerHTML = ''),
						o(x._id),
						document
							.querySelector('.block_product__advantagesProduct')
							.append(N === 'en' ? x.desc : x.desc_ar);
				}
			}, [x]);
		const Be = () => {
				const u = $.options[$.length - 1],
					j = parseInt(u.getAttribute('quantity'));
				c <= 1
					? Me(
							'Info',
							N === 'en'
								? 'The minimum quantity is 1'
								: 'الحد الادنى للكمية هو 1',
							'info',
					  )
					: (h(c - 1), u.setAttribute('quantity', j + 1));
			},
			Qe = () => {
				var P;
				const u = document.querySelector('label.selectedColor'),
					j =
						(P =
							document == null
								? void 0
								: document.getElementById(
										u == null ? void 0 : u.getAttribute('for'),
								  )) == null
							? void 0
							: P.value,
					l = document.querySelector('.FilterSizeCatog1'),
					m = l.options[l.length - 1].getAttribute('selected');
				if (!j) {
					w(
						'Error',
						N === 'en' ? 'Please select a color' : 'يرجى تحديد اللون',
						'error',
					);
					return;
				}
				if (!ae && !m) {
					w(
						'Error',
						N === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
						'error',
					);
					return;
				}
				const y = l.options[l.length - 1],
					S = parseInt(y.getAttribute('quantity'));
				if (!S) {
					w(
						'Error',
						N === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
						'error',
					);
					return;
				}
				x &&
					(S - 1 <= 0
						? w('Error', 'The maximum quantity is ' + c, 'error')
						: h((I) => {
								const U = I + 1;
								return y.setAttribute('quantity', S - 1), U;
						  }));
			};
		n.useEffect(() => {
			if (!x || ae) return;
			(g.innerHTML = ''), ($.innerHTML = '');
			const u = new Set(),
				j = new Set();
			x.variants.forEach((y) => {
				y.color.forEach((S) => {
					if (!u.has(S)) {
						u.add(S), j.add(...y.size);
						const { input: P, label: I } = ve(S);
						g.appendChild(P), g.appendChild(I);
					}
				});
			}),
				Array.from(j).forEach((y) => {
					const S = _[y],
						P = new Option(S, y);
					d(y), $.appendChild(P);
				});
			const m = (y) => {
				J(y.target.value);
				const S = x.variants.find((P) => P.size.includes(y.target.value));
				(K.current = S), S && (h(1), S.quantity > 0 ? z(W) : D(W));
			};
			$.addEventListener('click', m);
		}, [x, K, pe, J, h]);
		const We = n.useMemo(
			() =>
				q.products.reduce((u, j) => {
					const l = u.find(
						(m) =>
							m._id === j._id &&
							m.selectedVariant._id === j.selectedVariant._id,
					);
					return l ? (l.quantity += j.quantity) : u.push({ ...j }), u;
				}, []),
			[q],
		);
		n.useEffect(() => {
			if (x && !ae) {
				g.innerHTML = '';
				let u;
				const j = new Set();
				x.variants.forEach((l) => {
					l.color.forEach((m) => {
						if (!j.has(m)) {
							j.add(m);
							const { input: y, label: S } = ve(m);
							g.appendChild(y),
								g.appendChild(S),
								y.addEventListener('click', (P) => {
									pe(P.target.value);
									const I = document.querySelector('.selectedColor');
									I && I.classList.remove('selectedColor'),
										S.classList.add('selectedColor');
									const U = x.variants.filter((G) =>
											G.color.includes(P.target.value),
										),
										oe = Array.from(
											new Set(U.flatMap((G) => G.size)),
										);
									document
										.querySelectorAll('.block_quantity__number')
										.forEach((G) => {
											G.value = 1;
										}),
										h(1),
										($.innerHTML = ''),
										$.addEventListener('click', (G) => {
											d(G.target.value);
											const he = U.find((B) =>
												B.size.includes(G.target.value),
											);
											(K.current = he),
												h(1),
												oe.find((B) => {
													if (B === G.target.value) {
														u.setAttribute(
															'selected',
															'selected',
														);
														const ee = We.find(
																(le) =>
																	le.selectedVariant._id ===
																	he._id,
															),
															re =
																ee && ee.quantity
																	? ee.quantity
																	: O;
														u.setAttribute(
															'quantity',
															he.quantity - re,
														),
															u.getAttribute('quantity') ===
																'0' && D(W);
													}
												});
										}),
										oe.forEach((G) => {
											const he = _[G];
											(u = new Option(he, G)),
												d(G),
												$.appendChild(u);
										}),
										z(W);
								});
						}
					});
				});
			}
		}, [x, K, pe, J, h, O]),
			L.forEach((u) => {
				u.addEventListener('click', (j) => {
					h(1), Re(j, u);
				});
			}),
			document.querySelectorAll('.CloseCatogCard').forEach((u) =>
				u.addEventListener('click', (j) => {
					(document.querySelector('.CatogCard').style.display = 'none'),
						(document.body.style.overflow = ''),
						(document.querySelector('.CatogCard').style.overflow = ''),
						(document.querySelector(
							'.backLayerForShowCart',
						).style.display = 'none');
				}),
			);
		const Me = (u, j, l) => {
				w(u, j, l);
			},
			Ze = () => !0,
			Xe = (u) => [...E, ...T].find((l) => l._id === u),
			es = (u) => {
				var he;
				const j = u.target.getAttribute('product_id'),
					l = document.querySelector('.selectedColor'),
					m = l ? l.htmlFor : null,
					y = document.getElementById(m);
				if (!y || !y.value) {
					Q(
						N === 'en'
							? 'Please select a color and size'
							: 'الرجاء تحديد اللون والمقاس',
					);
					return;
				}
				const S = y.value,
					P = document.querySelector('.FilterSizeCatog1').value,
					I = Xe(j),
					U = I.variants.find((B) => B.color[0] === S && B.size[0] === P);
				if (U === void 0) {
					Q(
						N === 'en'
							? 'Please select a color and size'
							: 'الرجاء تحديد اللون والمقاس',
					);
					return;
				}
				if (!I) {
					Q(N === 'en' ? 'Product not found!' : 'المنتج غير موجود!', s);
					return;
				}
				const oe = We.find((B) => B.selectedVariant._id === U._id),
					G = oe && oe.quantity ? oe.quantity : 0;
				if (c > U.quantity - G) {
					D(W);
					return;
				}
				if (c > 0) {
					const B = { ...I, quantity: c, selectedVariant: U };
					let ee = localStorage.getItem('persist:root');
					(ee = ee ? JSON.parse(ee) : []), Array.isArray(ee) || (ee = []);
					const re = ee.find(($e) => $e._id === B._id);
					re ? (re.quantity += B.quantity) : ee.push(B);
					const le = document.querySelector('label.selectedColor'),
						Te =
							(he =
								document == null
									? void 0
									: document.getElementById(
											le == null ? void 0 : le.getAttribute('for'),
									  )) == null
								? void 0
								: he.value,
						_e = document.querySelector('.FilterSizeCatog1'),
						ss = _e.options[_e.length - 1].getAttribute('selected');
					if (!Te) {
						w(
							'Error',
							N === 'en' ? 'Please select a color' : 'يرجى تحديد لون',
							'error',
						);
						return;
					}
					if (!ae && !ss) {
						w(
							'Error',
							N === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
							'error',
						);
						return;
					}
					const ke = _e.options[_e.length - 1];
					if (!parseInt(ke.getAttribute('quantity'))) {
						w(
							'Error',
							N === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
							'error',
						);
						return;
					}
					b(ms(B)),
						ke.setAttribute('quantity', U.quantity - c),
						C(U.quantity - c),
						h(1),
						fe(
							N === 'en'
								? 'Product added to cart!'
								: 'تمت اضافة المنتج للعربة!',
						),
						ke.getAttribute('quantity') === '0' && D(W);
				} else
					Q(
						N === 'en'
							? 'Try with a different amount!'
							: 'يرجى تحديد مبلغ مختلف',
					);
			},
			Ce = async (u, j, l) => {
				if (!X) {
					await w({
						title:
							N === 'en' ? 'You have to login !' : 'يجب تسجيل الدخول',
						icon: 'warning',
					}),
						(window.location.href = '/login');
					return;
				}
				let m = l.target;
				m.tagName === 'path' && (m = m.parentNode);
				const y = m.classList[0];
				try {
					await ls(u, ie),
						j === 'remove'
							? (y === 'add-to-wish2' &&
									((m.style.display = 'none'),
									(m.previousSibling.style.display = 'block')),
							  w(
									'Success',
									N === 'en'
										? 'Product removed from wishlist!'
										: 'تمت ازالة المنتج من قائمة الرغبات',
									'success',
							  ))
							: j === 'addCatog' &&
							  (y === 'add-to-wish' &&
									((m.style.display = 'none'),
									(m.nextSibling.children[0].style.display = 'block'),
									(m.nextSibling.style.display = 'block')),
							  w(
									'Success',
									N === 'en'
										? 'Product added to wishlist!'
										: 'تمت اضافة المنتج الى قائمة الرغبات',
									'success',
							  ));
				} catch {
					w(
						'Error',
						N === 'en' ? 'Something went wrong!' : 'حدث خطأ',
						'error',
					);
				}
			};
		let ie = localStorage.getItem('persist:root');
		if (
			(n.useEffect(async () => {
				var u;
				if (JSON.parse(ie).user)
					try {
						(ie = JSON.parse(ie)),
							(ie = ie == null ? void 0 : ie.user),
							(ie = JSON.parse(ie)),
							(ie =
								(u = ie == null ? void 0 : ie.currentUser) == null
									? void 0
									: u._id),
							ie !== void 0 && de(!0);
						const j = await ds(ie);
						ge.current && xe([...j]);
					} catch (j) {
						console.error(j);
					}
				return () => {
					ge.current = !1;
				};
			}, [ie]),
			n.useEffect(() => {
				h(1);
			}, [Y, ae]),
			!ge.current)
		)
			return null;
		const Ue = (u) => {
			const j = new Date(),
				l = new Date(u.discount.startDate),
				m = new Date(u.discount.endDate);
			return j >= l && j <= m
				? (u.price * (100 - u.discount.discount)) / 100
				: u.price;
		};
		function Z(u, j) {
			return new Intl.NumberFormat(j === 'ar' ? 'ar-EG' : 'en-US', {
				style: 'decimal',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(u);
		}
		const Pe = {
			women: 'https://images.unsplash.com/photo-1675667804657-be9a9d0a6860?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			coat: 'https://images.unsplash.com/photo-1584156930330-c6b925f50065?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			jeans: 'https://images.unsplash.com/photo-1511280303142-0051e93baeeb?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		};
		return e.jsxs(e.Fragment, {
			children: [
				e.jsx('div', { className: 'backLayerForShowCart' }),
				e.jsx('div', {
					className: 'column small-centered',
					children: e.jsx('div', {
						className: 'productCard_block CatogCard',
						children: e.jsxs('div', {
							className: 'row11',
							children: [
								e.jsx('div', {
									className: 'small-12 large-6 columns11',
									children: e.jsx('div', {
										className: 'productCard_leftSide clearfix',
										children: e.jsx(Ks, { viewArrCatog: x }),
									}),
								}),
								e.jsxs('div', {
									className: 'small-12 large-6 columns11',
									children: [
										e.jsx('div', {
											className: 'AiFillCloseCircle CloseCatogCard',
											children: e.jsx(Fs, {}),
										}),
										e.jsxs('div', {
											className: 'productCard_rightSide',
											children: [
												e.jsx('div', {
													className: 'block_specification',
													children: e.jsx('div', {
														className:
															'block_specification__specificationShow',
														children: e.jsx('i', {
															className:
																'fa fa-cog block_specification__button block_specification__button__rotate',
															'aria-hidden': 'true',
														}),
													}),
												}),
												e.jsxs('div', {
													className: 'block_product',
													children: [
														e.jsx('h2', {
															className:
																'block_name block_name__mainName nameProducts4',
														}),
														e.jsx('p', {
															className:
																'block_product__advantagesProduct CatogCardDesc',
														}),
														e.jsx('div', {
															className:
																'block_informationAboutDevice',
															children: e.jsxs('div', {
																className: 'row11 ',
																children: [
																	e.jsxs('div', {
																		className:
																			'large-6 small-12 column left-align',
																		children: [
																			e.jsxs('div', {
																				className:
																					'block_price',
																				children: [
																					e.jsx('p', {
																						className:
																							'block_price__currency currency',
																						children:
																							N === 'ar'
																								? `${Z(
																										x ==
																											null
																											? void 0
																											: x.price,
																										N,
																								  )} $`
																								: `$ ${Z(
																										x ==
																											null
																											? void 0
																											: x.price,
																										N,
																								  )}`,
																					}),
																					e.jsx('p', {
																						className:
																							'block_price__shipping',
																						children:
																							N === 'en'
																								? 'Shipping and taxes extra'
																								: 'الشحن والضريبة',
																					}),
																				],
																			}),
																			e.jsxs('div', {
																				className:
																					'block_quantity clearfix',
																				children: [
																					e.jsx('span', {
																						className:
																							'text_specification',
																						children:
																							N === 'en'
																								? 'Quantity'
																								: 'الكمية:',
																					}),
																					e.jsxs('div', {
																						className:
																							'block_quantity__chooseBlock',
																						readOnly: !0,
																						children: [
																							e.jsx(
																								'input',
																								{
																									className:
																										'block_quantity__number block_quantity__number2',
																									name: 'quantityNumber',
																									type: 'text',
																									min: '1',
																									value: c,
																									readOnly:
																										!0,
																								},
																							),
																							e.jsx(
																								'button',
																								{
																									className:
																										'block_quantity__button block_quantity__up',
																									children:
																										e.jsx(
																											$s,
																											{
																												onClick:
																													() => {
																														Be();
																													},
																												className:
																													'AiOutlineArrowUpanddown down5',
																											},
																										),
																								},
																							),
																							e.jsx(
																								'button',
																								{
																									className:
																										'block_quantity__button block_quantity__down',
																									children:
																										e.jsx(
																											Ds,
																											{
																												onClick:
																													() => {
																														Qe();
																													},
																												className:
																													'AiOutlineArrowUpanddown up5',
																											},
																										),
																								},
																							),
																						],
																					}),
																				],
																			}),
																		],
																	}),
																	e.jsxs('div', {
																		className:
																			'large-6 small-12 column end',
																		children: [
																			e.jsxs('div', {
																				className:
																					'block_goodColor',
																				children: [
																					e.jsx('span', {
																						className:
																							'text_specification',
																						children:
																							N === 'en'
																								? 'Choose your colors:'
																								: 'اختر الالوان:',
																					}),
																					e.jsx('div', {
																						className:
																							'zaid',
																						style: {
																							display:
																								'hidden',
																						},
																					}),
																					e.jsx('div', {
																						className:
																							'block_goodColor__allColors2 CatogallColors2',
																					}),
																					e.jsx(Cn, {
																						className:
																							'FilterSizeCatog1',
																						onClick: (
																							u,
																						) =>
																							d(
																								u.target
																									.value,
																							),
																					}),
																				],
																			}),
																			te
																				? Se
																					? e.jsx(
																							'button',
																							{
																								className:
																									'AddCart',
																								product_id:
																									a,
																								onClick:
																									(
																										u,
																									) => {
																										es(
																											u,
																										);
																									},
																								children:
																									N ===
																									'en'
																										? 'Add to cart'
																										: 'اضف الى السلة',
																							},
																					  )
																					: e.jsx(
																							'button',
																							{
																								className:
																									'AddCart',
																								disabled:
																									!0,
																								children:
																									N ===
																									'en'
																										? 'Out of stock'
																										: 'غير متوفر',
																							},
																					  )
																				: e.jsx('p', {
																						children:
																							N === 'en'
																								? 'Loading'
																								: 'جاري التحميل',
																				  }),
																		],
																	}),
																],
															}),
														}),
													],
												}),
											],
										}),
									],
								}),
							],
						}),
					}),
				}),
				e.jsxs('div', {
					id: 'listingtabs_0',
					className:
						'block sm-listing-tabs tab-cms-block slider snipcss-X3nN9',
					children: [
						e.jsx('h2', {
							children:
								N === 'en'
									? t == null
										? void 0
										: t.title
									: t == null
									? void 0
									: t.title_ar,
						}),
						e.jsx('div', {
							className: 'block-content',
							children: e.jsxs('div', {
								className: 'ltabs-wrap',
								children: [
									e.jsx('div', {
										className: 'ltabs-tabs-container',
										children: e.jsx('div', {
											className: 'ltabs-tabs-wrap',
											tabindex: '-1',
											children: e.jsx('span', {
												className: 'ltabs-current-select',
												children:
													N === 'en'
														? 'Accessories for iPhone'
														: 'إكسسوارات للايفون',
											}),
										}),
									}),
									e.jsxs('div', {
										className: 'listingtabs-cms',
										children: [
											e.jsx('div', {
												className: 'cms-container',
												children: e.jsx('div', {
													className: 'banner-image container-hidd',
													children: e.jsx(M, {
														to: `/products/${
															t == null ? void 0 : t.cat
														}`,
														children: e.jsx('img', {
															className: 'mark-lazy new-lazy',
															src:
																Pe[
																	t == null ? void 0 : t.cat
																] || 'default_image_url',
															'data-src':
																Pe[
																	t == null ? void 0 : t.cat
																] || 'default_image_url',
															alt: 'BannerImage',
														}),
													}),
												}),
											}),
											e.jsx('div', {
												className: 'ltabs-items-container',
												children: e.jsx('div', {
													className:
														'ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15',
													children: e.jsx('div', {
														className: 'ltabs-items-inner',
														children: e.jsx('div', {
															className:
																'products wrapper grid products-grid',
															children: e.jsxs('ol', {
																className:
																	'products list items product-items owl-carousel owl-theme owl-loaded owl-drag',
																children: [
																	e.jsx('div', {
																		className:
																			'owl-stage-outer',
																		children: e.jsx('div', {
																			className:
																				'owl-stage style-pO7ki',
																			id: 'style-pO7ki',
																			children: ye
																				.slice(0, 4)
																				.map((u) =>
																					e.jsx('div', {
																						className:
																							'owl-item active style-SmoEo',
																						id: 'style-SmoEo',
																						children:
																							e.jsx(
																								'li',
																								{
																									className:
																										'item product product-item',
																									children:
																										e.jsxs(
																											'div',
																											{
																												className:
																													'product-item-info',
																												'data-container':
																													'product-grid',
																												children:
																													[
																														e.jsx(
																															M,
																															{
																																to: `/product/${u._id}`,
																																className:
																																	'action quickview-handler sm_quickview_handler',
																																title: 'Quick View',
																																href: '',
																																children:
																																	e.jsxs(
																																		'div',
																																		{
																																			className:
																																				'image-product',
																																			children:
																																				[
																																					e.jsx(
																																						'a',
																																						{
																																							href: '#',
																																							className:
																																								'product photo product-item-photo',
																																							tabindex:
																																								'-1',
																																							children:
																																								e.jsx(
																																									'span',
																																									{
																																										className:
																																											'product-image-container product-image-container-1 style-bH5WH',
																																										id: 'style-bH5WH',
																																										children:
																																											e.jsx(
																																												'span',
																																												{
																																													className:
																																														'product-image-wrapper style-MbttD',
																																													id: 'style-MbttD',
																																													children:
																																														e.jsx(
																																															'img',
																																															{
																																																className:
																																																	'product-image-photo',
																																																src: u
																																																	.variants[0]
																																																	.img,
																																																'data-src':
																																																	'http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg',
																																																loading:
																																																	'lazy',
																																																alt:
																																																	N ===
																																																	'en'
																																																		? u.title
																																																		: u.title_ar,
																																															},
																																														),
																																												},
																																											),
																																									},
																																								),
																																						},
																																					),
																																					e.jsxs(
																																						M,
																																						{
																																							to: '',
																																							className:
																																								'action quickview-handler sm_quickview_handler show-cart2',
																																							title: 'Quick View',
																																							href: '',
																																							'catog-id':
																																								u._id,
																																							children:
																																								[
																																									e.jsx(
																																										Vs,
																																										{},
																																									),
																																									e.jsx(
																																										'span',
																																										{
																																											children:
																																												N ===
																																												'en'
																																													? 'Quick View'
																																													: 'مشاهدة سريعة',
																																										},
																																									),
																																								],
																																						},
																																					),
																																				],
																																		},
																																	),
																															},
																														),
																														e.jsxs(
																															'div',
																															{
																																className:
																																	'product details product-item-details',
																																children:
																																	[
																																		e.jsxs(
																																			'strong',
																																			{
																																				className:
																																					'product name product-item-name',
																																				children:
																																					[
																																						N ===
																																						'en'
																																							? u.title
																																							: u.title_ar,
																																						e.jsx(
																																							'a',
																																							{
																																								className:
																																									'product-item-link',
																																								href: '#',
																																							},
																																						),
																																					],
																																			},
																																		),
																																		e.jsx(
																																			'div',
																																			{
																																				className:
																																					'price-box price-final_price',
																																				'data-role':
																																					'priceBox',
																																				'data-product-id':
																																					'1',
																																				'data-price-box':
																																					'product-id-1',
																																				children:
																																					e.jsx(
																																						'span',
																																						{
																																							className:
																																								'price-container price-final_price tax weee',
																																							children:
																																								e.jsx(
																																									'span',
																																									{
																																										id: 'product-price-1',
																																										'data-price-amount':
																																											'250',
																																										'data-price-type':
																																											'finalPrice',
																																										className:
																																											'price-wrapper',
																																										children:
																																											e.jsx(
																																												'span',
																																												{
																																													className:
																																														'price',
																																													children:
																																														N ===
																																														'ar'
																																															? `${Z(
																																																	Ue(
																																																		u,
																																																	),
																																																	N,
																																															  )} $`
																																															: `$ ${Z(
																																																	Ue(
																																																		u,
																																																	),
																																																	N,
																																															  )}`,
																																												},
																																											),
																																									},
																																								),
																																						},
																																					),
																																			},
																																		),
																																		e.jsx(
																																			'div',
																																			{
																																				className:
																																					'product-item-inner',
																																				children:
																																					e.jsxs(
																																						'div',
																																						{
																																							className:
																																								'product actions product-item-actions',
																																							children:
																																								[
																																									e.jsx(
																																										'div',
																																										{
																																											className:
																																												'actions-primary',
																																										},
																																									),
																																									e.jsx(
																																										'div',
																																										{
																																											'data-role':
																																												'add-to-links',
																																											className:
																																												'actions-secondary',
																																										},
																																									),
																																									e.jsx(
																																										M,
																																										{
																																											to: `/product/${u._id}`,
																																											children:
																																												e.jsx(
																																													'button',
																																													{
																																														className:
																																															'Add-to-Cart-new',
																																														children:
																																															N ===
																																															'en'
																																																? 'Add to Cart'
																																																: 'اضف الى السلة',
																																													},
																																												),
																																										},
																																									),
																																									e.jsxs(
																																										'div',
																																										{
																																											className:
																																												'actions-secondary',
																																											'data-role':
																																												'add-to-links',
																																											children:
																																												[
																																													e.jsxs(
																																														'div',
																																														{
																																															className:
																																																'action towishlist',
																																															'data-action':
																																																'add-to-wishlist',
																																															title: 'Add to Wish List',
																																															children:
																																																[
																																																	H.includes(
																																																		u._id,
																																																	)
																																																		? e.jsxs(
																																																				e.Fragment,
																																																				{
																																																					children:
																																																						[
																																																							e.jsx(
																																																								ze,
																																																								{
																																																									className:
																																																										'add-to-wish list-wish',
																																																									onClick:
																																																										(
																																																											j,
																																																										) => {
																																																											Ce(
																																																												u._id,
																																																												'addCatog',
																																																												j,
																																																											);
																																																										},
																																																									style: {
																																																										display:
																																																											'none',
																																																									},
																																																								},
																																																							),
																																																							e.jsx(
																																																								'svg',
																																																								{
																																																									className:
																																																										'add-to-wish2 list-wish bi bi-heart-fill',
																																																									xmlns: 'http://www.w3.org/2000/svg',
																																																									width: '16',
																																																									height:
																																																										'16',
																																																									fill: 'currentColor',
																																																									viewBox:
																																																										'0 0 16 16',
																																																									children:
																																																										e.jsx(
																																																											'path',
																																																											{
																																																												className:
																																																													'add-to-wish2',
																																																												'fill-rule':
																																																													'evenodd',
																																																												d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																																																												onClick:
																																																													(
																																																														j,
																																																													) => {
																																																														Ce(
																																																															u._id,
																																																															'remove',
																																																															j,
																																																														);
																																																													},
																																																											},
																																																										),
																																																								},
																																																							),
																																																						],
																																																				},
																																																		  )
																																																		: e.jsxs(
																																																				e.Fragment,
																																																				{
																																																					children:
																																																						[
																																																							e.jsx(
																																																								ze,
																																																								{
																																																									className:
																																																										'add-to-wish list-wish',
																																																									onClick:
																																																										(
																																																											j,
																																																										) => {
																																																											Ce(
																																																												u._id,
																																																												'addCatog',
																																																												j,
																																																											);
																																																										},
																																																								},
																																																							),
																																																							e.jsx(
																																																								'svg',
																																																								{
																																																									className:
																																																										'add-to-wish2 list-wish bi bi-heart-fill',
																																																									xmlns: 'http://www.w3.org/2000/svg',
																																																									width: '16',
																																																									height:
																																																										'16',
																																																									fill: 'currentColor',
																																																									viewBox:
																																																										'0 0 16 16',
																																																									children:
																																																										e.jsx(
																																																											'path',
																																																											{
																																																												className:
																																																													'add-to-wish2',
																																																												'fill-rule':
																																																													'evenodd',
																																																												d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																																																												onClick:
																																																													(
																																																														j,
																																																													) => {
																																																														Ce(
																																																															u._id,
																																																															'remove',
																																																															j,
																																																														);
																																																													},
																																																												style: {
																																																													display:
																																																														'none',
																																																												},
																																																											},
																																																										),
																																																								},
																																																							),
																																																						],
																																																				},
																																																		  ),
																																																	e.jsx(
																																																		'span',
																																																		{
																																																			children:
																																																				N ===
																																																				'en'
																																																					? 'Add to Wish List'
																																																					: 'اضف الى القائمة المفضلة',
																																																		},
																																																	),
																																																],
																																														},
																																													),
																																													e.jsxs(
																																														'div',
																																														{
																																															className:
																																																'action tocompare',
																																															'data-post':
																																																'{"action":"http:\\/\\/magento2.magentech.com\\/themes\\/sm_venuse\\/pub\\/french\\/catalog\\/product_compare\\/add\\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}',
																																															title: 'Add to Compare',
																																															children:
																																																[
																																																	e.jsx(
																																																		Bs,
																																																		{},
																																																	),
																																																	e.jsx(
																																																		'span',
																																																		{
																																																			children:
																																																				N ===
																																																				'en'
																																																					? 'Add to Compare'
																																																					: 'اضف للمقارنة',
																																																		},
																																																	),
																																																],
																																														},
																																													),
																																												],
																																										},
																																									),
																																								],
																																						},
																																					),
																																			},
																																		),
																																	],
																															},
																														),
																													],
																											},
																										),
																								},
																							),
																					}),
																				),
																		}),
																	}),
																	e.jsxs('div', {
																		className: 'owl-nav',
																		children: [
																			e.jsx('div', {
																				role: 'presentation',
																				className:
																					'owl-prev disabled',
																				children: e.jsx(
																					'span',
																					{
																						'aria-label':
																							'Previous',
																						children: '‹',
																					},
																				),
																			}),
																			e.jsx('div', {
																				role: 'presentation',
																				className:
																					'owl-next',
																				children: e.jsx(
																					'span',
																					{
																						'aria-label':
																							'Next',
																						children: '›',
																					},
																				),
																			}),
																		],
																	}),
																	e.jsx('div', {
																		className:
																			'owl-dots disabled',
																	}),
																],
															}),
														}),
													}),
												}),
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
			],
		});
	},
	En = r.div`
	display: flex;
	padding: 20px;
	justify-content: space-between;
	${R({ padding: '0px', flexDirection: 'column' })}
	flex-direction: column;
`,
	Pn = () =>
		e.jsx(En, { children: Nn.map((t) => e.jsx(kn, { item: t }, t.id)) }),
	On = () =>
		e.jsx('div', {
			class: 'sidebar-nav-mobile snipcss-JRPk3',
			children: e.jsx('div', {
				class: 'tab-content-mobile',
				id: 'nav-tabContent',
				children: e.jsx('div', {
					class: 'tab-panel fade show active',
					id: 'menu-mobile',
					role: 'tabpanel',
					'aria-labelledby': 'menu-mobile-tab',
					children: e.jsx('div', {
						class: 'nav-mobile-container sidebar-type',
						children: e.jsx('nav', {
							id: 'navigation-mobile',
							class: 'navigation-mobile',
							children: e.jsxs('ul', {
								class: 'horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black',
								'data-jsapi': 'on',
								children: [
									e.jsx('li', {
										class: 'home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop',
										children: e.jsx(M, {
											to: '/products/women',
											children: e.jsx('span', {
												class: 'sm_megamenu_icon sm_megamenu_nodesc',
												children: e.jsx('span', {
													class: 'sm_megamenu_title',
													children: 'Women',
												}),
											}),
										}),
									}),
									e.jsxs('li', {
										class: 'other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item',
										children: [
											e.jsxs(M, {
												to: '/products/coat',
												children: [
													e.jsx('span', {
														class: 'icon_items',
														children: e.jsx('img', {
															src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png',
															alt: 'icon items',
															width: '1',
															height: '1',
														}),
													}),
													e.jsx('span', {
														class: 'sm_megamenu_icon sm_megamenu_nodesc',
														children: e.jsx('span', {
															class: 'sm_megamenu_title',
															children: 'Coat',
														}),
													}),
												],
											}),
											e.jsx('span', { class: 'btn-submobile' }),
										],
									}),
									e.jsxs('li', {
										class: 'other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item',
										children: [
											e.jsxs(M, {
												to: '/products/jeans',
												children: [
													e.jsx('span', {
														class: 'icon_items',
														children: e.jsx('img', {
															src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png',
															alt: 'icon items',
															width: '1',
															height: '1',
														}),
													}),
													e.jsx('span', {
														class: 'sm_megamenu_icon sm_megamenu_nodesc',
														children: e.jsx('span', {
															class: 'sm_megamenu_title',
															children: 'Jeans',
														}),
													}),
												],
											}),
											e.jsx('span', { class: 'btn-submobile' }),
										],
									}),
								],
							}),
						}),
					}),
				}),
			}),
		});
function Ln({ children: t }) {
	const [i, a] = n.useState(!0),
		o = () => {
			a(!i);
		};
	return e.jsxs(e.Fragment, {
		children: [
			e.jsx('a', {
				onClick: o,
				id: 'btn-nav-mobile',
				children: e.jsx(_t, {}),
			}),
			!i && t,
		],
	});
}
const qn = () =>
		e.jsx('div', {
			class: 'mobile-top snipcss-OsEnD',
			children: e.jsx('div', {
				class: 'container',
				children: e.jsxs('div', {
					class: 'mobile-header-content',
					children: [
						e.jsx('div', {
							class: 'mobile-menu',
							children: e.jsx(Ln, { children: e.jsx(On, {}) }),
						}),
						e.jsx('div', {
							class: 'mobile-logo',
							children: e.jsx('img', {
								src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/logomobile/default/logo-mobile.png',
								alt: 'Logo Mobile',
								width: '157',
								height: '35',
							}),
						}),
						e.jsx('div', {
							class: 'mobile-cart',
							children: e.jsxs('div', {
								id: 'minicart-mobile',
								class: 'minicart-mobile',
								children: [
									e.jsx('span', {
										class: 'hidden',
										children: 'Cart Mobile',
									}),
									e.jsxs('div', {
										'data-block': 'minicart',
										class: 'mobile-wrapper',
										children: [
											e.jsx(M, {
												to: '/cart',
												class: 'mobile action showcart',
												'data-bind': "scope: 'minicart_content'",
												children: e.jsx(Nt, {}),
											}),
											e.jsx('div', {
												tabindex: '-1',
												role: 'dialog',
												class: 'ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-pwEon',
												'aria-describedby': 'ui-id-1',
												id: 'style-pwEon',
												children: e.jsx('div', {
													class: 'block block-minicart ui-dialog-content ui-widget-content style-fjlot',
													'data-role': 'dropdownDialog',
													id: 'ui-id-1',
													children: e.jsxs('div', {
														id: 'minicart-content-wrapper',
														'data-bind':
															"scope: 'minicart_content'",
														children: [
															e.jsx('div', {
																class: 'block-title',
																children: e.jsxs('strong', {
																	children: [
																		e.jsx('span', {
																			class: 'text',
																			'data-bind':
																				"i18n: 'My Cart'",
																			children: 'My Cart',
																		}),
																		e.jsx('span', {
																			class: 'qty empty',
																			title: 'Items in Cart',
																		}),
																	],
																}),
															}),
															e.jsxs('div', {
																class: 'block-content',
																children: [
																	e.jsx('button', {
																		type: 'button',
																		id: 'btn-minicart-close',
																		class: 'action close',
																		'data-action': 'close',
																		title: 'Close',
																		children: e.jsx('span', {
																			'data-bind':
																				"i18n: 'Close'",
																			children: 'Close',
																		}),
																	}),
																	e.jsx('strong', {
																		class: 'subtitle empty',
																		'data-bind':
																			"i18n: 'You have no items in your shopping cart.'",
																		children:
																			'You have no items in your shopping cart.',
																	}),
																	e.jsx('div', {
																		id: 'minicart-widgets',
																		class: 'minicart-widgets',
																	}),
																],
															}),
														],
													}),
												}),
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
			}),
		}),
	In = () => {
		const [t, i] = n.useState(''),
			[a, o] = n.useState([]);
		return (
			n.useEffect(() => {
				const c = async () => {
					if (t === '') {
						o([]);
						return;
					}
					const h = await Ee.get(
						`http://194.195.86.67:4000/api/products/search/${t}`,
					);
					o(h.data);
				};
				(t.length === 0 || t.length >= 1) && c();
			}, [t]),
			e.jsx('div', {
				className: 'mobile-bottom snipcss-LAYO2',
				children: e.jsx('div', {
					className: 'container',
					children: e.jsx('div', {
						className: 'block-search-mobile',
						children: e.jsx('div', {
							className: 'block-content',
							children: e.jsx('div', {
								className: 'field search',
								children: e.jsxs('div', {
									className: 'control',
									children: [
										e.jsx('input', {
											id: 'searchbox',
											type: 'text',
											name: 'q',
											placeholder: 'Enter keywords to search...',
											className: 'input-text input-searchbox',
											maxLength: '128',
											role: 'combobox',
											'aria-haspopup': 'listbox',
											'aria-expanded':
												a.length > 0 ? 'true' : 'false',
											'aria-autocomplete': 'both',
											autoComplete: 'off',
											value: t,
											onChange: (c) =>
												i(c.target.value.toLowerCase()),
										}),
										e.jsx(Hs, { data: a }),
									],
								}),
							}),
						}),
					}),
				}),
			})
		);
	},
	Rn = r.select`
	margin-left: 10px;
	padding: 5px;
`;
function Tn(t) {
	const { className: i, style: a, onClick: o } = t;
	return e.jsx(kt, {
		className: i,
		style: { ...a, display: 'block', fontSize: '30px' },
		onClick: o,
	});
}
function zn(t) {
	const { className: i, style: a, onClick: o } = t;
	return e.jsx(Et, {
		className: i,
		style: { ...a, display: 'block', fontSize: '30px' },
		onClick: o,
	});
}
const Fn = () => {
		const t = (l) => l.cart,
			[i, a] = n.useState([]),
			[o, c] = n.useState(!1),
			[h, p] = n.useState(0),
			[d, v] = n.useState(1),
			[k, E] = n.useState(''),
			A = Ne(t),
			[T, ne] = n.useState([]),
			[ye, Ae] = n.useState(!1),
			[te, F] = n.useState({}),
			[Y, pe] = n.useState({}),
			[ae, J] = n.useState(!1),
			[q, x] = n.useState(''),
			[V, X] = n.useState(null),
			[de, H] = n.useState([]),
			[xe, Se] = n.useState(0),
			[f, O] = n.useState(null),
			[C, $] = n.useState(0),
			L = document.querySelector('.FilterSizeCatog2'),
			{ language: g } = n.useContext(se),
			{ dictionary: W } = n.useContext(se),
			K = document.querySelector('.AddCart2'),
			ge = W.sizes;
		rs.extend(Ct);
		const N = Fe();
		document.querySelectorAll('.CloseCatogCard').forEach((l) =>
			l.addEventListener('click', (m) => {
				(document.querySelector('.CatogCard2').style.display = 'none'),
					(document.body.style.overflow = ''),
					(document.querySelector('.CatogCard2').style.overflow = ''),
					(document.querySelector('.backLayerForShowCart2').style.display =
						'none');
			}),
		),
			n.useEffect(() => {
				ae && Ae(Xe());
			}, [ae]),
			n.useEffect(() => {
				v(1), $((l) => l + 1);
			}, [q]);
		const be = n.useRef();
		n.useEffect(() => {
			(async () => {
				try {
					const [m, y] = await Promise.all([
						ce.get('/products'),
						ce.get('/offer'),
					]);
					ne(m.data), F(m.data), pe(y.data);
				} catch (m) {
					console.error('Error fetching data:', m);
				}
			})()
				.then(() => {})
				.catch((m) => {
					console.error('Error fetching data:', m), J(!1);
				})
				.finally(() => {
					T.length === 0 && J(!0);
				});
		}, [T.length]);
		const _ = Array.from(document.querySelectorAll('.show-cart3')),
			b = document.querySelector('.CatogallColors'),
			D = (l) => {
				const m = document.createElement('input');
				m.classList.add('radio_button'),
					m.setAttribute('id', `radioColor ${l}`),
					m.setAttribute('name', 'colorOfItem'),
					m.setAttribute('checked', 'checked'),
					m.setAttribute('value', l);
				const y = document.createElement('label');
				return (
					y.setAttribute('for', `radioColor ${l}`),
					y.classList.add(
						'block_goodColor__radio',
						'block_goodColor__black',
					),
					(y.style.backgroundColor = l),
					{ input: m, label: y }
				);
			},
			z = n.useCallback(
				(l, m) => {
					l.preventDefault(),
						document.querySelectorAll('.AddCart2').forEach((S) => {
							S.removeAttribute('color');
						});
					const y = m.getAttribute('catog-id');
					O(
						ae
							? [...te, ...Y].find((S) => S._id === y)
							: T == null
							? void 0
							: T.find((S) => S._id === y),
					),
						x(''),
						X(null);
				},
				[T, ae, Y, te],
			);
		n.useEffect(() => {
			f && (be.current = f.variants[0]);
		}, [f]),
			n.useEffect(() => {
				if (f) {
					const l = document.querySelector('.CatogCard2'),
						m = document.querySelector('.productCard_block2'),
						y = document.querySelector('.backLayerForShowCart2');
					(l.style.display = 'block'),
						(l.style.overflow = 'hidden'),
						(y.style.display = 'block'),
						(y.style.overflow = 'hidden'),
						(m.style.display = 'block'),
						(m.style.overflow = 'hidden'),
						(document.body.style.overflow = 'hidden'),
						(document.querySelector('.CatogCardDesc2').textContent =
							g === 'en' ? f.desc : f.desc_ar),
						(b.innerHTML = ''),
						p(f._id),
						(document.querySelector('.nameProducts2').textContent =
							g === 'en' ? f.title : f.title_ar),
						document
							.querySelector('.block_product__advantagesProduct')
							.append(g === 'en' ? f.desc : f.desc_ar);
				}
			}, [f]);
		const Q = (l, m, y) => {
				w(l, m, y);
			},
			fe = (l) => {
				w('Info', l, 'info');
			},
			ve = (l) => {
				w('Success', l, 'success');
			},
			Re = (l) => {
				(l.pointerEvents = 'none'),
					(l.style.opacity = '0.5'),
					(l.style.cursor = 'not-allowed');
			},
			Be = (l) => {
				(l.pointerEvents = 'auto'),
					(l.style.opacity = '1'),
					(l.style.cursor = 'pointer');
			},
			Qe = () => {
				const l = L.options[L.length - 1],
					m = parseInt(l.getAttribute('quantity'));
				d <= 1
					? Q(
							'Info',
							g === 'en'
								? 'The minimum quantity is 1'
								: 'الحد الادنى للكمية هو 1',
							'info',
					  )
					: (v(d - 1), l.setAttribute('quantity', m + 1));
			},
			We = () => {
				var U;
				const l = document.querySelector('label.selectedColor'),
					m =
						(U =
							document == null
								? void 0
								: document.getElementById(
										l == null ? void 0 : l.getAttribute('for'),
								  )) == null
							? void 0
							: U.value,
					y = document.querySelector('.FilterSizeCatog2'),
					S = y.options[y.length - 1].getAttribute('selected');
				if (!m) {
					w(
						'Error',
						g === 'en' ? 'Please select a color' : 'يرجى تحديد اللون',
						'error',
					);
					return;
				}
				if (!V && !S) {
					w(
						'Error',
						g === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
						'error',
					);
					return;
				}
				const P = y.options[y.length - 1],
					I = parseInt(P.getAttribute('quantity'));
				if (!I) {
					w(
						'Error',
						g === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
						'error',
					);
					return;
				}
				f &&
					(I - 1 <= 0
						? w('Error', 'The maximum quantity is ' + d, 'error')
						: v((oe) => {
								const G = oe + 1;
								return P.setAttribute('quantity', I - 1), G;
						  }));
			};
		n.useEffect(() => {
			if (!f || V) return;
			(b.innerHTML = ''), (L.innerHTML = '');
			const l = new Set(),
				m = new Set();
			f.variants.forEach((P) => {
				P.color.forEach((I) => {
					if (!l.has(I)) {
						l.add(I), m.add(...P.size);
						const { input: U, label: oe } = D(I);
						b.appendChild(U), b.appendChild(oe);
					}
				});
			}),
				Array.from(m).forEach((P) => {
					const I = ge[P],
						U = new Option(I, P);
					E(P), L.appendChild(U);
				});
			const S = (P) => {
				X(P.target.value);
				const I = f.variants.find((U) => U.size.includes(P.target.value));
				(be.current = I),
					I && (H([I]), v(1), I.quantity > 0 ? Be(K) : Re(K));
			};
			L.addEventListener('click', S);
		}, [f, be, x, H, X, v]);
		const Me = n.useMemo(
			() =>
				A.products.reduce((l, m) => {
					const y = l.find(
						(S) =>
							S._id === m._id &&
							S.selectedVariant._id === m.selectedVariant._id,
					);
					return y ? (y.quantity += m.quantity) : l.push({ ...m }), l;
				}, []),
			[A],
		);
		n.useEffect(() => {
			if (f && !V) {
				b.innerHTML = '';
				let l;
				const m = new Set();
				f.variants.forEach((y) => {
					y.color.forEach((S) => {
						if (!m.has(S)) {
							m.add(S);
							const { input: P, label: I } = D(S);
							b.appendChild(P),
								b.appendChild(I),
								P.addEventListener('click', (U) => {
									x(U.target.value);
									const oe = document.querySelector('.selectedColor');
									oe && oe.classList.remove('selectedColor'),
										I.classList.add('selectedColor');
									const G = f.variants.filter((B) =>
											B.color.includes(U.target.value),
										),
										he = Array.from(
											new Set(G.flatMap((B) => B.size)),
										);
									document
										.querySelectorAll('.block_quantity__number')
										.forEach((B) => {
											B.value = 1;
										}),
										v(1),
										(L.innerHTML = ''),
										L.addEventListener('click', (B) => {
											E(B.target.value);
											const ee = G.find((re) =>
												re.size.includes(B.target.value),
											);
											(be.current = ee),
												H([ee]),
												v(1),
												he.find((re) => {
													if (re === B.target.value) {
														l.setAttribute(
															'selected',
															'selected',
														);
														const le = Me.find(
																(_e) =>
																	_e.selectedVariant._id ===
																	ee._id,
															),
															Te =
																le && le.quantity
																	? le.quantity
																	: xe;
														l.setAttribute(
															'quantity',
															ee.quantity - Te,
														),
															l.getAttribute('quantity') ===
																'0' && Re(K);
													}
												});
										}),
										he.forEach((B) => {
											const ee = ge[B];
											(l = new Option(ee, B)),
												E(B),
												L.appendChild(l);
										}),
										Be(K);
								});
						}
					});
				});
			}
		}, [f, be, x, X, v, xe]),
			_.forEach((l) => {
				l.addEventListener('click', (m) => {
					v(1), z(m, l);
				});
			});
		const Ze = (l) => [...te, ...Y].find((y) => y._id === l),
			Xe = () => !0,
			es = (l) => {
				var ee;
				const m = l.target.getAttribute('product_id2'),
					y = document.querySelector('.selectedColor'),
					S = y ? y.htmlFor : null,
					P = document.getElementById(S);
				if (!P || !P.value) {
					fe(
						g === 'en'
							? 'Please select a color and size'
							: 'الرجاء تحديد اللون والمقاس',
					);
					return;
				}
				const I = P.value,
					U = document.querySelector('.FilterSizeCatog2').value,
					oe = Ze(m),
					G = oe.variants.find(
						(re) => re.color[0] === I && re.size[0] === U,
					);
				if (G === void 0) {
					fe(
						g === 'en'
							? 'Please select a color and size'
							: 'الرجاء تحديد اللون والمقاس',
					);
					return;
				}
				if (!oe) {
					fe(g === 'en' ? 'Product not found!' : 'المنتج غير موجود!');
					return;
				}
				const he = Me.find((re) => re.selectedVariant._id === G._id),
					B = he && he.quantity ? he.quantity : 0;
				if (d > G.quantity - B) {
					Re(K);
					return;
				}
				if (d > 0) {
					const re = { ...oe, quantity: d, selectedVariant: G };
					let le = localStorage.getItem('persist:root');
					(le = le ? JSON.parse(le) : []), Array.isArray(le) || (le = []);
					const Te = le.find((Xs) => Xs._id === re._id);
					Te ? (Te.quantity += re.quantity) : le.push(re);
					const _e = document.querySelector('label.selectedColor'),
						ss =
							(ee =
								document == null
									? void 0
									: document.getElementById(
											_e == null ? void 0 : _e.getAttribute('for'),
									  )) == null
								? void 0
								: ee.value,
						ke = document.querySelector('.FilterSizeCatog2'),
						hs = ke.options[ke.length - 1].getAttribute('selected');
					if (!ss) {
						w(
							'Error',
							g === 'en' ? 'Please select a color' : 'يرجى تحديد لون',
							'error',
						);
						return;
					}
					if (!V && !hs) {
						w(
							'Error',
							g === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
							'error',
						);
						return;
					}
					const $e = ke.options[ke.length - 1];
					if (!parseInt($e.getAttribute('quantity'))) {
						w(
							'Error',
							g === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
							'error',
						);
						return;
					}
					N(ms(re)),
						$e.setAttribute('quantity', G.quantity - d),
						Se(G.quantity - d),
						v(1),
						ve(
							g === 'en'
								? 'Product added to cart!'
								: 'تمت اضافة المنتج الى السلة',
						),
						$e.getAttribute('quantity') === '0' && Re(K);
				} else
					fe(
						g === 'en'
							? 'Try with a different amount!'
							: 'يرجى تحديد مبلغ مختلف',
					);
			};
		n.useEffect(() => {
			(async () => {
				try {
					const m = await Ee.get('http://194.195.86.67:4000/api/products'),
						y = Date.parse(new Date()),
						S = m.data
							.filter((P) => {
								const I = Date.parse(P.discount.startDate),
									U = Date.parse(P.discount.endDate);
								return P.discount && I <= y && U >= y;
							})
							.slice(0, 4);
					a(S);
				} catch (m) {
					console.error('Error fetching data:', m);
				}
			})();
		}, []);
		const Ce = n.useRef(!0),
			[ie, Ue] = n.useState([]);
		let Z = localStorage.getItem('persist:root');
		if (
			(n.useEffect(async () => {
				var l;
				if (JSON.parse(Z).user)
					try {
						(Z = JSON.parse(Z)),
							(Z = Z == null ? void 0 : Z.user),
							(Z = JSON.parse(Z)),
							(Z =
								(l = Z == null ? void 0 : Z.currentUser) == null
									? void 0
									: l._id),
							Z !== void 0 && c(!0);
						const m = await ds(Z);
						Ce.current && Ue([...m]);
					} catch (m) {
						console.error(m);
					}
				return () => {
					Ce.current = !1;
				};
			}, [Z]),
			!Ce.current)
		)
			return null;
		const Pe = async (l, m, y) => {
			if (!o) {
				await w({
					title: g === 'en' ? 'You have to login !' : 'يجب تسجيل الدخول',
					icon: 'warning',
				}),
					(window.location.href = '/login');
				return;
			}
			let S = y.target;
			S.tagName === 'path' && (S = S.parentNode);
			const P = S.classList[0];
			try {
				await ls(l, Z),
					m === 'remove'
						? (P === 'add-to-wish2' &&
								((S.style.display = 'none'),
								(S.previousSibling.style.display = 'block')),
						  w(
								'Success',
								g === 'en'
									? 'Product removed from wishlist!'
									: 'تمت ازالة المنتج من قائمة الرغبات',
								'success',
						  ))
						: m === 'addCatog' &&
						  (P === 'add-to-wish' &&
								((S.style.display = 'none'),
								(S.nextSibling.children[0].style.display = 'block'),
								(S.nextSibling.style.display = 'block')),
						  w(
								'Success',
								g === 'en'
									? 'Product added to wishlist!'
									: 'تمت اضافة المنتج الى قائمة الرغبات',
								'success',
						  ));
			} catch {
				w(
					'Error',
					g === 'en' ? 'Something went wrong!' : 'حدث خطأ',
					'error',
				);
			}
		};
		function u(l) {
			return new Intl.NumberFormat('ar-EG').format(l);
		}
		const j = {
			dots: !0,
			nextArrow: e.jsx(Tn, {}),
			prevArrow: e.jsx(zn, {}),
			infinite: !0,
			speed: 500,
			slidesToShow: i.length >= 2 ? 2 : 1,
			slidesToScroll: 1,
			rtl: g === 'ar',
			autoplay: !1,
			autoplaySpeed: 4e3,
			pauseOnHover: !0,
			pauseOnFocus: !0,
			pauseOnDotsHover: !0,
			initialSlide: 0,
			responsive: [
				{
					breakpoint: 1400,
					settings: { slidesToShow: 1, slidesToScroll: 1 },
				},
			],
		};
		return e.jsxs(e.Fragment, {
			children: [
				e.jsx('div', { className: 'backLayerForShowCart2' }),
				e.jsx('div', {
					className: 'column small-centered',
					children: e.jsx('div', {
						className: 'productCard_block2 CatogCard2',
						children: e.jsxs('div', {
							className: 'row11',
							children: [
								e.jsx('div', {
									className: 'small-12 large-6 columns11',
									children: e.jsx('div', {
										className: 'productCard_leftSide clearfix',
										children: e.jsx(Ks, {}),
									}),
								}),
								e.jsxs('div', {
									className: 'small-12 large-6 columns11',
									children: [
										e.jsx('div', {
											className: 'AiFillCloseCircle CloseCatogCard',
											children: e.jsx(Fs, {}),
										}),
										e.jsxs('div', {
											className: 'productCard_rightSide',
											children: [
												e.jsx('div', {
													className: 'block_specification',
													children: e.jsx('div', {
														className:
															'block_specification__specificationShow',
														children: e.jsx('i', {
															className:
																'fa fa-cog block_specification__button block_specification__button__rotate',
															'aria-hidden': 'true',
														}),
													}),
												}),
												e.jsxs('div', {
													className: 'block_product',
													children: [
														e.jsx('h2', {
															className:
																'block_name block_name__mainName nameProducts2',
														}),
														e.jsx('p', {
															className:
																'block_product__advantagesProduct CatogCardDesc2',
														}),
														e.jsx('div', {
															className:
																'block_informationAboutDevice',
															children: e.jsxs('div', {
																className: 'row11 ',
																children: [
																	e.jsxs('div', {
																		className:
																			'large-6 small-12 column left-align',
																		children: [
																			e.jsxs('div', {
																				className:
																					'block_price',
																				children: [
																					e.jsxs('p', {
																						className:
																							'block_price__currency currency',
																						children: [
																							'$ ',
																							f == null
																								? void 0
																								: f.price,
																						],
																					}),
																					e.jsx('p', {
																						className:
																							'block_price__shipping',
																						children:
																							g === 'en'
																								? 'Shipping and taxes extra'
																								: 'الشحن والضريبة',
																					}),
																				],
																			}),
																			e.jsxs('div', {
																				className:
																					'block_quantity clearfix',
																				children: [
																					e.jsx('span', {
																						className:
																							'text_specification',
																						children:
																							g === 'en'
																								? 'Quantity'
																								: 'الكمية:',
																					}),
																					e.jsxs(
																						'div',
																						{
																							className:
																								'block_quantity__chooseBlock',
																							children: [
																								e.jsx(
																									'input',
																									{
																										className:
																											'block_quantity__number block_quantity__number2',
																										name: 'quantityNumber',
																										type: 'text',
																										min: '1',
																										value: d,
																										readOnly:
																											!0,
																									},
																								),
																								e.jsx(
																									'button',
																									{
																										className:
																											'block_quantity__button block_quantity__up',
																										children:
																											e.jsx(
																												$s,
																												{
																													onClick:
																														() => {
																															Qe();
																														},
																													className:
																														'AiOutlineArrowUpanddown down5',
																												},
																											),
																									},
																								),
																								e.jsx(
																									'button',
																									{
																										className:
																											'block_quantity__button block_quantity__down',
																										children:
																											e.jsx(
																												Ds,
																												{
																													onClick:
																														() => {
																															We();
																														},
																													className:
																														'AiOutlineArrowUpanddown up5',
																												},
																											),
																									},
																								),
																							],
																						},
																						C,
																					),
																				],
																			}),
																		],
																	}),
																	e.jsxs('div', {
																		className:
																			'large-6 small-12 column end',
																		children: [
																			e.jsxs('div', {
																				className:
																					'block_goodColor',
																				children: [
																					e.jsx('span', {
																						className:
																							'text_specification',
																						children:
																							g === 'en'
																								? 'Choose your colors:'
																								: 'اختر الالوان:',
																					}),
																					e.jsx('div', {
																						className:
																							'zaid',
																						style: {
																							display:
																								'hidden',
																						},
																					}),
																					e.jsx('div', {
																						className:
																							'block_goodColor__allColors CatogallColors',
																					}),
																					e.jsx(Rn, {
																						className:
																							'FilterSizeCatog2',
																						onChange: (
																							l,
																						) =>
																							E(
																								l.target
																									.value,
																							),
																					}),
																				],
																			}),
																			ae
																				? ye
																					? e.jsx(
																							'button',
																							{
																								className:
																									'AddCart2',
																								product_id2:
																									h,
																								onClick:
																									(
																										l,
																									) => {
																										es(
																											l,
																										);
																									},
																								children:
																									g ===
																									'en'
																										? 'Add to cart'
																										: 'اضف الى السلة',
																							},
																					  )
																					: e.jsx(
																							'button',
																							{
																								className:
																									'AddCart2',
																								disabled:
																									!0,
																								children:
																									g ===
																									'en'
																										? 'Out of stock'
																										: 'غير متوفر',
																							},
																					  )
																				: e.jsx('p', {
																						children:
																							g === 'en'
																								? 'Loading'
																								: 'جاري التحميل',
																				  }),
																		],
																	}),
																],
															}),
														}),
													],
												}),
											],
										}),
									],
								}),
							],
						}),
					}),
				}),
				e.jsx('div', {
					className:
						'group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC',
					id: 'style-sCNUC',
					children: e.jsx('div', {
						children: e.jsxs('div', {
							className: 'block block-list-products',
							children: [
								e.jsx('div', {
									className: 'block-title',
									children: e.jsx('strong', {
										children:
											g === 'ar' ? 'عروض خاصة' : 'Special Offers',
									}),
								}),
								e.jsx('div', {
									className: 'block-content',
									children: e.jsxs('div', {
										id: 'filterproducts_1',
										className: `product-deal-list ${
											g === 'ar' ? 'product-deal-list-ar' : ''
										}`,
										children: [
											e.jsx(M, {
												to: '/offer/new-offers',
												children: e.jsxs('div', {
													className: 'deal-left',
													children: [
														e.jsx('div', {
															className: 'deal-description',
															children: e.jsxs('div', {
																children: [
																	g === 'ar'
																		? 'عرض خاص'
																		: 'Special Offer!',
																	e.jsx('br', {}),
																	g === 'ar'
																		? ' أعلى من'
																		: 'up to',
																	e.jsx('span', {
																		id: 'style-Leion',
																		className: 'style-Leion',
																		children:
																			g === 'en'
																				? ' 50%'
																				: `${u(50)}%`,
																	}),
																	g === 'ar' ? ' خصم' : ' off',
																],
															}),
														}),
														e.jsx('div', {
															className: 'timer-content',
															children: e.jsx('div', {
																className: 'timer-title',
																children:
																	g === 'ar'
																		? ' أسرع - بسرعة! انقر هنا لإظهار كافة العروض'
																		: 'Hurry Up! Click here to show All Offer',
															}),
														}),
													],
												}),
											}),
											e.jsxs('div', {
												className:
													g === 'ar'
														? 'deal-contentAr'
														: 'deal-content',
												children: [
													e.jsx('div', {
														className:
															'owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag',
														children: e.jsx('div', {
															className: 'owl-stage-outer',
															children: e.jsx(Ws, {
																...j,
																children: i.map((l) =>
																	e.jsx('div', {
																		className:
																			'owl-item active style-Ke3kW',
																		id: 'style-Ke3kW',
																		children: e.jsx('div', {
																			className:
																				'item product product-item',
																			children: e.jsxs(
																				'div',
																				{
																					className: `product-item-info ${
																						g === 'ar'
																							? 'product-item-info-ar'
																							: ''
																					} `,
																					'data-container':
																						'product-grid',
																					children: [
																						e.jsx(M, {
																							to: `/product/${l._id}`,
																							className: `action quickview-handler\r
																	sm_quickview_handler`,
																							title: 'Quick View',
																							href: '',
																							children:
																								e.jsxs(
																									'div',
																									{
																										className:
																											'image-product',
																										children:
																											[
																												e.jsx(
																													'div',
																													{
																														className:
																															'product photo product-item-photo',
																														children:
																															e.jsx(
																																'span',
																																{
																																	className:
																																		'product-image-container product-image-container-13 style-j6oeg',
																																	id: 'style-j6oeg',
																																	children:
																																		e.jsx(
																																			'span',
																																			{
																																				className:
																																					'product-image-wrapper style-gKGpW',
																																				id: 'style-gKGpW',
																																				children:
																																					e.jsx(
																																						'img',
																																						{
																																							className:
																																								'product-image-photo',
																																							src: l
																																								.variants[0]
																																								.img,
																																							'data-src':
																																								'http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /',
																																							loading:
																																								'lazy',
																																							width: '250',
																																							height:
																																								'250',
																																							alt: l.title,
																																						},
																																					),
																																			},
																																		),
																																},
																															),
																													},
																												),
																												e.jsxs(
																													M,
																													{
																														to: '',
																														className:
																															'action quickview-handler sm_quickview_handler show-cart3',
																														title: 'Quick View',
																														'catog-id':
																															l._id,
																														children:
																															[
																																e.jsx(
																																	Vs,
																																	{},
																																),
																																e.jsx(
																																	'span',
																																	{
																																		children:
																																			g ===
																																			'en'
																																				? 'Quick View'
																																				: 'مشاهدة سريعة',
																																	},
																																),
																															],
																													},
																												),
																											],
																									},
																								),
																						}),
																						e.jsxs(
																							'div',
																							{
																								className:
																									'product details product-item-details',
																								children:
																									[
																										e.jsx(
																											'strong',
																											{
																												className:
																													'product name product-item-name',
																												children:
																													e.jsx(
																														'div',
																														{
																															className:
																																'product-item-link',
																															children:
																																g ===
																																'ar'
																																	? l.title_ar
																																	: l.title,
																														},
																													),
																											},
																										),
																										e.jsx(
																											'div',
																											{
																												className:
																													'price-box price-final_price',
																												'data-role':
																													'priceBox',
																												'data-product-id':
																													'13',
																												'data-price-box':
																													'product-id-13',
																												children:
																													e.jsx(
																														'span',
																														{
																															className:
																																'price-container price-final_price tax weee',
																															children:
																																e.jsxs(
																																	'span',
																																	{
																																		id: 'product-price-13',
																																		'data-price-amount':
																																			'250',
																																		'data-price-type':
																																			'finalPrice',
																																		className:
																																			'price-wrapper ',
																																		children:
																																			[
																																				e.jsxs(
																																					'span',
																																					{
																																						className:
																																							'price55',
																																						children:
																																							[
																																								'$ ',
																																								l.price,
																																							],
																																					},
																																				),
																																				e.jsxs(
																																					'span',
																																					{
																																						className:
																																							'priceOffer',
																																						children:
																																							[
																																								'$',
																																								' ',
																																								l
																																									.discount
																																									.discount,
																																							],
																																					},
																																				),
																																			],
																																	},
																																),
																														},
																													),
																											},
																										),
																										e.jsx(
																											'div',
																											{
																												className:
																													'time-countdown-slide',
																												children:
																													e.jsxs(
																														'div',
																														{
																															className:
																																'time-wrapper',
																															children:
																																[
																																	e.jsxs(
																																		'div',
																																		{
																																			className:
																																				'time-label clearfix',
																																			children:
																																				[
																																					e.jsxs(
																																						'div',
																																						{
																																							className:
																																								'stock-qty',
																																							children:
																																								[
																																									g ===
																																									'ar'
																																										? 'التوفر:'
																																										: 'Availability:',
																																									e.jsx(
																																										'span',
																																										{
																																											children:
																																												'150',
																																										},
																																									),
																																								],
																																						},
																																					),
																																					e.jsxs(
																																						'div',
																																						{
																																							className:
																																								g ===
																																								'ar'
																																									? 'time-leftAr'
																																									: 'time-left',
																																							children:
																																								[
																																									g ===
																																									'ar'
																																										? 'الوقت المتبقي'
																																										: 'Time left: ',
																																									e.jsx(
																																										'span',
																																										{
																																											style: {
																																												color: '#ff4444',
																																											},
																																											children:
																																												rs(
																																													l
																																														.discount
																																														.endDate,
																																												).fromNow(),
																																										},
																																									),
																																								],
																																						},
																																					),
																																				],
																																		},
																																	),
																																	e.jsx(
																																		'div',
																																		{
																																			className:
																																				'time-ranger',
																																			children:
																																				e.jsx(
																																					'div',
																																					{
																																						className:
																																							'time-pass style-Tx4nd',
																																						id: 'style-Tx4nd',
																																					},
																																				),
																																		},
																																	),
																																],
																														},
																													),
																											},
																										),
																										e.jsxs(
																											'div',
																											{
																												className:
																													'product-item-actions',
																												children:
																													[
																														e.jsx(
																															'div',
																															{
																																className:
																																	'actions-primary',
																																children:
																																	e.jsx(
																																		M,
																																		{
																																			to: `/product/${l._id}`,
																																			children:
																																				e.jsx(
																																					'button',
																																					{
																																						className:
																																							'action tocart primary',
																																						'data-post':
																																							'{"action":"http:\\/\\/magento2.magentech.com\\/themes\\/sm_venuse\\/pub\\/french\\/checkout\\/cart\\/add\\/uenc\\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\\/product\\/13\\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}',
																																						type: 'button',
																																						title: 'Add to Cart',
																																						children:
																																							e.jsx(
																																								'span',
																																								{
																																									children:
																																										g ===
																																										'ar'
																																											? 'اضف الى السلة'
																																											: 'Add to Cart',
																																								},
																																							),
																																					},
																																				),
																																		},
																																	),
																															},
																														),
																														e.jsxs(
																															'div',
																															{
																																className:
																																	'actions-secondary',
																																'data-role':
																																	'add-to-links',
																																children:
																																	[
																																		e.jsxs(
																																			'div',
																																			{
																																				className:
																																					'action towishlist',
																																				children:
																																					[
																																						ie.includes(
																																							l._id,
																																						)
																																							? e.jsxs(
																																									e.Fragment,
																																									{
																																										children:
																																											[
																																												e.jsx(
																																													ze,
																																													{
																																														className:
																																															'add-to-wish list-wish',
																																														onClick:
																																															(
																																																m,
																																															) => {
																																																Pe(
																																																	l._id,
																																																	'addCatog',
																																																	m,
																																																);
																																															},
																																														style: {
																																															display:
																																																'none',
																																														},
																																													},
																																												),
																																												e.jsx(
																																													'svg',
																																													{
																																														className:
																																															'add-to-wish2 list-wish bi bi-heart-fill',
																																														xmlns: 'http://www.w3.org/2000/svg',
																																														width: '16',
																																														height:
																																															'16',
																																														fill: 'currentColor',
																																														viewBox:
																																															'0 0 16 16',
																																														children:
																																															e.jsx(
																																																'path',
																																																{
																																																	className:
																																																		'add-to-wish2',
																																																	'fill-rule':
																																																		'evenodd',
																																																	d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																																																	onClick:
																																																		(
																																																			m,
																																																		) => {
																																																			Pe(
																																																				l._id,
																																																				'remove',
																																																				m,
																																																			);
																																																		},
																																																},
																																															),
																																													},
																																												),
																																											],
																																									},
																																							  )
																																							: e.jsxs(
																																									e.Fragment,
																																									{
																																										children:
																																											[
																																												e.jsx(
																																													ze,
																																													{
																																														className:
																																															'add-to-wish list-wish',
																																														onClick:
																																															(
																																																m,
																																															) => {
																																																Pe(
																																																	l._id,
																																																	'addCatog',
																																																	m,
																																																);
																																															},
																																													},
																																												),
																																												e.jsx(
																																													'svg',
																																													{
																																														className:
																																															'add-to-wish2 list-wish bi bi-heart-fill',
																																														xmlns: 'http://www.w3.org/2000/svg',
																																														width: '16',
																																														height:
																																															'16',
																																														fill: 'currentColor',
																																														viewBox:
																																															'0 0 16 16',
																																														children:
																																															e.jsx(
																																																'path',
																																																{
																																																	className:
																																																		'add-to-wish2',
																																																	'fill-rule':
																																																		'evenodd',
																																																	d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																																																	onClick:
																																																		(
																																																			m,
																																																		) => {
																																																			Pe(
																																																				l._id,
																																																				'remove',
																																																				m,
																																																			);
																																																		},
																																																	style: {
																																																		display:
																																																			'none',
																																																	},
																																																},
																																															),
																																													},
																																												),
																																											],
																																									},
																																							  ),
																																						e.jsx(
																																							'span',
																																							{
																																								children:
																																									g ===
																																									'ar'
																																										? 'اضف الى المفضلة'
																																										: 'Add to Wishlist',
																																							},
																																						),
																																					],
																																			},
																																		),
																																		e.jsxs(
																																			'div',
																																			{
																																				className:
																																					'action tocompare',
																																				title: 'Add to Compare',
																																				children:
																																					[
																																						e.jsx(
																																							Bs,
																																							{},
																																						),
																																						e.jsx(
																																							'span',
																																							{
																																								children:
																																									g ===
																																									'ar'
																																										? 'اضف للمقارنة'
																																										: 'Add to Compare',
																																							},
																																						),
																																					],
																																			},
																																		),
																																	],
																															},
																														),
																													],
																											},
																										),
																									],
																							},
																						),
																					],
																				},
																			),
																		}),
																	}),
																),
															}),
														}),
													}),
													e.jsx('div', {
														className: 'loading-content',
														children: e.jsx('span', {
															className: 'hidden',
															children:
																g === 'ar'
																	? 'تحميل...'
																	: 'Loading...',
														}),
													}),
												],
											}),
										],
									}),
								}),
							],
						}),
					}),
				}),
			],
		});
	},
	$n = () =>
		e.jsx('img', {
			class: 'cutter',
			src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-5.jpg',
			'data-src':
				'http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-5.jpg',
			alt: 'Banner Image',
			width: '1650',
			height: '165',
		}),
	Dn = r.div`
	width: 100%;
	height: 90vh;
`,
	Vn = r.div`
	height: 100vh;
	display: flex;
	width: 100%;
`,
	Bn = r.div`
	display: flex;
`,
	Wn = r.div`
	height: 100%;
	flex: 1;
	${R({ display: 'none' })}
`,
	Mn = r.img`
	height: 80%;
	width: 100%;
	background-size: cover;
`,
	Un = r.div`
	flex: 1;
	padding: 50px;
	backgroundcolor: #1d1308;
	margin-top: 200px;
`,
	Gn = r.h1`
	font-size: 70px;
`,
	Hn = r.p`
	margin: 50px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`,
	Jn = r.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	cursor: pointer;
`,
	Yn = () => {
		const { language: t } = n.useContext(se),
			i = t === 'ar',
			a = t === 'ar' ? _n : Sn,
			o = {
				infinite: !0,
				speed: 500,
				slidesToScroll: 1,
				rtl: t === 'ar',
				autoplay: !0,
				autoplaySpeed: 4e3,
				arrows: !1,
				pauseOnHover: !1,
				pauseOnFocus: !1,
				initialSlide: 0,
				responsive: [
					{
						breakpoint: 1400,
						settings: { slidesToShow: 1, slidesToScroll: 1 },
					},
				],
			};
		return e.jsx(Dn, {
			children: e.jsx('div', {
				children: e.jsx(Ws, {
					...o,
					children: a.map((c) =>
						e.jsx(
							Bn,
							{
								bg: c.bg,
								children: e.jsxs(Vn, {
									children: [
										e.jsx(Wn, {
											className: 'slideImag',
											children: e.jsx(Mn, { src: c.img }),
										}),
										e.jsxs(Un, {
											children: [
												e.jsx(Gn, { children: c.title }),
												e.jsx(Hn, { children: c.desc }),
												e.jsx(Jn, {
													children: i ? 'مشاهدة' : 'Watch Now',
												}),
											],
										}),
									],
								}),
							},
							c.id,
						),
					),
				}),
			}),
		});
	},
	Kn = () => {
		const { dictionary: t, language: i } = n.useContext(se);
		return e.jsxs('div', {
			className: 'text-branner snipcss-gfhgY style-E5bOJ',
			id: 'style-E5bOJ',
			children: [
				e.jsx('div', {
					className: 'hot-item',
					children: t.Welcom['Welcome to Venus Store'],
				}),
				e.jsxs('div', {
					className: 'text-offer',
					children: [
						t.Welcom['Wrap new offers'],
						e.jsxs('span', {
							className: `coupon-code ${i === 'ar' ? '' : 'ltr'}`,
							children: [
								t.Welcom['New Coupon code'],
								' ',
								e.jsx('strong', { children: 'T0mly81x9z0334c1' }),
							],
						}),
						e.jsx('div', {
							className: 'explorer',
							children: t.Welcom['Explorer Now'],
						}),
					],
				}),
			],
		});
	},
	Qn = () => {
		const { dictionary: t, language: i } = n.useContext(se),
			a = (o) => {
				const c = new Date(o);
				return i === 'ar'
					? c.toLocaleDateString('ar-SA', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
					  })
					: c.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
					  });
			};
		return e.jsxs(e.Fragment, {
			children: [
				e.jsx('div', {
					class: 'blog_title',
					children: e.jsx('h2', { children: t.blog['Latest Blogs'] }),
				}),
				e.jsx('div', {
					class: 'block block-slider-post snipcss-Pb3fd',
					children: e.jsxs('div', {
						class: 'block-content',
						children: [
							e.jsxs('div', {
								class: 'owl-carousel owl-theme owl-loaded owl-drag',
								children: [
									e.jsx('div', {
										class: 'owl-stage-outer',
										children: e.jsxs('div', {
											class: 'owl-stage style-MG8jI',
											id: 'style-MG8jI',
											children: [
												e.jsx('div', {
													class: 'owl-item active style-3lVoL',
													id: 'style-3lVoL',
													children: e.jsxs('div', {
														class: 'item',
														children: [
															e.jsx('div', {
																class: 'image-post',
																children: e.jsx('a', {
																	href: '',
																	title: 'Join millions of others',
																	children: e.jsx('img', {
																		class: '',
																		src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg',
																		'data-src':
																			'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg',
																		width: '1',
																		height: '1',
																		alt: 'Join millions of others',
																	}),
																}),
															}),
															e.jsxs('div', {
																class: 'info-post',
																children: [
																	e.jsxs('div', {
																		class: 'post-date',
																		children: [
																			e.jsx('span', {
																				class: 'label',
																				children:
																					t.blog.Posted,
																			}),
																			e.jsx('span', {
																				class: 'value',
																				children:
																					a(
																						'June 17, 2019',
																					),
																			}),
																		],
																	}),
																	e.jsx('div', {
																		class: 'post-title',
																		children: e.jsx('div', {
																			class: 'post-item-link',
																			children:
																				t.blog.title1,
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-short-description',
																		children: e.jsx('p', {
																			children:
																				t.blog[
																					'post-short-description1'
																				],
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-read-more',
																		children: e.jsx('a', {
																			href: '',
																			title: 'Join millions of others',
																			children:
																				t.blog['Read more'],
																		}),
																	}),
																],
															}),
														],
													}),
												}),
												e.jsx('div', {
													class: 'owl-item active style-7pgTY',
													id: 'style-7pgTY',
													children: e.jsxs('div', {
														class: 'item',
														children: [
															e.jsx('div', {
																class: 'image-post',
																children: e.jsx('a', {
																	href: '',
																	title: 'Choose the perfect design',
																	children: e.jsx('img', {
																		class: '',
																		src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg',
																		'data-src':
																			'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg',
																		width: '1',
																		height: '1',
																		alt: 'Choose the perfect design',
																	}),
																}),
															}),
															e.jsxs('div', {
																class: 'info-post',
																children: [
																	e.jsxs('div', {
																		class: 'post-date',
																		children: [
																			e.jsx('span', {
																				class: 'label',
																				children:
																					t.blog.Posted,
																			}),
																			e.jsx('span', {
																				class: 'value',
																				children:
																					a(
																						'June 17, 2019',
																					),
																			}),
																		],
																	}),
																	e.jsx('div', {
																		class: 'post-title',
																		children: e.jsx('div', {
																			class: 'post-item-link',
																			children:
																				t.blog.title2,
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-short-description',
																		children: e.jsx('p', {
																			children:
																				t.blog[
																					'post-short-description2'
																				],
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-read-more',
																		children: e.jsx('a', {
																			href: '',
																			title: 'Choose the perfect design',
																			children:
																				t.blog['Read more'],
																		}),
																	}),
																],
															}),
														],
													}),
												}),
												e.jsx('div', {
													class: 'owl-item style-Tg8VU',
													id: 'style-Tg8VU',
													children: e.jsxs('div', {
														class: 'item',
														children: [
															e.jsx('div', {
																class: 'image-post',
																children: e.jsx('a', {
																	href: '',
																	title: 'What are some good electronic',
																	children: e.jsx('img', {
																		class: '',
																		src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg',
																		'data-src':
																			'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg',
																		width: '1',
																		height: '1',
																		alt: 'What are some good electronic',
																	}),
																}),
															}),
															e.jsxs('div', {
																class: 'info-post',
																children: [
																	e.jsxs('div', {
																		class: 'post-date',
																		children: [
																			e.jsx('span', {
																				class: 'label',
																				children:
																					t.blog.Posted,
																			}),
																			e.jsx('span', {
																				class: 'value',
																				children:
																					a(
																						'May 16, 2019',
																					),
																			}),
																		],
																	}),
																	e.jsx('div', {
																		class: 'post-title',
																		children: e.jsx('div', {
																			class: 'post-item-link',
																			children:
																				t.blog.title3,
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-short-description',
																		children: e.jsx('p', {
																			children:
																				t.blog[
																					'post-short-description3'
																				],
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-read-more',
																		children: e.jsx('a', {
																			href: '',
																			title: 'What are some good electronic',
																			children:
																				t.blog['Read more'],
																		}),
																	}),
																],
															}),
														],
													}),
												}),
												e.jsx('div', {
													class: 'owl-item style-PoS2p',
													id: 'style-PoS2p',
													children: e.jsxs('div', {
														class: 'item',
														children: [
															e.jsx('div', {
																class: 'image-post',
																children: e.jsx('a', {
																	href: '',
																	title: 'Standard Blog Post Examples',
																	children: e.jsx('img', {
																		class: '',
																		src: 'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg',
																		'data-src':
																			'http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg',
																		width: '1',
																		height: '1',
																		alt: 'Standard Blog Post Examples',
																	}),
																}),
															}),
															e.jsxs('div', {
																class: 'info-post',
																children: [
																	e.jsxs('div', {
																		class: 'post-date',
																		children: [
																			e.jsx('span', {
																				class: 'label',
																				children:
																					t.blog.Posted,
																			}),
																			e.jsx('span', {
																				class: 'value',
																				children:
																					a(
																						'May 16, 2019',
																					),
																			}),
																		],
																	}),
																	e.jsx('div', {
																		class: 'post-title',
																		children: e.jsx('div', {
																			class: 'post-item-link',
																			children:
																				t.blog.title4,
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-short-description',
																		children: e.jsx('p', {
																			children:
																				t.blog[
																					'post-short-description4'
																				],
																		}),
																	}),
																	e.jsx('div', {
																		class: 'post-read-more',
																		children: e.jsx('a', {
																			href: '',
																			title: 'Standard Blog Post Examples',
																			children:
																				t.blog['Read more'],
																		}),
																	}),
																],
															}),
														],
													}),
												}),
											],
										}),
									}),
									e.jsxs('div', {
										class: 'owl-nav',
										children: [
											e.jsx('div', {
												role: 'presentation',
												class: 'owl-prev disabled',
												children: e.jsx('span', {
													'aria-label': 'Previous',
													children: '‹',
												}),
											}),
											e.jsx('div', {
												role: 'presentation',
												class: 'owl-next',
												children: e.jsx('span', {
													'aria-label': 'Next',
													children: '›',
												}),
											}),
										],
									}),
									e.jsx('div', { class: 'owl-dots disabled' }),
								],
							}),
							e.jsx('div', {
								class: 'loading-content',
								children: e.jsx('span', {
									class: 'hidden',
									children: 'Loading...',
								}),
							}),
						],
					}),
				}),
			],
		});
	},
	Zn = () =>
		e.jsxs('div', {
			children: [
				e.jsx(Oe, {}),
				e.jsx(Le, {}),
				e.jsx(qe, {}),
				e.jsx(qn, {}),
				e.jsx(In, {}),
				e.jsx(Yn, {}),
				e.jsx(Fn, {}),
				e.jsx(Kn, {}),
				e.jsx(Pn, {}),
				e.jsx($n, {}),
				e.jsx(Qn, {}),
				e.jsx(Ie, {}),
			],
		}),
	Qs = r.div`
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
`,
	Xn = r.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
	&:hover ${Qs} {
		opacity: 1;
	}
`,
	ea = r.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`,
	sa = r.img`
	height: 75%;
	z-index: 2;
`,
	Ns = r.div`
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
`,
	cs = ({ item: t }) => {
		const [i, a] = n.useState(!1),
			o = async (v, k, E) => {
				if (!i) {
					await w({
						title: 'You have to login !',
						icon: 'warning',
						buttons: !0,
						confirmButtonColor: '#42a5f5',
						confirmButtonText: 'Login',
						showCancelButton: !0,
						closeOnConfirm: !1,
					}),
						(window.location.href = '/login');
					return;
				}
				let A = E.target;
				A.tagName === 'path' && (A = A.parentNode);
				const T = A.classList[0];
				try {
					await ls(v, d),
						k === 'remove'
							? (T === 'add-to-wish2' &&
									((A.style.display = 'none'),
									(A.previousSibling.style.display = 'block')),
							  w(
									'Success',
									'Product removed from wishlist!',
									'success',
							  ))
							: k === 'addCatog' &&
							  (T === 'add-to-wish' &&
									((A.style.display = 'none'),
									(A.nextSibling.children[0].style.display = 'block'),
									(A.nextSibling.style.display = 'block')),
							  w('Success', 'Product added to wishlist!', 'success'));
				} catch {
					w('Error', 'Something went wrong', 'error');
				}
			},
			c = n.useRef(!0),
			[h, p] = n.useState([]);
		let d = localStorage.getItem('persist:root');
		return (
			n.useEffect(async () => {
				var v;
				if (JSON.parse(d).user)
					try {
						(d = JSON.parse(d)),
							(d = d == null ? void 0 : d.user),
							(d = JSON.parse(d)),
							(d =
								(v = d == null ? void 0 : d.currentUser) == null
									? void 0
									: v._id),
							d !== void 0 && a(!0);
						const k = await ds(d);
						c.current && p([...k]);
					} catch (k) {
						console.error(k);
					}
				return () => {
					c.current = !1;
				};
			}, [d]),
			c.current
				? e.jsxs(Xn, {
						children: [
							e.jsx(ea, {}),
							e.jsx(sa, { src: t.variants[0].img[0] }),
							e.jsxs(Qs, {
								children: [
									e.jsx(Ns, {
										children: e.jsx(M, {
											to: `/product/${t._id}`,
											children: e.jsx(Pt, {}),
										}),
									}),
									e.jsx(Ns, {
										children: e.jsx('div', {
											className: 'action towishlist1',
											children: h.includes(t._id)
												? e.jsxs(e.Fragment, {
														children: [
															e.jsx(ze, {
																className:
																	'add-to-wish list-wish',
																onClick: (v) => {
																	o(t._id, 'addCatog', v);
																},
																style: { display: 'none' },
															}),
															e.jsx('svg', {
																className:
																	'add-to-wish2 list-wish bi bi-heart-fill',
																xmlns: 'http://www.w3.org/2000/svg',
																width: '16',
																height: '16',
																fill: 'currentColor',
																viewBox: '0 0 16 16',
																children: e.jsx('path', {
																	className: 'add-to-wish2',
																	'fill-rule': 'evenodd',
																	d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																	onClick: (v) => {
																		o(t._id, 'remove', v);
																	},
																}),
															}),
														],
												  })
												: e.jsxs(e.Fragment, {
														children: [
															e.jsx(ze, {
																className:
																	'add-to-wish list-wish',
																onClick: (v) => {
																	o(t._id, 'addCatog', v);
																},
															}),
															e.jsx('svg', {
																className:
																	'add-to-wish2 list-wish bi bi-heart-fill',
																xmlns: 'http://www.w3.org/2000/svg',
																width: '16',
																height: '16',
																fill: 'currentColor',
																viewBox: '0 0 16 16',
																style: { display: 'none' },
																children: e.jsx('path', {
																	className: 'add-to-wish2',
																	'fill-rule': 'evenodd',
																	d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
																	onClick: (v) => {
																		o(t._id, 'remove', v);
																	},
																}),
															}),
														],
												  }),
										}),
									}),
								],
							}),
						],
				  })
				: null
		);
	},
	ta = r.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`,
	ia = ({ cat: t, filters: i, sort: a }) => {
		const [o, c] = n.useState([]),
			[h, p] = n.useState([]);
		return (
			n.useEffect(() => {
				(async () => {
					try {
						const v = await Ee.get(
							t
								? `http://194.195.86.67:4000/api/products?category=${t}`
								: 'http://194.195.86.67:4000/api/products',
						);
						c(v.data);
					} catch {}
				})();
			}, [t]),
			n.useEffect(() => {
				t &&
					p(
						o.filter((d) =>
							Object.entries(i).every(([v, k]) => d[v].includes(k)),
						),
					);
			}, [o, t, i]),
			n.useEffect(() => {
				p(
					a === 'newest'
						? (d) => [...d].sort((v, k) => v.createdAt - k.createdAt)
						: a === 'asc'
						? (d) => [...d].sort((v, k) => v.price - k.price)
						: (d) => [...d].sort((v, k) => k.price - v.price),
				);
			}, [a]),
			e.jsx(ta, {
				children: t
					? h.map((d) => e.jsx(cs, { item: d }, d.id))
					: o.map((d) => e.jsx(cs, { item: d }, d.id)),
			})
		);
	},
	na = r.div``,
	aa = r.h1`
	margin: 20px;
`,
	ra = r.div`
	display: flex;
	justify-content: space-between;
`,
	Cs = r.div`
	margin: 20px;
	${R({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`,
	ks = r.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${R({ marginRight: '0px' })}
`,
	ns = r.select`
	padding: 10px;
	margin-right: 20px;
	${R({ margin: '10px 0px' })}
`,
	me = r.option``,
	ca = () => {
		const i = os().pathname.split('/')[2],
			[a, o] = n.useState({}),
			[c, h] = n.useState('newest'),
			p = (d) => {
				const v = d.target.value;
				o({ ...a, [d.target.name]: v });
			};
		return e.jsxs(na, {
			children: [
				e.jsx(Oe, {}),
				e.jsx(Le, {}),
				e.jsx(qe, {}),
				e.jsx(aa, { children: i }),
				e.jsxs(ra, {
					children: [
						e.jsxs(Cs, {
							children: [
								e.jsx(ks, { children: 'Filter Products:' }),
								e.jsxs(ns, {
									name: 'color',
									onChange: p,
									children: [
										e.jsx(me, { disabled: !0, children: 'Color' }),
										e.jsx(me, { children: 'White' }),
										e.jsx(me, { children: 'Black' }),
										e.jsx(me, { children: 'Red' }),
										e.jsx(me, { children: 'Blue' }),
										e.jsx(me, { children: 'Yellow' }),
										e.jsx(me, { children: 'Green' }),
									],
								}),
								e.jsxs(ns, {
									name: 'size',
									onChange: p,
									children: [
										e.jsx(me, { disabled: !0, children: 'Size' }),
										e.jsx(me, { children: 'XS' }),
										e.jsx(me, { children: 'S' }),
										e.jsx(me, { children: 'M' }),
										e.jsx(me, { children: 'L' }),
										e.jsx(me, { children: 'XL' }),
									],
								}),
							],
						}),
						e.jsxs(Cs, {
							children: [
								e.jsx(ks, { children: 'Sort Products:' }),
								e.jsxs(ns, {
									onChange: (d) => h(d.target.value),
									children: [
										e.jsx(me, {
											value: 'newest',
											children: 'Newest',
										}),
										e.jsx(me, {
											value: 'asc',
											children: 'Price (asc)',
										}),
										e.jsx(me, {
											value: 'desc',
											children: 'Price (desc)',
										}),
									],
								}),
							],
						}),
					],
				}),
				e.jsx(ia, { cat: i, filters: a, sort: c }),
				e.jsx(Ke, {}),
				e.jsx(Ie, {}),
			],
		});
	},
	oa = r.div`
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
`,
	la = r.div`
	width: 40%;
	padding: 20px;
	background-color: white;
	${R({ width: '75%' })}
	box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
`,
	da = r.h1`
	font-size: 24px;
	font-weight: 300;
`,
	ua = r.form`
	display: flex;
	flex-wrap: wrap;
`,
	De = r.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`,
	ma = r.span`
	font-size: 12px;
	margin: 20px 0px;
`,
	ha = r.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`,
	pa = () => {
		const [t, i] = n.useState(''),
			[a, o] = n.useState(''),
			[c, h] = n.useState(''),
			[p, d] = n.useState(''),
			[v, k] = n.useState(''),
			E = async (A) => {
				if ((A.preventDefault(), a === c)) {
					if (
						(await je.get(`/auth/checkEmail/${p}`)).data ===
						'Email already exists!'
					)
						return w('Email already exists please try again!');
					if (
						!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
							a,
						)
					)
						return w(
							'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character!',
						);
					(
						await je.post('/auth/register', {
							username: t,
							password: a,
							confirmPassword: c,
							email: p,
							phoneNumber: v,
						})
					).statusText === 'Created' &&
						(w('should be make verification email'),
						i(''),
						o(''),
						h(''),
						d(''),
						setTimeout(() => {
							window.location.href = '/login';
						}, 1e3));
				} else if (a !== c) {
					w('Please check for password!');
					return;
				}
			};
		return e.jsx(oa, {
			children: e.jsxs(la, {
				children: [
					e.jsx(da, { children: 'CREATE AN ACCOUNT' }),
					e.jsxs(ua, {
						children: [
							e.jsx(De, {
								placeholder: 'Username',
								onChange: (A) => i(A.target.value),
								required: !0,
							}),
							e.jsx(De, {
								type: 'email',
								placeholder: 'Email',
								onChange: (A) => d(A.target.value),
								required: !0,
							}),
							e.jsx(De, {
								placeholder: 'Password',
								type: 'password',
								onChange: (A) => o(A.target.value),
								required: !0,
							}),
							e.jsx(De, {
								placeholder: 'Confirm password',
								type: 'password',
								onChange: (A) => h(A.target.value),
								required: !0,
							}),
							e.jsx(De, {
								placeholder: 'Phone Number',
								onChange: (A) => k(A.target.value),
								required: !0,
							}),
							e.jsxs(ma, {
								children: [
									'By creating an account, I consent to the processing of my personal data in accordance with the ',
									e.jsx('b', { children: 'PRIVACY POLICY' }),
								],
							}),
							e.jsx(ha, { onClick: E, children: 'CREATE' }),
						],
					}),
				],
			}),
		});
	},
	xa = r.div`
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
`,
	ga = r.div`
	width: 400px;
	padding: 20px;
	background-color: white;
	${R({ width: '75%' })}
	box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
`,
	fa = r.h1`
	font-size: 24px;
	font-weight: 300;
`,
	ja = r.form`
	display: flex;
	flex-direction: column;
`,
	Es = r.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
`,
	va = r.button`
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
`,
	Ps = r.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
`,
	ya = () => {
		const [t, i] = n.useState(''),
			[a, o] = n.useState(''),
			{ isFetching: c, error: h } = Ne((k) => k.user),
			p = Fe(),
			d = (k) => {
				if ((k.preventDefault(), !t || !a)) {
					w('Please fill in all fields');
					return;
				}
				Xt(p, { email: t, password: a });
			};
		n.useEffect(() => {
			h &&
				(w('Invalid Credentials Try Again!'),
				i(''),
				o(''),
				(document.getElementById('email').value = ''),
				(document.getElementById('password').value = ''));
		}, [h]);
		const v = Ms();
		return (
			n.useEffect(
				() =>
					v.listen((k) => {
						k.pathname !== '/forgot' && (o(''), i(''));
					}),
				[v],
			),
			n.useEffect(
				() =>
					v.listen(() => {
						i(''), o('');
					}),
				[v],
			),
			e.jsx(xa, {
				children: e.jsxs(ga, {
					children: [
						e.jsx(fa, { children: 'SIGN IN' }),
						e.jsxs(ja, {
							children: [
								e.jsx(Es, {
									placeholder: 'email',
									id: 'email',
									autoComplete: 'email',
									onChange: (k) => i(k.target.value),
								}),
								e.jsx(Es, {
									placeholder: 'password',
									id: 'password',
									type: 'password',
									autoComplete: 'current-password',
									onChange: (k) => o(k.target.value),
								}),
								e.jsx(va, {
									onClick: d,
									disabled: c,
									children: 'LOGIN',
								}),
								e.jsx(Ps, {
									href: '/forgot',
									children: 'DO NOT YOU REMEMBER THE PASSWORD?',
								}),
								e.jsx(Ps, {
									href: '/register',
									children: 'CREATE A NEW ACCOUNT',
								}),
							],
						}),
					],
				}),
			})
		);
	},
	ba = () => {
		const [t, i] = n.useState(''),
			a = async (o) => {
				if ((o.preventDefault(), t.length < 1))
					return w('Please fill email');
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
					return w('Please enter a valid email address!');
				w('We have sent you a link to your email address...'),
					await je.post('/auth/forgot-password', { email: t });
			};
		return e.jsx('section', {
			className: 'container501',
			children: e.jsx('div', {
				className: 'row',
				children: e.jsx('div', {
					className: 'col-md-44 col-md-offset-4 col-sm-66 col-sm-offset-3',
					children: e.jsx('div', {
						className: 'account-wall',
						children: e.jsx('div', {
							id: 'my-tab-content',
							className: 'tab-content',
							children: e.jsxs('div', {
								className: 'tab-pane',
								id: 'forgot',
								children: [
									e.jsx('img', {
										className: 'profile-img',
										src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEg8QEBARFhIVFhYVFhUXEBUXFhUSFRUWGBgRExUYHiggGBolHRYWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPkAywMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgUGBAMBB//EAD8QAAIBAgIFCAYIBgMBAAAAAAABAgMRBCEFEjFBUQYiYXGBkaGxE1JicsHRIzIzgqKy4fAkQlOSk8IVc/EW/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP1EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkiJJARAAAAAAAAAAEKtWMFeTSRVYjTO6Ee1/BHHpDFupJ581bF8es5QO3/la3rLq1UShpeqnnqtcLW8jgAGmwWKVWOssrZNcDoMlGTTum0+Kdi80Xj9fmT+stj9ZfMCxAAAAAAAAAAAAACSIkkBEAAAAAAAA5NKVdWnK2183v2+FzrOTSsL0p9Fn3P5XA5+T2ilU+lqK8FlFbpPi+hGheBo/0qf+OPyIaIjahR9yL71f4nWBzf8AHUP6NL/HH5H1YGj/AEqf+OPyOgAZ/lDoynGDqwSi01dLY03bZuZn8PNxlFramvM1/KGN8PU6NV/iRkMNG84LjJeYGqAAAAAAAAAAAAACSIkkBEAAAAAAAAOi6ilFb013qwPfBStLrVu0D00RK9Ci/YS7lb4HWfIxSSSVkskuC4H0AAAIzgpJxkrpqzXFMxmjaFq+r6jl4ZeZtTnwuDp0tZxWcm5Sk9ru72vw6AOEAAAAAAAAAAAAAJIiSQEQAAAAAAAAmABaU56yTJHNgZ5NcPJnSAAAA5sbVy1Vv29R0Sdrt7EVbnrXfHMD4AAAAAAAAAAAAAEkRJICIAAAAAAAAAAlTm4u6LGnUUvkV1ON2kdXowOo+SkltPDPi+8+OAHniKrlktnmc7Vjr1DzxkdWnUlleMXJfdV7eAHODxwmJjUjrR7VvT4M9gAAAAAAAAAAAEkRJICIAAAAAAVlfTVOLaipSa6ku/8AQCzI1JqKcpOyW1mfraaqv6qjFdV33v5HBVrSm7yk31u/cBotFY11sQksoRjJ24vKN3/dsNEkZjkjDnVpcFFd7b/1L3HYz0MHPVlK25eb4IDs1BqFB/8AWR/oy/vW3uOjR+m44iTjqSi9q3q3S9zAtGVvKGvqUJ8ZWiu15+CZYIz/ACuq5UodLk+yyXmwKLCYqVKWtHtW5rgyzWnuNP8AH+hSgC+jp2G+Euxp/I6KGlqU2o85N5K638LozJ9QGzBwaM0iqq1ZZTW71ulfI7wAAAAAASREkgIgAAAAK3TWM1I6kXzpeEd77dneZ09sZXdScp8Xl1bkeIBgMIDVckofR1JcZ27or5lvOF9uwruTcdWhF8dZ/ia+BZymkrvLf2cQMRpDBunVlSWea1c90tifeafRmjlRgo/zPOT6eC6EZPG13UqTqbLu66FuXYrI22CxHpKcJ75JX69/jcD1RlOVFS9e3qxiu+8viaxSMTpmetXrP2mv7eb8AONK4aGwMD4D60GgEZNNNOzWxmk0XpBVVqy+utvSuKM0Sp1HFqUXZrNMDZA5tH4xVY33rKS4P5HSAAAAkiJJARAAA8cZK1Oo+EZeTPY49LTtRqdSXe0gMuAAAQAG50TStQo9MIvvV/iePKKtqUJW2ytDse3wTLChDVjGPBJdysU/K1/RQXtr8sgMrc1PJWetSlH1ZZdTSfncyppuSD5tZdMfJ/IC+UD8/wATPWnN8ZN97b+J+hSdk3wzPzlAGfXvPgA+veGz4AAAA6MFinSkpLtXFcDU0asZxUou6f7sY479FY70UrS+o9vQ/WA0oCYAEkRJICIAAFVyhqWhCPF37Ev1Ramf5QVL1Ix4R8W//AKsAAD0w8NaUI8ZRXe0jzOvREL1qK9tPud/gBvGUHK58ykvafgv1L8znLB/YL3/APQDNmk5Hv7de5/uZs0PJB86suiPnL5gaDFu1Oo+EZP8LPz5G+0k7Ua3/XP8rMCAAAA+uLVm07PZlt3ZHw1OFw8ZUKMJJNat/wC5t3XDaBlgdmkcDKk+MHsfwfScYAAAXOhMfspTfuv/AF+RdmMNHonHekjqy+vHb0r1gLAkiJJARAABmSx1b0lSc1sby6lkvI0GmKjjSnbfZdjefgZgAfT4WLwtsO5va5Rf3c0vNsCuLLk7C+Ip9Gs/wsrS55KxvWb4Qk/GK+IGuMzyvfOorol4tfI0xleVr+kpr2POT+QFEX3JF/SVV7K8JfqUJd8kn9LP/rf5ogaHSz+gre5LyMGbvS/2Fb3JeRhAAAAGxoxtGC4Riu6KRj0r5ccjZgRqU1JOMldPajOaS0a6XOjdw4710P5mlPjV8mBjAd2l8PCnO0N6u1wvuRwgCdGq4SUouzRAAa3B4lVYqS7VwfA6UUXJ2bvUjbKyd+DzVu2/gXqAiAAOLTMb0Z9Gq/xIzBrcdDWp1F7L77XRkgBeqp6TCPjFWf3WreFiiLPRFS8a9P1oNrrs0/NdwFYX/JGPPqvhFLvf6FAaXkhHKs+mC7tb5gaIyPKt/TLohH80jXGO5Tv6eXRGPlf4gVJc8lX9O/cl5xKYtuTD+nXuy8gNPpON6NZexL8rMEfos43TT2NNd5+duLV09qyfWgPgAA9cM1rwvs1o36ro15kMLCMpRU5asXtf72dZrwABwaZxOpTaW2XNXVvfd5gZ/FVtecp8X4bl3WPIAAfUr5LafC00Fhdaeu9kdnTL9NvcBbaOwnooJfzPOXXw7DsREkgIgAAZLHUPR1Jw3J5dTzRrSh5Q0rShLirdqf6+AFSeuGq6klLrXY00/M8gANZyThalN8ZvuSX6mTN3onD+jo0o77XfXLN+YHYYrlE74ir938kTamH0474it73kkgOAs+Tb/iKfVL8kisLDk+/4il1y/JIDbmH05Q1K9Vbm9ZdUs/O/cbgzvK3C5U6q3cx9TzXx7wM0AABqdFVtelB71zX2ZeVjLFxyerZzhx5y61k/h3AXFesoRcpbF+7Iy2MxUqstaXYuC4HVpjG+klqxfMj4y4lcAAAHpQouclGO1/u7NXhqCpxUI7F4vezk0RgfRx1pLny8FwLAASREkgIgAAcGmqOtSbW2PO7N/h5HefGr5MDGxTbSSu3klxfBFrLQFaMJVJOEdWLlq3bdkr2yVr9p6cn8NbEuMv5FJrrTUU/G5pcRZqSlbVs077Lb7gYvRWG9LVpw3N3furN+CN4VGidFKjUqTTumkocUm7tPuWZbgDB6VletW9+Xg2jeGE0tRlCtVUlZuUpLpUm2mgOM7tCP6ej73mmcJY6Bw851qbisotSk9yS+IG2PHGYdVYTpvZJW6nufY7HqRdQD8+q03CUoyVmm0+tHZi9H6tOnWi24yS1vZlv7Lmg0hoinWnrtyi7JO1s7b81t+R74TBRp0/RXco55Ss8ntWzZ8wMSWGjNG16l5U+arNazdk7pqy4l7W0FQlsi4+7J+Tujt0XhfQw9HrOSu2r7r7kv3vAw84OLcWrNOzXBrcRNTyj0Vrp1qa5yXOXrJb10ryMsALjQuAvarNZfyri/WOTReC9LLP6i29Pso0yVslsA+gAASREkgIgAAAAOeFHUrxrR2Nas10bpLqsu4s6+q1LWtqtZ32WfHoOQlqRnGcJK6krNXtdPKyA+LE0MMqdOc3HbquV3fPZfouvA6aePoy+rVpv76v3GI0vhq8EqDqa9JPWp3WdldWvtVr2aKl0Zrc+z9AP1WLT2NMr9N6M9PDL7SOcXx9l9DPznWmt8l3lzovGVIUK9WK15qdOK1k5JRkpttR60swGDwU6s/RxWe+6+rba5G2wGCjRgoQXW98nxZh1p7Eq7VKld7f4dZ9fE8uUEpRxFaEXJRTVld2V4ptLtbA39WpFbZRXXJIVKiim8kltb+Zi+S9BJ1MTVvq0lkn6z3pcdy6ZFvRzjHFYtrjTp7YwTzTt/NNrfu6NwXd75g5sDXnUWvKCjF/VV7ya9aW5dWZ0t22gD6cmL0jSpfWmr+qs5d27tM7pLTE6t4rmw4J5v3n8PMDW0MXCacoyTSdm1xRnNKaJ1p61JJRk816r3yXR0FZo2vqVIO+V7PqeVzVAeWGoRpxUI7F4viz1AAAAASREkgIgAAAABxaZlajP7v5kdpwab+yl1x8wM5Obk7ybb4tt/vYiJIARPXD4mpTbdOcot7dWTV+uxAAdX/K4j+vV/vZyyk222228227tvi2AAUnbVu9W97XyvxtxOrSWNdaSy1YRVox4Lj1nKALPTekdeerTm9SKtk2k3vfkuwqmSAEQSAETW4Gtr04S3tZ9ayfiZQ0WgvsvvMCwAAAAACSIkkB//2Q==',
										alt: 'zaid',
									}),
									e.jsxs('form', {
										className: 'form-signin',
										action: '',
										method: '',
										children: [
											e.jsx('input', {
												type: 'text',
												className: 'form-control',
												placeholder: 'Email id',
												required: !0,
												onChange: (o) => i(o.target.value),
											}),
											e.jsx('p', { children: ' ' }),
											e.jsx('button', {
												onClick: a,
												className:
													'btn btn-lg btn-info btn-block submit',
												children: 'submit',
											}),
										],
									}),
									e.jsx('p', {
										className: 'text-center',
										children: e.jsxs(M, {
											href: '/login',
											'data-toggle': 'tab',
											children: [
												e.jsx('i', {
													className: 'fa fa-hand-o-left',
												}),
												' Back to Login',
											],
										}),
									}),
								],
							}),
						}),
					}),
				}),
			}),
		});
	};
var wa = {};
const Aa = wa.REACT_APP_STRIPE,
	Sa = r.div`
	user-select: none;
`,
	_a = r.div`
	padding: 20px;
	${R({ padding: '10px' })}
`,
	Na = r.h1`
	font-weight: 300;
	text-align: center;
`,
	Ca = r.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`,
	ka = r.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(t) => t.type === 'filled' && 'none'};
	background-color: ${(t) => (t.type === 'filled' ? 'black' : 'transparent')};
	color: ${(t) => t.type === 'filled' && 'white'};
`,
	Ea = r.div`
	${R({ display: 'none' })}
`,
	Os = r.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`,
	Pa = r.div`
	display: flex;
	justify-content: space-between;
	${R({ flexDirection: 'column' })}
	flex-direction: ${(t) => (t.language === 'ar' ? 'row-reverse' : 'row')};
`,
	Oa = r.div`
	flex: 3;
	padding: 5px;
`,
	La = r.div`
	display: flex;
	justify-content: space-between;
	${R({ flexDirection: 'column' })};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
	flex-direction: ${(t) => (t.language === 'ar' ? 'row-reverse' : 'row')};
`,
	qa = r.div`
	flex: 2;
	display: flex;
	flex-direction: ${(t) => (t.language === 'ar' ? 'row-reverse' : 'row')};
`,
	Ia = r.img`
	width: 200px;
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
`,
	Ra = r.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: ${(t) => (t.language === 'ar' ? 'right' : 'left')};
`,
	Ta = r.span``,
	za = r.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(t) => t.color};
`,
	Ls = r.span``,
	Fa = r.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`,
	$a = r.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`,
	Da = r.div`
	font-size: 24px;
	margin: 5px;
	${R({ margin: '5px 15px' })}
	border-bottom:1px solid black;
`,
	Va = r.div`
	font-size: 30px;
	font-weight: 200;
	${R({ marginBottom: '20px' })}
`,
	Ba = r.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`,
	Wa = r.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`,
	Ma = r.h1`
	font-weight: 200;
	text-align: ${(t) => t.language === 'ar' && 'right'};
`,
	He = r.div`
	margin: 20px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(t) => t.type === 'total' && '500'};
	font-size: ${(t) => t.type === 'total' && '24px'};
	flex-direction: ${(t) => t.language === 'ar' && 'row-reverse'};
`,
	Je = r.span``,
	Ye = r.span``,
	Ua = r.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`,
	Ga = r.button`
	width: 100%;
	padding: 10px;
	background-color: #eee;
	color: black;
	font-weight: 800;
	cursor: pointer;
	margin-top: 5px;
	font-size: 12px;
	border-radius: 10%;
	${R({ width: '100%' })};
`,
	Ha = () => {
		const t = Ne((f) => f.cart),
			[i, a] = n.useState({}),
			o = Fe(),
			[c, h] = n.useState(1);
		let [p, d] = n.useState({}),
			[v, k] = n.useState({});
		const [E, A] = n.useState(null),
			[T, ne] = n.useState([]),
			[ye, Ae] = n.useState([]),
			te = Ms(),
			{ language: F } = n.useContext(se),
			{ dictionary: Y } = n.useContext(se),
			pe = Y.sizes,
			ae = (f) => {
				A(f);
			};
		let J = localStorage.getItem('persist:root');
		(J = JSON.parse(J)),
			(J = J.user),
			(J = JSON.parse(J)),
			(J = J.currentUser._id);
		let q = localStorage.getItem('persist:root');
		(q = JSON.parse(q)),
			(q = q.user),
			(q = JSON.parse(q)),
			(q = q.currentUser.email);
		const x = t.products.reduce((f, O) => {
			const C = f.find(($) => {
				var L, g, W, K;
				return (
					($ == null ? void 0 : $._id) === (O == null ? void 0 : O._id) &&
					((L = $.selectedVariant) == null ? void 0 : L.color) ===
						((g = O.selectedVariant) == null ? void 0 : g.color) &&
					((W = $.selectedVariant) == null ? void 0 : W.size) ===
						((K = O.selectedVariant) == null ? void 0 : K.size)
				);
			});
			return C ? (C.quantity += O.quantity) : f.push({ ...O }), f;
		}, []);
		n.useEffect(() => {
			(async () => {
				try {
					const C = await ce.get('/products');
					ne(C.data), d(C.data);
				} catch (C) {
					console.error('Error fetching data:', C);
				}
			})(),
				(async () => {
					try {
						const C = await ce.get('/offer');
						Ae(C.data), k(C.data);
					} catch (C) {
						console.error('Error fetching data:', C);
					}
				})();
		}, []),
			n.useEffect(() => {
				E &&
					(async () => {
						if (t.total * 100 === 0) {
							w(
								'Error',
								F === 'ar' ? 'السلة فارغة' : 'Your cart is empty',
								'error',
							);
							return;
						}
						try {
							const O = await ce.post('/checkout/payment', {
								tokenId: E.id,
								amount: t.total * 100,
							});
							a(O.data),
								x.map((g) => {
									T.map((W) => {
										if (W._id === g._id) {
											const K = W.variants.find(
												(ge) =>
													ge.color === g.selectedVariant.color &&
													ge.size === g.selectedVariant.size,
											);
											(K.quantity -= g.quantity),
												js({ quantity: K.quantity }, g._id);
										}
									}),
										ye.map((W) => {
											W._id === g._id &&
												((W.quantity -= g.quantity),
												js({ quantity: W.quantity }, g._id));
										});
								}),
								te.push('/success', {
									stripeData: O.data,
									products: t,
								});
							let C = 0;
							x.map((g) => {
								C += g.originalPrice * g.quantity;
							});
							let $ = { userId: J, products: x };
							o(Yi());
							let L = {
								userId: J,
								products: x,
								amountOrgin: C,
								amount: O.data.amount / 100,
								address: O.data.billing_details.address,
								status: 'pending',
							};
							si($), ti(L), ii(q), ni();
						} catch (O) {
							console.error('Error fetching data:', O);
						}
					})();
			}, [E, t.total, te]);
		function V(f) {
			return new Intl.NumberFormat('ar-EG').format(f);
		}
		const X = (f, O, C) => {
				const L = p
						.find((W) => W._id === O)
						.variants.find((W) => W._id === C),
					g = t.products.find((W) => W.selectedVariant._id === C);
				f === 'dec'
					? g.quantity <= 1
						? (o(vs(C)),
						  w(
								'Info',
								F === 'ar'
									? 'الحد الادنى للكمية هو 1'
									: 'The minimum quantity is 1',
								'info',
						  ))
						: h(g.quantity - 1)
					: g.quantity >= L.quantity &&
					  (o(vs(C)),
					  w(
							'Info',
							F === 'ar'
								? 'لقد تجاوزت الحد الاقصى للكمية'
								: 'You have exceeded the number of available products!, the quantity will be reset',
							'info',
					  ));
			},
			[de, H] = n.useState([]);
		n.useEffect(() => {
			o(Ji());
		}, [t.products]),
			n.useEffect(() => {
				(async () => {
					try {
						const O = await ce.get('/orders/find/' + J);
						H(O.data);
					} catch (O) {
						console.error('Error fetching data:', O);
					}
				})();
			}, []);
		const [xe, Se] = n.useState([]);
		return (
			n.useEffect(() => {
				(async () => {
					try {
						const O = JSON.parse(
								JSON.parse(localStorage.getItem('persist:root')).user,
							).currentUser._id,
							[C, $, L] = await Promise.all([
								ce.get(`/users/userWishListArray/${O}`),
								ce.get('/products'),
								ce.get('/offer'),
							]),
							g = C.data,
							W = $.data,
							K = L.data,
							ge = [];
						for (const N of g) {
							const be = [...W, ...K].find((_) => _._id === N);
							be && ge.push({ ...be });
						}
						Se(ge);
					} catch (O) {
						console.error(O);
					}
				})();
			}, []),
			e.jsxs(Sa, {
				children: [
					e.jsx(Oe, {}),
					e.jsx(Le, {}),
					e.jsx(qe, {}),
					e.jsxs(_a, {
						children: [
							e.jsx(Na, { children: Y.cart['YOUR BAG'] }),
							e.jsxs(Ca, {
								children: [
									e.jsx(M, {
										to: '/',
										children: e.jsx(ka, {
											children: Y.cart['CONTINUE SHOPPING'],
										}),
									}),
									e.jsxs(Ea, {
										children: [
											e.jsx(M, {
												to: '/orderHave',
												children: e.jsxs(Os, {
													children: [
														Y.cart['Shopping Bag'],
														'(',
														de.length,
														')',
													],
												}),
											}),
											e.jsx(M, {
												to: '/wishList',
												children: e.jsxs(Os, {
													children: [
														Y.cart['Your Wishlist'],
														' (',
														xe.length,
														')',
													],
												}),
											}),
										],
									}),
								],
							}),
							e.jsxs(Pa, {
								language: F,
								children: [
									e.jsxs(Oa, {
										children: [
											x.length === 0
												? e.jsx('div', {
														children:
															Y.cart['No products in the cart'],
												  })
												: x.map((f) => {
														var O, C, $;
														return e.jsxs(La, {
															language: F,
															children: [
																e.jsxs(qa, {
																	language: F,
																	children: [
																		e.jsx(Ia, {
																			src:
																				(O =
																					f.selectedVariant) ==
																				null
																					? void 0
																					: O.img[0],
																		}),
																		e.jsxs(Ra, {
																			language: F,
																			children: [
																				e.jsxs(Ta, {
																					children: [
																						e.jsx('b', {
																							children:
																								Y.cart[
																									'Product:'
																								],
																						}),
																						' ',
																						F === 'en'
																							? f.title
																							: f.title_ar,
																					],
																				}),
																				e.jsx(za, {
																					color:
																						(C =
																							f.selectedVariant) ==
																						null
																							? void 0
																							: C.color,
																				}),
																				e.jsxs(Ls, {
																					children: [
																						e.jsx('b', {
																							children:
																								Y.cart[
																									'Size:'
																								],
																						}),
																						' ',
																						pe[
																							($ =
																								f.selectedVariant) ==
																							null
																								? void 0
																								: $.size
																						],
																					],
																				}),
																				e.jsx(Ls, {
																					children: e.jsx(
																						Ga,
																						{
																							onClick:
																								() => {
																									o(
																										Ui(
																											{
																												productId:
																													f._id,
																												variantId:
																													f
																														.selectedVariant
																														._id,
																											},
																										),
																									),
																										w(
																											'Info',
																											F ===
																												'ar'
																												? 'تمت العملية بنجاح'
																												: 'Successfully removed',
																											'info',
																										);
																								},
																							children:
																								Y.cart
																									.Remove,
																						},
																					),
																				}),
																			],
																		}),
																	],
																}),
																e.jsxs(Fa, {
																	children: [
																		e.jsxs($a, {
																			children: [
																				e.jsx(Ts, {
																					className: `DecQuantity${f._id}`,
																					onClick: () => {
																						o(
																							Hi(
																								f
																									.selectedVariant
																									._id,
																							),
																						),
																							X(
																								'dec',
																								f._id,
																								f
																									.selectedVariant
																									._id,
																							);
																					},
																				}),
																				e.jsx(Da, {
																					children:
																						F === 'ar'
																							? V(
																									f.quantity,
																							  )
																							: f.quantity,
																				}),
																				e.jsx(zs, {
																					className: `AddQuantity${f._id}`,
																					onClick: () => {
																						o(
																							Gi(
																								f
																									.selectedVariant
																									._id,
																							),
																						),
																							X(
																								'inc',
																								f._id,
																								f
																									.selectedVariant
																									._id,
																							);
																					},
																				}),
																			],
																		}),
																		e.jsxs(Va, {
																			children: [
																				'$',
																				' ',
																				F === 'ar'
																					? V(
																							f.price *
																								f.quantity,
																					  )
																					: f.price *
																					  f.quantity,
																			],
																		}),
																	],
																}),
															],
														});
												  }),
											e.jsx(Ba, {}),
										],
									}),
									e.jsxs(Wa, {
										children: [
											e.jsx(Ma, {
												language: F,
												children: Y.cart['ORDER SUMMARY'],
											}),
											e.jsxs(He, {
												language: F,
												children: [
													e.jsx(Je, { children: Y.cart.Subtotal }),
													e.jsxs(Ye, {
														children: [
															'$',
															F === 'ar' ? V(t.total) : t.total,
														],
													}),
												],
											}),
											e.jsxs(He, {
												language: F,
												children: [
													e.jsx(Je, {
														children:
															Y.cart['Estimated Shipping'],
													}),
													e.jsxs(Ye, {
														children: [
															'$',
															F === 'ar' ? V(5.9) : 5.9,
														],
													}),
												],
											}),
											e.jsxs(He, {
												language: F,
												children: [
													e.jsx(Je, {
														children: Y.cart['Shipping Discount'],
													}),
													e.jsxs(Ye, {
														children: [
															'$',
															F === 'ar' ? V(-5.9) : -5.9,
														],
													}),
												],
											}),
											e.jsxs(He, {
												type: 'total',
												language: F,
												children: [
													e.jsx(Je, { children: Y.cart.Total }),
													e.jsxs(Ye, {
														children: [
															'$',
															' ',
															F === 'ar' ? V(t.total) : t.total,
														],
													}),
												],
											}),
											e.jsx(Ot, {
												name: 'PME Shop',
												image: 'https://avatars.githubusercontent.com/u/1486366?v=4',
												billingAddress: !0,
												shippingAddress: !0,
												description: `Your total is $${t.total}`,
												amount: t.total * 100,
												token: ae,
												stripeKey: Aa,
												children: e.jsx(Ua, {
													children: Y.cart['CHECKOUT NOW'],
												}),
											}),
										],
									}),
								],
							}),
						],
					}),
					e.jsx(Ie, {}),
				],
			})
		);
	},
	Ja = r.div`
	user-select: none;
`,
	Ya = r.div`
	padding: 20px;
	${R({ padding: '10px' })}
`,
	Ka = r.h1`
	font-weight: 300;
	text-align: center;
`,
	Qa = r.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`,
	Za = r.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(t) => t.type === 'filled' && 'none'};
	background-color: ${(t) => (t.type === 'filled' ? 'black' : 'transparent')};
	color: ${(t) => t.type === 'filled' && 'white'};
`,
	Xa = r.div`
	display: flex;
	justify-content: space-between;
	${R({ flexDirection: 'column' })}
`,
	er = r.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-wrap: wrap;
`,
	sr = r.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	${R({ flexDirection: 'column' })};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
`,
	tr = r.div`
	flex: 2;
	display: flex;
`,
	ir = r.img`
	width: 200px;
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
`,
	nr = r.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`,
	ar = r.span``;
r.span`
	${R({ display: 'none' })};
`;
const rr = r.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(t) => t.color};
`,
	as = r.span``,
	cr = r.div`
	font-size: 30px;
	font-weight: 200;
	${R({ marginBottom: '20px' })}
`,
	or = r.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`,
	lr = r.hr`
  background-color: #bbb;
  border: none;
  height: 5px;
`,
	dr = () => {
		const [t, i] = n.useState([]);
		return (
			n.useEffect(() => {
				(async () => {
					try {
						const o = JSON.parse(
								JSON.parse(localStorage.getItem('persist:root')).user,
							).currentUser._id,
							[c, h, p] = await Promise.all([
								ce.get(`/orders/find/${o}`),
								ce.get('/products'),
								ce.get('/offer'),
							]),
							d = c.data,
							v = h.data,
							k = p.data,
							E = [];
						for (const A of d) {
							for (const T of A.products) {
								const ne = [...v, ...k].find((ye) => ye._id === T._id);
								ne &&
									E.push({
										...ne,
										amount: T.quantity * ne.price,
										quantity: T.quantity,
										seperator: !1,
									});
							}
							E.push({ seperator: !0 });
						}
						i(E);
					} catch (o) {
						console.error(o);
					}
				})();
			}, []),
			e.jsxs(Ja, {
				children: [
					e.jsx(Oe, {}),
					e.jsx(Le, {}),
					e.jsx(qe, {}),
					e.jsxs(Ya, {
						children: [
							e.jsx(Ka, { children: 'YOUR ORDERS' }),
							e.jsx(Qa, {
								children: e.jsx(M, {
									to: '/',
									children: e.jsx(Za, {
										children: 'CONTINUE SHOPPING',
									}),
								}),
							}),
							t.length !== 0
								? e.jsx(Xa, {
										children: e.jsxs(er, {
											children: [
												t.map((a) =>
													a.seperator === !0
														? e.jsx(lr, {})
														: e.jsxs(
																sr,
																{
																	className: 'product_hr',
																	children: [
																		e.jsxs(tr, {
																			children: [
																				e.jsx(ir, {
																					src: a.img,
																				}),
																				e.jsxs(nr, {
																					children: [
																						e.jsxs(ar, {
																							children: [
																								e.jsx(
																									'b',
																									{
																										children:
																											'Product:',
																									},
																								),
																								' ',
																								a.title,
																							],
																						}),
																						e.jsx(rr, {}),
																						e.jsxs(as, {
																							children: [
																								e.jsx(
																									'b',
																									{
																										children:
																											'Price:',
																									},
																								),
																								' ',
																								a.amount,
																							],
																						}),
																						e.jsxs(as, {
																							children: [
																								e.jsx(
																									'b',
																									{
																										children:
																											'Quantity:',
																									},
																								),
																								' ',
																								a.quantity,
																							],
																						}),
																						e.jsx(as, {}),
																					],
																				}),
																			],
																		}),
																		e.jsxs(cr, {
																			children: [
																				'$',
																				a.price,
																			],
																		}),
																	],
																},
																a._id,
														  ),
												),
												e.jsx(or, {}),
											],
										}),
								  })
								: e.jsx('div', {
										style: {
											display: 'flex',
											padding: '70px',
											fontSize: '30px',
											justifyContent: 'center',
										},
										children: 'No Orders Yet!',
								  }),
						],
					}),
					e.jsx(Ie, {}),
				],
			})
		);
	},
	ur = r.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`,
	mr = () => {
		const [t, i] = n.useState([]);
		return (
			n.useEffect(() => {
				(async () => {
					try {
						const o = JSON.parse(
								JSON.parse(localStorage.getItem('persist:root')).user,
							).currentUser._id,
							[c, h, p] = await Promise.all([
								ce.get(`/users/userWishListArray/${o}`),
								ce.get('/products'),
								ce.get('/offer'),
							]),
							d = c.data,
							v = h.data,
							k = p.data,
							E = [];
						for (const A of d) {
							const T = [...v, ...k].find((ne) => ne._id === A);
							T && E.push({ ...T });
						}
						i(E);
					} catch (o) {
						console.error(o);
					}
				})();
			}, [t]),
			e.jsx(ur, {
				children:
					t.length !== 0
						? t.map((a) => e.jsx(cs, { item: a }, a._id))
						: e.jsx('div', {
								style: {
									margin: 'auto',
									padding: '100px',
									fontSize: '30px',
								},
								children: 'No Products in Wishlist!',
						  }),
			})
		);
	},
	hr = r.div``,
	pr = r.h1`
	margin: 20px;
`,
	xr = () =>
		e.jsxs(hr, {
			children: [
				e.jsx(Oe, {}),
				e.jsx(Le, {}),
				e.jsx(qe, {}),
				e.jsx(pr, { children: 'Wishlist' }),
				e.jsx(mr, {}),
				e.jsx(Ke, {}),
				e.jsx(Ie, {}),
			],
		}),
	gr = () => {
		const t = os(),
			i = t.state.stripeData,
			a = t.state.cart,
			o = Ne((p) => p.user.currentUser),
			[c, h] = n.useState(null);
		return (
			n.useEffect(() => {
				i &&
					(async () => {
						try {
							const d = await ce.post('/orders', {
								userId: o._id,
								products: a.products.map((v) => ({
									productId: v._id,
									quantity: v._quantity,
								})),
								amount: a.total,
								address: i.billing_details.address,
							});
							h(d.data._id);
						} catch {}
					})();
			}, [a, i, o]),
			e.jsxs('div', {
				style: {
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				},
				children: [
					c
						? `Order has been created successfully. Your order number is ${c}`
						: 'Successfull. Your order is being prepared...',
					e.jsx(M, {
						to: '/',
						children: e.jsx('button', {
							style: { padding: 10, marginTop: 20 },
							children: 'Go to Homepage',
						}),
					}),
				],
			})
		);
	},
	fr = () => (
		n.useEffect(() => {
			(async () => {
				const a = new URLSearchParams(window.location.search).get('token');
				if ((console.log(a), a))
					try {
						const o = await Ee.get(
							`http://194.195.86.67:4000/api/auth/verifyEmail?token=${a}`,
						);
						console.log(o.data),
							o.data.message === 'Email verified!'
								? (w('Your email has been verified!'),
								  (window.location.href = '/login'))
								: w(
										'Failed to verify email. Invalid or expired token.',
								  );
					} catch (o) {
						console.error('Failed to verify email:', o),
							w(
								'An error occurred while verifying your email. Please try again later.',
							);
					}
				else w('No verification token provided.');
			})();
		}, []),
		e.jsx('div', { children: 'Verifying email...' })
	),
	jr = () => {
		const t = Ne((o) => o.user.currentUser),
			{ darkMode: i } = n.useContext(us),
			a = () => {
				localStorage.removeItem('persist:root'),
					(window.location.href = '/login');
			};
		return e.jsx('div', {
			className: i ? 'app dark' : 'app',
			children: e.jsx(Lt, {
				children: e.jsx(qt, {
					children: e.jsxs(ai, {
						logOut: a,
						children: [
							e.jsx(we, { path: '/forgot', children: e.jsx(ba, {}) }),
							e.jsx(we, {
								path: '/verifyEmail',
								children: e.jsx(fr, {}),
							}),
							e.jsx(we, {
								exact: !0,
								path: '/',
								children: e.jsx(Zn, {}),
							}),
							e.jsx(we, {
								path: '/products/:category',
								children: e.jsx(ca, {}),
							}),
							e.jsx(we, {
								path: '/product/:id',
								children: e.jsx(Ys, {}),
							}),
							e.jsx(we, {
								path: '/offer/:category',
								children: e.jsx(An, {}),
							}),
							e.jsx(we, { path: '/orderHave', children: e.jsx(dr, {}) }),
							e.jsx(we, { path: '/wishList', children: e.jsx(xr, {}) }),
							e.jsx(we, { path: '/cart', children: e.jsx(Ha, {}) }),
							e.jsx(we, { path: '/success', children: e.jsx(gr, {}) }),
							e.jsx(we, {
								path: '/login',
								children: t ? e.jsx(xs, { to: '/' }) : e.jsx(ya, {}),
							}),
							e.jsx(we, {
								path: '/register',
								children: t ? e.jsx(xs, { to: '/' }) : e.jsx(pa, {}),
							}),
						],
					}),
				}),
			}),
		});
	},
	vr = { key: 'root', version: 1, storage: Ft },
	yr = It({ user: Qt, cart: Ki }),
	br = Rt(vr, yr),
	Zs = Tt({
		reducer: br,
		middleware: (t) =>
			t({ serializableCheck: { ignoredActions: [$t, Dt, Vt, Bt, Wt, Mt] } }),
	});
let wr = zt(Zs);
Ut.render(
	e.jsxs(Ve.StrictMode, {
		children: [
			e.jsx(Gt, {
				store: Zs,
				children: e.jsx(Ht, {
					loading: null,
					persistor: wr,
					children: e.jsx(ri, {
						children: e.jsx(Oi, { children: e.jsx(jr, {}) }),
					}),
				}),
			}),
			',',
		],
	}),
	document.getElementById('root'),
);
export { cs as P };
function __vite__mapDeps(indexes) {
	if (!__vite__mapDeps.viteFileDeps) {
		__vite__mapDeps.viteFileDeps = [
			'assets/Poffer-kCR5oKba.js',
			'assets/.pnpm-o1UN5waG.js',
			'assets/.pnpm-eqTA7-MZ.css',
		];
	}
	return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
