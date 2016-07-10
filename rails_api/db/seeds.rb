(1..1000).each do
  geonote = GeoNote.create(
    latitude: 37.485 + (Random.rand - Random.rand) * 0.1,
    longitude: 122.148 + (Random.rand - Random.rand) * 0.1,
    phone_id: FFaker::PhoneNumber.imei,
    note_text: FFaker::Lorem.phrase,
  )
end
puts "created 1000 geonotes in Menlo Park"

treasure1 = GeoNote.create(
  latitude: 37.485,
  longitude: 122.148,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
treasure2 = GeoNote.create(
  latitude: 37.487,
  longitude: 122.152,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
treasure3 = GeoNote.create(
  latitude: 37.48,
  longitude: 122.14,
  phone_id: FFaker::PhoneNumber.imei,
  note_text: FFaker::Lorem.phrase,
)
puts "created 3 treasures in Menlo Park"

(1...150).each do |id|
  user = User.create(device_id: id)
  if Random.rand > 0.66
    treasure1.liked_by user
  elsif Random.rand > 0.5
    treasure2.liked_by user
  else
    treasure3.liked_by user
  end
end
puts "created 150 users"