import styled from 'styled-components';

export const NavBar = styled.nav`
	width: 390px;
	height: 88px;
	background-color: #fff;
	padding: 0 32px 0 33px;

	display: flex;
	gap: 57px;
	box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
	position: sticky;
	bottom: 0;
	z-index: 20;
`;

type NavICon = {
	size: string;
	$margin: string;
};

export const Figure = styled.figure`
	width: 100%;
	position: relative;
	padding-bottom: 23px;
	cursor: pointer;
`;

export const NavIcon = styled.img<NavICon>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	margin: ${(props) => props.$margin};
`;

export const NavText = styled.figcaption`
	font-size: 12px;
	font-weight: 400;
	text-align: center;
	overflow: display;
`;

export const ReviewText = styled(NavText)`
	width: 45px;
	position: absolute;
	left: -3px;
`;
