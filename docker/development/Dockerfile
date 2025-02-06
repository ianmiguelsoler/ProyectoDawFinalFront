FROM debian
LABEL maintainer="ianmiguel@gmail.com"

RUN apt update && apt install -y apache2 php libapache2-mod-php php-mysql curl

RUN a2enmod rewrite
CMD ["apachectl", "-D", "FOREGROUND"]
