(1..5).each do
  new_geo_note = GeoNote.create(
    latitude: FFaker::Geolocation.lat,
    longitude: FFaker::Geolocation.lng,
    phone_id: FFaker::PhoneNumber.imei,
    note_text: FFaker::Lorem.phrases,
  )
  puts "Created geo note with id #{new_geo_note.id}."
end

new_user = User.create(
  device_id: "a"
)
puts "Created user with id 1."


