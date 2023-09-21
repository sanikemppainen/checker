# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables to ensure Python runs in unbuffered mode
ENV PYTHONUNBUFFERED 1

# Install Poetry
RUN pip install poetry

# Set the working directory to /app
WORKDIR /app/backend

# Copy pyproject.toml and poetry.lock to the container
COPY pyproject.toml poetry.lock ./

# Install dependencies using Poetry
RUN poetry install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run uvicorn when the container launches
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
