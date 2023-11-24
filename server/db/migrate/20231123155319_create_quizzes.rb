class CreateQuizzes < ActiveRecord::Migration[6.0]
  def change
    create_table :quizzes do |t|
      t.string :question, null: false, limit: 1000
      t.string :answer, null: false, limit: 3000
      t.references :chapter, foreign_key: true
      t.references :section, foreign_key: true, null: false
      t.references :result, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
