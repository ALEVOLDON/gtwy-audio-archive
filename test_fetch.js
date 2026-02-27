const fs = require('fs');
fetch('https://gtwy.bandcamp.com/album/master-tempo-2006').then(r=>r.text()).then(html=>{
  const match2 = html.match(/data-tralbum="([^"]+)"/);
  if (match2) {
      const tralbum = JSON.parse(match2[1].replace(/&quot;/g, '"'));
      const tracks = tralbum.trackinfo.filter(t => t.file && t.file['mp3-128']).map(t => t.file['mp3-128']);
      console.log(tracks);
  }
});
