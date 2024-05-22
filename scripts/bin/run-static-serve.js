const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const pathConfig = require('../../config/path.config.cjs');
require('dotenv').config();

let staticDirectory = pathConfig.staticDirectoryPath; // 静态文件目录
console.log('path is:', staticDirectory);
let server = http.createServer((req, res) => {
  // 解析请求的URL
  let parsedUrl = url.parse(req.url, true);
  let filePath = path.join(staticDirectory, parsedUrl.pathname);

  // 当请求的是根路径时，尝试提供 index.html
  if (parsedUrl.pathname === '/') {
    filePath = path.join(staticDirectory, 'index.html');
  }

  // 读取文件内容
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 文件不存在，发送404响应
        res.writeHead(404);
        res.end('File not found');
      } else {
        // 其他错误，发送500响应
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      // 设置响应头，包括MIME类型
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });

      // 发送文件内容作为响应体
      res.end(data);
    }
  });
});

function getContentType(filePath) {
  const fileExtension = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/plain';
  switch (fileExtension) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml'; // 添加了对 SVG 的支持
      break;
    // 可以根据需要添加更多MIME类型
    default:
      contentType = 'application/octet-stream';
  }
  return contentType;
}

const PORT = process.env.PORT || process.env.STATIC_SERVE_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is running on URL http://localhost:${PORT}`);
});
