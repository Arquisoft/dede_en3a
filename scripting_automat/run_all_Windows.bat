cd ..
cd .\webapp\
ECHO Building docker image
npm run build
docker build -t dede .
cd ..\scripting_automat\
ECHO initializing terraform
terraform init
ECHO Applying terraform
terraform apply -auto-approve

