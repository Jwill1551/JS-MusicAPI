"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Track = /*#__PURE__*/function () {
  function Track(id, number, title, lyrics, video) {
    (0, _classCallCheck2.default)(this, Track);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "number", 0);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "lyrics", "");
    (0, _defineProperty2.default)(this, "video", "");
    this.id = id;
    this.number = number;
    this.title = title;
    this.lyrics = lyrics;
    this.video = video;
  }

  (0, _createClass2.default)(Track, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Number",
    get: function get() {
      return this.number;
    },
    set: function set(number) {
      this.number = number;
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
    key: "Lyrics",
    get: function get() {
      return this.lyrics;
    },
    set: function set(lyrics) {
      this.lyrics = lyrics;
    }
  }, {
    key: "Video",
    get: function get() {
      return this.video;
    },
    set: function set(value) {
      this.video = value;
    }
  }]);
  return Track;
}();

exports.Track = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVHJhY2sudHMiXSwibmFtZXMiOlsiVHJhY2siLCJpZCIsIm51bWJlciIsInRpdGxlIiwibHlyaWNzIiwidmlkZW8iLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQWFBLEs7QUFRVCxpQkFBWUMsRUFBWixFQUF1QkMsTUFBdkIsRUFBc0NDLEtBQXRDLEVBQW9EQyxNQUFwRCxFQUFtRUMsS0FBbkUsRUFDQTtBQUFBO0FBQUEsOENBUHFCLENBQUMsQ0FPdEI7QUFBQSxrREFOeUIsQ0FNekI7QUFBQSxpREFMd0IsRUFLeEI7QUFBQSxrREFKeUIsRUFJekI7QUFBQSxpREFId0IsRUFHeEI7QUFDSSxTQUFLSixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtKLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLE1BQVo7QUFDSCxLO1NBQ0QsYUFBV0EsTUFBWCxFQUNBO0FBQ0ksV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBQ0QsYUFBVUEsS0FBVixFQUNBO0FBQ0ksV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLE1BQVo7QUFDSCxLO1NBQ0QsYUFBV0EsTUFBWCxFQUNBO0FBQ0ksV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEtBQVo7QUFDSCxLO1NBRUQsYUFBaUJDLEtBQWpCLEVBQ0E7QUFDSSxXQUFLRCxLQUFMLEdBQWFDLEtBQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUcmFja1xyXG57XHJcbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgbnVtYmVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgbHlyaWNzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSB2aWRlbzogc3RyaW5nID0gXCJcIjtcclxuIFxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBudW1iZXI6bnVtYmVyLCB0aXRsZTpzdHJpbmcsIGx5cmljczpzdHJpbmcsIHZpZGVvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXI7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMubHlyaWNzID0gbHlyaWNzO1xyXG4gICAgICAgIHRoaXMudmlkZW8gPSB2aWRlbztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldCBJZChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOdW1iZXIoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXI7XHJcbiAgICB9XHJcbiAgICBzZXQgTnVtYmVyKG51bWJlcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFRpdGxlKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgICB9XHJcbiAgICBzZXQgVGl0bGUodGl0bGU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTHlyaWNzKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubHlyaWNzO1xyXG4gICAgfVxyXG4gICAgc2V0IEx5cmljcyhseXJpY3M6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubHlyaWNzID0gbHlyaWNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVmlkZW8oKTogc3RyaW5nIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZGVvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVmlkZW8odmFsdWU6IHN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWRlbyA9IHZhbHVlO1xyXG4gICAgfVxyXG59Il19