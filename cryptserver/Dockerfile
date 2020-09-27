FROM python:3
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt


copy server.py .
CMD flask run --host $HOSTNAME --port 80


