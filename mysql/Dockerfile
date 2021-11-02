FROM mysql:5.7
RUN chown -R mysql:root /var/lib/mysql/

ADD /scripts/setup.sql /docker-entrypoint-initdb.d/