# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160709191747) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "geo_notes", force: :cascade do |t|
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "phone_id"
    t.integer  "upvotes"
    t.integer  "downvote"
    t.string   "note_text"
    t.string   "note_image_file_name"
    t.string   "note_image_content_type"
    t.integer  "note_image_file_size"
    t.datetime "note_image_updated_at"
    t.index ["latitude", "longitude"], name: "index_geo_notes_on_latitude_and_longitude", using: :btree
    t.index ["phone_id"], name: "index_geo_notes_on_phone_id", using: :btree
  end

end
