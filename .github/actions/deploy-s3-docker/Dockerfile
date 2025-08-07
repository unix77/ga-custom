# create container based on python image
# where python is intalled
FROM python:3.11-alpine

# we copy the requirements.txt file into the container
# (packages that should be installed into the container)
# so that the python code will work
COPY requirements.txt /requiredments.txt

# then we install all those libraries from requirements, onto this python environment
RUN pip install -r requiredments.txt

# copy the python code from the host machine (where we build the container)
COPY deployment.py /deployment.py

# we execute the deployment.py file when the container has started its execution
CMD ["python", "/deployment.py"]