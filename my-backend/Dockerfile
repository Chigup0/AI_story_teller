FROM python:3.11-slim

WORKDIR /app

# Install dependencies (FastAPI + Uvicorn + any others in requirements.txt)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY . .

EXPOSE 8080

# Dynamically use PORT from Cloud Run
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
