class CreateChapters < ActiveRecord::Migration[6.0]
  def change
    create_table :chapters do |t|
      t.string :chapter_name, null: false, limit: 100

      t.timestamps
    end
  end
end
