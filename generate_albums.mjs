import fs from 'fs';

const albumsData = [
  { id: 'GT-10', bcPath: '/album/lighthouse-and-sirius', descEn: 'Exploration of perfect forms through distorted rhythms.' },
  { id: 'GT-09', bcPath: '/album/crock', descEn: 'Deconstruction of structure. Violation of order.' },
  { id: 'GT-08', bcPath: '/album/inevitability-2018', descEn: 'Biological impulses converted into digital signals.' },
  { id: 'GT-07', bcPath: '/album/droppin-the-pressure-2018', descEn: 'The boundary between organics and machine code.' },
  { id: 'GT-06', bcPath: '/album/kiev-2017', descEn: 'Tangible sound. Dense texture of industrial noise.' },
  { id: 'GT-05', bcPath: '/album/amnesiac-2010', descEn: 'Pure matter of sound. Deep experimental landscapes.' },
  { id: 'GT-04', bcPath: '/album/violet-2009', descEn: 'Architecture of sound spaces and modular synthesis.' },
  { id: 'GT-03', bcPath: '/album/cube3-2008', descEn: 'Continuous stream of binary data and interference.' },
  { id: 'GT-02', bcPath: '/album/geometric-progression-2007', descEn: 'Early protocols of the GTWY gateway.' },
  { id: 'GT-01', bcPath: '/album/master-tempo-2006', descEn: 'Initial gateway sequence.' }
];
const covers = [
  'https://f4.bcbits.com/img/a2954440509_16.jpg',
  'https://f4.bcbits.com/img/a2144766970_16.jpg',
  'https://f4.bcbits.com/img/a4156640949_16.jpg',
  'https://f4.bcbits.com/img/a1141678879_16.jpg',
  'https://f4.bcbits.com/img/a0991098267_16.jpg',
  'https://f4.bcbits.com/img/a2727106939_16.jpg',
  'https://f4.bcbits.com/img/a3420303523_16.jpg',
  'https://f4.bcbits.com/img/a0284896504_16.jpg',
  'https://f4.bcbits.com/img/a4169044455_16.jpg',
  'https://f4.bcbits.com/img/a3011597622_16.jpg'
];
const names = ['lighthouse and sirius', 'CROCK', 'Inevitability (2018)', 'Droppin The Pressure (2018)', 'KIEV (2017)', 'Amnesiac (2010)', 'Violet (2009)', 'CUBE3 (2008)', 'geometric progression (2007)', 'Master Tempo (2006)'];

async function g() {
  const result = [];
  for(let i=0; i<10; i++) {
    const a = albumsData[i];
    const res = await fetch('https://gtwy.bandcamp.com'+a.bcPath);
    const txt = await res.text();
    let price='5.00', year=2020, desc=a.descEn;
    let m = txt.match(/data-tralbum="([^"]+)"/);
    if(m) {
      const td = JSON.parse(m[1].replace(/&quot;/g, '"'));
      if(td.current) {
        if(td.current.minimum_price > 0) price=Number(td.current.minimum_price).toFixed(2);
        else if(td.current.set_price > 0) price=Number(td.current.set_price).toFixed(2);
        if(td.current.release_date) {
          const dt = new Date(td.current.release_date);
          if(!isNaN(dt.getFullYear())) year=dt.getFullYear();
        }
        if(td.current.about && td.current.about.trim().length > 0) {
          desc = td.current.about.trim().replace(/\n/g, ' ');
        }
      }
    }
    result.push({
      id: a.id,
      title: names[i],
      cover: covers[i],
      price: price,
      year: year,
      desc: desc
    });
  }
  fs.writeFileSync('albums_array.json', JSON.stringify(result, null, 2));
}
g();
