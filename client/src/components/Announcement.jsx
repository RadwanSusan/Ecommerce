import React, { useContext } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/apiCalls';
import { MdOutlineLightMode } from 'react-icons/md';
import { SiDarkreader } from 'react-icons/si';
import { DarkModeContext } from '../context/darkModeContext';
import { LanguageContext } from './LanguageContext';
import './announcement.css';
const Container = styled.div`
	height: 60px;
	${mobile({ height: '50px' })}
	user-select: none;
	@media screen and (max-width: 935px) {
		display: none;
	}
	direction: ${({ language }) => (language === 'ar' ? 'rtl' : 'ltr')};
`;
const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: '10px 0px' })}
`;
const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: 2, justifyContent: 'center' })}
`;
const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
const Navbar = React.memo(
	({ isGuest, handleLogout, darkMode, toggle, language, changeLanguage }) => (
		<Container language={language}>
			<Wrapper>
				<Left>
					<MenuItem>
						{language === 'en'
							? 'Welcome to Venuse store'
							: 'مرحبا بك في متجر فينوس'}
					</MenuItem>
					{!isGuest && (
						<MenuItem>
							<button onClick={handleLogout}>
								{language === 'en' ? 'LOG OUT' : 'تسجيل الخروج'}
							</button>
						</MenuItem>
					)}
					{isGuest && (
						<>
							<MenuItem>
								<Link to='/Register'>
									{language === 'en' ? 'REGISTER' : 'انشاء حساب'}
								</Link>
							</MenuItem>
							<MenuItem>
								<Link to='/Login'>
									{language === 'en' ? 'SIGN IN' : 'تسجيل الدخول'}
								</Link>
							</MenuItem>
						</>
					)}
				</Left>
				<Right>
					{darkMode ? (
						<SiDarkreader
							className='CiDark'
							onClick={toggle}
						/>
					) : (
						<MdOutlineLightMode
							className='CiDark'
							onClick={toggle}
						/>
					)}
					<select
						className='languageSelect'
						value={language}
						onChange={(e) => changeLanguage(e.target.value)}
						style={language === 'ar' ? { marginRight: '15px' } : {}}>
						<option value='en'>
							{language === 'en' ? 'English' : 'الانجليزية'}
						</option>
						<option value='ar'>
							{language === 'en' ? 'Arabic' : 'العربية'}
						</option>
					</select>
				</Right>
			</Wrapper>
		</Container>
	),
);
const Announcement = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	const { language, changeLanguage } = useContext(LanguageContext);
	const currentUser = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<Navbar
			isGuest={!currentUser}
			handleLogout={handleLogout}
			darkMode={darkMode}
			toggle={toggle}
			language={language}
			changeLanguage={changeLanguage}
		/>
	);
};
export default Announcement;
