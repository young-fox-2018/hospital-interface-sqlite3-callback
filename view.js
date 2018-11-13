class View {
  static viewData(data) {
    return console.log(data);
  }
  static viewSuccess(data) {
    return console.log(data);
  }

  static viewError(err) {
    return console.log("Error", err);
  }

}

module.exports = View