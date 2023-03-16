import PropTypes from 'prop-types';
import { useEffect} from 'react';
import { Overlay, ModalForm, Imglarge } from './Modal.styled';

export function Modal({ onClose, largeUrl }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleCloseBackdrop}>
      <ModalForm>
        <Imglarge src={largeUrl} />
      </ModalForm>
    </Overlay>
  );
}

Modal.propTypes = {
  largeUrl: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};
