from re import S
from app.models import db, Business


def seed_businesses():
    business1 = Business(
        user_id=1,
        name="Supa Coffee",
        address="1173 S Robertson Blvd Los Angeles, CA 90035",
        zipcode="90035",
        city="Los Angeles",
        state="CA",
        country="USA",
        phone_number="4243892406",
        website="http://supacoffee.com",
        # price=None,
        lat=34.05528170177322,
        lng=-118.38389153077996,
    )
    business2 = Business(
        user_id=1,
        name="Aharon Coffee & Roasting",
        address="9467 Charleville Blvd Beverly Hills, CA 90212",
        zipcode="90212",
        city="Beverly Hills",
        state="CA",
        country="USA",
        phone_number="4242884048",
        website="http://www.aharoncoffee.com",
        # price=None,
        lat=34.065358362642606,
        lng=-118.39953883077972,
    )
    business3 = Business(
        user_id=1,
        name="Cafe Sheera",
        address="443 N Bedford Dr Beverly Hills, CA 90210",
        zipcode="90210",
        city="Beverly Hills",
        state="CA",
        country="USA",
        phone_number="3108609345",
        website="http://www.sheerasweets.com",
        # price=None,
        lat=34.06880852807598,
        lng=-118.40592151728659,
    )
    business4 = Business(
        user_id=1,
        name="Coffee Connection",
        address="3838 S Centinela Ave Los Angeles, CA 90066",
        zipcode="90066",
        city="Los Angeles",
        state="CA",
        country="USA",
        phone_number="3103911380",
        website="https://coffeeconnectionla.com/",
        # price=None,
        lat=34.00328035466812,
        lng=-118.43279470194516,
    )
    business5 = Business(
        user_id=3,
        name="La Colombe Coffee Roasters",
        address="9606 S Santa Monica Blvd Ste 100-A Beverly Hills, CA 90210",
        zipcode="90210",
        city="Beverly Hills",
        state="CA",
        country="USA",
        phone_number="3104022821",
        website="http://www.lacolombe.com",
        # price=None,
        lat=34.069754401373494,
        lng=-118.4055995596152,
    )
    business6 = Business(
        user_id=2,
        name="Storyville Coffee Company",
        address="94 Pike St Ste 34 Seattle, WA 98101",
        zipcode="98101",
        city="Seattle",
        state="WA",
        country="USA",
        phone_number="2067805777",
        website="http://www.storyville.com",
        # price=None,
        lat=47.6090724433759,
        lng=-122.34041313049076,
    )
    business7 = Business(
        user_id=2,
        name="Coffeeholic House",
        address="3700 S Hudson St Seattle, WA 98118",
        zipcode="98118",
        city="Seattle",
        state="WA",
        country="USA",
        phone_number="2067223327",
        website="https://coffeeholichouse.com/",
        # price=None,
        lat=47.557442707783494,
        lng=-122.28599251514954,
    )
    business8 = Business(
        user_id=2,
        name="Anchorhead Coffee",
        address="1600 7th Ave Ste 105 Seattle, WA 98101",
        zipcode="98101",
        city="Seattle",
        state="WA",
        country="USA",
        phone_number="2062222222",
        website="https://anchorheadcoffee.com/",
        # price=None,
        lat=47.61354493151684,
        lng=-122.33477453049059,
    )
    business9 = Business(
        user_id=4,
        name="Milstead",
        address="754 N 34th St Seattle, WA 98103",
        zipcode="98103",
        city="Seattle",
        state="WA",
        country="USA",
        phone_number="2066594814",
        website="http://www.milsteadandco.com",
        # price=None,
        lat=47.64960461466107,
        lng=-122.3481053169967,
    )
    business10 = Business(
        user_id=4,
        name="Hello Em Viet Coffee & Roastery",
        address="1227 S Weller St Seattle, WA 98144",
        zipcode="98144",
        city="Seattle",
        state="WA",
        country="USA",
        phone_number="9991234567",
        website="https://www.yelp.com/biz/hello-em-viet-coffee-and-roastery-seattle-2",
        # price=None,
        lat=47.59748504563124,
        lng=-122.31550328816235,
    )
    business11 = Business(
        user_id=4,
        name="Rise & Grind Coffee and Tea",
        address="785 8th Ave San Francisco, CA 94118",
        zipcode="94118",
        city="San Francisco",
        state="CA",
        country="USA",
        phone_number="4157801579",
        website="http://www.riseandgrind-sf.com",
        # price=None,
        lat=37.77392091049802,
        lng=-122.46615893071034,
    )
    business12 = Business(
        user_id=5,
        name="Home Coffee Roasters",
        address="2018 Clement St San Francisco, CA 94121",
        zipcode="94121",
        city="San Francisco",
        state="CA",
        country="USA",
        phone_number="4157029244",
        website="http://www.homecoffeesf.com",
        # price=None,
        lat=37.78252786627283,
        lng=-122.4810126595458,
    )
    business13 = Business(
        user_id=5,
        name="The Mill",
        address="736 Divisadero St San Francisco, CA 94117",
        zipcode="94117",
        city="San Francisco",
        state="CA",
        country="USA",
        phone_number="4153451953",
        website="http://www.themillsf.com",
        # price=None,
        lat=37.77666632279603,
        lng=-122.43773324420324,
    )
    business14 = Business(
        user_id=6,
        name="Andytown Coffee Roasters",
        address="3655 Lawton St San Francisco, CA 94122",
        zipcode="94122",
        city="San Francisco",
        state="CA",
        country="USA",
        phone_number="4157539775",
        website="http://andytownsf.com",
        # price=None,
        lat=37.75686389261909,
        lng=-122.50231810187489,
    )
    business15 = Business(
        user_id=6,
        name="Snowbird Coffee",
        address="1352 A 9th Ave San Francisco, CA 94122",
        zipcode="94122",
        city="San Francisco",
        state="CA",
        country="USA",
        phone_number="4155737740",
        website="https://snowbird-coffee.square.site/",
        # price=None,
        lat=37.76339068448897,
        lng=-122.46595244420352,
    )
    business16 = Business(
        user_id=1,
        name="Local Coffee House",
        address="614 E Cooper Ave Aspen, CO 81611",
        zipcode="81611",
        city="Aspen",
        state="CO",
        country="USA",
        phone_number="9704294026",
        website="https://www.localcoffeeaspen.com/",
        # price=None,
        lat=39.18799133042765,
        lng=-106.81724130157579,
    )
    business17 = Business(
        user_id=1,
        name="Paradise Bakery",
        address="320 S Galena St Aspen, CO 81611",
        zipcode="81611",
        city="Aspen",
        state="CO",
        country="USA",
        phone_number="9709257585",
        website="https://www.paradisebakeryaspen.com/",
        # price=None,
        lat=39.18834312366375,
        lng=-106.81844979972436,
    )
    business18 = Business(
        user_id=1,
        name="Bear Den Aspen",
        address="301 E Hopkins Ave Aspen, CO 81611",
        zipcode="81611",
        city="Aspen",
        state="CO",
        country="USA",
        phone_number="9709229218",
        website="https://beardenaspen.com/",
        # price=None,
        lat=39.190033357458425,
        lng=-106.82055864390392,
    )
    business19 = Business(
        user_id=7,
        name="Craft & Common",
        address="47 E Robinson St Ste 100 Orlando, FL 32801",
        zipcode="32801",
        city="Orlando",
        state="FL",
        country="USA",
        phone_number="4077238078",
        website="https://craftandcommon.com/",
        # price=None,
        lat=28.546054947708402,
        lng=-81.37810338824161
    )
    business20 = Business(
        user_id=2,
        name="CFS Coffee",
        address="7535 W Sand Lake Rd Orlando, FL 32819",
        zipcode="32819",
        city="Orlando",
        state="FL",
        country="USA",
        phone_number="4072505724",
        website="https://www.cfscoffee.com/",
        # price=None,
        lat=28.45095184317714,
        lng= -81.48505015940685
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.add(business6)
    db.session.add(business7)
    db.session.add(business8)
    db.session.add(business9)
    db.session.add(business10)
    db.session.add(business11)
    db.session.add(business12)
    db.session.add(business13)
    db.session.add(business14)
    db.session.add(business15)
    db.session.add(business16)
    db.session.add(business17)
    db.session.add(business18)
    db.session.add(business19)
    db.session.add(business20)


def undo_business():
    db.session.execute("TRUNCATE businesses RESTART IDENTITY CASCADE;")
    db.session.commit()
