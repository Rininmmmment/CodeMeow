# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_12_02_072351) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chapters", force: :cascade do |t|
    t.string "chapter_name", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "question", limit: 1000, null: false
    t.string "answer", limit: 3000, null: false
    t.bigint "chapter_id"
    t.bigint "section_id", null: false
    t.bigint "result_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "text"
    t.index ["chapter_id"], name: "index_quizzes_on_chapter_id"
    t.index ["result_id"], name: "index_quizzes_on_result_id"
    t.index ["section_id"], name: "index_quizzes_on_section_id"
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "results", force: :cascade do |t|
    t.boolean "result", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections", force: :cascade do |t|
    t.string "section_name", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password"
    t.string "user_name"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "quizzes", "chapters"
  add_foreign_key "quizzes", "results"
  add_foreign_key "quizzes", "sections"
  add_foreign_key "quizzes", "users"
end
