"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Artist = require("../models/Artist");

var _Album = require("../models/Album");

var _Track = require("../models/Track");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MusicDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function MusicDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, MusicDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "MUSIC");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    // Set all class properties
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }
  /**
    * CRUD method to return all Artists.
    * 
    * @param callback Callback function with an Array of type Artist.
    */


  (0, _createClass2.default)(MusicDAO, [{
    key: "findArtists",
    value: function findArtists(callback) {
      // List of Artist to return
      var artists = []; // Get a pooled connection to the database, run the query to get all the distinct Artists, and return the List of Artists

      this.pool.getConnection(function (err, connection) {
        try {
          // Run query    
          connection.query('SELECT distinct ARTIST FROM ALBUM', function (err, rows, fields) {
            // Release connection in the pool
            connection.release(); // Throw error if an error

            if (err) throw err; // Loop over result set and save the Artist Name in the List of Artists

            for (var x = 0; x < rows.length; ++x) {
              artists.push(new _Artist.Artist(x, rows[x].ARTIST));
            } // Do a callback to return the results


            callback(artists);
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
    /**
    * CRUD method to return all Albums for an artist.
    * 
    * @param artist Name of the Artist to retrieve Albums for.
    * @param callback Callback function with an Array of type Album.
    */

  }, {
    key: "findAlbums",
    value: function findAlbums(artist, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, x, albumId, tracks, result2, y;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist

                  connection.query = util.promisify(connection.query);
                  _context.next = 4;
                  return connection.query('SELECT * FROM ALBUM WHERE ARTIST=? ORDER BY YEAR, TITLE', [artist]);

                case 4:
                  result1 = _context.sent;
                  x = 0;

                case 6:
                  if (!(x < result1.length)) {
                    _context.next = 17;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context.next = 11;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 11:
                  result2 = _context.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 14:
                  ++x;
                  _context.next = 6;
                  break;

                case 17:
                  // Do a callback to return the results
                  callback(albums);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to return all Albums.
     * 
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAllAlbums",
    value: function findAllAlbums(callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x, albumId, tracks, result2, y;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to get all Albums

                  connection.query = util.promisify(connection.query);
                  _context2.next = 4;
                  return connection.query('SELECT * FROM ALBUM ORDER BY YEAR, TITLE');

                case 4:
                  result1 = _context2.sent;
                  x = 0;

                case 6:
                  if (!(x < result1.length)) {
                    _context2.next = 17;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context2.next = 11;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 11:
                  result2 = _context2.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 14:
                  ++x;
                  _context2.next = 6;
                  break;

                case 17:
                  // Do a callback to return the results
                  callback(albums);

                case 18:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAlbumsByArtist",
    value: function findAlbumsByArtist(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x, albumId, tracks, result2, y;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist

                  connection.query = util.promisify(connection.query);
                  _context3.next = 4;
                  return connection.query("SELECT * FROM ALBUM WHERE ARTIST LIKE ? ORDER BY YEAR, TITLE", ['%' + search + '%']);

                case 4:
                  result1 = _context3.sent;
                  x = 0;

                case 6:
                  if (!(x < result1.length)) {
                    _context3.next = 17;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context3.next = 11;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 11:
                  result2 = _context3.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 14:
                  ++x;
                  _context3.next = 6;
                  break;

                case 17:
                  // Do a callback to return the results
                  callback(albums);

                case 18:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to searches for all Albums by a wildcard serach in Description.
    * 
    * @param search wildcard Description to search Albums for.
    * @param callback Callback function with an Array of type Album.
    */

  }, {
    key: "findAlbumsByDescription",
    value: function findAlbumsByDescription(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x, albumId, tracks, result2, y;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist

                  connection.query = util.promisify(connection.query);
                  _context4.next = 4;
                  return connection.query("SELECT * FROM ALBUM WHERE DESCRIPTION LIKE ? ORDER BY YEAR, TITLE", ['%' + search + '%']);

                case 4:
                  result1 = _context4.sent;
                  x = 0;

                case 6:
                  if (!(x < result1.length)) {
                    _context4.next = 17;
                    break;
                  }

                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                  albumId = result1[x].ID;
                  tracks = [];
                  _context4.next = 11;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 11:
                  result2 = _context4.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Add Album and its Tracks to the list


                  albums.push(new _Album.Album(result1[x].ID, result1[x].TITLE, result1[x].ARTIST, result1[x].DESCRIPTION, result1[x].YEAR, result1[x].IMAGE_NAME, tracks));

                case 14:
                  ++x;
                  _context4.next = 6;
                  break;

                case 17:
                  // Do a callback to return the results
                  callback(albums);

                case 18:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to return an Album.
     * 
     * @param albumId Album ID to retrieve Album for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findAlbum",
    value: function findAlbum(albumId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var result1, tracks, result2, y, album;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist

                  connection.query = util.promisify(connection.query);
                  _context5.next = 4;
                  return connection.query('SELECT * FROM ALBUM WHERE ID=?', [albumId]);

                case 4:
                  result1 = _context5.sent;
                  if (result1.length != 1) callback(null); // Use Promisfy Util to make an async function and run query to get all Tracks for this Album

                  tracks = [];
                  _context5.next = 9;
                  return connection.query('SELECT * FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 9:
                  result2 = _context5.sent;

                  for (y = 0; y < result2.length; ++y) {
                    tracks.push(new _Track.Track(result2[y].ID, result2[y].NUMBER, result2[y].TITLE, result2[y].LYRICS, result2[y].VIDEO_URL));
                  } // Create an Album and its Tracks for return


                  album = new _Album.Album(result1[0].ID, result1[0].TITLE, result1[0].ARTIST, result1[0].DESCRIPTION, result1[0].YEAR, result1[0].IMAGE_NAME, tracks); // Do a callback to return the results

                  callback(album);

                case 13:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to create an Album.
     * 
     * @param album Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */

  }, {
    key: "create",
    value: function create(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result1, albumId, y, result2;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and insert Album

                  connection.query = util.promisify(connection.query);
                  _context6.next = 4;
                  return connection.query('INSERT INTO ALBUM (TITLE, ARTIST, DESCRIPTION, YEAR, IMAGE_NAME) VALUES(?,?,?,?,?)', [album.Title, album.Artist, album.Description, album.Year, album.Image]);

                case 4:
                  result1 = _context6.sent;
                  if (result1.affectedRows != 1) callback(-1); // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album

                  albumId = result1.insertId;
                  y = 0;

                case 8:
                  if (!(y < album.Tracks.length)) {
                    _context6.next = 15;
                    break;
                  }

                  _context6.next = 11;
                  return connection.query('INSERT INTO TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL) VALUES(?,?,?,?)', [albumId, album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video]);

                case 11:
                  result2 = _context6.sent;

                case 12:
                  ++y;
                  _context6.next = 8;
                  break;

                case 15:
                  // Do a callback to return the results
                  callback(albumId);

                case 16:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to update an Album.
     * 
     * @param album Album to update.
     * @param callback Callback function with number of rows updated.  
     */

  }, {
    key: "update",
    value: function update(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var changes, result1, y, result2;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and update Album

                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context7.next = 5;
                  return connection.query('UPDATE ALBUM SET TITLE=?, ARTIST=?, DESCRIPTION=?, YEAR=?, IMAGE_NAME=? WHERE ID=?', [album.Title, album.Artist, album.Description, album.Year, album.Image, album.Id]);

                case 5:
                  result1 = _context7.sent;
                  if (result1.changedRows != 0) ++changes; // Use Promisfy Util to make an async function and run query to update all Tracks for this Album

                  y = 0;

                case 8:
                  if (!(y < album.Tracks.length)) {
                    _context7.next = 16;
                    break;
                  }

                  _context7.next = 11;
                  return connection.query('UPDATE TRACK SET TITLE=?, NUMBER=?, VIDEO_URL=? WHERE ID=? AND ALBUM_ID=?', [album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video, album.Tracks[y].Id, album.Id]);

                case 11:
                  result2 = _context7.sent;
                  if (result2.changedRows != 0) ++changes;

                case 13:
                  ++y;
                  _context7.next = 8;
                  break;

                case 16:
                  // Do a callback to return the results
                  callback(changes);

                case 17:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete an Album.
    * 
    * @param album Album ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(albumId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(err, connection) {
          var changes, result1, result2;
          return _regenerator.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error
                  //if (err) throw err;
                  // Use Promisfy Util to make an async function and run query to delete the tracks for an Album

                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context8.next = 5;
                  return connection.query('DELETE FROM TRACK WHERE ALBUM_ID=?', [albumId]);

                case 5:
                  result1 = _context8.sent;
                  changes = changes + result1.affectedRows; // Use Promisfy Util to make an async function and run query to delete the Album

                  _context8.next = 9;
                  return connection.query('DELETE FROM ALBUM WHERE ID=?', [albumId]);

                case 9:
                  result2 = _context8.sent;
                  changes = changes + result2.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 12:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return MusicDAO;
}();

exports.MusicDAO = MusicDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9NdXNpY0RBTy50cyJdLCJuYW1lcyI6WyJNdXNpY0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwiY2FsbGJhY2siLCJhcnRpc3RzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwieCIsImxlbmd0aCIsInB1c2giLCJBcnRpc3QiLCJBUlRJU1QiLCJjb25zb2xlIiwibG9nIiwiYXJ0aXN0IiwiYWxidW1zIiwidXRpbCIsInByb21pc2lmeSIsInJlc3VsdDEiLCJhbGJ1bUlkIiwiSUQiLCJ0cmFja3MiLCJyZXN1bHQyIiwieSIsIlRyYWNrIiwiTlVNQkVSIiwiVElUTEUiLCJMWVJJQ1MiLCJWSURFT19VUkwiLCJBbGJ1bSIsIkRFU0NSSVBUSU9OIiwiWUVBUiIsIklNQUdFX05BTUUiLCJzZWFyY2giLCJhbGJ1bSIsIlRpdGxlIiwiRGVzY3JpcHRpb24iLCJZZWFyIiwiSW1hZ2UiLCJhZmZlY3RlZFJvd3MiLCJpbnNlcnRJZCIsIlRyYWNrcyIsIk51bWJlciIsIlZpZGVvIiwiY2hhbmdlcyIsIklkIiwiY2hhbmdlZFJvd3MiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFFYUEsUTtBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksb0JBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBZnNCLEVBZXRCO0FBQUEsZ0RBZHNCLElBY3RCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEsb0RB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O0FBRUE7QUFDSjtBQUNBOzs7O1dBQ0ksNEJBQ0E7QUFDSSxhQUFPRyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFBQ3hELFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUN3RCxRQUFBQSxJQUFJLEVBQUUsS0FBS3ZELFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZ1RCxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnRpc3QgfSBmcm9tIFwiLi4vbW9kZWxzL0FydGlzdFwiO1xyXG5pbXBvcnQgeyBBbGJ1bSB9IGZyb20gXCIuLi9tb2RlbHMvQWxidW1cIjtcclxuaW1wb3J0IHsgVHJhY2sgfSBmcm9tIFwiLi4vbW9kZWxzL1RyYWNrXCI7XHJcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVzaWNEQU9cclxue1xyXG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcclxuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcGFzc3dvcmQ6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiTVVTSUNcIjtcclxuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBBcnRpc3RzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFydGlzdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRBcnRpc3RzKGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gTGlzdCBvZiBBcnRpc3QgdG8gcmV0dXJuXHJcbiAgICAgICAgbGV0IGFydGlzdHM6QXJ0aXN0W10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgZGlzdGluY3QgQXJ0aXN0cywgYW5kIHJldHVybiB0aGUgTGlzdCBvZiBBcnRpc3RzXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAvLyBSdW4gcXVlcnkgICAgXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgZGlzdGluY3QgQVJUSVNUIEZST00gQUxCVU0nLCBmdW5jdGlvbiAoZXJyOmFueSwgcm93czphbnksIGZpZWxkczphbnkpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvb3Agb3ZlciByZXN1bHQgc2V0IGFuZCBzYXZlIHRoZSBBcnRpc3QgTmFtZSBpbiB0aGUgTGlzdCBvZiBBcnRpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFydGlzdHMucHVzaChuZXcgQXJ0aXN0KHgsIHJvd3NbeF0uQVJUSVNUKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYXJ0aXN0cyk7XHJcbiAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgQWxidW1zIGZvciBhbiBhcnRpc3QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhcnRpc3QgTmFtZSBvZiB0aGUgQXJ0aXN0IHRvIHJldHJpZXZlIEFsYnVtcyBmb3IuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEFsYnVtcyhhcnRpc3Q6c3RyaW5nLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgICAvLyBMaXN0IG9mIEFsYnVtcyB0byByZXR1cm5cclxuICAgICAgICAgbGV0IGFsYnVtczpBbGJ1bVtdID0gW107XHJcblxyXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXHJcbiAgICAgICAgICAgIC8vaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzcGVjaWZpYyBBcnRpc3RcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gQUxCVU0gV0hFUkUgQVJUSVNUPT8gT1JERVIgQlkgWUVBUiwgVElUTEUnLCBbYXJ0aXN0XSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cclxuICAgICAgICAgICAgICAgIGxldCBhbGJ1bUlkID0gcmVzdWx0MVt4XS5JRDtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja3M6VHJhY2tbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEPT8nLCBbYWxidW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaChuZXcgVHJhY2socmVzdWx0Mlt5XS5JRCwgcmVzdWx0Mlt5XS5OVU1CRVIsIHJlc3VsdDJbeV0uVElUTEUsIHJlc3VsdDJbeV0uTFlSSUNTLCByZXN1bHQyW3ldLlZJREVPX1VSTCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBBbGJ1bSBhbmQgaXRzIFRyYWNrcyB0byB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgYWxidW1zLnB1c2gobmV3IEFsYnVtKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uVElUTEUsIHJlc3VsdDFbeF0uQVJUSVNULCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLllFQVIsIHJlc3VsdDFbeF0uSU1BR0VfTkFNRSwgdHJhY2tzKSk7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgICAgICAgICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBBbGJ1bXMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgQWxidW0uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQWxsQWxidW1zKGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxyXG4gICAgICAgICBsZXQgYWxidW1zOkFsYnVtW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgLy9pZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXNcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gQUxCVU0gT1JERVIgQlkgWUVBUiwgVElUTEUnKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxyXG4gICAgICAgICAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHQxW3hdLklEO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrczpUcmFja1tdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICBhbGJ1bXMucHVzaChuZXcgQWxidW0ocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5USVRMRSwgcmVzdWx0MVt4XS5BUlRJU1QsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uWUVBUiwgcmVzdWx0MVt4XS5JTUFHRV9OQU1FLCB0cmFja3MpKTsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGFsYnVtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBzZWFyY2hlcyBmb3IgYWxsIEFsYnVtcyBieSBhIHdpbGRhcmQgc2VhcmNoIGluIEFydGlzdC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHNlYXJjaCB3aWxkY2FyZCBBcnRpc3QgdG8gc2VhcmNoIEFsYnVtcyBmb3IuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEFsYnVtc0J5QXJ0aXN0KHNlYXJjaDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxyXG4gICAgICAgICBsZXQgYWxidW1zOkFsYnVtW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgLy9pZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNlYXJjaCBwYXJ0aWFsIEFydGlzdFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gQUxCVU0gV0hFUkUgQVJUSVNUIExJS0UgPyBPUkRFUiBCWSBZRUFSLCBUSVRMRVwiLCBbJyUnICsgc2VhcmNoICsgJyUnXSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cclxuICAgICAgICAgICAgICAgIGxldCBhbGJ1bUlkID0gcmVzdWx0MVt4XS5JRDtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja3M6VHJhY2tbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEPT8nLCBbYWxidW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB5PTA7eSA8IHJlc3VsdDIubGVuZ3RoOysreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaChuZXcgVHJhY2socmVzdWx0Mlt5XS5JRCwgcmVzdWx0Mlt5XS5OVU1CRVIsIHJlc3VsdDJbeV0uVElUTEUsIHJlc3VsdDJbeV0uTFlSSUNTLCByZXN1bHQyW3ldLlZJREVPX1VSTCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBBbGJ1bSBhbmQgaXRzIFRyYWNrcyB0byB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgYWxidW1zLnB1c2gobmV3IEFsYnVtKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uVElUTEUsIHJlc3VsdDFbeF0uQVJUSVNULCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLllFQVIsIHJlc3VsdDFbeF0uSU1BR0VfTkFNRSwgdHJhY2tzKSk7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIENSVUQgbWV0aG9kIHRvIHNlYXJjaGVzIGZvciBhbGwgQWxidW1zIGJ5IGEgd2lsZGNhcmQgc2VyYWNoIGluIERlc2NyaXB0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gc2VhcmNoIHdpbGRjYXJkIERlc2NyaXB0aW9uIHRvIHNlYXJjaCBBbGJ1bXMgZm9yLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBBbGJ1bS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRBbGJ1bXNCeURlc2NyaXB0aW9uKHNlYXJjaDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxyXG4gICAgICAgICBsZXQgYWxidW1zOkFsYnVtW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgLy9pZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNlYXJjaCBwYXJ0aWFsIEFydGlzdFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gQUxCVU0gV0hFUkUgREVTQ1JJUFRJT04gTElLRSA/IE9SREVSIEJZIFlFQVIsIFRJVExFXCIsIFsnJScgKyBzZWFyY2ggKyAnJSddKTtcclxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxyXG4gICAgICAgICAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHQxW3hdLklEO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrczpUcmFja1tdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHk9MDt5IDwgcmVzdWx0Mi5sZW5ndGg7Kyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICBhbGJ1bXMucHVzaChuZXcgQWxidW0ocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5USVRMRSwgcmVzdWx0MVt4XS5BUlRJU1QsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uWUVBUiwgcmVzdWx0MVt4XS5JTUFHRV9OQU1FLCB0cmFja3MpKTsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGFsYnVtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICAgICAgICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYW4gQWxidW0uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhbGJ1bUlkIEFsYnVtIElEIHRvIHJldHJpZXZlIEFsYnVtIGZvci5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgQWxidW0uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQWxidW0oYWxidW1JZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgLy9pZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNwZWNpZmljIEFydGlzdFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBBTEJVTSBXSEVSRSBJRD0/JywgW2FsYnVtSWRdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5sZW5ndGggIT0gMSlcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgVHJhY2tzIGZvciB0aGlzIEFsYnVtXHJcbiAgICAgICAgICAgIGxldCB0cmFja3M6VHJhY2tbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MiA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQ9PycsIFthbGJ1bUlkXSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCByZXN1bHQyLmxlbmd0aDsrK3kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayhyZXN1bHQyW3ldLklELCByZXN1bHQyW3ldLk5VTUJFUiwgcmVzdWx0Mlt5XS5USVRMRSwgcmVzdWx0Mlt5XS5MWVJJQ1MsIHJlc3VsdDJbeV0uVklERU9fVVJMKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBBbGJ1bSBhbmQgaXRzIFRyYWNrcyBmb3IgcmV0dXJuXHJcbiAgICAgICAgICAgIGxldCBhbGJ1bSA9IG5ldyBBbGJ1bShyZXN1bHQxWzBdLklELCByZXN1bHQxWzBdLlRJVExFLCByZXN1bHQxWzBdLkFSVElTVCwgcmVzdWx0MVswXS5ERVNDUklQVElPTiwgcmVzdWx0MVswXS5ZRUFSLCByZXN1bHQxWzBdLklNQUdFX05BTUUsIHRyYWNrcyk7IFxyXG5cclxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcclxuICAgICAgICAgICAgY2FsbGJhY2soYWxidW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGFuIEFsYnVtLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gdG8gaW5zZXJ0LlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBBbGJ1bSBJRCBjcmVhdGVkLiAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGUoYWxidW06QWxidW0sIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgLy9pZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgQWxidW1cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIEFMQlVNIChUSVRMRSwgQVJUSVNULCBERVNDUklQVElPTiwgWUVBUiwgSU1BR0VfTkFNRSkgVkFMVUVTKD8sPyw/LD8sPyknLCBbYWxidW0uVGl0bGUsIGFsYnVtLkFydGlzdCwgYWxidW0uRGVzY3JpcHRpb24sIGFsYnVtLlllYXIsIGFsYnVtLkltYWdlXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXHJcbiAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBpbnNlcnQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxyXG4gICAgICAgICAgICBsZXQgYWxidW1JZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCBhbGJ1bS5UcmFja3MubGVuZ3RoOysreSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDIgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBUUkFDSyAoQUxCVU1fSUQsIFRJVExFLCBOVU1CRVIsIFZJREVPX1VSTCkgVkFMVUVTKD8sPyw/LD8pJywgW2FsYnVtSWQsIGFsYnVtLlRyYWNrc1t5XS5UaXRsZSwgYWxidW0uVHJhY2tzW3ldLk51bWJlciwgYWxidW0uVHJhY2tzW3ldLlZpZGVvXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGFsYnVtSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ1JVRCBtZXRob2QgdG8gdXBkYXRlIGFuIEFsYnVtLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gdG8gdXBkYXRlLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKGFsYnVtOkFsYnVtLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXHJcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gXHJcbiAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxyXG4gICAgICAgICAgICAvL2lmIChlcnIpIHRocm93IGVycjtcclxuIFxyXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIEFsYnVtXHJcbiAgICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIEFMQlVNIFNFVCBUSVRMRT0/LCBBUlRJU1Q9PywgREVTQ1JJUFRJT049PywgWUVBUj0/LCBJTUFHRV9OQU1FPT8gV0hFUkUgSUQ9PycsIFthbGJ1bS5UaXRsZSwgYWxidW0uQXJ0aXN0LCBhbGJ1bS5EZXNjcmlwdGlvbiwgYWxidW0uWWVhciwgYWxidW0uSW1hZ2UsIGFsYnVtLklkXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcclxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcclxuXHJcbiAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gdXBkYXRlIGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cclxuICAgICAgICAgICAgIGZvcihsZXQgeT0wO3kgPCBhbGJ1bS5UcmFja3MubGVuZ3RoOysreSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIFRSQUNLIFNFVCBUSVRMRT0/LCBOVU1CRVI9PywgVklERU9fVVJMPT8gV0hFUkUgSUQ9PyBBTkQgQUxCVU1fSUQ9PycsIFthbGJ1bS5UcmFja3NbeV0uVGl0bGUsIGFsYnVtLlRyYWNrc1t5XS5OdW1iZXIsIGFsYnVtLlRyYWNrc1t5XS5WaWRlbywgYWxidW0uVHJhY2tzW3ldLklkLCBhbGJ1bS5JZF0pO1xyXG4gICAgICAgICAgICAgICAgIGlmKHJlc3VsdDIuY2hhbmdlZFJvd3MgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XHJcbiAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYW4gQWxidW0uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhbGJ1bSBBbGJ1bSBJRCB0byBkZWxldGUuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGRlbGV0ZShhbGJ1bUlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxyXG4gICAgICAgICAgIC8vaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSB0aGUgdHJhY2tzIGZvciBhbiBBbGJ1bVxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBUUkFDSyBXSEVSRSBBTEJVTV9JRD0/JywgW2FsYnVtSWRdKTtcclxuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgdGhlIEFsYnVtXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gQUxCVU0gV0hFUkUgSUQ9PycsIFthbGJ1bUlkXSk7XHJcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0Mi5hZmZlY3RlZFJvd3M7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==