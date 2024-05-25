FROM python:3
LABEL maintainer="Note"

ENV PYTHONUNBUFFERED 1 

COPY ./linuxrequirements.txt /tmp/requirements.txt
COPY ./ /server
WORKDIR /server
EXPOSE 8000
ARG DEV=false

RUN apt-get update && \
    apt-get -y install sudo && \
    python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    rm -rf /tmp/* && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user 

COPY entrypoint.sh /entrypoint.sh

RUN chown django-user:django-user entrypoint.sh && \
    chmod +x /entrypoint.sh

ENV PATH="/py/bin:$PATH"

USER root