var BlogChain = artifacts.require("BlogChain");

contract("BlogChain", function(accounts) {
  it("should has the same name as it was set up", function() {
    this.retries(4);
    
    let expected = "My Cool Blog Name";
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.name();
    }).then(function(name) {
      assert.equal(name.valueOf(), expected.valueOf(), "The name of the blog is not the same as it was set up");
    });
  });
  
  it("should has the same description as it was set up", function() {
    this.retries(4);
    
    let expected = "My cool blog description!";
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.description();
    }).then(function(description) {
      assert.equal(description.valueOf(), expected.valueOf(), "The description of the blog is not the same as it was set up");
    });
  });
  
  it("should not have any posts at start", function() {
    this.retries(4);
    
    let expected = 0;
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.getNumberOfPostsDeleted();
    }).then(function(postsNumDeleted) {
      assert.equal(postsNumDeleted.valueOf(), expected.valueOf(), "Number of posts (including deleted) is not zero");
      
      return blog.getNumberOfPosts();
    }).then(function(postsNum) {
      assert.equal(postsNum.valueOf(), expected.valueOf(), "Number of posts (excluding deleted) is not zero");
    });
  });

  it("should add a post correctly", function() {
    this.retries(4);
    
    let expectedTitle = "Sample blog post";
    let expectedCotent = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae ultrices ante.</p><hr><p>Cras ut felis interdum, <em>viverra lorem vel</em>, pulvinar massa. Quisque quis urna eget sem rutrum ultrices.</p><blockquote><p>Aliquam euismod sed <strong>nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></blockquote><h2>Aliquam eget</h2><p>Phasellus vitae interdum risus.</p><h3>Aenean luctus</h3><p>Vitae posuere odio. Donec eu nibh eget nunc sollicitudin imperdiet.</p><pre><code>Vestibulum dictum neque eu lorem dictum vehicula</code></pre><p>Proin id lectus id sapien mattis ornare quis quis ipsum.</p><ul><li>Morbi fringilla ante ac aliquam maximus.</li><li>Proin a tortor a diam luctus interdum.</li><li>Nulla vitae elit libero, a pharetra augue.</li></ul><p>Donec ullamcorper nulla non metus auctor fringilla.</p><ol><li>Vestibulum id ligula porta felis euismod semper.</li><li>Cum sociis natoque penatibus et magnis.</li><li>Maecenas sed diam eget risus.</li></ol><p>Praesent vel elit nec ex pretium suscipit.</p>";
    let expectedDatetime = Math.round(new Date().getTime() / 1000);
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.addPost(expectedTitle, expectedCotent, expectedDatetime);
    }).then(function() {
      return blog.posts(0);
    }).then(function(post) {
      assert.equal(post[0].valueOf(), expectedTitle.valueOf(), "The title of the post is not the same as it was set up");
      assert.equal(post[1].valueOf(), expectedCotent.valueOf(), "The content of the post is not the same as it was set up");
      assert.equal(post[2].valueOf(), expectedDatetime.valueOf(), "The date and time of the post is not the same as it was set up");
    });
  });
  
  it("should edit a post correctly", function() {
    this.retries(4);
    
    let expectedTitle = "My post title";
    let expectedCotent = "My post content";
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.addPost("Title", "Content", 0);
    }).then(function() {
      return blog.editPost(0, expectedTitle, expectedCotent);
    }).then(function() {
      return blog.posts(0);
    }).then(function(post) {
      assert.equal(post[0].valueOf(), expectedTitle.valueOf(), "The title of the post is not the same as it was edited");
      assert.equal(post[1].valueOf(), expectedCotent.valueOf(), "The content of the post is not the same as it was edited");
    });
  });

  it("should delete a post correctly", function() {
    this.retries(4);
    
    let expectedPostsDeleted = 3;
    let expectedPosts = 2;
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.addPost("Title 1", "Content 1", 0);
    }).then(function() {
      return blog.addPost("Title 2", "Content 2", 0);
    }).then(function() {
      return blog.addPost("Title 3", "Content 3", 0);
    }).then(function() {
      return blog.deletePost(1);
    }).then(function() {
      return blog.posts[1];
    }).then(function(post) {
      assert.equal(typeof post, "undefined", "The post exists, but it was deleted");
      
      return blog.getNumberOfPostsDeleted();
    }).then(function(postsNumDeleted) {
      assert.equal(postsNumDeleted.valueOf(), expectedPostsDeleted.valueOf(), "Number of posts (including deleted) is not correct");
      
      return blog.getNumberOfPosts();
    }).then(function(postsNum) {
      assert.equal(postsNum.valueOf(), expectedPosts.valueOf(), "Number of posts (excluding deleted) is not correct");
    });
  });
  
  it("should not allow everyone to add, edit or delete a post");
  
  it("should kill itself correctly");
  
  it("should transfer itself correctly", function() {
    this.retries(4);
    
    let oldOwner = accounts[0];
    let newOwner = accounts[1];
    
    return BlogChain.new("My Cool Blog Name", "My cool blog description!").then(function(instance) {
      blog = instance;
      
      return blog.transfer(newOwner);
    }).then(function() {
      return blog.owner();
    }).then(function(owner) {
      assert.notEqual(owner.valueOf(), oldOwner.valueOf(), "Owner is still old");
      assert.equal(owner.valueOf(), newOwner.valueOf(), "Owner is not new");
    });
  });
  
  it("should not allow everyone to kill or transfer it");
});