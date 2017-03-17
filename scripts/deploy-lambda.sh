#!/bin/bash
#
# deploy-lambda.sh
# Zip and deploy lambda function
#

set -o errexit

region='us-east-1'

func="Blackboard"
zip="./messageboard.zip"

description="Adds, reads and erases note from a virtual blackboard"

zip_package() {
  rm -f $zip
  zip -r $zip index.js package.json node_modules/
}

function_exists() {
  echo "Checking for function $func"
  aws lambda get-function \
    --region $region \
    --function-name $func > /dev/null 2>&1

}

create_function() {
  echo "CREATE function $func"
  aws lambda create-function \
    --region $region \
    --runtime nodejs \
    --function-name $func  \
    --description "$description" \
    --handler index.handler \
    --memory-size 128 \
    --zip-file fileb://$zip
}

update_function() {
  echo "UPDATING function $func"
  aws lambda update-function-code \
    --region $region \
    --function-name $func  \
    --zip-file fileb://$zip
}

# main
zip_package
if function_exists; then
  update_function
else
  create_function
fi

