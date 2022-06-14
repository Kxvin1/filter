# Filter

Inspired by Yelp, Filter is a single page app which publish crowd-sourced reviews about coffee shop businesses. Users can interact with the webapp via searching for coffee shop businesses, or writing reviews on a specific coffee shop's business page.

### Here are some key features:
  - Integrated Google Maps API with geolocation to dynamically display business locations and directions based on the address of the business
  - Leveraged Redux to create a single page app to dynamically render React components without a refresh
  - Stored image uploads in the cloud using AWS S3, reducing server load and allowing app to scale gracefully
  - Conducted authorization checks using React hooks, redirecting users to secure paths based on credentials
  - Created relational databases using Python and SQLAlchemy to easily sort and find related table information
  - Adhered to React and ES6 best practices to generate a true single page reactive web app experience

### Links
- [Live Site](https://filter-capstone.herokuapp.com/)
- [MVP Feature List](https://github.com/Kxvin1/filter/wiki/Feature-List)
- [Database Schema](https://github.com/Kxvin1/filter/wiki/Database-Schema)
- [API Routes](https://github.com/Kxvin1/filter/wiki/API-Routes)
- [Frontend Routes](https://github.com/Kxvin1/filter/wiki/Frontend-Routes)
- [User Stories](https://github.com/Kxvin1/filter/wiki/User-Stories)

#### **_Recommended resolution size for viewing: 1366 x 768 or higher_**

# Technologies Used

## Backend

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## APIs, Image Storage & Hosting

![Google Maps API](https://img.shields.io/badge/Google%20Maps-4285F4.svg?style=for-the-badge&logo=Google-Maps&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Getting Started
1. Clone this repository

   ```bash
   git clone https://github.com/Kxvin1/filter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

# Project Pages & Features


## Home Page (logged out) & User Authentication

- A User that isn't logged must log in in order to access the website

![Splash Page](https://i.imgur.com/T3ZR5zB.jpeg)

## Log In and Sign Up

- Users can log into an existing account or sign up. Alternatively, users can test the site with the Demo Login feature.

- Login Modal

![Login Modal](https://i.imgur.com/ABpd9jr.png)

- Signup Modal

![Signup Modal](https://i.imgur.com/G7CQs0t.jpeg)

## Home Page (logged in)

- A User that is logged in will gain additional links to their navigation bar: Home, Add Business, Quick Search, and Log Out. The footer will also disappear.

![Home Page Authenticated](https://i.imgur.com/y1AHScb.jpeg)

- When hovering over a listing a shadow will appear to let the user know which shop is the point of focus.
- Clicking on 'Business Details' will redirect the user to that specific shop's details page.

- Home Page

![Home Page Splash](https://i.imgur.com/4a1N2VG.jpeg)

- Hovered over a single business

![Hover Home](https://i.imgur.com/UYBknkS.png)

## Business Details

- When a User clicks on a Business, they are directed to the Business details page. 
- This page contains a cover image, an image gallery, a google map of the business' location, a reviews section, a container on the right that scrolls with the page. The container displays a clickable link to the business' website, their phone number, and a link to a different page in case the user wants to get directions to the business (explained in the 'Directions' section below).

### Non Business Owner
- If the logged in user does not own the business, this is the page they see and the functionality of the page.
    - On the left are two buttons 'Write Review' and 'See Photos'
    - If Write Review is clicked the user is scrolled to the review section.
    - If See Photos is clicked the user is redirected to a page containing of all the business' photos.
   - On the right is a section that displays the business' website, phone number, and directions to their business address.
   - Below those two is an interactive Google Map displaying the location of the business that the user can interact with.

- Top Section

![Business Details 1](https://i.imgur.com/IfdTPfx.jpeg)

- Photos Page

![Business Details 2](https://i.imgur.com/ivFi3Ek.jpeg)

- Amenities Section (Yelp Style)

![Amenities](https://i.imgur.com/3yoG6Iw.png)

- Reviews Section

![Reviews Section 1](https://i.imgur.com/RSNgBTm.png)

- To achieve a cleaner look on the site, the edit and delete icons only show when the logged in User wrote the comment themselves.

   - Wrote the review

  ![Review Owner](https://i.imgur.com/krwQxQA.png)

  - Did not write the review

  ![Review Not Owner](https://i.imgur.com/EuQS2Y3.png)

- Users can leave a rating here, as well as leave a review.

![Reviews Section 2](https://i.imgur.com/hHhU4Mm.png)

- Edit Review Modal

![Edit Review Modal](https://i.imgur.com/RTFkcUp.png)

- Delete Review Modal

![Delete Review Modal](https://i.imgur.com/zCPieES.png)

### Business Owner
- If the logged in user does own the business, they gain additional functionality in addition to all the functionality as a non owner, in addition to the regular 'Write Review' and 'See Photos' buttons:
   - Business owners can edit the business listing details
   - Business owners can delete the business listing
   - If a business owner clicks on 'See Photos' they are redirected to the same page but this time can delete any photo even if they are not the owner of the photo

- Top Section (additional buttons as an owner)

![Business Owner Details 1](https://i.imgur.com/bcDqPWm.jpeg)

- See Photos Section

![Business Owner Details 2](https://i.imgur.com/LBcjfkL.jpeg)

- Edit Business

![Business Owner Details 3](https://i.imgur.com/BnHUlZC.png)

## Adding and Editing a Business

- In 'Add a Business' a User can create their own Business listing.
- Users can add images via drag and drop
- Address and latitude and longitude are automatically filled out via Google Maps API
- Proper error handling to ensure all information is input correctly and within the site boundaries

![Post A Business](https://i.imgur.com/p5h8YmP.png)

- A User can also edit a listing
- The layout and functionality is similar to the Add a Business page, also has the same error handling

![Edit a Business](https://i.imgur.com/y9A3oLa.png)

## Directions

- When on any Business page and the User clicks on the address link below 'Get Directions', the User is taken to a page that lets them input a location to show how far away the business is from a user specified origin.

- Without origin input

![Directions 1](https://i.imgur.com/ZI6aTXu.jpeg)

- With origin input

![Directions 2](https://i.imgur.com/66c1aCh.jpeg)

## Quick Search

- If a User doesn't want to type anything in the search bar and just wants to see the best coffee shops, they can click 'Quick Search' at the top
- Quick Search displays Filter's top coffee businesses sorted by their rating

![Quick Search](https://i.imgur.com/16HbISN.jpeg)

## 404 (User logged out)

![404 logged out](https://i.imgur.com/RLK8eof.png)

## 404 (User logged in)

![404 logged in](https://i.imgur.com/KbmGelW.png)


[Back to top](https://github.com/Kxvin1/filter#filter)
