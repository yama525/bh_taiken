$(document).ready(async function() {

  // PokeAPIの全ポケモンデータのURL
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  // APIからポケモンの情報を取得する
  async function getPokemonData() {
    try {
      const dataList = await fetchData(apiUrl);
      // ----- ↓↓①繰り返し処理開始 -----
      
        const data = await fetchData(dataList.results[i].url);
        const pokemonName = data.name;
        const pokemonImage = data.sprites.front_default;
        const listItem = $("<p>").text(pokemonName);
        const listItem2 = $(`<img src="${pokemonImage}">`);
        $("#pokemonList").append(listItem);
        $("#pokemonList").append(listItem2);
      
      // ----- ↑↑①繰り返し処理終了 -----
    } catch (error) {
      $("#pokemonList").text("ポケモンのデータを取得できませんでした。");
    }
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