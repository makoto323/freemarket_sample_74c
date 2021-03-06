class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string     :first_name,       null: false
      t.string     :family_name,      null: false
      t.string     :first_name_kana,  null: false
      t.string     :family_name_kana, null: false
      t.string     :post_code,        null: false
      t.string     :prefecture,       null: false
      t.string     :city,             null: false
      t.string     :address,          null: false
      t.string     :apartment,        null: false
      t.string     :tel_number,       null: false
      t.references :user,             null: false, foreign_key: true

      t.timestamps
    end
  end
end
