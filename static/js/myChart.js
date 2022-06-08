const ctx = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line', // グラフの種類
    data: {
        // 横軸
        labels: ['1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        // 縦軸
        datasets: [
          {   // 総人口は桁が違うので縦軸のスケール調整が必要
              // 総人口のオブジェクトはコメントアウトしない、コメントアウトするとAPIで受け取ったデータとインデックス番号がずれてしまうのでわかりずらい（好み）
              label: "総人口",
              data: [],
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1
          },
          {
              label: "転入数",
              data: [],
              borderColor: "rgb(255, 159, 64)",
              borderWidth: 2
          },
          {
              label: "転出数",
              data: [],
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2
          },
          {
              label: "出生数",
              data: [],
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 2
          },
          {
              label: "死亡数",
              data: [],
              borderColor: "rgb(201, 203, 207)",
              borderWidth: 2
          }
      ]
    }
});