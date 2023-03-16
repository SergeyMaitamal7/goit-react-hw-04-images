import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiImages } from 'api/Api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [arrayImg, setArrayImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    asyncFetch();
    async function asyncFetch() {
      try {
        setLoader(true);
        const { hits, totalHits } = await apiImages(query, page, perPage);
        if (totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setArrayImg([...arrayImg, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
        return;
      }
    }
  }, [arrayImg, page, perPage, query]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLargeImage = image => {
    setLargeUrl(image.largeImageURL);
    setShowModal(true);
  };

  const handleSubmit = ({ query }) => {
    console.log(query);
    setQuery(query);
    setPage(1);
    setArrayImg([]);
    setShowBtn(false);
  };

  const handleButtonLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Searchbar submit={handleSubmit}></Searchbar>
      {arrayImg && (
        <ImageGallery images={arrayImg} сlick={handleLargeImage}></ImageGallery>
      )}
      {showBtn && <Button onLoadMore={handleButtonLoadMore}>Load more</Button>}
      {showModal && <Modal onClose={toggleModal} largeUrl={largeUrl}></Modal>}
      {loader && <Loader></Loader>}
    </Container>
  );
}

App.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.bool,
  arrayImg: PropTypes.array,
  shouModal: PropTypes.bool,
  largeUrl: PropTypes.string,
  loader: PropTypes.bool,
};
