FROM debian
LABEL maintainer="ianmiguel@gmail.com"

# Actualizar paquetes e instalar dependencias
RUN apt update && apt install -y apache2 php libapache2-mod-php php-mysql curl

# Habilitar módulos necesarios en Apache
RUN a2enmod rewrite headers

# Copiar configuración de Apache correctamente
COPY apache-frontend.conf /etc/apache2/sites-available/000-default.conf

# Habilitar VirtualHost
RUN ln -sf /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-enabled/000-default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
