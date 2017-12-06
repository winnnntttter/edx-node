curl "http://localhost:3000/profile"
sleep 1
curl -H 'Content-Type: application/json' -X POST -d '{"first_name":"aLieZ","last_name":"zzz"}' "http://localhost:3000/profile" -i 
sleep 1
curl -H 'Content-Type: application/json' -X PUT -d '{"first_name":"rtz","last_name":"babayefu"}' "http://localhost:3000/profile" -i
sleep 1
curl "http://localhost:3000/profile"
sleep 1
curl -X DELETE "http://localhost:3000/profile"