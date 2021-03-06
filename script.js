const elementById = (id) => {
  return document.getElementById(id);
};
const artistContainer = elementById("artists");
const albumsContainer = document.getElementById('albums');

const handleSearch = () =>{
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showArtist(data));
  // clean input field
  keyword.value = "";
  // clean container
  artistContainer.innerHTML = "";
  albumsContainer.innerHTML = "";
}

const showArtist = ({artists}) =>{
  // const artistContainer = elementById("artists");
  // const artists = data.artists; // general method
  // const {artists} = data;  // object destructuring
  artists?.forEach((artist) =>{
    const div = document.createElement('div');
    div.classList.add("artist-card");
    div.innerHTML = `
    <div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmAK1GGD4iQBqkvTIk3bEnF_nF1LDbpbwNVe69CDB2iudz-6_fh4T6DLLZ1xaTD0FCAw&usqp=CAU"}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Artist Country not found"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Artist style not found" }</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>
    `;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showAlbum(data));
  // clean container
  albumsContainer.innerHTML = "";
}
const showAlbum = ({album}) => {
  // const albumsContainer = document.getElementById('albums');  
  album?.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add("album");
    div.innerHTML = `
    <div class="album-image-container">
    <img
      src="${item.strAlbumThumb ? item.strAlbumThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikhddhHqZyLCxvwFFd1weIv6wQttST0z9q4MjTnLnyxv9cp1HEqvBNnzqm98IXfvWyFI&usqp=CAU"}"
      alt=""
    />
    </div>
    <div class="album-name">
      <h3>${item.strAlbum ? item.strAlbum : "Album name not found" }</h3>
    </div>
    `;
    albumsContainer.appendChild(div);
  });
}