import os
# aws sdk for python
# it aputomatically looks for the keys 
# AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
# AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
import boto3
from botocore.config import Config

def run():
  # here we extract inputs
  bucket = os.environ['INPUT_BUCKET']
  bucket_region = os.environ['INPUT_BUCKET-REGION']
  dist_folder = os.environ['INPUT_DIST-FOLDER']

  configuration = Config(region_name=bucket_region)

  s3_client = boto3.client('s3', config=configuration)

  for root, subdirs, files in os.walk(dist_folder):
    for file in files:
      s3_client.upload_file(os.path.join(root, file), bucket, file)
  
  website_irl = f'http://{bucket}.s3-website-{bucket_region}.amazonaws.com'
  print(f'::set-output name=website-url::{website_irl}')

# here we have the code that uploads the files to s3

if __name__ == "__main__":
  run()