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

2. Manage account.
- Users will be able to change their information; such as email address, password but not their username.
- Users will be able to change their food preferences.
- The system will save and remember all the information that are changed by the user.

3. Food Preference
- Users will be able to set their own preferences for food recipes; such as the level of spiciness, the food cultures, and many more.
- The system will save the information and organize the pages to fit the user preference.

4. Users will be able to filter food recipes by:
    a. Popularity
    b. Cooking difficulty
    c. Spiciness
    d. Diet (e.g. Weight Loss, Muscle Building, Vegan, Ketogenic, etc)
    e. Type of meal (e.g. breakfast, lunch, dinner, snack, dessert, drink)
    f. Type of cuisine (e.g. American, Asian, Mexican, etc)
    g. Amount of time to cook meal
    
5. Search bar
- Users should be able to find the items they want fairly easily. The results should display the most relevant items first by default.
- This function should be cross integrated with the users' food preferences. Additionally, users will have an option to sort the results by rating.
- Results should be limited to a preset number (e.g., 25 results) for easier readability.
6. Users will be able to see an instructional video, a picture of the meal, and a step-by-step guide on how to make the meal.
7. Post review & leave rating
- Users will see a thumbs up and a thumbs down next to each recipe, representing liking and disliking, respectively. The like/dislike button will glow when selected.
- The like/dislike buttons should act like a toggle. For example, if the user previously clicked "dislike" and decides to click "like", the "dislike" button should be unselected. Likewise, if the user previously clicked "like" and decides to click "dislike", the "like" button should be unselected.
- Reviews will simply be comments. Other users will have the option to like, dislike, and/or comment on reviews.
- The like/dislike feature for the reviews will act in the same manner as described above.

### Nonfunctional Requirements
+ Usability
    - The graphical user interface shall be Bootstrap-based and built using HTML, CSS, and JavaScript.
    
+ Implementation
    - The website shall use React for the front end and Express for the back end. Express will take care of the server side rendering while React takes care of the client side rendering. Server side rendering is necessary to prevent sensitive code from being exposed to the client (e.g., the database config file, and authentication code).
    - React will deal with the front end UI. The application will take advantage of its responsiveness to users.
    
+ Design
    - Sketch shall be used for prototyping.

+ Security
    - User data will be protected by credentials.
    - On top of credentials, two-factor authentication shall be enabled. This prevents an attacker from gaining access to a user's account should the account be compromised. Additionally, user passwords shall be encrypted with 256-bit AES. Should an attacker gain access to the database, the users' passwords will not be compromised.
    - For access control, only the creators of the website shall have the ability to manage the database and edit the site. Users shall only have the ability to navigate the website.

### Bibliography
Barclay, Eliza, et al. “It's Easy to Become Obese in America. These 7 Charts Explain Why.” Vox, Vox, 9 Aug. 2018, www.vox.com/2016/8/31/12368246/obesity-america-2018-charts.

