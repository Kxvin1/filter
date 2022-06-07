from app.models import db, Image


def seed_images():

    # josh images
    image1 = Image(
        business_id=1,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/XWeN_IWfXcQc3QgQfQrceQ/o.jpg",
    )
    image2 = Image(
        business_id=1,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/cbK-axwPiNbG-7-e5ur-qw/o.jpg",
    )
    image3 = Image(
        business_id=1,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/qIsQXBl1T0B7jPxNwZOy0Q/o.jpg",
    )

    image4 = Image(
        business_id=2,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/pXHCVrY04kOwQ15Tx2MOgw/o.jpg",
    )
    image5 = Image(
        business_id=2,
        user_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/8yk_RSTIZ2ZgPxveXFQN2Q/o.jpg",
    )
    image6 = Image(
        business_id=2,
        user_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/d50FVyNfSuSWjXw6vol9XQ/o.jpg",
    )

    image7 = Image(
        business_id=3,
        user_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/BsfnUW6iwWVfGi02bA_c7g/o.jpg",
    )
    image8 = Image(
        business_id=3,
        user_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/-pqWqOmmgd5AFNDKjpm31w/o.jpg",
    )
    image9 = Image(
        business_id=3,
        user_id=3,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/P9Ts2FbrYgNR0c2S2SC-wQ/o.jpg",
    )

    image10 = Image(
        business_id=4,
        user_id=3,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Cp-n56ui3_O2e6OblcbTIw/o.jpg",
    )
    image11 = Image(
        business_id=4,
        user_id=3,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/B__bjEHGrPB3v0kakyX9JQ/o.jpg",
    )
    image12 = Image(
        business_id=4,
        user_id=4,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/tlnQzvVl-6WkwFVvlbNZIA/o.jpg",
    )

    image13 = Image(
        business_id=5,
        user_id=4,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/FzuK5TGad8KNiHxSr339Nw/o.jpg",
    )
    image14 = Image(
        business_id=5,
        user_id=4,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/vbVDzGuYVZcqoYdUfHO7FA/o.jpg",
    )
    image15 = Image(
        business_id=5,
        user_id=4,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/obGeK8Ui8TQ6s9ugHn7NTA/o.jpg",
    )

    image16 = Image(
        business_id=6,
        user_id=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/rRLNylMCYOUHZmqTm7lEsQ/o.jpg",
    )
    image17 = Image(
        business_id=6,
        user_id=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/nJgiyjMZ7sglAtc5wyKSLQ/o.jpg",
    )
    image18 = Image(
        business_id=6,
        user_id=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/H9fltJRp_mgSktAbA4Wheg/o.jpg",
    )

    image19 = Image(
        business_id=7,
        user_id=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Pc-QBBTBfAfRtNwfaeaD2g/o.jpg",
    )
    image20 = Image(
        business_id=7,
        user_id=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/ffhGURPP-3FkAr8Db-d9hA/o.jpg",
    )
    image21 = Image(
        business_id=7,
        user_id=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/kgZbdUxB5IIANu1BcWj43g/o.jpg",
    )

    image22 = Image(
        business_id=8,
        user_id=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/WIjaUvlqSzyYre3UppGWhg/o.jpg",
    )
    image23 = Image(
        business_id=8,
        user_id=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/i7TpV2cwjR-EpPtD-5M0Gw/o.jpg",
    )
    image24 = Image(
        business_id=8,
        user_id=7,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Y-aZTMeA1ybO_BnawFi8Zw/o.jpg",
    )

    image25 = Image(
        business_id=9,
        user_id=7,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/3ZcTHrDcGP1fX6aaTpkkfg/o.jpg",
    )
    image26 = Image(
        business_id=9,
        user_id=7,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/NGjpUAu0Fi61n9MmfkB88Q/o.jpg",
    )
    image27 = Image(
        business_id=9,
        user_id=7,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/cWSa8T7VifxTzkh6XU5Klg/o.jpg",
    )

    image28 = Image(
        business_id=10,
        user_id=8,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/VmT75loeR2ThU62R3obelA/o.jpg",
    )
    image29 = Image(
        business_id=10,
        user_id=8,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/ZjdsyiFyxXuxdGXVKqof2Q/o.jpg",
    )
    image30 = Image(
        business_id=10,
        user_id=8,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/3BEoHY_18cJPHbn54fo9lg/o.jpg",
    )

    image31 = Image(
        business_id=11,
        user_id=8,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/lSn1p--riPcrNfbkarohWw/o.jpg",
    )
    image32 = Image(
        business_id=11,
        user_id=9,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Z6MxBavhjPbgnM9xIFsuAw/o.jpg",
    )
    image33 = Image(
        business_id=11,
        user_id=9,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/DjP4jnwZHJeGYPsH01KW0w/o.jpg",
    )

    image34 = Image(
        business_id=12,
        user_id=9,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/lRWBhpFRcT_EUqqI6i3Cwg/o.jpg",
    )
    image35 = Image(
        business_id=12,
        user_id=10,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/5WUe4uKagqhB3Szfqq4kAA/o.jpg",
    )
    image36 = Image(
        business_id=12,
        user_id=10,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Py-P2WMsSbZEsI4YDYSAxQ/o.jpg",
    )

    image37 = Image(
        business_id=13,
        user_id=10,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/74OtEX5kLS9-fjnoXQw_Xg/o.jpg",
    )
    image38 = Image(
        business_id=13,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/6joTrodR0kiirr9n-BUUIg/o.jpg",
    )
    image39 = Image(
        business_id=13,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/tlv8tabsEqsREorWyGcJXw/o.jpg",
    )

    image40 = Image(
        business_id=14,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/hq8mgb9cyf75MO7kdp9TFg/o.jpg",
    )
    image41 = Image(
        business_id=14,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/AanPpxseRU--fBaghd-b5Q/o.jpg",
    )
    image42 = Image(
        business_id=14,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/h4sEWLMqswechk6L-LKgFw/o.jpg",
    )

    image43 = Image(
        business_id=15,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/Uy9nPcvObGZ6ROIL7GYCRg/o.jpg",
    )
    image44 = Image(
        business_id=15,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/amLqp8uJjWwAxJM3EMv1Ag/o.jpg",
    )
    image45 = Image(
        business_id=15,
        user_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/JrC9jH-nvOxcBd7dXkPAag/o.jpg",
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)
    db.session.add(image30)
    db.session.add(image31)
    db.session.add(image32)
    db.session.add(image33)
    db.session.add(image34)
    db.session.add(image35)
    db.session.add(image36)
    db.session.add(image37)
    db.session.add(image38)
    db.session.add(image39)
    db.session.add(image40)
    db.session.add(image41)
    db.session.add(image42)
    db.session.add(image43)
    db.session.add(image44)
    db.session.add(image45)

    db.session.commit()


def undo_images():
    db.session.execute("TRUNCATE images RESTART IDENTITY CASCADE;")
    db.session.commit()
