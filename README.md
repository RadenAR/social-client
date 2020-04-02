# Social Media App

It is a social media platform for posting, commenting and liking posts

## Instructions

To try the live version click this link:
[Social Media App](https://radenar.github.io/social-client/)

The back end can be found at the following link:
[Back End](https://mysterious-tor-94072.herokuapp.com/)

To run locally, run the following in terminal from the project directory:
```sh
npm run start
```

## Planning and Development process

## Problem solving strategy
* What is the error?
* What function is causing the error? If unsure, start from the index.html and move down the chain (app.js, events.js, api.js, ui.js)
* What is that function returning?
* What is the function being passed?
* If the problem is what it is being passed work back to the function before, if it is returning correctly more the other way down the chain.
* If unsure of the above process, look through old issues and google relevant keywords.
* If there is still an issue, open an issue on the issue que.

## Built With

* [React](https://reactjs.org/) - Front end framework
* [socket.io](https://socket.io/) - Websocket package
* [axios](https://www.npmjs.com/package/axios) - axios used for API calls
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Language for site functionality
* [Bootstrap](https://getbootstrap.com/) - Used for more advanced styling
* [CSS3](http://www.css3.info/) - Used in conjunction with bootstrap for styling
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used for general structure of webpage

Back-end:
* [Express](https://expressjs.com/) - Back end framework
* [socket.io](https://socket.io/) - Websocket package
* [node](https://nodejs.org/en/) - Runtime environment for javascript
* [mongoDB](https://www.mongodb.com/) - NoSQL database
* [mongoose](https://mongoosejs.com/) - Object modeling for node.js and mongodb

## Wireframes
![alt text](https://i.imgur.com/1DjKKiT.png "Wireframes")

## User Stories

-   As a user, I want to be able to sign in.
-   As a user, I want to be able to sign up.
-   As a user, I want to be able to sign out.
-   As a user, I want to be able to change my password.

-   As a user, I want to be able to create a post.
-   As a user, I want to be able to view posts.
-   As a user, I want to be able to delete a post.
-   As a user, I want to be able to update a post.

-   As a user, I want to be able to create a comment.
-   As a user, I want to be able to view comments.
-   As a user, I want to be able to delete a comment.
-   As a user, I want to be able to update a comment.

-   As a user, I want to be able to like a post.
-   As a user, I want to be able to unlike a post.
-   As a user, I want to be able to view all posts.
-   As a user, I want to be able to view my friends posts.
-   As a user, I want to be able to view my own posts.
-   As a user, I want to be able to add a friend.
-   As a user, I want to be able to remove a friend.
-   As a user, I want to be able to view my profile.