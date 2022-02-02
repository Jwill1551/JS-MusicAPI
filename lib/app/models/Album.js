"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Album = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Album = /*#__PURE__*/function () {
  function Album(id, title, artist, description, year, image, tracks) {
    (0, _classCallCheck2.default)(this, Album);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "artist", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "year", 1900);
    (0, _defineProperty2.default)(this, "image", "");
    (0, _defineProperty2.default)(this, "tracks", []);
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.year = year;
    this.image = image;
    this.tracks = tracks;
  }

  (0, _createClass2.default)(Album, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Title",
    get: function get() {
      return this.title;
    },
    set: function set(title) {
      this.title = title;
    }
  }, {
    key: "Artist",
    get: function get() {
      return this.artist;
    },
    set: function set(artist) {
      this.artist = artist;
    }
  }, {
    key: "Description",
    get: function get() {
      return this.description;
    },
    set: function set(description) {
      this.description = description;
    }
  }, {
    key: "Year",
    get: function get() {
      return this.year;
    },
    set: function set(year) {
      this.year = year;
    }
  }, {
    key: "Image",
    get: function get() {
      return this.image;
    },
    set: function set(value) {
      this.image = value;
    }
  }, {
    key: "Tracks",
    get: function get() {
      return this.tracks;
    },
    set: function set(tracks) {
      this.tracks = tracks;
    }
  }]);
  return Album;
}();

exports.Album = Album;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQWxidW0udHMiXSwibmFtZXMiOlsiQWxidW0iLCJpZCIsInRpdGxlIiwiYXJ0aXN0IiwiZGVzY3JpcHRpb24iLCJ5ZWFyIiwiaW1hZ2UiLCJ0cmFja3MiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEs7QUFVVCxpQkFBWUMsRUFBWixFQUF1QkMsS0FBdkIsRUFBcUNDLE1BQXJDLEVBQW9EQyxXQUFwRCxFQUF3RUMsSUFBeEUsRUFBcUZDLEtBQXJGLEVBQW9HQyxNQUFwRyxFQUNBO0FBQUE7QUFBQSw4Q0FUcUIsQ0FBQyxDQVN0QjtBQUFBLGlEQVJ3QixFQVF4QjtBQUFBLGtEQVB5QixFQU96QjtBQUFBLHVEQU44QixFQU05QjtBQUFBLGdEQUx1QixJQUt2QjtBQUFBLGlEQUp3QixFQUl4QjtBQUFBLGtEQUgwQixFQUcxQjtBQUNJLFNBQUtOLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7Ozs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLTixFQUFaO0FBQ0gsSztTQUNELGFBQU9BLEVBQVAsRUFDQTtBQUNJLFdBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxLQUFaO0FBQ0gsSztTQUNELGFBQVVBLEtBQVYsRUFDQTtBQUNJLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQUNELGFBQVdBLE1BQVgsRUFDQTtBQUNJLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxXQUFaO0FBQ0gsSztTQUNELGFBQWdCQSxXQUFoQixFQUNBO0FBQ0ksV0FBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsSUFBWjtBQUNILEs7U0FDRCxhQUFTQSxJQUFULEVBQ0E7QUFDSSxXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsS0FBWjtBQUNILEs7U0FDRCxhQUFpQkUsS0FBakIsRUFDQTtBQUNJLFdBQUtGLEtBQUwsR0FBYUUsS0FBYjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLRCxNQUFaO0FBQ0gsSztTQUNELGFBQVdBLE1BQVgsRUFDQTtBQUNJLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2sgfSBmcm9tIFwiLi9UcmFja1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFsYnVtXHJcbntcclxuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgYXJ0aXN0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgeWVhcjogbnVtYmVyID0gMTkwMDtcclxuICAgIHByaXZhdGUgaW1hZ2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHRyYWNrczogVHJhY2tbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIHRpdGxlOnN0cmluZywgYXJ0aXN0OnN0cmluZywgZGVzY3JpcHRpb246c3RyaW5nLCB5ZWFyOm51bWJlciwgaW1hZ2U6IHN0cmluZywgdHJhY2tzOlRyYWNrW10pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmFydGlzdCA9IGFydGlzdDtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy50cmFja3MgPSB0cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IElkKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgSWQoaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVGl0bGUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aXRsZTtcclxuICAgIH1cclxuICAgIHNldCBUaXRsZSh0aXRsZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBBcnRpc3QoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnRpc3Q7XHJcbiAgICB9XHJcbiAgICBzZXQgQXJ0aXN0KGFydGlzdDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hcnRpc3QgPSBhcnRpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IERlc2NyaXB0aW9uKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBzZXQgRGVzY3JpcHRpb24oZGVzY3JpcHRpb246c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IFllYXIoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyO1xyXG4gICAgfVxyXG4gICAgc2V0IFllYXIoeWVhcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEltYWdlKCk6IHN0cmluZyBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSW1hZ2UodmFsdWU6IHN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBUcmFja3MoKTpUcmFja1tdXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzO1xyXG4gICAgfVxyXG4gICAgc2V0IFRyYWNrcyh0cmFja3M6VHJhY2tbXSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICAgIH1cclxufSJdfQ==