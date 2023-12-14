class RemoveResultIdAndAddResultToQuizzes < ActiveRecord::Migration[7.0]
  def change
    remove_column :quizzes, :result_id, :integer
    add_column :quizzes, :result, :integer
  end
end
