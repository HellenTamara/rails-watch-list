# MovieMix

<img src="https://i.ibb.co/VNn8B4r/movie-mix-2c56b083c637-herokuapp-com-lists-High-Res-2-Large.jpg" alt="movie-mix-2c56b083c637-herokuapp-com-lists-High-Res-2-Large" border="0" width="100%">


## Introduction

Welcome to MovieMix, your go-to web application for creating and managing your movie lists. MovieMix allows you to curate your own personalized movie collections, enabling you to add or remove movies as you please. Whether you're a cinephile or just looking for something to watch, MovieMix has you covered.

## Demo

Check out the live demo of MovieMix [here](https://movie-mix-2c56b083c637.herokuapp.com/). 

## Features

- **Create Movie Lists:** Build your own movie lists tailored to your preferences.
- **Add/Remove Movies:** Easily add or remove movies from your lists with just a few clicks.
- **Customizable:** Personalize your movie lists with titles, descriptions, and cover images.
- **User Accounts:** Sign up for an account to save your movie lists and access them from anywhere.
- **Responsive Design:** Enjoy a seamless user experience across various devices and screen sizes.

## Future updates 
- **Search Functionality:** Search for movies by title, genre, or any other criteria to quickly find what you're looking for.

If you have any feature requests or suggestions for future updates, feel free to share them with us. Your feedback is invaluable in shaping the future of Care Key.

## Getting Started
### Setup

Install gems
```
bundle install
```

### ENV Variables
Create `.env` file
```
touch .env
```
Inside `.env`, set these variables. For any APIs, see group Slack channel.
```
CLOUDINARY_URL=your_own_cloudinary_url_key
```

### DB Setup
```
rails db:create
rails db:migrate
rails db:seed
```

### Run a server
```
rails s
```

## Built with

- **Frontend:** Figma, HTML, [SCSS](https://sass-lang.com/guide/), [Bootstrap](https://getbootstrap.com/)
- **Backend:** [Rails 7](https://guides.rubyonrails.org/)
- **Deployment:** [Heroku](https://heroku.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Additional Libraries:** [Stimulus JS](https://stimulus.hotwired.dev/), [Devise](https://github.com/heartcombo/devise), [Cloudinary](https://cloudinary.com/?&utm_campaign=1329&utm_content=instapagelogocta-selfservetest)

## Usage

1. Sign up for an account or log in if you already have one.
2. Create a new movie list by clicking on the "Add List" button.
3. Add movies to your list by searching for them using the search bar.
4. Remove movies from your list by clicking on the "Remove" button next to each movie.
5. Customize your movie list by adding a title, description, and cover image.
6. View and manage your movie lists from your dashboard.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

