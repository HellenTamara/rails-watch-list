class List < ApplicationRecord
  has_many :bookmarks
  has_many :movies, through: :bookmarks, dependent: :destroy
  has_one_attached :photo
  belongs_to :user

  validates :name, presence: true
  validates :name, uniqueness: true
end
