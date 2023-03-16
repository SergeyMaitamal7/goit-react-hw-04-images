import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarForm,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export function Searchbar({ submit }) {
  const [query, setQuery] = useState('');

  const handleClickChange = e => {
    const { value } = e.currentTarget;
    setQuery(value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.failure(
        'The search string cannot be empty. Please specify your search query.'
      );
      return;
    }
    submit({ query });
    resetForm();
  };

  const resetForm = e => {
    setQuery('');
  };
  return (
    <SearchbarForm>
      <SearchForm onSubmit={handleSubmitForm}>
        <SearchFormButton type="submit">
          {' '}
          <BsSearch size="2rem" color="black" />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>
        <Input
          onChange={handleClickChange}
          name="input"
          value={query}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarForm>
  );
}

Searchbar.propTypes = {
  query: PropTypes.string,
};
