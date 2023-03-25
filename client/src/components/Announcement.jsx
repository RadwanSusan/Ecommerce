import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

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

const Logo = styled.h1`
	font-weight: bold;
	${mobile({ fontSize: "24px" })}
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
const MenuItem1 = styled.div`
	font-size: 14px;
	cursor: pointer;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Announcement = () => {
	return (
		<Container>
			<Wrapper>
				<Left>
					<MenuItem1>Default welcome msg!</MenuItem1>
					<MenuItem>REGISTER</MenuItem>
					<MenuItem>SIGN IN</MenuItem>
				</Left>
				<Right>
					<Language>English - </Language>
					<SearchContainer>USD</SearchContainer>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Announcement;
