
// ここで落ちる速度の調整
const SNOW_FPS = 50;
// ここで降る量の調整　MAXの数値
const SNOW_MAX = 100;
const TYPE_SNOW = 0;

function rand(min,max)
{
   return(Math.floor(Math.random()*(max-min+1))+min);
}

class Snow
{
   constructor(ty,x,y,c,hp)
   {
       this.elm = document.createElement("div");
       document.body.appendChild(this.elm);
       this.sty = this.elm.style;

       this.ty = ty;
       this.hp = hp;
       this.x = x;
       this.y = y;
      
       this.sty.position = "fixed";
       this.sty.left = this.x + "px";
       this.sty.top = this.y + "px";

       let sz;
       if(ty==TYPE_SNOW)
       {
        //    x　横の揺れ幅
           this.vx = rand(-1,1);
        // 縦の揺れ幅 早いやつと遅いやつの差
           this.vy = rand(3,5);
        // これが大きさの差　最小から最大
           sz = rand(5,10);
       }
       else if(ty=TYPE_KIRA)
       {
        //    キラの左右幅
           this.vx = rand(-5,5);
        //    キラの縦幅
           this.vy = rand(-5,5);
           sz=8;
       }
       let op = rand(5,10);
       this.sty.width = sz +"px";
       this.sty.height = sz +"px";
       this.sty.borderRadius = "50%";
       this.sty.opacity = op/10;
       this.sty.backgroundColor = c;

       this.kill =false;
   }
   update()
   {
       this.x += this.vx;
       this.y += this.vy;
       if(this.ty == TYPE_SNOW)
       {        if(this.y>=screen_h)
           {
           this.x = rand(0,screen_w);
           this.y = -10;
           }
       }
       else if(this.ty == TYPE_KIRA)
       {
       if(--this.hp==0)
       {
           this.kill = true;
           document.body.removeChild(this.elm);
           return;
       }
       if(this.hp<10)this.sty.opacity=this.hp/10;
       else this.sty.opacity = 1;
       this.vy++;
       }

       this.sty.left = this.x + "px";
       this.sty.top = this.y + "px";
   }
}

let snow = [];
let screen_w = window.innerWidth;
let screen_h = window.innerHeight;

for(let i=0;i<SNOW_MAX;i++)
{
   let x = rand(0,screen_w);
   let y = rand(0,screen_h);
//    ここが実際に降ってくる箇所の色　タイプ
   snow.push(new Snow(TYPE_SNOW,x,y,"black",0));
}

setInterval(mainloop,1000/SNOW_FPS);
function mainloop(){
   for(let i=snow.length-1 ;i>=0;i--)
   {
       snow[i].update();
       if(snow[i].kill)snow.splice(i,1);
   }
}
// document.onmousemove = function(e)
// {
//    let x = e.clientX;
//    let y = e.clientY;
// //    ここがマウスが当たった際の元色 動くの幅
//    snow.push(new Snow(TYPE_KIRA,x,y,"black",10));
// //    ここが散らばる側のアクション　動く幅　最後が大きいほど大きくアクション
//    snow.push(new Snow(TYPE_KIRA,x,y,"red",10));
// }