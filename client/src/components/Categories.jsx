import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import Catog from "../components/Catog";
// import CategoryItem from "../components/CategoryItem";


const Container = styled.div`
	display: flex;
	padding: 20px;
	justify-content: space-between;
	${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
	return (
		<Container>
			{categories.map((item) => (
				<Catog item={item} key={item.id} />
			))}
		</Container>
	);
};

export default Categories;
