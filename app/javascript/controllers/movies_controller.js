import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="movies"
export default class extends Controller {
  connect() {
    console.log("test");
  }

  search(event) {
    const searchTitle = event.currentTarget.value;

    
    // const currentUrl = window.location.href;
    // const url = `${currentUrl}?query=${searchTitle.replace(" ", "+")}`
    // console.log(url);

  }
}
