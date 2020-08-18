docker build -t medpro-web-v2-testing .
docker stop medpro-web-v2-testing
docker rm medpro-web-v2-testing
docker run -d --name medpro-web-v2-testing -p 9100:3000 -t medpro-web-v2-testing
