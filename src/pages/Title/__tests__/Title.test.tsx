import React from 'react';
import { render } from '../../../utils/customJestRender';
import { fireEvent, screen } from '@testing-library/react';
import TitleView from '../TitleView';
import { theme } from '../../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../constants/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGet } from '../../../api/useFetch';
import { RootStateType } from '../../../store';

const bgcolor = [theme.color.TITLE.PINK, theme.color.TITLE.SKY, theme.color.TITLE.YELLOW];
const title = {
	countTitle: {
		count: 6,
		title_name: '',
		user_id: 3,
	},
	haveTitle: ['역시 근본', '주는대로 먹을게', '파인애플 극혐', '맛도리', '돌고 돌아 순정', '역시 근본'],
};
const role = ['firstList', 'secondList', 'thirdList'];
const hasLastConsonantLetter = () => true;
const onClickMoveLock = () => {};

// useNavigate 모킹
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'), // 실제 모듈을 가져와서 사용
	useNavigate: jest.fn(), // useNavigate를 jest mock 함수로 대체
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

describe('Title Test', () => {
	it('뒤로가기 버튼 동작 테스트', () => {
		const navigator = useNavigate();
		const onClickMoveBack = () => {
			navigator(-1);
		};

		render(
			<TitleView
				nickName="만두"
				title={title}
				bgcolor={bgcolor}
				role={role}
				moveText={constants.TITLE.MOVE}
				onClickMoveBack={onClickMoveBack}
				onClickMoveLock={onClickMoveLock}
				hasLastConsonantLetter={hasLastConsonantLetter}
			/>
		);

		const element = screen.getByRole('back');

		fireEvent.click(element);
		expect(mockNavigate).toBeCalledWith(-1);
	});

	it('헤더 텍스트가 잘 나오는지 테스트', () => {
		render(
			<TitleView
				nickName="개굴"
				title={title}
				bgcolor={bgcolor}
				role={role}
				moveText={constants.TITLE.MOVE}
				hasLastConsonantLetter={hasLastConsonantLetter}
			/>
		);

		const elementFirst = screen.getByText('개굴이 모은');
		const elementSecond = screen.getByText('칭호는 6개야!');

		expect(elementFirst).toBeInTheDocument();
		expect(elementSecond).toBeInTheDocument();
	});

	it('칭호 리스트 background-color가 반복해서 맞게 나오는지 테스트', () => {
		render(
			<TitleView
				nickName="개구리"
				title={title}
				bgcolor={bgcolor}
				role={role}
				moveText={constants.TITLE.MOVE}
				onClickMoveLock={onClickMoveLock}
				hasLastConsonantLetter={hasLastConsonantLetter}
			/>
		);

		const elementFirst = screen.getAllByRole('firstList');
		const elementSecond = screen.getAllByRole('secondList');
		const elementThird = screen.getAllByRole('thirdList');

		elementFirst.forEach((element) => {
			expect(element).toHaveStyle({ backgroundColor: `${theme.color.TITLE.PINK}` });
		});

		elementSecond.forEach((element) => {
			expect(element).toHaveStyle({ backgroundColor: `${theme.color.TITLE.SKY}` });
		});

		elementThird.forEach((element) => {
			expect(element).toHaveStyle({ backgroundColor: `${theme.color.TITLE.YELLOW}` });
		});
	});

	it('locked 칭호 페이지로 이동하는 버튼의 텍스트 렌더링 테스트', () => {
		render(
			<TitleView
				nickName="개구리"
				title={title}
				bgcolor={bgcolor}
				role={role}
				moveText={constants.TITLE.MOVE}
				onClickMoveLock={onClickMoveLock}
				hasLastConsonantLetter={hasLastConsonantLetter}
			/>
		);

		const element = screen.getByText('아직 못 받은 칭호도 구경해봐!');
		expect(element).toBeInTheDocument();
	});

	it('locked 칭호 페이지로 이동하는 버튼의 동작 테스트', () => {
		const navigator = useNavigate();
		const onClickMoveLock = () => {
			navigator('/locked-title');
		};

		render(
			<TitleView
				nickName="개구리"
				title={title}
				bgcolor={bgcolor}
				role={role}
				moveText={constants.TITLE.MOVE}
				onClickMoveLock={onClickMoveLock}
				hasLastConsonantLetter={hasLastConsonantLetter}
			/>
		);

		const element = screen.getByRole('move');

		fireEvent.click(element);
		expect(mockNavigate).toBeCalledWith('/locked-title');
	});
});
