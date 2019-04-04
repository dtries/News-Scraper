# News-Scraper
A Headline Grabbing and Commenting App - Discover the Latest Cutting Edge Science News!

Scrapes news items from the [Science Magazine](sciencemag.org) website of the American Association for the Advancement of Science - publishers of the top tier journal *Science*.  

## The Task 
The task was to develop a full-stack web application with a Model View Controller (MVC) structure that is deployed and hosted externally. A listing of the web technologies employed is provided in the **Tech Employed** section below.

## Site Overview 

<div align="left">
    <img src="/public/images/ScraperMain.png" width="400px"</img> 
</div>
<br>
The primary functions of the site a hosted within a single page and uses a modal to accept user text input. The site presents the user  an instinctual user interface and experience. As the database is populated with some news items already, the user lands on the site and immediately understands the actions possible. Choices are to interact via the  the navigation items,card style new items, or the footer items. 

Via the nav-bar, the user can see if new articles are available by clicking the **Scrape For Articles** button, clear the articles off the page, but not from the database, by clicking the **Clear Articles** button, or visit the science journal website by clicking the flat button labeled **The Journal**. Note that the Science label and atom icon on the upper left of the name bar can be clicked to reload the primary page.

The article cards display a picture from the article and the title of the article as well as the author and publication date. In addition, the card presents the user with three interactive possibilities: **LINK TO STORY**, **ADD NOTE**, and **REMOVE ARTICLE**. Clicking **LINK TO STORY** takes the user to the article on the [Science Magazine](sciencemag.org) website, **REMOVE ARTICLE** elimates the article from the database and removes the card from the display, and **ADD NOTE** opens a modal for user input. The modal has an area to enter the user note title and the text of the note. If the user decides not to enter a note, they can click on the **X** icon in the upper right of the modal. Otherwise, upon entering the title and text for the note, the user can save the note to the database where it is associated with the article. As such, the next time the user clicks **ADD NOTE** for that article the note they entered earlier will populate the modal. Should the user decide to modify their note, they can edit as they please and when they click **SAVE NOTE** the note object in the database with be updated and ready to populate the note when called again. Clicking **SAVE NOTE** automatically closes the modal screen. The final action item available via the article cards is **DELETE NOTE**; clicking this button will delete the note from the database and the next time the **ADD NOTE** button is clicked, the a note modal will appear with unfilled note title and text areas.

The footer area includes two user action items: **Notes Object** and **Articles Object**. Clicking on the **Notes Object** flat button will open a page which displays the Notes objects in the database in JavaScript Object Notation (JSON) format (aka Parsed), doing so for the **Articles Object** flat button displays the Articles objects in this same format. Note that a toggle option to view in the raw is available in the upper right of these object display items. The user can click the back button on the browser to return to the primary page.

## Run App Through Heroku Deployement
Try the [App](https://mighty-inlet-33800.herokuapp.com/).
 
## Getting Started on Your Own Machine
1. Clone [repo](https://github.com/dtries/News-Scraper.git) to your machine. 
1. Navigate to the News-Scraper directory on your maching using GitBash or your terminal.
1. Enter 'npm install' in GitBash or your terminal.
   * This will install the proper js package files from a package JSON file.
1. You will need to have mongodb installed and mongod running on your machine for local database use. See the [MongoDB](https://www.mongodb.com/) site for more information.
   
   ## Running on a Local Server
   1. Enter 'node server.js' this will open a local server on your machine. 
   1. Your terminal will display which port the app is using, in this case 3030.
   1. Open up a browser window and type in 'localhost:3030', this will open the homepage for Scrape *Science* App.
     
## User Actions:
   1. Scrape for new articles.       
   1. Clear all articles from screen, but not database.
   1. Delete a selected articled from the database and remove associated card from the display.
   1. View the article at the [Science Magazine](sciencemag.org) website.
   1. View the Note or Articles database objects.
   1. Add a user note for a selected article, the note is saved to the database and associated with the article.
       1. The note can be updated or deleted by the user.
   
## Tech Employed
* Node.js - (see below)
* Axios - https://www.npmjs.com/package/axios
* Cheerio - https://www.npmjs.com/package/cheerio
* ESLint - https://eslint.org/
* Express.js - https://www.npmjs.com/package/express
* Express-Handlebars - https://www.npmjs.com/package/express-handlebars
* Handlebars - http://handlebarsjs.com/
* JavaScript - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources
* JQuery - https://jquery.com/
* Materialize - https://materializecss.com/
* mLab MongoDB - https://elements.heroku.com/addons/mongolab
* MongoDB - https://www.mongodb.com/
* Mongoose - https://www.npmjs.com/package/mongoose
* Morgan - https://www.npmjs.com/package/morgan
* Sequelize - https://www.npmjs.com/package/sequelize

## Prerequisites
* Node.js - The latest version of Node is available at: https://nodejs.org/en/

## Built With
VS Code - Text Editor
## Authored and Maintained By:
* Dennis Ries

Contact: dtries@gmail.com

© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
