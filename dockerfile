FROM debian:latest

RUN mkdir Project-365

WORKDIR /Project-365

RUN apt-get update -y && apt-get upgrade -y 

COPY / /Project-365

COPY [".env", '/Project-365']

RUN bash setup.sh --run
