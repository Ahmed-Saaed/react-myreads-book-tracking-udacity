import React from 'react';
import {Route, Routes} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import BooksList from './components/books';
import Search from './components/search';
import NotFound from './components/notfound';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  //fetch the books from the api

  async componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  //update the shelf and call the api again
  updateBook = (value, book) => {
    book.shelf = value;

    this.setState(() => ({
      books: this.state.books.filter((b) => b.id !== book.id).concat([book]),
    }));

    if (value.length > 0) BooksAPI.update(book, value);
  };

  render() {
    return (
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <BooksList
                books={this.state.books}
                updateBook={this.updateBook}
              />
            }
          />
          <Route
            path='/search'
            element={
              <Search books={this.state.books} updateBook={this.updateBook} />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
