$(document).ready(async function() {
  
  // ①PokeAPI の URL を取得
  let apiUrl = "";
  
  // APIからポケモンの情報を取得する
  async function getPokemonData() {
    try {
      const data = await fetchData(apiUrl);

      // ②データの中身を見てみよう
      

      // ③コメントを外して名前を取得してみよう
      // const pokemonName = 

      // ④画像のURLを取得してみよう
      // const pokemonImage = 

      const listItem = $("<p>").text(pokemonName);

      // ④コメントを外そう
      // const listItem2 = $(`<img src="${pokemonImage}">`);

      $("#pokemon").append(listItem);

      // ④コメントを外そう
      // $("#pokemon").append(listItem2);

    } catch (error) {
      $("#pokemon").text("ポケモンのデータを取得できませんでした。");
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