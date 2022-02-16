import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class BooksList extends Component {
  state = {
    value: '',
    id: '',
    books: [],
  };

  shelfChange(v, i) {
    this.setState(() => ({value: v, id: i}));
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  componentDidUpdate() {
    BooksAPI.update(this.state.id, this.state.value);
  }

  render() {
    console.log(`${this.state.value} ...${this.state.id}`);
    let {books} = this.state;
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
                                  value={this.state.value}
                                  onChange={(event) =>
                                    this.shelfChange(
                                      event.target.value,
                                      book.id
                                    )
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
                                    this.shelfChange(
                                      event.target.value,
                                      book.id
                                    )
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
                                    this.shelfChange(
                                      event.target.value,
                                      book.id
                                    )
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
