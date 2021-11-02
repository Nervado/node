FROM mysql:5.7
RUN chown -R mysql:root /var/lib/mysql/

ADD /scripts/setup.sql /docker-entrypoint-initdb.d/

#ARG MYSQL_DATABASE
#ARG MYSQL_USER
#ARG MYSQL_PASSWORD
#ARG MYSQL_ROOT_PASSWORD

#ENV MYSQL_DATABASE=$MYSQL_DATABASE
#ENV MYSQL_USER=$MYSQL_USER
#ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
#ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

#ADD scripts/setup.sql /etc/mysql/setup.sql
#RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/setup.sql
#RUN cp /etc/mysql/setup.sql /docker-entrypoint-initdb.d

#EXPOSE 3306