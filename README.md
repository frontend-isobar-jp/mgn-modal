# mgn-modal ( Don't Need jQuery )


Execute Modal Window function.

- Target browser : IE9+
- For IE9, display Modal Window without transition.

___

# Install

```
npm i mgn-modal -S
```

## Or Download raw data
[↓ download "mgn-modal.js"](https://raw.githubusercontent.com/frontend-isobar-jp/mgn-modal/master/src/mgn-modal.js)


___

# Import

```
import mgnModal from "mgn-modal"
```

___

# Constructor

```
new mgnModal(element [, option]);
```
|Argument|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|element|String|-(Required)|Specify target element<br>ex) ".modal"|
|option|Object|-|ex)<br> option = {<br> width: 1024,<br> modalSpeed: 200,<br> bgColor: "#FFF",<br> bgOpacity: 0.6,<br> innerBgColor: "#FFF",<br> innerBgPadding: 20,<br> closeBtn: "&lt;img src='close.png'&gt;",<br> addClass: "wrap",<br> fixed: false<br>}|


|Option|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|width|Number|768|Specify Modal Window width.|
|modalSpeed|Number|200|Specify speed when open Modal.|
|bgColor|String|"#000"|Specify background color.|
|bgOpacity|Number|0.8|Specify transparency for background color.|
|innerBgColor|String|"none"|Specify background color.|
|innerBgPadding|Number|0|Specify padding background.|
|closeBtn|String|"×"|Specify close button.|
|addClass|String|-|Add class to the topmost containing element.|
|fixed|bool|false|Set to "true" to make background fixed.|


___

# Method

|Method|Argument|Descroption|
|:-------|:--------|:------|
|ReInit()|-|Execute when an element target for Modal is added later.|
|Open( element )|String|Specify the Modal element want to execute.<br>( ex: ".default_open" )|
|Close()|-|Close the open Modal screen.|
|OpenEnd = function(){};|-|Execute after opening Modal screen.|
|CloseEnd = function(){};|-|Execute after closing Modal screen.|


___

# Demo

[https://frontend-isobar-jp.github.io/mgn-modal/](https://frontend-isobar-jp.github.io/mgn-modal/)

```
import mgnModal from "mgn-modal"

let modal = new mgnModal(".j-modal");
modal.OpenEnd = function( index ){
	console.log(index, "openEnd")
};
modal.CloseEnd = function(){
	console.log("closeEnd")
};

//

mgnModal(
    ".j-modal2",
    {
        width: 768,
        modalSpeed: 200,
        bgColor: "#CCC",
        bgOpacity: 0.9,
        innerBgColor: "#CCC",
        innerBgPadding: 40,
        closeBtn: "Close",
        closeCancel: false,
        addClass: "",
        fixed: true
    }
);
```
