import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from 'selectors';
import PropTypes from 'prop-types';
import { closeModal } from 'actions';
import { ShowIf } from 'components/Utils';
import { StyledModal } from './styled';

const customStyles = {
  content: {
    background: 'rgb(255, 255, 255)',
    borderRadius: '4px',
    bottom: 'auto',
    border: '1px solid rgb(204, 204, 204)',
    left: '50%',
    outline: 'none',
    overflow: 'visible',
    padding: '30px',
    paddingBottom: '60px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -75%)',
    right: 'auto',
  },
  overlay: {
    backgroundColor: 'rgb(51, 51, 51, .5)',
    overflow: 'auto',
  },
};

export default function BaseModal({ className }) {
  const dispatch = useDispatch();
  const modal = useSelector(modalSelector);

  const resetBodyOverFlow = () => {
    document.body.style.overflow = 'auto';
  };

  const setBodyOverFlow = () => {
    document.body.style.overflow = 'hidden';
  };

  const closeAppModal = () => {
    dispatch(closeModal());
    resetBodyOverFlow();
  };

  return (
    <StyledModal
      isOpen={modal.show}
      style={customStyles}
      onRequestClose={closeAppModal}
      onAfterOpen={setBodyOverFlow}
      className={className}
      {...modal.customProps}
    >
      <ShowIf condition={!modal.customProps.hideClose}>
        <button
          type="button"
          onClick={closeAppModal}
          className="ReactModal__Close"
        >
          &#10005;
        </button>
      </ShowIf>
      {modal.body &&
        React.cloneElement(modal.body, { closeModal: closeAppModal })}
    </StyledModal>
  );
}

BaseModal.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.string,
};

BaseModal.defaultProps = {
  className: '',
  placement: '',
};
