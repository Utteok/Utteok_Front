import React, { useEffect, useState } from 'react';
import LoadedView from './view/LoadedView';
import { constants } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '../../store';
import { initializeType } from '../../slice/userPickSlice';
import { addStore, initialState } from '../../slice/findStoreSlice';
import { usePost } from '../../api/useFetch';
import { Action } from '../../slice/findStoreSlice';

export default function Loaded() {
	const [data, setData] = useState<Action>(initialState);
	const navigator = useNavigate();
	const dispatch = useDispatch();
	let [modal, setModal] = useState(false);
	let [popUp, setPopUp] = useState(false);

	const selector = useSelector((state: RootStateType) => {
		return state.userPick;
	});
	const postFunc = usePost('http://118.67.132.171:8080/api/findStore');

	const onClickReturn = () => {
		dispatch(initializeType(initialState));
		navigator('/pickTypes');
	};

	const onClickModal = () => {
		setModal(!modal);
	};

	const onClickAgreement = () => {
		setPopUp(true);
	};

	const postData: any = {};

	for (const [key, value] of Object.entries(selector)) {
		postData[key] = value.code;
	}

	useEffect(() => {
		postFunc(postData).then((res: any) => {
			setData(res.data);
			dispatch(addStore(res.data));
		});
	}, []);

	const renderModal = () => {
		if (modal) {
			return true;
		}
		return false;
	};

	const isNonChainStore = () => {
		if (data?.store_address) {
			return true;
		}
		return false;
	};

	const isNonData = () => {
		if (data?.review === '') {
			return true;
		}
		return false;
	};

	return (
		<>
			{popUp ? (
				<Popup popUpHeader={constants.POPUP.header} popUpMessage={constants.POPUP.message} />
			) : (
				<LoadedView
					loadedHeader={constants.LOADED.header}
					loadedMessage={constants.LOADED.message}
					onClickReturn={onClickReturn}
					onClickModal={onClickModal}
					onClickAgreement={onClickAgreement}
					data={data}
					renderModal={renderModal}
					isNonChainStore={isNonChainStore}
					isNonData={isNonData}
				/>
			)}
		</>
	);
}
