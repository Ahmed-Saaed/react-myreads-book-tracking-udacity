import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
    }
  };

  updateBook = () => {
    let {value, book} = this.state;

    if (value.length > 0)
      BooksAPI.update(book, value).then((response) => {
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
                books.map((book) => (
                  <li key={book.id}>
                    <div className='book'>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${
                              book.imageLinks.thumbnail
                            })`,
                          }}
                        />
                        <div className='book-shelf-changer'>
                          <select
                            value={this.state.value}
                            onChange={(event) =>
                              this.shelfChange(event.target.value, book)
                            }
                          >
                            <option value='move' disabled>
                              Move to...
                            </option>
                            <option value='currentlyReading'>
                              Currently Reading
                            </option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>{book.title}</div>
                      <div className='book-authors'>{book.authors}</div>
                    </div>
                  </li>
                ))
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
