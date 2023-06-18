<h1 align="center">WE4B MUSIC SHARING WEBSITE</h1>

# Table of Contents
- [About the Project](#about-the-project)
  * [Context](#context)
  * [Made with](#made-with)
  * [Features](#features)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Start the web app](#start-the-web-app)
- [License](#license)
- [Authors](#authors)


# About the project

## Context

This site has been made for the WE4B class. The instructions were to create a site using the angular framework for the frontend. The backend was free to choose, therefore the site uses the python framework : django.

## Made with 

Frontend : `Angular CLI 16.0.2`, `Node 16.18.0`

Backend : `Python 3.10.7`, `Django 4.2.1` (more informations about packages in [requirements.txt]() file)

The database of this web app uses django's built in sql database. We filled it with 9000+ songs using [this dataset](https://www.kaggle.com/datasets/undefinenull/million-song-dataset-spotify-lastfm). We then scrapped spotify for the songs artists, albums covers and profile pictures.

 The songs are already tagged by genre, type of voice, etc... Allowing us to make a recommandation system based on the song you're listening to.  

## Features


- Listen to samples of 9000+ famous songs (without needing to be connected)
- Create an account and upload your own songs
- Responsive design for use on all screen sizes
- Recommandation system based on songs tags similarities
- Search system to navigate easily and find your favorite artist
- Add music to your current songs queue, stop, resume, adjust the volume of the songs
- Lazy loading (to optimize the SPA)

# Getting Started

## Prerequisites 

In order to start this website locally you will need : 

- Angular CLI (16.0.2)
- A python interpreter (ideally 3.10.7) with the libraries listed in requirements.txt



## Installation

First, get the files of the project :

Clone the repository locally (if you don't already have the .zip folder)

```cmd
git clone https://github.com/timothewt/WE4B_Project/tree/dev1
```

### Install backend

Using your python interpreter (or a virtual environment), make sure you have all the libraries needed
```cmd
pip install -r requirements.txt
```

### Install frontend

Go to the frontend folder
```cmd
cd frontend
```

Install the app 
```cmd 
npm install
```

## Start the web app

### Launch the server

Go to the backend folder
```cmd 
cd backend
```

Start the server using 

```cmd 
py manage.py runserver
```

### Launch the client

Go to the frontend folder
```cmd
cd frontend
```

Launch the client locally using Angular CLI 

```cmd
ng serve
```


# License

Distributed under the MIT License.

# Authors

- [@timothewt](https://github.com/timothewt)
- [@HugoM25](https://github.com/HugoM25)