import styled from 'styled-components';
import { Header } from '../Loading/style';
import { LoadCont } from '../Loaded/style';
import { Layout } from '../Popup/style';

export const RecommendDetailLayout = styled(Layout)`
	background-color: #fff;
`;

export const RecommendDetailHeader = styled(Header)`
	margin-bottom: 60px;
`;

export const RecommendLoadCont = styled(LoadCont)`
	margin: 0 auto;
	margin-bottom: 60px;
`;

export const RecommendImg = styled.img`
	width: 100%;
	height: 286px;
	border-radius: ${(props) => props.theme.borderRadius.lv4} ${(props) => props.theme.borderRadius.lv4} 0 0;
`;

export const EmptyImg = styled.div`
	width: 100%;
	height: 286px;
	border-radius: ${(props) => props.theme.borderRadius.lv4} ${(props) => props.theme.borderRadius.lv4} 0 0;
	background-color: ${(props) => props.theme.color.gray};
`;

export const RecommendText = styled.div`
	width: 100%;
	height: 114px;
	padding: 16px;
	display: flex;
	gap: 16px;
	border-top: 1px solid ${(props) => props.theme.color.gray};
	z-index: 10;
`;

export const RecommendIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const RecommendContent = styled.p`
	font-size: ${(props) => props.theme.fontSize.lv2};
	line-height: 20px;
	text-align: initial;
`;
