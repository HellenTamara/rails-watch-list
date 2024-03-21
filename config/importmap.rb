# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "@popperjs/core", to: "popper.js", preload: true
pin "cheerio" # @1.0.0
pin "boolbase" # @1.0.0
pin "cheerio-select" # @2.1.0
pin "css-select" # @5.1.0
pin "css-what" # @6.1.0
pin "dom-serializer" # @2.0.0
pin "domelementtype" # @2.3.0
pin "domhandler" # @5.0.3
pin "domutils" # @3.1.0
pin "entities" # @4.5.0
pin "axios" # @1.6.8
pin "#lib/adapters/http.js", to: "#lib--adapters--http.js.js" # @2.0.1
pin "#lib/platform/node/classes/FormData.js", to: "#lib--platform--node--classes--FormData.js.js" # @2.0.1
pin "#lib/platform/node/index.js", to: "#lib--platform--node--index.js.js" # @2.0.1
