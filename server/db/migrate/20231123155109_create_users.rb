class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :user_name, null: false, limit: 20
      t.string :email, null: false, limit: 100
      t.string :password, null: false, limit: 100

      t.timestamps
    end
  end
end
