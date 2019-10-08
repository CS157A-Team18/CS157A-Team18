# Delight
# CS 157A – Team 18 Project Requirement Document

## Professor:
Dr. Ching-Seh (Mike) Wu

## Team Members:
+ Julia Chin
+ Kimleng Hor
+ Dominic Pham

### Project Overview
Our team will be creating a website to help people find recipes for maintaining a healthy diet. Researchers have found that Americans eat out very often as opposed to cooking food at home. Hence, obesity is a problem in America. According to Vox, foods at restaurants have 20 to 40 percent more calories than home-cooked food. Our team wants to introduce a platform where people can choose their diets and be provided with recipes that suit their diets. With our platform, people will be able to learn how to eat right. Our stakeholders are people who are looking to learn how to maintain a healthy diet. This platform is important because it provides resources to guide people to living a healthy lifestyle.

# System Environment

### Structure Diagram (3-tier Architecture)
<img src="/images/StructureDiagram.png" width=400>

### Hardware and Software Used
- Mac OSX
- Node.js

### RDBMS
- MySQL Community Server 8.0.17

### Application Languages/Frameworks
- Node.js, React, Express, HTML, CSS, Javascript, SQL

### Functional Requirements

1. Create an account
- The website will provide a form for users to fill in their information. The form requires first name, last name, email address, password and confirm password.
- Users must provide complete information in order to proceed with the operation.
- The system will check whether the information that is provided by the user existing in the database. 
- The system will confirm the password is correct for a user account.

2. Manage account.
- Users will be able to change their information; such as email address, password but not their username.
- Users will be able to change their food preferences.
- The system will save and remember all the information that are changed by the user.

3. Food Preference
- Users will be able to set their own preferences for food recipes; such as the level of spiciness, the food cultures, and many more.
- The system will save the information and organize the pages to fit the user preference.

4. Filter
- Users will be able to filter food recipes by:
    - Popularity 
        - Users will be able to filter food recipes from most popular to least popular.
    - Cooking difficulty
        - Users will be able to filter food recipes based on easy, medium, hard to make.
    - Spiciness
        - Users will be able to filter food recipes based on light, medium, heavy spice levels.
    - Diet
        - Users will be able to filter food recipes by different types of diets.
        - Examples of diets include but is not limited to the following:
            - Weight loss
            - Muscle building
            - Vegan
            - Ketogenic
    - Type of meal
        -  Users will be able to filter food recipes by different types of meals.
        - Examples of meals include the following:
            - Breakfast
            - Lunch
            - Dinner
            - Snack
            - Dessert
            - Drink
    - Type of cuisine (e.g. American, Asian, Mexican, etc)
        - Users will be able to filter food recipes by different types of cuisines.
        - Examples of cuisines include but is not limited to the following:
            - American
            - Asian
            - Mexican
            - Canadian
    - Amount of time to cook meal
        - Users will be able to filter food recipes based on the amount of time it takes to make.
    
5. Search bar
- Users will be able to use a search bar to easily navigate recipes. Users should be able to find the items they want fairly easily. The results should display the most relevant items first by default.
- Users will be able to input keywords to narrow down their search.
- Users will be able to change the filters to their preferences.
- This function should be cross integrated with the users' food preferences. Additionally, users will have an option to sort the results by rating.
- Results should be limited to a preset number (e.g., 25 results) for easier readability.

6. Display instructional video, a picture of the meal, and step-by-step instruction guide
- Users will be able to have access to an instructional video, a picture of the meal, and a step-by-step guide on how to make the meal.
- Users will see a list of ingredients for the meal.
- Users will be able to save recipes to their Favorites list.

7. Post review & leave rating
- Users will be able to rate a recipe by liking/disliking, and have an option to write a review.
- Users will to able to click a thumbs up and a thumbs down next to each recipe, representing liking and disliking, respectively. The like/dislike button will glow when selected.
- The like/dislike buttons should act like a toggle. For example, if the user previously clicked "dislike" and decides to click "like", the "dislike" button should be unselected. Likewise, if the user previously clicked "like" and decides to click "dislike", the "like" button should be unselected.
- Reviews will simply be comments. Other users will have the option to like, dislike, and/or comment on reviews.
- The like/dislike feature for the reviews will act in the same manner as described above.
- User can select whether they would like to make the review public or to keep it private

