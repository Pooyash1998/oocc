# Use an official Python runtime as a parent image
FROM python:3.12.0-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install git
RUN apt-get update && apt-get install -y git

# Install ocpa from the Git repository
RUN git clone https://github.com/ocpm/ocpa.git \
    && cd ocpa \
    && pip install .

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Expose port 8000 for the Django backend
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
