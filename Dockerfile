FROM php:8.2-cli
COPY ./game ./game
CMD ["php", "-S", "0.0.0.0:80", "-t", "game/public"]
EXPOSE 80