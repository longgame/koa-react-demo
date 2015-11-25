var $ = require('jquery'),
    Reflux = require('reflux');

var ImageActions = require('../actions/ImageActions');

var ImageStore = Reflux.createStore({
  listenables: [ImageActions],
  imageList: [],
  sourceUrl: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json',

  init: function() {
    this.fetchList();
  },
 
  fetchList: function() {
  //onFetchList: function() {
    $.ajax({
      url: this.sourceUrl,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrFeed',
      cache: false,
      context: this,
      success: function(data) {
        console.log('fetch complete');
        this.imageList = data.items;
        this.trigger(this.imageList);
      },
    });
  },
});

module.exports = ImageStore;
