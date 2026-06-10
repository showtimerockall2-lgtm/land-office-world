
const socket=io();let me={x:200,y:200};
function join(){socket.emit('join',{name:name.value,avatar:'👨‍💼'});login.style.display='none';game.style.display='block';}
socket.on('players',ps=>{world.innerHTML='';for(let k in ps){let d=document.createElement('div');d.className='p';d.style.left=ps[k].x+'px';d.style.top=ps[k].y+'px';d.innerHTML=ps[k].avatar+' '+ps[k].name;world.appendChild(d);}});
document.addEventListener('keydown',e=>{if(e.key=='w')me.y-=10;if(e.key=='s')me.y+=10;if(e.key=='a')me.x-=10;if(e.key=='d')me.x+=10;socket.emit('move',me);});
function sendMsg(){socket.emit('chat',msg.value);msg.value='';}
socket.on('chat',d=>chat.innerHTML+=`<div><b>${d.user}</b>: ${d.message}</div>`);
