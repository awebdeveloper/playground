angular.module('starter.services', [])

.factory('Orders', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var orders = [{
    id: 0,
    name: 'Ubuntu VPN',
    client: {
      name: 'Andrew Jostlen',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    },
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'OpenStack',
    client: {
      name: 'Andrew Jostlen',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    },
    lastText: 'Hey, it\'s me',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Azure',
    client: {
      name: 'Andrew Jostlen',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    },
    lastText: 'Did you get the ice cream?',
  }, {
    id: 3,
    name: 'Debian',
    client: {
      name: 'Adam Bradleyson',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    },
    lastText: 'I should buy a boat',
  }, {
    id: 4,
    name: 'Ubuntu VPN',
    client: {
      name: 'Perry Governor',
      face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    },
    lastText: 'Look at my mukluks!',
    completed: true
  }];

  return {
    all: function() {
      return orders;
    },
    remove: function(chat) {
      orders.splice(orders.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === parseInt(chatId)) {
          return orders[i];
        }
      }
      return null;
    },
    set: function(chat){
      orders.push({
        id: orders.length,
        name: 'You',
        lastText: chat.lastText,
        client: {
          name: 'Perry Governor',
          face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
        },
      })
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Comments', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var comments = [{
    id: 0,
    orderId:0,
    name: 'Ben Sparrow',
    notes: 'Needs 64 bit server ?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    orderId:0,
    name: 'Max Lynx',
    notes: 'No i think 32 is fine',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    orderId:0,
    name: 'Andrew Jostlen',
    notes: 'Confirm with him',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    orderId:0,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    orderId:1,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },
    getByOrderId: function(orderId) {
      return comments.filter(function (element) {
        return (element.orderId == orderId);
      });
    },
    set: function(newchat){
      newchat.id = comments.length;
      newchat.name = 'Ben Sparrow';
      newchat.face = 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png';
      comments.push(newchat); 
      return newchat;
    }
  }
});
