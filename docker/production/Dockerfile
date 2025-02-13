FROM debian
LABEL maintainer="ianmiguel@gmail.com"

# Actualizar repositorios e instalar dependencias
RUN apt update && apt install -y apache2

# Habilitar módulos de Apache necesarios
RUN a2enmod rewrite

# Copiar la configuración del VirtualHost de producción
COPY apache-prod.conf /etc/apache2/sites-available/000-default.conf

# Habilitar el VirtualHost
RUN ln -sf /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-enabled/000-default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
