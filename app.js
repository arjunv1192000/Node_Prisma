
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

async function main() {
    try {
     
      const newUser = await prisma.User.create({
        data: {
          name: 'arjusssssssssskn',
          email: 'arjsddcccddun.vbmaniyamra@gmail.com',
        },
      });
     
      console.log('User created:', newUser);
  
      
      
    } catch (error) {
      console.error('Error:', error);
    } 
  }
  
  main();

const server = http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    try {
      const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else if (req.url === '/users' && req.method === 'GET') {
    try {
      const allUsers = await prisma.User.findMany();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(allUsers));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }else if(req.url === '/update-user' && req.method === 'POST'){
    

  }else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function cleanup() {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed.');
  });
}



