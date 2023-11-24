class CreateResults < ActiveRecord::Migration[6.0]
  def change
    create_table :results do |t|
      t.boolean :result, null: false

      t.timestamps
    end
  end
end
