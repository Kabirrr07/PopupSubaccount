const style=document.createElement("style");style.textContent="\n    body {font-family: Arial, Helvetica, sans-serif;}\n    * {box-sizing: border-box;}\n\n     .open-button {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: white;\n      padding: 12px 20px;\n      width: 270px;\n      height: 55px;\n      font-size: 18px;\n      font-weight: bold;\n      background: linear-gradient(161deg, #ffa600, #010155);\n      background-size: 200% 200%;\n      -webkit-animation: AnimationName 7s ease infinite;\n      -moz-animation: AnimationName 7s ease infinite;\n      animation: AnimationName 7s ease infinite;\n      border-radius: 20px;\n      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);\n      outline: none;\n      border: 1px solid #fdb92e;\n      position: fixed;\n      bottom: 15px;\n      right: 90px;\n      z-index: ±2147483647;\n      transition: transform 0.3s ease, box-shadow 0.3s ease;\n    }\n\n    .open-button:hover {\n      transform: scale(1.05);\n      box-shadow: 0 40px 80px #fdb92e;\n    }\n\n    @keyframes AnimationName {\n      0% { background-position: 7% 0%; }\n      50% { background-position: 94% 100%; }\n      100% { background-position: 7% 0%; }\n    }\n\n    .chat-popup {\n      display: block;\n      position: fixed;\n      right: 45px;\n      bottom: -15px;\n      border: 0px solid #f1f1f1;\n      z-index:999999;\n      width: 450px;\n      height: 650px;\n      background-color: none;\n      border-radius: 10px;\n    }\n\n    .form-container {\n      width: 100%;\n      height: 100%;\n    }\n\n    .form-container iframe {\n      width: 100%;\n      height: 100%;\n      border: none;\n    }\n\n    .close-btn {\n      background-color: transparent;\n      color: white;\n      padding: 10px 20px;\n      border: none;\n      cursor: pointer;\n      position: absolute;\n      top: 10px;\n      right: 10px;\n      font-size: 30px;\n      font-weight: 1500;\n      border-radius: 10px;\n    }\n\n    .form-container .btn:hover, .open-button:hover, .close-btn:hover {\n      opacity: 1;\n    }\n    .notification-dot {\n  position: absolute;\n  top: -5px;\n  right: -0px;\n  width: 14px;\n  height: 14px;\n  background-color: green;\n  border-radius: 50%;\n  border: 1px solid white; /* optional for better contrast */\n  box-shadow: 0 0 8px rgba(9, 121, 105, 0.6); /* optional glow effect */\n    }\n  ",document.head.appendChild(style);const apiUrl="https://script.google.com/macros/s/AKfycbyJELKQ9SgzoZNlH7Gv4fCt5D3ri2loNkWGXsNQpRvTGnKsAMbvaj9P1hSLos24xckF/exec";function getLocationFromURL(){let n=window.location.href.match(/location\/([a-zA-Z0-9_-]+)/);return n?n[1]:null}let isPopupVisible=!1,isButtonVisible=!1;function handlePageChange(){getLocationFromURL()?fetch("https://script.google.com/macros/s/AKfycbyJELKQ9SgzoZNlH7Gv4fCt5D3ri2loNkWGXsNQpRvTGnKsAMbvaj9P1hSLos24xckF/exec").then(n=>n.json()).then(n=>{localStorage.setItem("easeailocation",JSON.stringify(n)),checkConditions(n,"{{user.email}}")}).catch(n=>{console.error("Error fetching the API:",n),hideButtonAndPopup()}):hideButtonAndPopup()}function checkConditions(n,e){n.output.some(n=>n.email===e)?showPopupFirstThenButton():hideButtonAndPopup()}function showPopupFirstThenButton(){isPopupVisible||showChatPopup(),setTimeout(()=>{isButtonVisible||showButton()},5e3)}function showChatPopup(){let n=document.getElementById("myForm");if(!n){(n=document.createElement("div")).className="chat-popup",n.id="myForm",document.body.appendChild(n);let e=document.createElement("div");e.className="form-container",n.appendChild(e);let t=document.createElement("iframe");t.src="https://setuppopup.netlify.app?email={{user.email}}&name={{user.name}}&sessionkey={{user.sessionKey}}",e.appendChild(t);let o=document.createElement("button");o.className="close-btn",o.textContent="▾",o.onclick=closeForm,e.appendChild(o)}n.style.display="block",isPopupVisible=!0}function showButton(){let n=document.getElementById("openButton");if(!n){(n=document.createElement("button")).id="openButton",n.className="open-button",n.innerHTML="<h1 style='margin: 0; color:white; font-size: 1em; font-weight: bold;'>Let's Get Started</h1>",n.onclick=toggleForm,document.body.appendChild(n);let e=document.createElement("div");e.id="notificationDot",e.className="notification-dot",n.appendChild(e)}n.style.display="block",isButtonVisible=!0}function hideButtonAndPopup(){let n=document.getElementById("openButton");n&&(n.remove(),isButtonVisible=!1);let e=document.getElementById("myForm");e&&(e.remove(),isPopupVisible=!1)}function toggleForm(){let n=document.getElementById("myForm");n&&(n.style.display="block"===n.style.display?"none":"block")}function closeForm(){let n=document.getElementById("myForm");n&&(n.style.display="none")}function debounce(n,e){let t;return function(...o){clearTimeout(t),t=setTimeout(()=>n.apply(this,o),e)}}const debouncedHandlePageChange=debounce(handlePageChange,100);debouncedHandlePageChange();const handleHistoryChange=()=>debouncedHandlePageChange();if("function"==typeof history.pushState){let n=history.pushState;history.pushState=function(...e){n.apply(history,e),handleHistoryChange()};let e=history.replaceState;history.replaceState=function(...n){e.apply(history,n),handleHistoryChange()}}window.addEventListener("hashchange",handleHistoryChange),window.addEventListener("popstate",handleHistoryChange);