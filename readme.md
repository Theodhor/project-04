# WDI-Project-04


# General Assembly Project 04 : Full stack python-react app


## Technologies used:

* JS, CSS3, HTML5
* REACT
* PYTHON
* BCRYPT
* POSTGRESQL

### App overview

This is a replication of classic social medias, an app where users can create an account,
login, public photos, send likes to other people photos, making friends( sending requests, receiving request_sent and confirming or canceling requests), creating events and confirming or not their attendance in the events invited.


### Process

I created a database where the main table is the users table, to which are related most likely all the other tables(images, events, friends). In the events table i related a list, that is made by the friends of the user who created the event. Those friends will be able to choose if to attend the event, and once confirmed they have the option to change their mind if they cannot attend anymore. The friends table is relating to users, on one side the request sender, and in the other side the request receiver. Via a boolean column that i called status, every user can see the actual friends, the requests that he sent and the request he received, with the relative options(remove friend, cancel request sent accept or not request received). Also users can add images, and the can "like" the images of other users. They can like only once each image of their friend and the like is reversable.

### Challenges

Understanding SQL databases was quite hard, and making the database work with python was even harder but in the end it was very satisfying.
I feel comfortable manipulating data (making all kind of operations with the database), and having the data that i want to render, but i still lack in style.

### Wins

Making work almost all the functions that i wanted to implement.

### Future features

Adding comments to images(already added on the backend, have to implement it in the frontend)
Adding special events (where the creator can decide how many people to invite and who to invite)
Adding photos, images and likes to events.
RESTYLING
