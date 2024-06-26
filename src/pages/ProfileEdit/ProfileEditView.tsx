import React from 'react';
import * as S from './style';
import { Section, Button, Header, Main, MyInfoAndReviewCont } from '../MyPage/style';
import profile from '../../assets/프로필 사진.svg';
import Navigation from '../../components/Navigation/Navigation';

interface ProfileEdit {
	text: {
		header: string;
		NICK_NAME: string;
		VALIDATION: {
			TRUE: string;
			ERROR_DUPLICATE: string;
			ERROR_INVALID: string;
		};
		button: string;
	};
	onClickBack: () => void;
	originName: string;
	nickName: string;
	onChangeNickName: (name: string) => void;
	invalidName: boolean;
	editNickName: () => void;
	duplicated: boolean;
}

export default function ProfileEditView(props: ProfileEdit) {
	return (
		<>
			<Section>
				<Header role="header">
					<Button onClick={props.onClickBack} />
					{props.text.header}
					<S.Span onClick={props.editNickName}>{props.text.button}</S.Span>
				</Header>
				<Main>
					<MyInfoAndReviewCont $padding="16px">
						<S.Profile src={profile} alt=" 기본 프로필" />
						<S.Label>
							{props.text.NICK_NAME}
							<S.Input
								placeholder={props.originName}
								onChange={(e) => {
									props.onChangeNickName(e.target.value);
								}}
							/>

							{props.originName != props.nickName ? (
								props.invalidName ? (
									<S.InvalidName>{props.text.VALIDATION.ERROR_INVALID}</S.InvalidName>
								) : props.duplicated ? (
									<S.InvalidName>{props.text.VALIDATION.ERROR_DUPLICATE}</S.InvalidName>
								) : (
									<S.ValidName>{props.text.VALIDATION.TRUE}</S.ValidName>
								)
							) : null}
						</S.Label>
					</MyInfoAndReviewCont>
				</Main>
			</Section>
			<Navigation />
		</>
	);
}
