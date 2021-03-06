import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './book.js';

class BooksList extends Component {
  render() {
    let {books, updateBook} = this.props;
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
                        <Book
                          key={book.id}
                          book={book}
                          updateBook={updateBook}
                        />
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
                        <Book
                          key={book.id}
                          book={book}
                          updateBook={updateBook}
                        />
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
                        <Book
                          key={book.id}
                          book={book}
                          updateBook={updateBook}
                        />
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
