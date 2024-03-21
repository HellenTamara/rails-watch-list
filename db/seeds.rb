require 'uri'
require 'net/http'
require "json"

puts "Destroying previous data..."
List.destroy_all
Movie.destroy_all
User.destroy_all

puts "Creating public user..."
public = User.create(email: "public@user.com", password: "123123")

movie_list = ["Avatar",
"Avengers: Endgame",
"Avatar: The Way of Water",
"Titanic",
"Star Wars: Episode VII - The Force Awakens",
"Avengers: Infinity War",
"Spider-Man: No Way Home",
"Jurassic World",
"The Lion King",
"Marvels The Avengers",
"Furious 7",
"Top Gun: Maverick",
"Frozen II",
"Barbie",
"Avengers: Age of Ultron",
"Frozen",
"The Super Mario Bros. Movie",
"Harry Potter and the Deathly Hallows, Part 2",
"Black Panther",
"Star Wars: Episode VIII - The Last Jedi",
"Jurassic World: Fallen Kingdom",
"Beauty and the Beast",
"Incredibles 2",
"The Fate of the Furious",
"Iron Man 3",
"Minions",
"The Lord of the Rings: The Return of the King",
"Captain America: Civil War",
"Aquaman",
"Skyfall",
"Spider-Man: Far from Home",
"Captain Marvel",
"Transformers: Dark of the Moon",
"Jurassic Park (1",
"The Dark Knight Rises",
"Transformers: Age of Extinction",
"Joker",
"Star Wars: Episode IX - The Rise of Skywalker",
"Toy Story 4",
"Toy Story 3",
"Pirates of the Caribbean: Dead Mans Chest",
"Rogue One: A Star Wars Story",
"Aladdin",
"Pirates of the Caribbean: On Stranger Tides",
"Despicable Me 3",
"Finding Dory",
"The Dark Knight",
"Star Wars: Episode I - The Phantom Menace (1",
"Zootopia",
"Alice in Wonderland",
"Harry Potter and the Sorcerers Stone",
"The Hobbit: An Unexpected Journey",
"Jurassic World Dominion",
"Jumanji: Welcome to the Jungle",
"Harry Potter and the Deathly Hallows, Part 1",
"Despicable Me 2",
"The Lion King",
"The Jungle Book",
"The Hobbit: The Battle of the Five Armies",
"Pirates of the Caribbean: At Worlds End",
"The Hobbit: The Desolation of Smaug",
"Oppenheimer",
"Doctor Strange in the Multiverse of Madness",
"The Lord of the Rings: The Two Towers",
"Finding Nemo",
"Minions: The Rise of Gru",
"Harry Potter and the Order of the Phoenix",
"Harry Potter and the Half-Blood Prince",
"Shrek 2",
"Harry Potter and the Chamber of Secrets",
"Bohemian Rhapsody",
"The Battle at Lake Changjin",
"Harry Potter and the Goblet of Fire",
"Spider-Man 3",
"The Secret Life of Pets",
"Ice Age: Dawn of the Dinosaurs",
"The Lord of the Rings: The Fellowship of the Ring",
"Spectre",
"Spider-Man: Homecoming",
"Ice Age: Continental Drift",
"Batman v Superman: Dawn of Justice",
"Wolf Warrior 2",
"Star Wars: Episode III - Revenge of the Sith",
"The Hunger Games: Catching Fire",
"Guardians of the Galaxy Vol. 2",
"Black Panther: Wakanda Forever",
"Inside Out",
"Venom",
"Thor: Ragnarok",
"The Twilight Saga: Breaking Dawn, Part 2",
"Guardians of the Galaxy Vol. 3",
"Inception",
"Transformers: Revenge of the Fallen",
"Spider-Man",
"Wonder Woman",
"Hi, Mom",
"Independence Day",
"Fantastic Beasts and Where to Find Them",
"Coco",
"Shrek the Third"
]

puts "Creating movies list..."
movie_list.each do |movie_title|
  movie_title = movie_title.gsub(" ", "+")
  url = URI("https://api.themoviedb.org/3/search/movie?query=#{movie_title}&api_key=97ec31130de0de1f8a26543db202601f")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true

  request = Net::HTTP::Get.new(url)
  request["accept"] = 'application/json'

  response = http.request(request)
  parsed = JSON.parse(response.read_body)
  movie = parsed["results"].first

  puts "Creating movie..."
  # movies.each do |movie|
  # created_movie = Movie.create(title: movie["title"], overview: movie["overview"], rating: movie["vote_average"], poster_url: "https://image.tmdb.org/t/p/w500/#{movie["poster_path"]}")

  if !movie.empty?
    created_movie = Movie.create(title: movie["title"], overview: movie["overview"], rating: movie["vote_average"], poster_url: "https://image.tmdb.org/t/p/w500/#{movie["poster_path"]}")

    url2 = URI("https://tmdb.lewagon.com/movie/#{movie["id"]}")
    http = Net::HTTP.new(url2.host, url2.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(url2)
    request["accept"] = 'application/json'
    response = http.request(request)
    parsed = JSON.parse(response.read_body)
    genres = parsed["genres"]

    all_genres = []
    genres.each do |genre|
      all_genres.push(genre["name"])
    end

    created_movie.genres = all_genres
    created_movie.save
  end
end


# puts "Calling API..."
# url = URI("https://tmdb.lewagon.com/movie/top_rated")

# http = Net::HTTP.new(url.host, url.port)
# http.use_ssl = true

# request = Net::HTTP::Get.new(url)
# request["accept"] = 'application/json'

# response = http.request(request)
# parsed = JSON.parse(response.read_body)
# movies = parsed["results"]

# puts "Creating movies..."
# movies.each do |movie|
#   created_movie = Movie.create(title: movie["title"], overview: movie["overview"], rating: movie["vote_average"], poster_url: "https://image.tmdb.org/t/p/w500/#{movie["poster_path"]}")

#   url = URI("https://tmdb.lewagon.com/movie/#{movie["id"]}")
#   http = Net::HTTP.new(url.host, url.port)
#   http.use_ssl = true
#   request = Net::HTTP::Get.new(url)
#   request["accept"] = 'application/json'
#   response = http.request(request)
#   parsed = JSON.parse(response.read_body)
#   genres = parsed["genres"]

#   all_genres = []
#   genres.each do |genre|
#     all_genres.push(genre["name"])
#   end

#   created_movie.genres = all_genres
#   created_movie.save
# end

puts "Getting all categories..."
categories = []
Movie.all.each do |movie|
  categories.concat(movie.genres)
end

categories = categories.uniq

puts "Creating lists from categories"
categories.each do |category|
  list = List.create(name: category, user_id: public.id)
end

puts "Creating bookmarks for lists"
List.all.each do |list|
  Movie.all.each do |movie|
    bookmark = Bookmark.new(list_id: list.id)
    if movie.genres.include?(list.name)
      bookmark.movie = movie
      bookmark.comment = "auto added movie"
      bookmark.save
    end
  end
end
