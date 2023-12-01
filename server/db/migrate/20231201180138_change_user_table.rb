class ChangeUserTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :encrypted_password
    add_column :users, :password, :string
    add_column :users, :user_name, :string

    remove_column :users, :reset_password_token
    remove_column :users, :reset_password_sent_at
    remove_column :users, :remember_created_at
  end
end
