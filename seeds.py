from app import app, db
from models.User import User
from models.Friend import Friend

with app.app_context():
    db.drop_all()
    db.create_all()

    homer = User({
        'name': 'Homer',
        'surname': 'Simpson',
        'email': 'homer@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png',
        'password':'pass',
        'password_confirmation':'pass'
    })
    homer.save()

    peter = User({
        'name': 'Peter',
        'surname': 'Griffin',
        'email': 'peter@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Peter_Griffin.png/220px-Peter_Griffin.png',
        'password':'pass',
        'password_confirmation':'pass'
    })
    peter.save()

    lois = User({
        'name': 'Lois',
        'surname':'Griffin',
        'email': 'lois@gmail.com',
        'profile_image' : 'https://costumewall.com/wp-content/uploads/2017/03/lois-griffin.jpg',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    lois.save()

    marge = User({
        'name': 'Marge',
        'surname':'Simpson',
        'email': 'marge@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/simpsons/images/0/0b/Marge_Simpson.png/revision/latest?cb=20180626055729',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    marge.save()

    stewie = User({
        'name': 'Stewie',
        'surname': 'Griffin',
        'email': 'stewie@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/familyguyfanon/images/0/02/Stewie_Griffin.png/revision/latest?cb=20161119043926',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    stewie.save()

    bart = User({
        'name': 'Bart',
        'surname': 'Simpson',
        'email': 'bart@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    bart.save()

    megg = User({
        'name': 'Megg',
        'surname': 'Griffin',
        'email': 'megg@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/uncyclopedia/images/f/fb/Mgriffin.jpeg/revision/latest?cb=20081003161013',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    megg.save()

    lisa = User({
        'name': 'Lisa',
        'surname': 'Simpson',
        'email': 'lisa@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/220px-Lisa_Simpson.png',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    lisa.save()

    brian = User({
        'name': 'Brian',
        'surname': 'Griffin',
        'email': 'brian@gmail.com',
        'profile_image' : 'https://i.pinimg.com/originals/8f/a9/11/8fa91183ac378ec914a1f1f83a0df941.jpg',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    brian.save()

    chris = User({
        'name': 'Chris',
        'surname': 'Griffin',
        'email': 'chris@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/familyguyfanon/images/d/df/Chris_Griffin.png/revision/latest?cb=20161119032747',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    chris.save()

    ned = User({
        'name': 'Ned',
        'surname': 'Flanders',
        'email': 'ned@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/simpsons/images/d/d6/Ned_Flanders_2.png/revision/latest?cb=20141024230457',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    ned.save()

    glen = User({
        'name': 'Glen',
        'surname': 'Quagmire',
        'email': 'glen@gmail.com',
        'profile_image' : 'https://pbs.twimg.com/profile_images/804229585042870272/gbyC4h39_400x400.jpg',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    glen.save()

    joe = User({
        'name': 'Joe',
        'surname': 'Swanson',
        'email': 'joe@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/familyguy/images/9/9c/190px-Joe_Swanson.png/revision/latest?cb=20100326012234',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    joe.save()

    cleveland = User({
        'name': 'Cleveland',
        'surname': 'Brown',
        'email': 'cleveland@gmail.com',
        'profile_image' : 'https://vignette.wikia.nocookie.net/familyguy/images/1/1f/Cleveland.png/revision/latest?cb=20100121115548',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    cleveland.save()

    bonnie = User({
        'name': 'Bonnie',
        'surname': 'Swanson',
        'email': 'bonnie@gmail.com',
        'profile_image' : 'https://icon2.kisspng.com/20180621/rre/kisspng-family-guy-glenn-quagmire-bonnie-swanson-stewie-gr-family-stick-5b2b98cc743652.514092561529583820476.jpg',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    bonnie.save()

    milhouse = User({
        'name': 'Milhouse',
        'surname': 'van Houten',
        'email': 'milhouse@gmail.com',
        'profile_image' : 'https://i.pinimg.com/originals/5e/ad/fb/5eadfb650086a6cc7a156290ff5bd08a.png',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    milhouse.save()

    nelson = User({
        'name': 'Nelson',
        'surname': 'Muntz',
        'email': 'nelson@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/c/c6/Nelson_Muntz.PNG',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    nelson.save()

    burns = User({
        'name': 'Charles Montgomery',
        'surname': 'Burns',
        'email': 'burns@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/5/56/Mr_Burns.png',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    burns.save()

    smithers = User({
        'name': 'Waylon',
        'surname': 'Smithers',
        'email': 'smithers@gmail.com',
        'profile_image' : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Waylon_Smithers_1.png/220px-Waylon_Smithers_1.png',
        'password': 'pass',
        'password_confirmation':'pass'
    })
    smithers.save()





    friend1 = Friend({
        'sender_id': '1',
        'receiver_id': '2',
        'status': True
    })
    friend1.save()

    friend2 = Friend({
        'sender_id': '1',
        'receiver_id': '3',
        'status': True
    })
    friend2.save()

    friend3 = Friend({
        'sender_id': '1',
        'receiver_id': '4',
        'status': True
    })
    friend3.save()

    friend4 = Friend({
        'sender_id': '1',
        'receiver_id': '5',
        'status': True
    })
    friend4.save()

    friend5 = Friend({
        'sender_id': '1',
        'receiver_id': '6',
        'status': False
    })
    friend5.save()

    friend6 = Friend({
        'sender_id': '1',
        'receiver_id': '7',
        'status': False
    })
    friend6.save()

    friend7 = Friend({
        'sender_id': '1',
        'receiver_id': '8',
        'status': False
    })
    friend7.save()

    friend8 = Friend({
        'sender_id': '1',
        'receiver_id': '9',
        'status': False
    })
    friend8.save()

    friend16 = Friend({
        'sender_id': '10',
        'receiver_id': '2',
        'status': True
    })
    friend16.save()

    friend17 = Friend({
        'sender_id': '10',
        'receiver_id': '3',
        'status': True
    })
    friend17.save()

    friend18 = Friend({
        'sender_id': '10',
        'receiver_id': '4',
        'status': True
    })
    friend18.save()

    friend19 = Friend({
        'sender_id': '10',
        'receiver_id': '5',
        'status': True
    })
    friend19.save()

    friend20 = Friend({
        'sender_id': '10',
        'receiver_id': '1',
        'status': False
    })
    friend20.save()

    friend21 = Friend({
        'sender_id': '10',
        'receiver_id': '7',
        'status': False
    })
    friend21.save()

    friend22 = Friend({
        'sender_id': '10',
        'receiver_id': '8',
        'status': False
    })
    friend22.save()

    friend23 = Friend({
        'sender_id': '10',
        'receiver_id': '9',
        'status': False
    })
    friend23.save()

    friend9 = Friend({
        'sender_id': '2',
        'receiver_id': '3',
        'status': True
    })
    friend9.save()

    friend10 = Friend({
        'sender_id': '2',
        'receiver_id': '4',
        'status': True
    })
    friend10.save()

    friend11 = Friend({
        'sender_id': '2',
        'receiver_id': '5',
        'status': True
    })
    friend11.save()

    friend12= Friend({
        'sender_id': '2',
        'receiver_id': '6',
        'status': False
    })
    friend12.save()

    friend13 = Friend({
        'sender_id': '2',
        'receiver_id': '7',
        'status': False
    })
    friend13.save()

    friend14 = Friend({
        'sender_id': '2',
        'receiver_id': '8',
        'status': False
    })
    friend14.save()

    friend15 = Friend({
        'sender_id': '2',
        'receiver_id': '9',
        'status': False
    })
    friend15.save()
