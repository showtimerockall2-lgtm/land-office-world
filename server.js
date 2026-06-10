
const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=new Server(server);
app.use(express.static('public'));
let players={};
io.on('connection',s=>{
 s.on('join',d=>{players[s.id]={name:d.name,avatar:d.avatar,x:200,y:200};io.emit('players',players);});
 s.on('move',p=>{if(players[s.id]){players[s.id].x=p.x;players[s.id].y=p.y;io.emit('players',players);}});
 s.on('chat',m=>{if(players[s.id]) io.emit('chat',{user:players[s.id].name,message:m});});
 s.on('disconnect',()=>{delete players[s.id];io.emit('players',players);});
});
server.listen(process.env.PORT||3000);
