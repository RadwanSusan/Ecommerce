import React, {
	useEffect,
	useContext,
	useState,
	useCallback,
	useMemo,
} from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/apiCalls';
import { MdOutlineLightMode } from 'react-icons/md';
import { SiDarkreader } from 'react-icons/si';
import { DarkModeContext } from '../context/darkModeContext';

const Container = styled.div`
	height: 60px;
	${mobile({ height: '50px' })}
	user-select: none;
	@media screen and (max-width: 935px) {
		display: none;
	}
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

const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
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
const DarkMode = styled.div`
	cursor: pointer;
	background-color: black;
`;

const MenuItem1 = styled.div`
	font-size: 14px;
	cursor: pointer;
	${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
/*
 * -----------------------------------1st Version--------------------------------
 */
const Announcement = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	const [tokenState, setToken] = useState();
	const [tokenLoaded, setTokenLoaded] = useState(false);
	const getToken = async () => {
		try {
			const token = await localStorage.getItem('persist:root');
			if (
				(token !== null &&
					token !== undefined &&
					token !== '' &&
					JSON.parse(JSON.parse(token)?.user)?.currentUser !==
						undefined &&
					JSON.parse(JSON.parse(token)?.user)?.currentUser !== null &&
					JSON.parse(JSON.parse(token)?.user)?.username !==
						undefined &&
					JSON.parse(JSON.parse(token)?.user)?.username !== null &&
					JSON.parse(JSON.parse(token)?.user)?.username !==
						undefined) ||
				JSON.parse(JSON.parse(token)?.user)?.username !== ''
			) {
				setToken(token);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setTokenLoaded(true);
		}
	};
	useEffect(() => {
		getToken();
	}, []);
	const handleLogout = () => {
		logoutUser();
	};
	const Navbar = ({ isGuest }) => (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem1>
            {isGuest ? 'Welcome to Venuse store' : 'Welcome to Venuse store'}
          </MenuItem1>
          {!isGuest && (
            <MenuItem>
              <button onClick={handleLogout}>Logout</button>
            </MenuItem>
          )}
          {isGuest && (
            <>
              <MenuItem>
                <Link to='/Register'>REGISTER</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/Login'>SIGN IN</Link>
              </MenuItem>
            </>
          )}
        </Left>
        <Right>
          {darkMode ? (
            <SiDarkreader className='CiDark' onClick={toggle} />
          ) : (
            <MdOutlineLightMode className='CiDark' onClick={toggle} />
          )}
          <Language>English - </Language>
          <SearchContainer>USD</SearchContainer>
        </Right>
      </Wrapper>
    </Container>
  );
	if (!tokenLoaded) {
		return null;
	}
	return tokenState ? <Navbar isGuest={false} /> : <Navbar isGuest={true} />;
};
/*
 * -----------------------------------2nd Version--------------------------------
 */
// const Announcement = () => {
// 	const { toggle, darkMode } = useContext(DarkModeContext);
// 	const [tokenState, setTokenState] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	useEffect(() => {
// 		const getToken = async () => {
// 			try {
// 				const token = await localStorage.getItem('persist:root');
// 				setTokenState(token);
// 			} catch (error) {
// 				console.error(error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		getToken();
// 	}, []);
// 	const handleLogout = () => {
// 		logoutUser();
// 	};
// 	const Navbar = ({ isGuest }) => (
// 		<Container>
// 			<Wrapper>
// 				<Left>
// 					<MenuItem1>
// 						{isGuest
// 							? 'Welcome to Venuse store'
// 							: `Welcome ${JSON.parse(JSON.parse(tokenState).user).username}`}
// 					</MenuItem1>
// 					{!isGuest && (
// 						<MenuItem>
// 							<button onClick={handleLogout}>Logout</button>
// 						</MenuItem>
// 					)}
// 					{isGuest && (
// 						<>
// 							<MenuItem>
// 								<Link to='/Register'>REGISTER</Link>
// 							</MenuItem>
// 							<MenuItem>
// 								<Link to='/Login'>SIGN IN</Link>
// 							</MenuItem>
// 						</>
// 					)}
// 				</Left>
// 				<Right>
// 					{darkMode ? (
// 						<SiDarkreader
// 							className='CiDark'
// 							onClick={toggle}
// 						/>
// 					) : (
// 						<MdOutlineLightMode
// 							className='CiDark'
// 							onClick={toggle}
// 						/>
// 					)}
// 					<Language>English - </Language>
// 					<SearchContainer>USD</SearchContainer>
// 				</Right>
// 			</Wrapper>
// 		</Container>
// 	);
// 	if (isLoading) {
// 		return null;
// 	}
// 	return <Navbar isGuest={!tokenState} />;
// };
/*
 * -----------------------------------3rd Version [BEST-PERFORMANCE]--------------------------------
 */
// const Navbar = React.memo(
//   ({ isGuest, darkMode, toggle, handleLogout, username }) => (
//     <Container>
//       <Wrapper>
//         <Left>
//           <MenuItem1>
//             {isGuest ? "Welcome to Venuse store" : `Welcome ${username}`}
//           </MenuItem1>
//           {!isGuest && (
//             <MenuItem>
//               <button onClick={handleLogout}>Logout</button>
//             </MenuItem>
//           )}
//           {isGuest && (
//             <>
//               <MenuItem>
//                 <Link to="/Register">REGISTER</Link>
//               </MenuItem>
//               <MenuItem>
//                 <Link to="/Login">SIGN IN</Link>
//               </MenuItem>
//             </>
//           )}
//         </Left>
//         <Right>
//           {darkMode ? (
//             <SiDarkreader className="CiDark" onClick={toggle} />
//           ) : (
//             <MdOutlineLightMode className="CiDark" onClick={toggle} />
//           )}
//           <SearchContainer>USD</SearchContainer>
//           <SearchContainer>ENG</SearchContainer>
//         </Right>
//       </Wrapper>
//     </Container>
//   )
// );
// const Announcement = () => {
// 	const { toggle, darkMode } = useContext(DarkModeContext);
// 	const [tokenState, setTokenState] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [user, setUser] = useState(null);
// 	const handleLogout = useCallback(() => {
// 		logoutUser();
// 	}, []);
// 	const token = useMemo(() => localStorage.getItem('persist:root'), []);
// 	useEffect(() => {
// 		if (token) {
// 			setTokenState(token);
// 		}
// 	}, [token]);
// 	useEffect(() => {
// 		if (tokenState) {
// 			setUser(JSON.parse(JSON.parse(tokenState)?.user));
// 		}
// 	}, [tokenState]);
// 	useEffect(() => {
// 		setIsLoading(false);
// 	}, []);
// 	if (isLoading) {
// 		return null;
// 	}
// 	return (
// 		<Navbar
// 			isGuest={!tokenState}
// 			darkMode={darkMode}
// 			toggle={toggle}
// 			handleLogout={handleLogout}
// 			username={user?.username}
// 		/>
// 	);
// };

export default Announcement;
