export default {
  getUrlPath(url) {
    let urls = url.split("//");
    if (urls.length > 1) {
      return urls[1];
    } else {
      return "/";
    }
  }
};
