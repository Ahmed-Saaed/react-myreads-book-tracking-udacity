import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';

class Book extends Component {
  state = {
    value: '',
    book: {},
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
    let {book} = this.props;
    return (
      <li key={book.id}>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${book.imageLinks &&
                  book.imageLinks.thumbnail})`,
              }}
            />
            <div className='book-shelf-changer'>
              <select
                value={this.state.value && book.shelf}
                onChange={(event) => this.shelfChange(event.target.value, book)}
              >
                <option value='move' disabled>
                  Move to...
                </option>
                <option value='currentlyReading'>Currently Reading</option>
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
    );
  }
}

export default Book;
