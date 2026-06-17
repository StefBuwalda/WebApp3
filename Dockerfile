FROM php:8.2-cli

COPY ./game ./game

RUN mv /game/.env.example /game/.env

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:80", "-t", "game/public"]