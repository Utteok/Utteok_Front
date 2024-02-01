import React, { useRef } from 'react';
import * as S from '../../style';
import icon from '../../../../assets/modalIcon.svg';
import { DropBack } from '../style';
import { useNavigate } from 'react-router-dom';

interface Props {
	modalHeader: string;
	modalAnswerWhite: string;
	modalAnswerRed: string;
}

export default function Modal(props: Props) {
	const navigator = useNavigate();

	// useEffect(() => {
	// 	const handler = (e: Document) => {
	// 		if (modalRef.current && !modalRef.current.contains(e.target)) {
	// 			props.setModal(false);
	// 		}
	// 	};
	// 	document.addEventListener('mousedown', handler);

	// 	return () => {
	// 		document.removeEventListener('mousedown', handler);
	// 	};
	// });

	return (
		<DropBack>
			<S.ModalCont>
				<S.ModalText>
					<S.ModalIcon src={icon} alt="접시,포크 아이콘" />
					{props.modalHeader}
				</S.ModalText>
				<S.ModalButtonLayout>
					<S.ModalWhiteButton
						onClick={() => {
							navigator('/recommend');
						}}
					>
						{props.modalAnswerWhite}
					</S.ModalWhiteButton>
					<S.ModalRedButton
						onClick={() => {
							navigator('/recommend');
						}}
					>
						{props.modalAnswerRed}
					</S.ModalRedButton>
				</S.ModalButtonLayout>
			</S.ModalCont>
		</DropBack>
	);
}
