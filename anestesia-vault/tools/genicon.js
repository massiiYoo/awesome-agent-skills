const zlib=require('zlib'),fs=require('fs');
// ---- PNG encoder (RGBA, no deps) ----
const crcT=(()=>{let t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
function crc32(buf){let c=0xffffffff;for(let i=0;i<buf.length;i++)c=crcT[(c^buf[i])&0xff]^(c>>>8);return (c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type,'ascii');const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const cd=Buffer.concat([t,data]);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(cd));return Buffer.concat([len,cd,crc]);}
function png(w,h,rgba){const sig=Buffer.from([137,80,78,71,13,10,26,10]);const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;const raw=Buffer.alloc(h*(w*4+1));for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;rgba.copy(raw,y*(w*4+1)+1,y*w*4,(y+1)*w*4);}const idat=zlib.deflateSync(raw,{level:9});return Buffer.concat([sig,chunk('IHDR',ih),chunk('IDAT',idat),chunk('IEND',Buffer.alloc(0))]);}
// ---- colors (teal → cyan) ----
function hex(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
const A=hex('#0d9488'),B=hex('#0891b2'),WHITE=[255,255,255];
function lerp(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}
// ---- geometry (unit space 0..1) ----
function inRR(px,py,x0,y0,x1,y1,r){if(px<x0||px>x1||py<y0||py>y1)return false;const cx=Math.min(Math.max(px,x0+r),x1-r),cy=Math.min(Math.max(py,y0+r),y1-r);const dx=px-cx,dy=py-cy;return dx*dx+dy*dy<=r*r;}
function segDist(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;let t=l2?((px-ax)*dx+(py-ay)*dy)/l2:0;t=Math.max(0,Math.min(1,t));const X=ax+t*dx,Y=ay+t*dy;return Math.hypot(px-X,py-Y);}
// folder: a tab + body, white silhouette
function folder(px,py){
  const tab=inRR(px,py,0.305,0.335,0.545,0.445,0.028);
  const body=inRR(px,py,0.305,0.40,0.695,0.665,0.045);
  return tab||body;
}
// medical cross carved into the folder front
function cross(px,py){
  const v=px>=0.475&&px<=0.525&&py>=0.475&&py<=0.625;
  const h=px>=0.425&&px<=0.575&&py>=0.515&&py<=0.585;
  return v||h;
}
function render(N){const s=4,buf=Buffer.alloc(N*N*4);
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){let r=0,g=0,b=0,a=0;
  for(let sy=0;sy<s;sy++)for(let sx=0;sx<s;sx++){const ux=(x+(sx+0.5)/s)/N,uy=(y+(sy+0.5)/s)/N;let col=null,al=0;
    if(inRR(ux,uy,0,0,1,1,0.225)){col=lerp(A,B,(ux+uy)/2);al=255;
      if(folder(ux,uy))col=WHITE;
      if(cross(ux,uy))col=lerp(A,B,(ux+uy)/2);
    }
    if(col){r+=col[0];g+=col[1];b+=col[2];a+=al;}
  }
  const n=s*s,i=(y*N+x)*4;buf[i]=Math.round(r/n);buf[i+1]=Math.round(g/n);buf[i+2]=Math.round(b/n);buf[i+3]=Math.round(a/n);
 }
 return png(N,N,buf);
}
fs.writeFileSync(__dirname+'/../icon-192.png',render(192));
fs.writeFileSync(__dirname+'/../icon-512.png',render(512));
console.log('wrote icon-192.png, icon-512.png');
