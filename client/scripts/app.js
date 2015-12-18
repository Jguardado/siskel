var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },


  initialize: function(){
    console.log("inside movie model");
    //})
  },


  toggleLike: function() {
    var likeStatus = this.get('like');
      if(likeStatus){
        this.set('like', false);
      } else {
        this.set('like', true);
      }
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    this.on('change', function(){
      this.sort();
    });
    // your code here
  },

  comparator: 'title',

  sortByField: function(field) {
    //write the function that sorts through the field
    this.comparator = field;
    this.sort();
  },



});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    console.log(this);
    this.model.on('change', this.render, this);
      //console.log("like button was click on this: ", this);
    
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    console.log("this from handleClick", this);
    this.model.toggleLike();
    // this.collection.sort();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    //this.render();
    this.collection.on('sort', this.render(), this);
    //this.collection.sortByField(movies.get('comparator'));
  },

  events: {
    'change': 'sortsAfterLike'
  },

  sortsAfterLike: function(){
    console.log('sortsAfterLike is being called')
    this.sort();
  },


  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
