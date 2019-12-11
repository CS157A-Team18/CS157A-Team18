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

1. Signup
- The website will provide a form for users to fill in their information. The form requires first name, last name, email address, password and confirm password.
- The system will check whether the information that is provided by the user existing in the database (**READ operation**).
- If the user does not already exist and the password requirements are met, the system will create a new user entry into the database (**CREATE operation**)

2. Dashboard
- When the user logs in successfully, a he/she will be redirected to the dashboard.
- The dashboard should show all the recipes uploaded by every user (**READ operation**)
- The dashboard should display the user's full name in the top right corner (**READ operation**)

2. Manage Account.
- Users will be able to change their information. This includes their names and passwords, but not their email addresses (**UPDATE operation**).

3. Upload Recipe
- Users will be able to upload recipes which include attributes like the recipe name, ingredients, instructions, video URL, and picture URL (**CREATE operation**).
- The system will check whether the ingredients already exist in the database (**READ operation**)
- If the ingredient does not already exist, the system will add the ingredient to the database (**CREATE operation**)

4. Uploaded Recipes Page
- Users will be able to view the recipes they uploaded (**READ operation**)
- Users will be able to edit the recipes they uploaded (**UPDATE operation**)
- Users will be able to delete the recipes they uploaded (**DELETE operation**)

4. View Recipe
- Users will be able to have access to an instructional video, a picture of the meal, and a step-by-step guide on how to make the meal (**READ operation**).
- Users will be able to see whether they have liked, disliked, and/or favorited a recipe (**READ operation**).

5. Favorites List
- Users will be able to save recipes to their Favorites list (**CREATE operation**).
- Users will be able to remove recipes from their Favorites list (**DELETE operation**).
- Users will be able to access their Favorites list (**READ operation**).

6. Leave Rating
- Users will be able to rate a recipe by liking/disliking (**CREATE operation**).
- Users can deselect their likes/dislikes (**DELETE operation**).

7. Liked Recipes List
- Users will be able to view the recipes they liked (**READ operation**).

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
    - User passwords shall be encrypted with 256-bit AES. Should an attacker gain access to the database, the users' passwords will not be compromised.
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

1. User 
Attributes: uid (primary key), first_name, last_name
The primary key for this set is username, which means the username must be unique.
Password is stored safely with an encryption.
This entity set stores the record and the information of the user.

2. Food Allergy
Attributes: id (primary key), name
This set has name as primary key because each food allergy has to be unique.
This entity set stores all kinds of food allergies.

3. Ingredients
Attributes: id (primary key), name
Name is the primary key of this set so that we can distinguish it from other ingredients.
This entity set stores many kinds of ingredients.

4. Recipe
Attributes: id (primary key), name, likes, dislikes, vid_url, pic_url
Each recipe will be determined with a timestamp as the primary key.
This entity set stores the record of the recipe; such as name, likes, dislikes and video link.

5. Meal Type
Attributes: id (primary key), name
This entity set stores the type of the food (breakfast, lunch, and dinner).

6. Instruction
Attributes: id (primary key), instruction
This entity set stores the instructions for the recipes.



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

### Schema & Table Screenshots
***Bolded keys are the primary keys***

1. user(__username__, first_name, last_name, password)
<img src="/images/user.png">

2. food_allergy(__name__)
<img src="/images/food_allergy.png">

3. user_food_allergy_junction_table(__username__, __food_allergy_name__)
<img src="/images/user_food_allergy_junction_table.png">

4. user_recipe_junction_table_favorites(__username__, __timestamp__)
<img src="/images/user_recipe_junction_table_favorites.png">

5. user_recipe_junction_table_likes (__username__, __timestamp__) 
<img src="/images/user_recipe_junction_table_likes.png">

6. ingredient (__name__)
<img src="/images/ingredient.png">

7. food_allergy_ingredient_junction_table (__food_allergy_name__, __ingredient_name__)
<img src="/images/food_allergy_ingredient_junction_table.png">

8. recipe_ingredient_junction_table (__recipe_timestamp__, __ingredient_name__, quantity, measurement)
<img src="/images/recipe_ingredient_junction_table.png">

9. recipe (__name__)
<img src="/images/recipe.png">

10. meal_type (__name__)
<img src="/images/meal_type.png">

11. recipe_meal_type_junction_table (__recipe_timestamp__, __meal_type_name__)
<img src="/images/recipe_meal_type_junction_table.png">


### Normalization
User
    User (uid, first_name, last_name)
    Let A=uid, B=first_name, C=last_name
    Functional Dependency: A -> BC
    A -> BC is a nontrivial functional dependency and A is a superkey. Hence the User table is in BCNF.

Food Allergy
    Food Allergy (id, name)
    Let A=id, B=name
    Functional Dependency: A -> B
    A -> B is a nontrivial functional dependency and A is a superkey. Hence the Food Allergy table is in BCNF.

Ingredients
    Ingredients (id, name)
    Let A=id, B=name
    Functional Dependency: A -> B
    A -> B is a nontrivial functional dependency and A is a superkey. Hence the Ingredients table is in BCNF.

Recipe
    Recipe (id, name, dislikes, likes, vid_url, pic_url)
    Let A=id, B=name, C=dislikes, D=likes, E=vid_url, F=pic_url
    Functional Dependency: A -> BCDEF
    A -> BCDEF is a nontrivial functional dependency and A is a superkey. Hence the Recipe table is in BCNF.

Meal Type
    Meal Type (id, name)
    Let A=id, B=name
    Functional Dependency: A -> B
    A -> B is a nontrivial functional dependency and A is a superkey. Hence the Meal Type table is in BCNF.

Instruction
    Instruction (id, instruction)
    Let A=id, B=name
    Functional Dependency: A -> B
    A -> B is a nontrivial functional dependency and A is a superkey. Hence the Instruction table is in BCNF.


### Bibliography
Barclay, Eliza, et al. “It's Easy to Become Obese in America. These 7 Charts Explain Why.” Vox, Vox, 9 Aug. 2018, www.vox.com/2016/8/31/12368246/obesity-america-2018-charts.

