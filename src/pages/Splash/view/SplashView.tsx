import React from 'react';
import * as S from '../style';
import Logo from '../../../assets/Logo.svg';
import LoginButtons from '../LoginButtons';

export interface Props {
	onClickMove(): void;
	header: string[];
	guestText: string;
}

export default function SplashView(props: Props) {
	return (
		<S.Layout>
			<S.LogoCont>
				<S.LogoText>{props.header[0]}</S.LogoText>
				<S.LogoText>{props.header[1]}</S.LogoText>
				<S.Logo src={Logo} />
			</S.LogoCont>
			<LoginButtons />
			<S.NonLoginText onClick={props.onClickMove}>{props.guestText}</S.NonLoginText>
		</S.Layout>
	);
}