import { render } from '../../../utils/customJestRender';
import { screen, fireEvent } from '@testing-library/react';
import MyPageView from '../view/MyPageView';
import { constants } from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';
import NonDataView from '../view/NonDataView';
import EachList from '../EachList';
import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from '../../../store';
import { PersistGate } from 'redux-persist/integration/react';

const text = constants.MYPAGE;
const nickName = '개구리';
const count = 1;
const onClickMoveRecommend = () => {};
const onClickBack = () => {};
const onClickMoveProfileEdit = () => {};
const reviewData = {
	content: '',
	create_date: '',
	file_masking_name: '',
	file_original_name: '',
	file_path: '',
	my_recommend: false,
	review_seq: 1,
	user_id: 1,
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

describe('MyPage Test', () => {
	it('Header text is rendered', () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<MyPageView
						text={text}
						onClickMoveRecommend={onClickMoveRecommend}
						nickName={nickName}
						count={count}
						reviewData={[reviewData]}
						onClickBack={onClickBack}
						onClickMoveProfileEdit={onClickMoveProfileEdit}
					/>
				</PersistGate>
			</Provider>
		);

		const element = screen.getByRole('header');

		expect(element).toBeInTheDocument();
	});

	it('Icon text is rendered', () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<MyPageView
						text={text}
						onClickMoveRecommend={onClickMoveRecommend}
						nickName={nickName}
						count={count}
						reviewData={[reviewData]}
						onClickBack={onClickBack}
						onClickMoveProfileEdit={onClickMoveProfileEdit}
					/>
				</PersistGate>
			</Provider>
		);

		const iconFirst = screen.getByText(constants.MYPAGE.ICON[0]);
		const iconSecond = screen.getByText(constants.MYPAGE.ICON[1]);
		const iconThird = screen.getByText(constants.MYPAGE.ICON[2]);

		expect(iconFirst).toBeInTheDocument();
		expect(iconSecond).toBeInTheDocument();
		expect(iconThird).toBeInTheDocument();
	});

	it('My review header is rendered', () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<MyPageView
						text={text}
						onClickMoveRecommend={onClickMoveRecommend}
						nickName={nickName}
						count={count}
						reviewData={[reviewData]}
						onClickBack={onClickBack}
						onClickMoveProfileEdit={onClickMoveProfileEdit}
					/>
				</PersistGate>
			</Provider>
		);

		const element = screen.getByText(constants.MYPAGE.REVIEW);

		expect(element).toBeInTheDocument();
	});

	it('When is clicked red button, move to recommend page', () => {
		const navigate = useNavigate();
		const onClickMoveRecommend = () => {
			navigate('/recommend');
		};

		render(<NonDataView text={text} onClickMoveRecommend={onClickMoveRecommend} />);

		const button = screen.getByRole('button');

		fireEvent.click(button);
		expect(mockNavigate).toBeCalledWith('/recommend');
	});

	it('When review is none, empty text is rendered', () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<MyPageView
						text={text}
						onClickMoveRecommend={onClickMoveRecommend}
						nickName={nickName}
						count={count}
						reviewData={[reviewData]}
						onClickBack={onClickBack}
						onClickMoveProfileEdit={onClickMoveProfileEdit}
					/>
				</PersistGate>
			</Provider>
		);

		const emptyText = screen.getByText(constants.MYPAGE.NON_DATA);
		const button = screen.getByText(constants.MYPAGE.RECOMMEND_BUTTON);

		expect(emptyText).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	it('When moreIcon is pressed, open the more button. When edit button is pressed, open the edit box.', () => {
		render(<EachList item={reviewData} index={1} length={3} />);

		const moreIcon = screen.getByRole('moreIcon');
		fireEvent.click(moreIcon);
		const editButton = screen.getByText(constants.MYPAGE.MORE_BUTTON.EDIT);
		expect(editButton).toBeInTheDocument();

		fireEvent.click(editButton);
		const dropBack = screen.getByRole('dropBack');

		expect(dropBack).toBeInTheDocument();
	});

	it('When moreIcon is pressed, open the more button. When remove button is pressed, open the modal.', () => {
		render(<EachList item={reviewData} index={1} length={3} />);

		const moreIcon = screen.getByRole('moreIcon');
		fireEvent.click(moreIcon);
		const removeButton = screen.getByText(constants.MYPAGE.MORE_BUTTON.REMOVE);
		expect(removeButton).toBeInTheDocument();

		fireEvent.click(removeButton);
		const modalHeader = screen.getByText(constants.MYPAGE.REMOVE_MODAL.header);

		expect(modalHeader).toBeInTheDocument();
	});
});
