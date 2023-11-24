class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.string :section_name, null: false, limit: 100

      t.timestamps
    end
  end
end
