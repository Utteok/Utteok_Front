import React, { useRef } from 'react';
import EachListView from './view/EachListView';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store';
import { Response } from './PickTypes';

export interface Props {
	question: Response;
	questionIndex: number;
	answerList: Response[][];
	onClickDelete: (type: string) => void;
}

export default function EachList(props: Props) {
	const element = useRef<HTMLLIElement>(null);
	const onMoveBox = () => {
		element.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	const selector = useSelector((state: RootStateType) => {
		return state.userPick;
	});

	// 숨겨진 질문을 보일 것인지 체크
	function isHiddenOptions() {
		const key = 'question' + props.questionIndex;
		if (
			(props.questionIndex === 1 && selector[key].name_ko !== '다른거') ||
			(props.questionIndex === 5 && selector[key].name_ko !== '매운거')
		) {
			return true;
		}
		return false;
	}

	// 블록 레이아웃으로 감쌀 것인지 체크
	function isBlockLayout() {
		if (props.questionIndex === 5) {
			return true;
		}
		return false;
	}

	return (
		<EachListView
			element={element}
			onMoveBox={onMoveBox}
			question={props.question}
			questionIndex={props.questionIndex}
			answerList={props.answerList}
			onClickDelete={props.onClickDelete}
			isHiddenOptions={isHiddenOptions}
			isBlockLayout={isBlockLayout}
		/>
	);
}