### Nonfunctional Requirements
+ Usability
    - The graphical user interface shall be Bootstrap-based and built using HTML, CSS, and JavaScript.
    - The page will have web responsive functionality i.e can be viewed using different device and will still work properly.
    - Users will be able to understand clearly and easily how to use the website.
    - The website is designed to be user-friendly for everyone.
    
+ Implementation
    - The website shall use React for the front end and Express for the back end. Express will take care of the server side rendering while React takes care of the client side rendering. Server side rendering is necessary to prevent sensitive code from being exposed to the client (e.g., the database config file, and authentication code).
    - React will deal with the front end UI. The application will take advantage of its responsiveness to users.
    - The website will be injected with MySQL databse which is provided by Oracle to read and write the data.
    - The database will keep track of users' information; such as name, preference, and other more.
    - The website will be hosted on the server.
    - The website will recommend users the type of food based on his/her preference.
  
+ Design
    - Sketch shall be used for prototyping.
    - The design will be clean, clear and colorful.

+ Security && Reliability
    - User data will be protected by credentials.
    - On top of credentials, two-factor authentication shall be enabled. This prevents an attacker from gaining access to a user's account should the account be compromised. Additionally, user passwords shall be encrypted with 256-bit AES. Should an attacker gain access to the database, the users' passwords will not be compromised.
    - For access control, only the creators of the website shall have the ability to manage the database and edit the site. Users shall only have the ability to navigate the website.
    - The website should be running with no errors. All errors should be handled by throwing exceptions.
    - The website server should be down in a small period of time during the maintenance.
    
+ Performance
    - Retrieving data from the database should be under five seconds under the stable internet connection.
    - The website should be updated instantly whenever the user makes changes. 
    - Users will be able to find all items that are related to their searches.

### Entity Relationship Model
<img src="/images/ERModel.png" width=500>

### Entity Sets

1. User 
Attributes: username (primary key), first name, last name, and password
The primary key for this set is username, which means the username must be unique.
Password is stored safely with an encryption.
This entity set stores the record and the information of the user.

2. Food Allergy
Attributes: name (primary key)
This set has name as primary key because each food allergy has to be unique.
This entity set stores all kinds of food allergies.

3. Ingredients
Attributes: name (primary key), measurement, quantity
Name is the primary key of this set so that we can distinguish it from other ingredients.
This entity set stores many kinds of ingredients.

4. Recipe
Attributes: timestamp (primary key), name, likes, dislikes, vid_url
Each recipe will be determined with a timestamp as the primary key.
This entity set stores the record of the recipe; such as name, likes, dislikes and video link.

5. Meal Type
	Attributes: name (primary key)
This entity set stores the type of the food (breakfast, lunch, and dinner).


### Relationships

1. Has (between User and Food Allergy)
This relationship has the record of a user who has a food allergy.
It helps to prevent users from having the foods that are harming them.

2. Cause (between Food Allergy and Ingredient)
This relationship has the record of ingredients that cause specific allergy.

3. Has (between Ingredient and Recipe)
This relationship allows us to access the ingredients which are related to the specific recipe.

4. Has (between Recipe and Meal Type)
This relationship determines the meal type of the recipe. It can be breakfast, lunch or dinner.

5. Favorites (between User and Recipe)
Each user can have many favorite recipes, and this relationship keeps track by using username.

6. Likes (between User and Recipe)
This relationship linked user and recipe together in order to determine which recipe is liked or disliked by the user.



### Bibliography
Barclay, Eliza, et al. “It's Easy to Become Obese in America. These 7 Charts Explain Why.” Vox, Vox, 9 Aug. 2018, www.vox.com/2016/8/31/12368246/obesity-america-2018-charts.

