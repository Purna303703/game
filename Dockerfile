# 1. Nginx Alpine base image (chala lightweight & fast)
FROM nginx:alpine

# 2. Default web directory lo unna static files anni remove cheyadam
RUN rm -rf /usr/share/nginx/html/*

# 3. Game files (index.html, style.css, game.js) ni Nginx web root directory ki copy cheyadam
COPY . /usr/share/nginx/html

# 4. HTTP port 80 expose cheyadam
EXPOSE 80

# 5. Nginx server start cheyadam
CMD ["nginx", "-g", "daemon off;"]