const rp = require("request-promise");
const cheerio = require("cheerio");

function get_weather() {
  var cities = [
    {
      name: "Ajax",
      url: "http://weather.gc.ca/city/pages/on-54_metric_e.html",
      temp: ""
    },
    {
      name: "Pickering",
      url: "http://weather.gc.ca/city/pages/on-54_metric_e.html",
      temp: ""
    },
    {
      name: "Clarington/Port Hope",
      url: "http://weather.gc.ca/city/pages/on-117_metric_e.html",
      temp: ""
    },
    {
      name: "Belleville",
      url: "http://weather.gc.ca/city/pages/on-3_metric_e.html",
      temp: ""
    },
    {
      name: "Scugog",
      url: "http://weather.gc.ca/city/pages/on-13_metric_e.html",
      temp: ""
    },
    {
      name: "Gravenhurst",
      url: "http://weather.gc.ca/city/pages/on-38_metric_e.html",
      temp: ""
    },
    {
      name: "Uxbridge/Brock",
      url: "http://weather.gc.ca/city/pages/on-13_metric_e.html",
      temp: ""
    }
  ];

  async function getWeather(city) {
    var options = {
      uri: city.url,
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    await rp(options)
      .then($ => {
        let temp_string = $(".pdg-tp-0")
          .first()
          .children("td")
          .eq(1)
          .text();
        let start_index = temp_string.lastIndexOf("Low");
        let temperature = temp_string.slice(start_index + 4, -1);
        //console.log(city.name + " overnight temperature: " + temperature);
        city.temp = temperature;
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  }

  let i = 0,
    x = cities.length;

  console.log("\nLoading Temperatures\n");

  var display_string = `
  <table>
    <tr>
      <th>City</th>
      <th>Overnight Temperature</th>
    </tr>
`;

  document.getElementById("box").innerHTML = "Loading Temperatures";
  (async () => {
    while (i < x) {
      let city = cities[i];
      await getWeather(city);
      display_string = display_string.concat(
        `<tr>` +
          `<td>` +
          city.name +
          `</td> <td class="td-tmp">` +
          city.temp +
          `</td></tr>`
      );
      i++;
    }
    console.table(cities, ["name", "temp"]);
    display_string = display_string.concat(`</table>`).trim();
    console.log(display_string);
    document.getElementById("box").innerHTML = display_string;
  })();
}
