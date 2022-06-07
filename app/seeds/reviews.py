from app.models import db, Review
import datetime
import random


def seed_reviews():
    reviewComments = [
        "I have been wanting to try this place, but never had the chance until running errands today and I had such a great experience!",
        "I thought their pricing was fair and their coffee tastes great! The lavender latte wasn't overly sweet or artificial tasting and the coffee itself had a good bold flavor, but was not bitter.",
        "I love this place for their perfect hot Matcha Latte. I usually buy it with almond milk. They also have an assortment of pastries, including croissants, ice creams, popsicles, and even dog toys and treats.",
        "Dropped by while running errands in the area. I was pleasantly surprised to see that the lattes are reasonably priced, considering their list of pretty 'instagrammable' drinks lol. ",
        "One of the best london fogs I've had in my life! Staff is super friendly and my drink was so amazing. The banana chocolate tea cake is also tasty. It's very expensive (my medium drink was $8.50) but not much I can do about that.",
        "Great coffee. Not cheap but worth it. Discovered a more economical way to do it this morning. Picked up coffee for a family event and got a Carafe - 96 oz for $26, came with 15 cups, cream, etc.",
        "I can't wait to try their other specialty drinks on the menu next time. I'm just scared I won't be able to find parking or seating on the weekends!",
        "This place is great for studying, I wish I found a place like this while I was still in college. It's always lovely. A gigantic tree full of leaves drapes the outdoor section of the coffee shop, which comfortably blocks the sun from the seats and tables, and still allows the perfect amount of breeze in. ",
        "Very cute coffee shop! Has lots of seating (both inside and outside) and the staff is so friendly! I had a cappuccino and the foam was very fluffy and the coffee was still strong. A great place to study for an exam or catch up on emails.",
        "Was looking for a workspace outside the home office (along with java and a pastry) and this place hit the spot.  It was jammin' with a lot of remote workers both inside and the outer patio area.",
    ]
    # Loop thru the businesses and assign a review to each one 1 - 15
    for j in range(1, 16):
        # for each business assigned a review assign a user id 1-10
        for i in range(1, 11):
            # assign a random number 1 - 500 to the reviewDays variable to use later
            reviewDays = random.randint(0, 500)
            db.session.add(
                Review(
                    # calls the user_id variable
                    user_id=i,
                    # calls the business_id variable
                    business_id=j,
                    # uses the reviewComments variable above to assign a comment two less than the user id variable
                    review=reviewComments[i - 2],
                    # deducts the day duration of days in the above reviewdays variable from the current date and time
                    date=(
                        datetime.datetime.now() - datetime.timedelta(days=reviewDays)
                    ).date(),
                    # the next 3 assign a random star value from 3 to 5 stars for each of the ratings
                    rating=random.randint(1, 5),
                )
            )

    db.session.commit()


def undo_reviews():
    db.session.execute("TRUNCATE reviews RESTART IDENTITY CASCADE;")
    db.session.commit()
