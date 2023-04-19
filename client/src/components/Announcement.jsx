import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { SiDarkreader } from "react-icons/si";

import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";


const Container = styled.div`
	height: 60px;
	${mobile({ height: "50px" })}
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
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: "none" })}
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
	${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const DarkMode = styled.div`
	cursor: pointer;
	background-color: black;
`;

const MenuItem1 = styled.div`
	font-size: 14px;
	cursor: pointer;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Announcement = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	let token = localStorage.getItem("persist:root");
	if (token === null) {
		token = "Guest";
	} else {
		token = JSON.parse(token);
		token = JSON.parse(token.user);
		if (token.currentUser == null) {
			token = "Guest";
		} else {
			token = token.currentUser.username;
		}
	}

	const handleClick = () => {
		logoutUser();
	};

	if (token !== "Guest") {
		return (
      <Container>
        <Wrapper>
          <Left>
            <MenuItem1>welcome {token}</MenuItem1>
            <MenuItem>
              <button onClick={handleClick}>Logout</button>
            </MenuItem>
          </Left>
          <Right>
            {darkMode ? (
              <SiDarkreader className="CiDark" onClick={toggle} />
            ) : (
              <MdOutlineLightMode className="CiDark" onClick={toggle} />
            )}
            <Language>English - </Language>
            
            <SearchContainer>USD</SearchContainer>
          </Right>
        </Wrapper>
      </Container>
    );
	} else {
		return (
      <Container>
        <Wrapper>
          <Left>
            <MenuItem1>Welcome to Venuse store</MenuItem1>
            <MenuItem>
              <Link to="/Register">REGISTER</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Login">SIGN IN</Link>
            </MenuItem>
          </Left>
          <Right>
            {darkMode ? (
              <SiDarkreader className="CiDark" onClick={toggle} />
            ) : (
              <MdOutlineLightMode className="CiDark" onClick={toggle} />
            )}
            <Language>English - </Language>
            <SearchContainer>USD</SearchContainer>
          </Right>
        </Wrapper>
      </Container>
    );
	}
};

export default Announcement;
