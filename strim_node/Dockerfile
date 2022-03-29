FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install apt-utils curl -y
RUN apt-get install git vim -y
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get update -y
RUN apt-get install nodejs -y

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004
EXPOSE 3005
EXPOSE 3100
CMD tail -f /dev/null
