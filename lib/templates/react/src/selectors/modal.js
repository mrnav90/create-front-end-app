import { createSelector } from 'reselect';
import { initialState } from 'reducers/modal';

const selectModal = state => state.modal || initialState;
const modalSelector = createSelector(selectModal, modalState => modalState);

export { modalSelector };
