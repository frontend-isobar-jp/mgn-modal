import mgnModal from "./mgn-modal"

let modal = new mgnModal(".j-modal");
modal.OpenEnd = function( index ){
	console.log(index, "openEnd")
};
modal.CloseEnd = function(){
	console.log("closeEnd")
};

new mgnModal(
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
