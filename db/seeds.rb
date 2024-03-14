require 'uri'
require 'net/http'
require "json"

puts "Destroying previous data..."
List.destroy_all
Movie.destroy_all

puts "Calling API..."
url = URI("https://tmdb.lewagon.com/movie/top_rated")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["accept"] = 'application/json'

response = http.request(request)
parsed = JSON.parse(response.read_body)
movies = parsed["results"]

puts "Creating movies..."
movies.each do |movie|
  created_movie = Movie.create(title: movie["title"], overview: movie["overview"], rating: movie["vote_average"], poster_url: "https://image.tmdb.org/t/p/w500/#{movie["poster_path"]}")

  url = URI("https://tmdb.lewagon.com/movie/#{movie["id"]}")
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(url)
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

puts "Getting all categories..."
categories = []
Movie.all.each do |movie|
  categories.concat(movie.genres)
end

categories = categories.uniq

puts "Creating lists from categories"
categories.each do |category|
  list = List.create(name: category)
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
