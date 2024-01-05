class CreateUpdateInfos < ActiveRecord::Migration[7.0]
  def change
    create_table :update_infos do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
