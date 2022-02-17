import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class BooksList extends Component {
  state = {
    value: '',
    book: {},
  };

  shelfChange = (v, b) => {
    this.setState(() => ({value: v, book: b}));
  };

  componentDidUpdate() {
    const {book, value} = this.state;
    console.log(book, value);

    if (this.state.value !== '') BooksAPI.update(book, value);
  }

  render() {
    let {books} = this.props;
    console.log(books);
    return (
      <div>
        <div className='list-books'>
          <div className='list-books-title'>
            <h1>MyReads</h1>
          </div>
          <div className='list-books-content'>
            <div>
              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Currently Reading</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {books
                      .filter((book) => book.shelf === 'currentlyReading')
                      .map((book) => (
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
                                  default={book.shelf}
                                  value={book.shelf}
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
                                  <option value='wantToRead'>
                                    Want to Read
                                  </option>
                                  <option value='read'>Read</option>
                                  <option value='none'>None</option>
                                </select>
                              </div>
                            </div>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-authors'>{book.authors}</div>
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Want to Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {books
                      .filter((book) => book.shelf === 'wantToRead')
                      .map((book) => (
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
                                  <option value='wantToRead'>
                                    Want to Read
                                  </option>
                                  <option value='read'>Read</option>
                                  <option value='none'>None</option>
                                </select>
                              </div>
                            </div>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-authors'>{book.authors}</div>
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {books
                      .filter((book) => book.shelf === 'read')
                      .map((book) => (
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
                                  <option value='wantToRead'>
                                    Want to Read
                                  </option>
                                  <option value='read'>Read</option>
                                  <option value='none'>None</option>
                                </select>
                              </div>
                            </div>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-authors'>{book.authors}</div>
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='open-search'>
            <Link className='button' to='/search' />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksList;
