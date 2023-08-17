$(document).ready(async function() {

  // PokeAPIの全ポケモンデータのURL
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  // APIからポケモンの情報を取得する
  async function getPokemonData() {
    try {
      const objectList = await fetchData(apiUrl);
      
      // ----- ↓↓①繰り返し ここから囲う -----
      for(let i = 0; i < 10; i++){
        displayPokemon(objectList, i);
      }
      // ----- ↑↑①繰り返し ここまで囲う -----

    } catch (error) {
      $("#pokemonList").text("ポケモンのデータを取得できませんでした。");
    }
  }

  // ポケモンの名前と写真を画面へ表示
  async function displayPokemon(objectList, i){
    const object = await fetchData(objectList.results[i].url);
    const pokemonName = object.name;
    const pokemonImage = object.sprites.front_default;
    const listItem = $("<p>").text(pokemonName);
    const listItem2 = $(`<img src="${pokemonImage}">`);
    $("#pokemonList").append(listItem);
    $("#pokemonList").append(listItem2);
  }

  // API の URL からデータを取得する
  function fetchData(apiUrl) {
    return new Promise(async function(resolve, reject) {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("APIからのデータ取得に失敗しました。");
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  // ページ読み込み時にポケモンの情報を取得する
  await getPokemonData();
});