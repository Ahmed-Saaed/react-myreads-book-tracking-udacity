import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Book from './book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: [],

    book: {},
    value: '',
  };

  handleChange = (q) => {
    this.setState(() => ({
      query: q,
    }));

    if (q.length > 0) {
      BooksAPI.search(q)
        .then((books) => {
          this.setState(() => ({
            books,
          }));
        })
        .catch((err) => {
          console.error(err);
          this.setState(() => ({
            books: [],
          }));
        });
    } else {
      this.setState(() => ({
        books: [],
      }));
    }
  };

  updateBook = () => {
    let {value, book} = this.state;

    if (value.length > 0)
      BooksAPI.update(book, value).then(() => {
        book.shelf = value;
      });
  };

  shelfChange = (value, book) => {
    this.setState(() => ({value: value, book: book}), this.updateBook);
    console.log(book, value);
  };

  render() {
    console.log(this.state.books, this.state.query);
    console.log(`${this.state.value},${this.state.book}`);

    let {books, query} = this.state;

    return (
      <div>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link to='/' className='close-search' />
            <div className='search-books-input-wrapper'>
              <input
                value={query}
                onChange={(event) => this.handleChange(event.target.value)}
                type='text'
                placeholder='Search by title or author'
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {Array.isArray(books) ? (
                books.map((book) => <Book key={book.id} book={book} />)
              ) : (
                <div>try another book </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
