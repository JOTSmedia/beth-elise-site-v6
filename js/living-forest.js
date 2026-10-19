/* Light and atmosphere painted over the unchanged forest photograph. */
(function () {
  'use strict';
  // UV anchors mark actual mushroom caps in the 4128 × 2304 delivery photograph.
  const mushrooms = [
    [.124,.499,.011,.006,[255,195,130],.2,.019], [.134,.527,.009,.005,[255,207,151],1.8,.018],
    [.235,.527,.007,.004,[255,199,159],3.2,.017], [.247,.541,.006,.004,[255,192,163],4.9,.016],
    [.238,.860,.009,.006,[145,238,240],.8,.031], [.260,.878,.011,.007,[174,247,235],2.9,.029],
    [.677,.601,.005,.003,[255,200,141],4.1,.014], [.686,.592,.006,.004,[255,211,157],1.4,.018],
    [.699,.601,.006,.003,[255,194,145],5.5,.015], [.732,.638,.006,.004,[220,192,236],2.5,.021],
    [.824,.823,.004,.003,[111,226,243],3.9,.015], [.848,.800,.011,.007,[163,240,244],.5,.031],
    [.920,.843,.023,.015,[255,206,147],2.2,.046], [.966,.802,.026,.017,[255,224,173],4.5,.056],
    [.898,.885,.016,.009,[255,202,142],5.9,.029], [.814,.946,.009,.005,[135,232,241],1.1,.022]
  ];
  function glow(ctx,x,y,rx,ry,rgb,alpha) {
    ctx.save(); ctx.translate(x,y); ctx.scale(Math.max(.01,rx),Math.max(.01,ry));
    const g=ctx.createRadialGradient(0,0,0,0,0,1);
    g.addColorStop(0,`rgba(${rgb},${alpha})`);
    g.addColorStop(.35,`rgba(${rgb},${alpha*.55})`);
    g.addColorStop(1,`rgba(${rgb},0)`);
    ctx.fillStyle=g; ctx.fillRect(-1,-1,2,2); ctx.restore();
  }
  window.BethLivingForest = {
    draw(ctx,width,height,now,still) {
      const time=still?0:now;
      const scale=Math.max(width/4128,height/2304);
      const sw=4128*scale,sh=2304*scale;
      const ox=(width-sw)/2,oy=height-sh; // Exact CSS cover / center bottom mapping.
      ctx.save(); ctx.globalCompositeOperation='screen';
      // Soft moonbeams breathe through the existing canopy openings. The photograph
      // remains stationary so the tree circle and every interactive anchor stay aligned.
      for(let i=0;i<3;i++){
        const phase=time*.000085+i*1.9;
        ctx.save();ctx.translate(ox+sw*(.46+i*.047),oy+sh*.31);
        ctx.rotate(-.18+i*.13+Math.sin(phase)*.012);
        glow(ctx,0,0,sw*(.013+i*.003),sh*.33,[174,226,232],.035+Math.sin(phase)*.009);
        glow(ctx,0,sh*.08,sw*.035,sh*.31,[187,207,242],.016);
        ctx.restore();
      }
      mushrooms.forEach((m,i)=>{
        const [u,v,ru,rv,rgb,phase,stem]=m;
        const x=ox+u*sw,y=oy+v*sh,rx=ru*sw,ry=rv*sh;
        const pulse=.5+.5*Math.sin(time*(.00065+(i%4)*.00009)+phase);
        const emission=.22+pulse*.42;
        // Local atmosphere, luminous cap, underside and a soft pool on the moss.
        glow(ctx,x,y+ry*.6,rx*3.5,ry*5.5,rgb,.06+pulse*.12);
        glow(ctx,x,y,rx*1.25,ry*1.2,rgb,emission);
        glow(ctx,x,y+ry*.55,rx*.84,Math.max(1,ry*.28),[233,255,238],.20+pulse*.31);
        glow(ctx,x,y+stem*sh,rx*2.2,ry*1.5,rgb,.045+pulse*.09);
        ctx.strokeStyle=`rgba(${rgb},${.10+pulse*.2})`;ctx.lineWidth=Math.max(.6,rx*.075);
        ctx.beginPath();ctx.moveTo(x,y+ry*.7);
        ctx.quadraticCurveTo(x+rx*.15,y+stem*sh*.6,x-rx*.1,y+stem*sh);ctx.stroke();
        if(!still)for(let j=0;j<2;j++){
          const life=((time/(6100+i*107+j*701)+i*.173+j*.47)%1);
          const drift=Math.sin(life*5+i+j)*rx*.8;
          const sx=x+drift+(j?rx*.4:-rx*.3),sy=y-life*sh*.055;
          const alpha=Math.sin(life*Math.PI)*(.22+pulse*.17);
          glow(ctx,sx,sy,3.8,3.8,rgb,alpha*.6);
          ctx.fillStyle=`rgba(235,255,239,${alpha})`;ctx.beginPath();ctx.arc(sx,sy,.7+scale*.5,0,Math.PI*2);ctx.fill();
        }
      });
      // Long, soft banks of mist move through the existing glade and path.
      for(let i=0;i<4;i++){
        const phase=time*.000045+i*1.7;
        const x=ox+sw*(.34+i*.105+Math.sin(phase)*.035);
        const y=oy+sh*(.705+i*.054+Math.cos(phase*.7)*.008);
        glow(ctx,x,y,sw*(.13+i*.012),sh*.022,[164,204,216],.038+.016*Math.sin(phase));
      }
      // Tiny, softly focused wisps rise from the moss and curl into the moonlight.
      // Sparse layers preserve photographic texture instead of coating it in glitter.
      if(!still){
        const count=width<769?9:16;
        for(let i=0;i<count;i++){
          const life=(time/(12500+i*317)+i*.618034)%1;
          const bend=Math.sin(life*5.2+i*2.4)*.017;
          const u=.27+(i*.137% .48)+bend;
          const v=.84-life*.43+Math.sin(life*4+i)*.014;
          const x=ox+sw*u,y=oy+sh*v;
          const alpha=Math.sin(life*Math.PI)*(.23+.08*Math.sin(time*.001+i));
          const rgb=i%3===0?[221,199,247]:i%3===1?[164,245,225]:[251,237,190];
          const radius=Math.min(1.25,Math.max(.55,scale*.85));
          glow(ctx,x,y,radius*9,radius*9,rgb,alpha*.22);
          glow(ctx,x,y,radius*2.1,radius*2.1,rgb,alpha*.7);
          ctx.fillStyle=`rgba(238,255,249,${alpha})`;
          ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.fill();
          // A short curved trail dissolves into the haze behind each wisp.
          ctx.strokeStyle=`rgba(${rgb},${alpha*.16})`;ctx.lineWidth=.65;
          ctx.beginPath();ctx.moveTo(x,y);
          ctx.quadraticCurveTo(x+sw*.002,y+sh*.006,x+sw*.001,y+sh*.013);ctx.stroke();
        }
      }
      // Slow concentric water ripples stay inside the original pool.
      ctx.save();const px=ox+sw*.515,py=oy+sh*.693;
      ctx.beginPath();ctx.ellipse(px,py,sw*.122,sh*.037,0,0,Math.PI*2);ctx.clip();
      for(let i=0;i<4;i++){
        const p=((time/8500+i*.25)%1),rx=sw*(.01+p*.115),ry=sh*(.001+p*.025);
        ctx.strokeStyle=`rgba(190,237,244,${Math.sin(p*Math.PI)*.20})`;ctx.lineWidth=.6;
        ctx.beginPath();ctx.ellipse(px+Math.sin(i*2)*sw*.01,py,rx,ry,0,0,Math.PI*2);ctx.stroke();
      }
      const reflection=.5+.5*Math.sin(time*.0011);
      glow(ctx,px+sw*.026,py,sw*.009,sh*.032,[222,242,254],.055+reflection*.05);
      ctx.restore();ctx.restore();
    }
  };
})();
