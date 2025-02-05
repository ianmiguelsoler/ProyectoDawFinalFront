FROM debian
LABEL maintainer="ianmiguel@gmail.com"

RUN apt update && apt install -y apache2
RUN a2enmod rewrite
CMD ["apachectl", "-D", "FOREGROUND"]
