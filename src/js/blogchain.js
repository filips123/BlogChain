var BlogChain = {
  web3Provider: null, // Web3 Provider
  web3: null, // Web3 Class

  // Init BlogChain
  init: function() {
    return BlogChain.initWeb3();
  },

  // Get and Init Web3
  initWeb3: function() {
    if (typeof web3 !== 'undefined') { // Web3 provider (Mist, MetaMask ...)
      console.log("Using current Web3 provider ...");
      BlogChain.web3Provider = web3.currentProvider;
      BlogChain.web3 = new Web3(BlogChain.web3Provider);

      $('#open-blog-address').prop('disabled', false);
      $('#open-blog-submit').prop('disabled', false);
      $('#create-blog-name').prop('disabled', false);
      $('#create-blog-description').prop('disabled', false);
      $('#create-blog-submit').prop('disabled', false);

      BlogChain.noBlog();
      
      return BlogChain.web3;
    } else { // Custom Web3 provider (HTTP, IPC ...)
      $('#loading').hide();
      $('#no-web3-provider').show();

      $('#custom-web3-url').keyup(function(event) {
        if (event.keyCode === 13) {
          $('#custom-web3-submit').click();
        }
      });

      $('#custom-web3-submit').click(function() {
        if ($('#custom-web3-url')[0].checkValidity()) {
          console.log("Using custom Web3 provider ...");
          BlogChain.web3Provider = $('#custom-web3-url').val();
          BlogChain.web3 = new Web3(BlogChain.web3Provider);

          $('#custom-web3-url-label').css({
            'color': ''
          });
          $('#no-web3-provider').hide();
          $('#loading').show();

          $('#open-blog-address').prop('disabled', false);
          $('#open-blog-submit').prop('disabled', false);
          $('#create-blog-name').prop('disabled', false);
          $('#create-blog-description').prop('disabled', false);
          $('#create-blog-submit').prop('disabled', false);

          BlogChain.noBlog();
          
          return BlogChain.web3;
        } else {
          $('#custom-web3-url-label').css({
            'color': 'red'
          });
        }
      });
    }
  },

  // Open or Create Blog
  noBlog: function() {
    $('#loading').hide();
    $('#no-blog-open').show();

    $('#open-blog-address').keyup(function(event) {
      if (event.keyCode === 13) {
        $('#open-blog-submit').click();
      }
    });

    $('#open-blog-submit').click(function() {
      if ($('#open-blog-address')[0].checkValidity() && Web3.prototype.isAddress($('#open-blog-address').val())) {
        $('#open-blog-submit').css({
          'color': ''
        });
        $('#no-blog-open').hide();
        $('#no-blog-posts').hide();
        $('#post-added').hide();
        $('#blog-created').hide();
        $('#add-post').hide();
        $('#posts').hide();
        $('#loading').show();

        BlogChain.openBlog($('#open-blog-address').val());
      } else {
        $('#open-blog-submit').css({
          'color': 'red'
        });
      }
    });

    $('#create-blog-name').keyup(function(event) {
      if (event.keyCode === 13) {
        $('#create-blog-submit').click();
      }
    });

    $('#create-blog-description').keyup(function(event) {
      if (event.keyCode === 13) {
        $('#create-blog-submit').click();
      }
    });

    $('#create-blog-submit').click(function() {
      if ($('#create-blog-name')[0].checkValidity() && $('#create-blog-description')[0].checkValidity()) {
        $('#create-blog-submit').css({
          'color': ''
        });
        $('#no-blog-open').hide();
        $('#no-blog-posts').hide();
        $('#post-added').hide();
        $('#blog-created').hide();
        $('#add-post').hide();
        $('#posts').hide();
        $('#loading').show();

        BlogChain.createBlog($('#create-blog-name').val(), $('#create-blog-description').val());
      } else {
        $('#create-blog-submit').css({
          'color': 'red'
        });
      }
    });
  },

  // Open Blog
  openBlog: function(address) {
    console.log("Opening blog \"" + address + "\" ...");

    $.getJSON('BlogChain.json', function(artifact) {
      var abi = artifact['abi'];
      var bytecode = artifact['bytecode'];

      var contract = BlogChain.web3.eth.contract(abi).at(address);

      contract.name(function(error, name) { // Get Blog Name
        if (!error) {
          contract.description(function(error, description) { // Get Blog Description
            if (!error) {
              contract.owner(function(error, owner) { // Get Blog Owner
                if (!error) {
                  console.log("Blog \"" + name + "\"  with description \"" + description + "\" open!");

                  $('#blog-name').text(name);
                  $('#blog-description').text(description);

                  if (owner == BlogChain.web3.eth.accounts[0]) { // If You are Blog Owner
                    console.log("You are blog owner!");

                    $('#add-post').show();

                    $('#add-post-title').keyup(function(event) {
                      if (event.keyCode === 13) {
                        $('#add-post-submit').click();
                      }
                    });

                    $('#add-post-submit').click(function() {
                      if ($('#add-post-title')[0].checkValidity()) {
                        $('#add-post-title-label').css({
                          'color': ''
                        });
                      } else {
                        $('#add-post-title-label').css({
                          'color': 'red'
                        });
                      }

                      if ($('#add-post-content')[0].checkValidity()) {
                        $('#add-post-content-label').css({
                          'color': ''
                        });
                      } else {
                        $('#add-post-content-label').css({
                          'color': 'red'
                        });
                      }

                      if ($('#add-post-title')[0].checkValidity() && $('#add-post-content')[0].checkValidity()) {
                        $('#no-blog-open').hide();
                        $('#no-blog-posts').hide();
                        $('#blog-created').hide();
                        $('#add-post').hide();
                        $('#posts').hide();
                        $('#loading').show();

                        BlogChain.addPost($('#add-post-title').val(), $('#add-post-content').val(), contract);
                      }
                    });
                  }

                  BlogChain.getPosts(contract);
                } else {
                  console.error("Error while getting blog owner:");
                  console.error(error);
                }
              });
            } else {
              console.error("Error while getting blog description:");
               console.error(error);
            }
          });
        } else {
          console.error("Error while getting blog name:");
          console.error(error);
        }
      });
    });
  },

  // Get Blog Posts
  getPosts: function(contract) {
    contract.getNumberOfPosts(function(error, numberOfPosts) { // Get Number of Posts
      if (!error) {
        if (numberOfPosts > 0) {
          console.log("Loading posts ...");

          $('#posts').empty();

          BlogChain.getPost(contract, 0);
        } else {
          console.log("Selected blog doesn't have any posts!");
          $('#loading').hide();
          $('#no-blog-posts').show();
        }
      } else {
        console.error('Error while getting blog posts:');
        console.error(error);
      }
    });
  },

  // Get Blog Post
  getPost: function(contract, postID) {
    contract.posts(postID, function(error, post) {
      if (!error) {
        if (post[0]) {
          var postsSection = $('#posts');
          var postTemplate = $('#post-template');
          var postHTML = postTemplate.clone();

          postHTML.removeAttr('id');
          postHTML.find('.blog-post-title').text(post[0]);
          postHTML.find('.blog-post-meta').text(new Date(post[2]*1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute:'numeric'}));
          postHTML.find('.blog-post-content').text(post[1]);
          postHTML.removeAttr('style');
          postsSection.append(postHTML.html());
        }

        contract.getNumberOfPostsDeleted(function(error, numberOfPostsDeleted) {
          if (!error) {
            if (postID < numberOfPostsDeleted - 1) {
              BlogChain.getPost(contract, postID + 1);
            } else {
              $('#loading').hide();
              $('#posts').show();
            }
          } else {
            console.error('Error while getting number of blog posts (including deleted):');
            console.error(error);
          }
        });
      } else {
        console.error('Error while getting number of blog posts:');
        console.error(error);
      }
    });
  },

  // Add Blog Post
  addPost: function(title, content, contract) {
    console.log("Adding post \"" + title + "\" ...");

    contract.addPost(
      title,
      content,
      Math.round(new Date().getTime() / 1000),
      {
        from: BlogChain.web3.eth.accounts[0],
        gas: '2200000'
      },
      function(error, transactionHash) {
        if (!error) {
          console.log("Mining post \"" + title + "\" ... transactionHash: \"" + transactionHash + "\"");
          BlogChain.postMining(title, content, contract, transactionHash);
        } else {
          console.error("Error in adding post:");
          console.error(error);
        }
      }
    );
  },

  // Wait while Post Mining
  postMining: function(title, content, contract, transactionHash) {
    BlogChain.web3.eth.getTransactionReceipt(
      transactionHash,
      function(error, receipt) {
        if (!error) {
          console.log("Post \"" + title + "\" mined! transactionHash: \"" + transactionHash + "\"");

          $('#post-added-title').text("Post \"" + title + "\" added");
          $('#post-added-description').text("Post \"" + title + "\" added.");
          $('#post-added-transactionhash').text(transactionHash);
          $('#loading').hide();
          $('#post-added').show();
        } else {
          console.error("Error while getting contract status:");
          console.error(error);
        }
    }
    );
  },

  // Create Blog
  createBlog: function(name, description) {
    console.log("Creating blog \"" + name + "\" with description \"" + description + "\" ...");

    $.getJSON('BlogChain.json', function(artifact) {
      var abi = artifact['abi'];
      var bytecode = artifact['bytecode'];

      var BlogChainContract = BlogChain.web3.eth.contract(abi);
      BlogChainContract.new(
        name,
        description,
        {
          from: BlogChain.web3.eth.accounts[0],
          data: bytecode,
          gas: '4700000'
        },
        function(error, contract) {
          if (!error) {
            console.log("Mining contract for blog \"" + name + "\" ... transactionHash: \"" + contract.transactionHash + "\"");
            BlogChain.blogMining(name, description, contract);
          } else {
            console.error("Error in contract creation:");
            console.error(error);
          }
        }
      );
    });
  },

  // Wait while Blog Mining
  blogMining: function(name, description, contract) {
    BlogChain.web3.eth.getTransactionReceipt(
      contract.transactionHash,
      function(error, receipt) {
        if (!error) {
          if (receipt && receipt.contractAddress) {
            console.log("Contract for blog \"" + name + "\" mined! address: \"" + receipt.contractAddress + "\" transactionHash: \"" + contract.transactionHash + "\"");

            var address = receipt.contractAddress;
            var transactionHash = contract.transactionHash;

            $('#blog-created-title').text("Blog \"" + name + "\" created");
            $('#blog-created-description').text("Blog \"" + name + "\" with description \"" + description + "\" created.");
            $('#blog-created-address').text(address);
            $('#blog-created-transactionhash').text(transactionHash);
            $('#loading').hide();
            $('#blog-created').show();
          } else {
            setTimeout(function() {
              BlogChain.blogMining(name, description, contract);
            }, 500);
          }
        } else {
          console.error("Error while getting contract status:");
          console.error(error);
        }
      }
    );
  },
}

$(document).ready(function() {
  console.log("Document ready!");
  BlogChain.init();
});
