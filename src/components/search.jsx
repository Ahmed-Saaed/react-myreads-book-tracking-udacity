import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: [],

    id: '',
    value: '',
  };

  componentDidUpdat() {}

  handleChange = (q) => {
    this.setState(() => ({
      query: q.trim(),
    }));

    BooksAPI.search(q)
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  shelfChange(v, i) {
    this.setState(() => ({value: v, id: i}));
  }

  render() {
    console.log(this.state.books);
    console.log(`${this.state.value} ...${this.state.id}`);

    return (
      <div>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link to='/' className='close-search' />
            <div className='search-books-input-wrapper'>
              <input
                value={this.state.query}
                onChange={(event) => this.handleChange(event.target.value)}
                type='text'
                placeholder='Search by title or author'
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {this.state.query &&
                this.state.books.map((book) => (
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
                              this.shelfChange(event.target.value, book.id)
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
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
