#! /bin/sh
cd ..
cd ./webapp/
npm run build
docker build -t dede .
cd ../scripting_automat
terraform init
terraform apply -auto-approve