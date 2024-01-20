// Import and register all your controllers from the importmap under controllers/*
import 'prismjs/components/prism-core';  // 必要に応じて、これを追加
import 'prismjs/components/prism-cpp';   // C++の言語定義を追加
import 'prismjs/themes/prism.css';        // Prism.jsのテーマCSSを追加

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)
