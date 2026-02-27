fetch('https://gtwy.bandcamp.com/music').then(r=>r.text()).then(html=>{
  const albums = [];
  const regex = /href="\/album\/([^"]+)"[\s\S]*?src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match[2].includes('.jpg') || match[2].includes('.png')) {
      albums.push({ path: match[1], img: match[2] });
    }
  }
  console.log(JSON.stringify(albums, null, 2));
});
