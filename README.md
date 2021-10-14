# React Chart

React Chart is a dashboard project with below demo video using ReactJS, ExpressJS, Typescript and REST API design pattern. For storage data using SQLite and using library [React Google Chart](https://react-google-charts.com/) for rendering of the chart based on the data.

- Display welcome message after user sign into application.
- The system shall allow user to log out from the application.
- The system shall allow user to choose any filtering item and once the apply button is clicked, the system shall retrieve the data from the database based on the selected filter.

## Video Demo

[![image](https://user-images.githubusercontent.com/32409305/137228545-e457ddfb-c1a5-4cea-8544-8cd673b36c27.png)](https://streamable.com/kwrh7p)

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
