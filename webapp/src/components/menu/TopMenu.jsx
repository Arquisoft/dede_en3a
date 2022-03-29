"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TopMenu_module_scss_1 = require("./TopMenu.module.scss");
var logo_svg_1 = require("./../../logo.svg");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var react_1 = require("react");
function TopMenu() {
    var _a = (0, react_1.useState)(String), wobble = _a[0], setWobble = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var url = window.location.href.split("/");
    var path = url[1];
    var cart = (0, react_redux_1.useSelector)(function (state) { return state.cart; });
    var endWobble = function () {
        console.log("endWobble");
        setWobble("");
    };
    var homeClass = TopMenu_module_scss_1.default.menuitem;
    if (path === "home")
        homeClass = TopMenu_module_scss_1.default.menuitem + " " + TopMenu_module_scss_1.default.selected;
    return (<>
      <div className={TopMenu_module_scss_1.default.menucontainer}>
        <div className={TopMenu_module_scss_1.default.menu}>
          <img src={logo_svg_1.default} className={TopMenu_module_scss_1.default.logo} alt="logo"/>
          <div className={TopMenu_module_scss_1.default.links}>
            <div className={homeClass} onClick={function () { return navigate("/home"); }}>
              Home
            </div>
            <div className={TopMenu_module_scss_1.default.menuitem} onClick={function () { return navigate("/shop"); }}>Shop</div>
            <a href={"https://arquisoft.github.io/dede_en3a/"}>
              <div className={TopMenu_module_scss_1.default.menuitem}>About us</div>
            </a>
            <div className={TopMenu_module_scss_1.default.menuitem} onClick={function () { return navigate("/contact"); }}>Contact</div>
            <div className={TopMenu_module_scss_1.default.menuitem} onClick={function () { return navigate("/orders"); }}>Orders</div>
            <div className={TopMenu_module_scss_1.default.cartcontainer} onAnimationEnd={endWobble}>
              <span title={"cart"} className={"material-icons " + TopMenu_module_scss_1.default.loginicon} onClick={function () { return navigate("/cart"); }}>
                shopping_cart
              </span>
              <div className={TopMenu_module_scss_1.default.cartcounter}>{cart.length}</div>
            </div>
          </div>
          <span className={"material-icons " + TopMenu_module_scss_1.default.loginicon} onClick={function () { return navigate("/login"); }}>
            account_circle
          </span>
        </div>
      </div>
    </>);
}
exports.default = TopMenu;
