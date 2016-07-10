(1..100).each do
  geonote = GeoNote.create(
    latitude: 37.479828 + (Random.rand - Random.rand) * 0.1,
    longitude: -122.146524 + (Random.rand - Random.rand) * 0.1,
    phone_id: FFaker::PhoneNumber.imei,
    note_text: FFaker::Lorem.phrase,
  )
end
puts "created 100 geonotes in Menlo Park"

treasure1 = GeoNote.create(
  latitude: 37.479828,
  longitude: -122.146524,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
treasure2 = GeoNote.create(
  latitude: 37.479830,
  longitude: -122.146514,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
treasure3 = GeoNote.create(
  latitude: 37.479808,
  longitude: -122.146527,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
puts "created 3 treasures in Menlo Park"

(1...100).each do |id|
  user = User.create(device_id: id)
  if Random.rand > 0.5
    treasure1.liked_by user
  end
  if Random.rand > 0.25
    treasure2.liked_by user
  end
  treasure3.liked_by user
end
puts "created 100 users"
