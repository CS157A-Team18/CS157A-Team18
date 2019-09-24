# CS157A-Team18
Project Proposal: https://docs.google.com/document/d/18x-RVWZ8EyQLAe7ZrwN4HEShcfQ2A2eoOs4oNtzYU9Y/edit?usp=sharing

# Proposal Contributions:
- Cover Page:                   Kimleng Hor
- Project Overview:             Kimleng Hor / Julia Chin
- System Environment:           Dominic Pham
- Functional Requirements:      Julia Chin / Dominic Pham
- Non-functional Requirements:  Julia Chin / Dominic Pham

# Delight
# CS 157A – Team 18


## Professor:
Dr. Ching-Seh (Mike) Wu


## Team Members:
+ Julia Chin
+ Kimleng Hor
+ Dominic Pham

### Project Overview

Our team will be creating a website to help people find recipes for maintaining a healthy diet. Researchers have found that Americans eat out very often as opposed to cooking food at home. Hence, obesity is a problem in America. According to Vox, foods at restaurants have 20 to 40 percent more calories than home-cooked food. Our team wants to introduce a platform where people can choose their diets and be provided with recipes that suit their diets. With our platform, people will be able to learn how to eat right. Our stakeholders are people who are looking to learn how to maintain a healthy diet. This platform is important because it provides resources to guide people to living a healthy lifestyle.

### Structure Diagram (3-tier Architecture)

<img src="/images/StructureDiagram.png" width=400>

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
- Users will be able to use a search bar to easily navigate recipes.
- Users will be able to input keywords to narrow down their search.
- Users will be able to change the filters to their preferences.

6. Display instructional video, a picture of the meal, and step-by-step instruction guide
- Users will be able to have access to an instructional video, a picture of the meal, and a step-by-step guide on how to make the meal.
- Users will see a list of ingredients for the meal.
- Users will be able to save recipes to their Favorites list.

7. Review forum
- Users will be able to rate a recipe by liking/disliking, and have an option to write a review.
- Users will be able to click a thumbs up or thumbs down icon.
- User can select whether they would like to make the review public or to keep it private.

### Nonfunctional Requirements
+ Usability
    - The graphical user interface shall be Bootstrap-based and built using HTML, CSS, and JavaScript.
    
+ Implementation
    - The website shall use React for the frond end and Express for the backend.
    
+ Design
    - Sketch shall be used for prototyping.

+ Reliability
    - For security, two-factor authentication shall be enabled. Additionally, user passwords shall be encrypted with 256-bit AES.
    - For access control, only the creators of the website shall have the ability to manage the database and edit the site. Users shall only have the ability to navigate the website.
    
+ Performance

### Bibliography
Barclay, Eliza, et al. “It's Easy to Become Obese in America. These 7 Charts Explain Why.” Vox, Vox, 9 Aug. 2018, www.vox.com/2016/8/31/12368246/obesity-america-2018-charts.

