// import { Controller } from "@hotwired/stimulus"


// // Connects to data-controller="movies"
// export default class extends Controller {
//   static targets = ["title"]
//   connect() {
//   }

//   search(event) {
//     event.preventDefault();
//     const axios = require('axios');
//     const cheerio = require('cheerio');
//     const search = this.titleTarget.value.replace(" ", "%20");

//     const url = `https://www.imdb.com/find/?q=${search}&ref_=nv_sr_sm`

//     axios.get(url)
//       .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);

//         $(".ipc-metadata-list-summary-item__t").each((index, element) => {
//           const title = $(element).text().trim();
//           const href = $(element).attr("href");
//           console.log(title);
//           console.log(href);
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }
