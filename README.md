# React Chart

React Chart is a dashboard project with below demo video using ReactJS, ExpressJS, Typescript and REST API design pattern. For storage data using SQLite and using library [React Google Chart](https://react-google-charts.com/) for rendering of the chart based on the data.

- Display welcome message after user sign into application.
- The system shall allow user to log out from the application.
- The system shall allow user to choose any filtering item and once the apply button is clicked, the system shall retrieve the data from the database based on the selected filter.

## Video Demo

<div style="width:100%;height:0px;position:relative;padding-bottom:78.689%;"><iframe src="https://streamable.com/e/kwrh7p" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

# Apps

There are 2 projects in this repository which are placed on root directory.

- api : Backend API for support app.
- app : User interface for dashboard chart.

# How To Usage

```
# Install all dependencies from api and app
$ yarn apps:install

# Creating database and table
$ yarn apps:migration

# Import sample data
$ yarn apps:seed

# Run the app include api backend
$ yarn start
```
