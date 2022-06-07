from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="Demo@demo.com",
        password="password",
    )
    user2 = User(
        username="Adam",
        email="Adam@adam.com",
        password="password1",
    )
    user3 = User(
        username="Jason",
        email="Jason@jason.com",
        password="password2",
    )
    user4 = User(
        username="Andrew",
        email="Andrew@andrew.com",
        password="password3",
    )
    user5 = User(
        username="Christina",
        email="Christina@christina.com",
        password="password4",
    )
    user6 = User(
        username="Sophia",
        email="Sophia@sophia.com",
        password="password5",
    )
    user7 = User(
        username="Stephen",
        email="Stephen@stephen.com",
        password="password6",
    )
    user8 = User(
        username="Klay",
        email="Klay@klay.com",
        password="password7",
    )
    user9 = User(
        username="Danielle",
        email="Danielle@danielle.com",
        password="password8",
    )
    user10 = User(
        username="Hailey",
        email="Hailey@hailey.com",
        password="password9",
    )

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
