class Quiz < ApplicationRecord
  belongs_to :chapter
  belongs_to :section
  belongs_to :result
  belongs_to :user
end
