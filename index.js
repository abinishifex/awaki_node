
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 8080;
const publicDir = __dirname;

const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html',
};

const server = http.createServer((req, res) => {
  const pathname = new URL(
    req.url,
    `http://${req.headers.host || 'localhost'}`
  ).pathname;

  const filename = routes[pathname] || '404.html';
  const filePath = path.join(publicDir, filename);
  const statusCode = routes[pathname] ? 200 : 404;

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('500 - Internal Server Error');
      return;
    }

    res.writeHead(statusCode, {
      'Content-Type': 'text/html; charset=utf-8',
    });

    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
