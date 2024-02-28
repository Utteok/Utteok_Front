import React from 'react';
import EachListView from './view/EachListView';
import { RecommendListProps } from './view/RecommendListView';
import { useNavigate } from 'react-router-dom';

interface EachListProps {
	data: any;
}

export default function EachList(props: EachListProps) {
	const navigate = useNavigate();
	const onClickMoveDetail = (id: string) => {
		navigate(`/recommend/${props.data.review_seq}`);
	};

	return <EachListView data={props.data} onClickMoveDetail={onClickMoveDetail} />;
}
