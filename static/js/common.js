$(function () {
    const baseURL = "https://opendata.resas-portal.go.jp"
    // APIキーをリクエストする記述
    config = {
        headers: {
            'X-API-KEY': 'yci0yFOZy8yN4dFO77NSE9tz3Fw8cw5m5Nl5sqtW'
        }
    }
    // ----------------------

  async function renderPrefecture() {
      
      try { // エラーを検出して例外処理をする
          const targetPath = "/api/v1/prefectures"
          const target_url = `${baseURL}${targetPath}`; // ES2015 / ES6
          const response = await axios.get(target_url, config);
          console.log(response.data)

        //   取得した都道県一覧を選択項目に反映。
          response.data.result.forEach(function (pref) {
              const html = `<option value="${pref.prefCode}">${pref.prefName}</option>`;
              $("#prefecture").append(html);
          })
          
      } catch (e) { //例外処理
          console.error(e);
      }
    };

  async function renderCity(prefCode) {
      
      try { // エラーを検出して例外処理をする
          const targetPath = "/api/v1/cities"
          const target_url = `${baseURL}${targetPath}?prefCode=${prefCode}`; // ES2015 / ES6
          const response = await axios.get(target_url, config);
          console.log(response.data)

          $("#city").empty();
          const html = '<option value="">市区町村</option>';
          $("#city").append(html);

        //   取得した都道県一覧を選択項目に反映。
          response.data.result.forEach(function (city) {
              const html = `<option value="${city.cityCode}">${city.cityName}</option>`;
              $("#city").append(html);
          })
          
      } catch (e) { //例外処理
          console.error(e);
      }
    };

  async function renderPopulation(cityCode, prefCode) {
      
      try { // エラーを検出して例外処理をする
          const targetPath = "/api/v1/population/sum/estimate";
          const target_url = `${baseURL}${targetPath}?cityCode=${cityCode}&prefCode=${prefCode}`; // ES2015 / ES6
          const response = await axios.get(target_url, config);
          console.log("population_log", response.data);
          const result = response.data.result;

          console.log(result.data[0].data.map(data => data.value));
        //   console.log(result.data[0].data.map(function(data){ return data.value} ));
          
          myChart.data.datasets[1].data = result.data[1].data.map(data => data.value);
          myChart.data.datasets[2].data = result.data[2].data.map(data => data.value);
          myChart.data.datasets[3].data = result.data[3].data.map(data => data.value);
          myChart.data.datasets[4].data = result.data[4].data.map(data => data.value);
        //   グラフの上書き
          myChart.update();

      } catch (e) { //例外処理
          console.error(e);
      }
    };

    renderPrefecture() 

    // 都道府県が選択された時にprefCodeを取得する
    $('#prefecture').change(function () {
        const prefCode = $("#prefecture option:selected").val();
        console.log("都道府県コード", prefCode);
        // renderCity関数を呼び出す
        renderCity(prefCode)
    })

    // 市区町村が選択された時にprefCodeとcityCOdeを取得する
    $('#city').change(function () {
        const prefCode = $("#prefecture option:selected").val();
        const cityCode = $("#city option:selected").val();
        // const cityCode = $(this).val();

        console.log("都道府県コード", prefCode);
        console.log("市区町村コード", cityCode);

        // renderPopulation関数を呼び出す
        renderPopulation(cityCode, prefCode);
    })

});  // end of jQuery