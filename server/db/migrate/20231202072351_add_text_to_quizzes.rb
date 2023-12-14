class AddTextToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :text, :text
  end
end
