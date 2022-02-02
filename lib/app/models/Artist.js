"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Artist = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Artist = /*#__PURE__*/function () {
  function Artist(id, name) {
    (0, _classCallCheck2.default)(this, Artist);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    this.id = id;
    this.name = name;
  }

  (0, _createClass2.default)(Artist, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }]);
  return Artist;
}();

exports.Artist = Artist;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQXJ0aXN0LnRzIl0sIm5hbWVzIjpbIkFydGlzdCIsImlkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQWFBLE07QUFLVCxrQkFBWUMsRUFBWixFQUF1QkMsSUFBdkIsRUFDQTtBQUFBO0FBQUEsOENBSnFCLENBQUMsQ0FJdEI7QUFBQSxnREFIdUIsRUFHdkI7QUFDSSxTQUFLRCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDRjs7OztTQUVGLGVBQ0E7QUFDSSxhQUFPLEtBQUtELEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLElBQVo7QUFDSCxLO1NBQ0QsYUFBU0EsSUFBVCxFQUNBO0FBQ0ksV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXJ0aXN0XHJcbntcclxuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldCBJZChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuICAgIHNldCBOYW1lKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbn0iXX0=