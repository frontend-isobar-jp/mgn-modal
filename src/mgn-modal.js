/*

Megane Template

Website: http://megane-template.com/
License: Dentsu Isobar All Rights Reserved.

*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.mgnModal = factory();
    }
}(this, function() {

    function mgnModal(selector, option) {

        this.selector = selector;

        this.mgnModalDetail = this.selector.split(".")[1] + "_detail";
        this.mgnModalBox = this.selector.split(".")[1] + "_box";
        this.mgnModalBoxInner = this.selector.split(".")[1] + "_box_inner";
        this.mgnModalWrap = this.selector.split(".")[1] + "_wrap";
        this.mgnModalBoxClose = this.selector.split(".")[1] + "_box_close";
        this.mgnModalBoxBg = this.selector.split(".")[1] +"_bg";
        this.linkInnerHTML = this.selector.split(".")[1] + "_link_innerHTML";

        //option
        if(option == null) option = {};
        this.width = option.width ? option.width : 960;
        this.modalSpeed = option.modalSpeed ? option.modalSpeed : 200;
        this.bgColor = option.bgColor ? option.bgColor : "#000";
        this.bgOpacity = option.bgOpacity ? option.bgOpacity : 0.8;
        this.innerBgColor = option.innerBgColor ? option.innerBgColor : "#FFF";
        this.innerBgPadding = option.innerBgPadding>=0 ? option.innerBgPadding : 20;
        this.closeBtn = option.closeBtn || option.closeBtn=="" ? option.closeBtn : "×";
        this.closeCancel = option.closeCancel ? option.closeCancel : false;
        this.trigger = option.trigger ? option.trigger : "click";
        this.addClass = option.addClass ? option.addClass : "";
        this.fixed = option.fixed && option.fixed ? option.fixed : false;

        this.OpenEnd = function(){};
        this.CloseEnd = function(){};

        this.mgnModalMovieHeight = (this.width / 16) * 9; //動画縦幅 16:9
        this.mgnModalImg = ".gif|.jpg|.jpeg|.png"; //画像を判別
        this.mgnModalHtml = "//|.html|.php|="; //外部HTML or PHPを判別
        this.mgnModalMovie = "youtube|youtu"; //動画を判別

        this.target = null;
        this.index = null;

        this.modal = document.querySelectorAll( this.selector );
        this.tagHTML = document.getElementsByTagName('html')[0];

        if(this.modal.length != 0) {
            this.Init();
            this.CreateModalArea();
        };

    }


    /**
    **
    ** Init
    **
    **/
    mgnModal.prototype.Init = function() {

        var THAT = this;

        this.Openfunc = function(e) {

            e.preventDefault();

            THAT.target = e.currentTarget;
            THAT.Set();

        }

        if( this.modal[0] ) {

            this.mgnModalDetailElm = document.getElementsByClassName("j-modal_detail");

            for (var i = 0; i < this.modal.length; i++) {

                this.modal[i].addEventListener( "click", this.Openfunc);

            }

        }

    }

    mgnModal.prototype.ReInit = function() {

        for (var i = 0; i < this.modal.length; i++) {

            this.modal[i].removeEventListener( "click", this.Openfunc);

        }

        this.Init();

    }


    mgnModal.prototype.CreateModalArea = function() {

        var THAT  = this;

        var modalAppendHTML  = '<div id="'+ this.mgnModalBox +'" class="'+ this.addClass +'">';
            modalAppendHTML += '<div id="'+ this.mgnModalBoxInner +'">';
            modalAppendHTML += '<div id="'+ this.mgnModalWrap +'"></div>';
            modalAppendHTML += '<p id="'+ this.mgnModalBoxClose +'">'+ this.closeBtn +'</p>';
            modalAppendHTML += '</div>';
            modalAppendHTML += '</div>';
            modalAppendHTML += '<div id="'+ this.mgnModalBoxBg +'"></div>';

        this.mgnModalBoxCSS =  "position: " + ( this.fixed ? "fixed" : "absolute" ) + "; ";
        this.mgnModalBoxCSS += "top: " + ( this.fixed ? "50%" : "0" ) + "; ";
        this.mgnModalBoxCSS += "left: 0; ";
        this.mgnModalBoxCSS += "right: 0; ";
        this.mgnModalBoxCSS += "margin: auto; ";
        this.mgnModalBoxCSS += "z-index: 10001; ";
        this.mgnModalBoxCSS += "width: 100%; ";
        this.mgnModalBoxCSS += "cursor: pointer; ";
        this.mgnModalBoxCSS += "transform: " + ( this.fixed ? "translate(0,-50%)" : "translate(0,0)" ) + "; ";
        this.mgnModalBoxCSS += "-ms-transform: " + ( this.fixed ? "translate(0,-50%)" : "translate(0,0)" ) + "; ";
        this.mgnModalBoxCSS += "-webkit-transform: " + ( this.fixed ? "translate(0,-50%)" : "translate(0,0)" ) + "; ";
        this.mgnModalBoxCSS += "opacity: 0; ";
        this.mgnModalBoxCSS += "pointer-events: none; "

        this.mgnModalBoxBgCSS = "position: fixed; ";
        this.mgnModalBoxBgCSS += "left: 0; ";
        this.mgnModalBoxBgCSS += "top: 0; " ;
        this.mgnModalBoxBgCSS += "width: 100%; ";
        this.mgnModalBoxBgCSS += "height: 200%; ";
        this.mgnModalBoxBgCSS += "background:" + this.bgColor + "; ";
        this.mgnModalBoxBgCSS += "transition: all "+ this.modalSpeed/1000 +"s ease; ";
        this.mgnModalBoxBgCSS += "-webkit-transition: all "+ this.modalSpeed/1000 +"s ease; ";
        this.mgnModalBoxBgCSS += "z-index: 10000; ";
        this.mgnModalBoxBgCSS += "cursor: pointer; ";
        this.mgnModalBoxBgCSS += "opacity: 0; ";
        this.mgnModalBoxBgCSS += "pointer-events: none; ";

        var mgnModalBoxCloseCSS =  "position: absolute; ";
            mgnModalBoxCloseCSS += "right: 0; ";
            mgnModalBoxCloseCSS += "top: -50px; ";
            mgnModalBoxCloseCSS += "z-index: 10000; ";
            mgnModalBoxCloseCSS += "cursor: pointer; ";
            mgnModalBoxCloseCSS += "color: #FFF; ";
            mgnModalBoxCloseCSS += "font-size: 40px; ";
            mgnModalBoxCloseCSS += "line-height: 1; ";
            mgnModalBoxCloseCSS += "margin: 0; ";

        this.mgnModalBoxInnerCSS =  "background: " + this.innerBgColor + "; ";
        this.mgnModalBoxInnerCSS += "padding: " + this.innerBgPadding + "px; ";
        this.mgnModalBoxInnerCSS += "position: relative; ";
        this.mgnModalBoxInnerCSS += "cursor: default; ";

        this.mgnModalBoxImgCSS = "padding: 0; "
        this.mgnModalBoxImgCSS += "background: none; "

        this.mgnModalImgCSS =  "height: auto; ";
        this.mgnModalImgCSS += "max-width: 100%; ";
        this.mgnModalImgCSS += "display: block; ";
        this.mgnModalImgCSS += "margin: 0 auto; "

        this.mgnModalBoxMovieCSS =  "padding: 0; ";
        this.mgnModalBoxMovieCSS += "background: none; ";
        this.mgnModalBoxMovieCSS += "height: 0; ";
        this.mgnModalBoxMovieCSS += "position: relative; ";
        this.mgnModalBoxMovieCSS += "padding-bottom: 56.25%; "

        this.mgnModalBoxMovieIframeCSS =  "display: block; ";
        this.mgnModalBoxMovieIframeCSS += "height: 100%; ";
        this.mgnModalBoxMovieIframeCSS += "position: absolute; ";
        this.mgnModalBoxMovieIframeCSS += "left: 0; ";
        this.mgnModalBoxMovieIframeCSS += "top: 0; ";
        this.mgnModalBoxMovieIframeCSS += "width: 100%; "

        if( this.modal ) {

            document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",modalAppendHTML);

            this.mgnModalBoxElm = document.getElementById(this.mgnModalBox);
            this.mgnModalBoxInnerElm = document.getElementById(this.mgnModalBoxInner);
            this.mgnModalBoxCloseElm = document.getElementById(this.mgnModalBoxClose);
            this.mgnModalBoxBgElm = document.getElementById(this.mgnModalBoxBg);
            this.linkInnerHTMLElm = document.getElementsByClassName(this.linkInnerHTML);

            this.mgnModalBoxElm.style.cssText = this.mgnModalBoxCSS;
            this.mgnModalBoxInnerElm.style.cssText = this.mgnModalBoxInnerCSS;
            this.mgnModalBoxBgElm.style.cssText = this.mgnModalBoxBgCSS;
            this.mgnModalBoxCloseElm.style.cssText = mgnModalBoxCloseCSS;

            for (var i = 0; i < this.mgnModalDetailElm.length; i++) {
                this.mgnModalDetailElm[i].style.display = "none";
            }

            for (var i = 0; i < this.modal.length; i++) {
                var THIS_DATA = this.modal[i].getAttribute("href");
                if(!THIS_DATA) this.AddClass(this.modal[i],this.linkInnerHTML);
            }

            if( !this.modal[0].classList ) { //IE9
                this.mgnModalBoxElm.style.display = "none";
                this.mgnModalBoxBgElm.style.display = "none";
            }

        }


        var CloseFunc = function(e) {
            e.preventDefault();
            THAT.Close();
        }

        this.mgnModalBoxCloseElm = document.getElementById(this.mgnModalBoxClose);
        this.mgnModalBoxBgElm = document.getElementById(this.mgnModalBoxBg);

        this.mgnModalBoxCloseElm.addEventListener("click", CloseFunc);
        this.mgnModalBoxBgElm.addEventListener("click", CloseFunc);


    }
    //CreateModalArea

    mgnModal.prototype.Open = function( elm ) {

        if( this.modal[0] ) {

             this.target = document.querySelectorAll( elm )[0];
             this.Set();

        } else {

            console.error( "OpenModal('" + elm + "') ERROR  '" + elm + "' is not found." );
            return false;

        }

    }

    mgnModal.prototype.Set = function() {

        var THIS_DATA = this.target.getAttribute("href");
        var THIS_DATA_STRING = new String( THIS_DATA );
        this.index = Array.prototype.indexOf.call(this.modal, this.target);

        this.scrollVal = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if( THIS_DATA ) {

            if( THIS_DATA_STRING.match( this.mgnModalImg ) ) {//hrefが画像の場合

                this.IfImage( THIS_DATA );

            } else if( THIS_DATA_STRING.match( this.mgnModalMovie ) ) {//hrefがyoutubeの場合

                this.IfYoutube( THIS_DATA );

            } else if( THIS_DATA_STRING.match( this.mgnModalHtml)  ) {//hrefが外部HTMLの場合

                this.IfOuterHTML( THIS_DATA );

            }

        } else {

            this.IfInnerHTML();

        }

    }
    //Set

    mgnModal.prototype.IfImage = function(thisData) {

        var THAT = this;

        var modalAppendHTML  = '<img src="'+ thisData +'" class="j-modal_img">';

        var IMG = new Image();
        IMG.src = thisData;

        this.AddClass(this.mgnModalBoxInnerElm,"j-modal_img");
        this.mgnModalBoxInnerElm.style.cssText = this.mgnModalBoxImgCSS;

        this.mgnModalWrapElm = this.mgnModalBoxInnerElm.querySelectorAll("#" + this.mgnModalWrap)[0];
        this.mgnModalWrapElm.innerHTML = modalAppendHTML;

        document.getElementsByClassName("j-modal_img")[0].style.cssText = this.mgnModalImgCSS;

        IMG.onload = function() {
            THAT.Ready();
        };

    }
    //IfImage
    mgnModal.prototype.IfYoutube = function(thisData) {

        var THIS_ID = thisData.split("/")[3];
        var modalAppendHTML  = '<iframe src="https://www.youtube.com/embed/'+ THIS_ID +'?autoplay=1&rel=0&playsinline=1" allowfullscreen="true" frameborder="0"></iframe>';

        this.AddClass(this.mgnModalBoxInnerElm,"j-modal_movie");
        this.mgnModalBoxInnerElm.style.cssText = this.mgnModalBoxImgCSS;

        this.mgnModalWrapElm = this.mgnModalBoxInnerElm.querySelectorAll("#" + this.mgnModalWrap)[0];
        this.mgnModalWrapElm.style.cssText = this.mgnModalBoxMovieCSS;
        this.mgnModalWrapElm.innerHTML = modalAppendHTML;

        this.mgnModalWrapElm.getElementsByTagName("iframe")[0].style.cssText = this.mgnModalBoxMovieIframeCSS;

        this.Ready();

    }
    //IfYoutube
    mgnModal.prototype.IfOuterHTML = function(thisData) {

        var THAT = this;

        var TYPE = this.target.getAttribute("data-ModalType");

        if(!TYPE) {

            var REQUEST = new XMLHttpRequest();
            REQUEST.open("GET", thisData, true);
            REQUEST.timeout = 3000;

            REQUEST.onload = function(event) {

                if (REQUEST.readyState === 4) {
                    if (REQUEST.status === 200) {

                        THAT.mgnModalBoxInnerElm.style.cssText = THAT.mgnModalBoxInnerCSS;

                        THAT.mgnModalWrapElm = THAT.mgnModalBoxInnerElm.querySelectorAll("#" + THAT.mgnModalWrap)[0];
                        THAT.mgnModalWrapElm.innerHTML = REQUEST.responseText;

                        THAT.Ready();

                    } else {
                        console.error("This request got an error.");
                    }
                }

            };
            REQUEST.ontimeout = function(event) {
                alert("The request for " + thisData + " timed out.");
            };
            REQUEST.onerror = function(event) {
                console.error("This request got an error.");
            };
            REQUEST.send(null);

        } else if (TYPE == "iframe") {

            var height = window.innerHeight * 0.8;
            var modalHeight = this.target.getAttribute("data-modalHeight")
            if( modalHeight ) height = modalHeight;

            var modalAppendHTML  = '<iframe src="'+ thisData +'" width="100%" height="'+ height +'" frameborder="0"></iframe>';

            this.mgnModalBoxInnerElm.style.cssText = this.mgnModalBoxImgCSS;

            this.mgnModalWrapElm = this.mgnModalBoxInnerElm.querySelectorAll("#" + this.mgnModalWrap)[0];
            this.mgnModalWrapElm.innerHTML = modalAppendHTML;

            this.Ready();

        }

    }
    //IfOuterHTML
    mgnModal.prototype.IfInnerHTML = function() {

        var INDEX = Array.prototype.indexOf.call(this.linkInnerHTMLElm, this.target);
        var THIS_HTML = this.mgnModalDetailElm[ INDEX ].innerHTML;

        this.mgnModalBoxInnerElm.style.cssText = this.mgnModalBoxInnerCSS;

        this.mgnModalWrapElm = this.mgnModalBoxInnerElm.querySelectorAll("#" + this.mgnModalWrap)[0];
        this.mgnModalWrapElm.innerHTML = THIS_HTML;

        this.Ready();

    }
    //IfInnerHTML

    /**
    **
    ** Ready
    **
    **/
    mgnModal.prototype.Ready = function() {

        var THAT = this;

        var width = this.target.getAttribute("data-modalWidth");
        var height = this.target.getAttribute("data-modalHeight");

        width = width ? width : this.width + "px";
        height = height ? height : "inherit";

        this.mgnModalBoxElm.style.maxWidth = width;
        this.mgnModalBoxElm.style.height = height;
        this.mgnModalBoxElm.style.transition = "inherit";
        this.mgnModalBoxElm.style.setProperty("-webkit-transition", "inherit");

        setTimeout( function() {
            THAT.Show();
        }, 10 );

    }
    //Ready


    /**
    **
    ** Show
    **
    **/
    mgnModal.prototype.Show = function() {

        var THAT = this;

        var WIN_HEIGHT = window.innerHeight;
        var THIS_HEIGHT = this.mgnModalBoxElm.scrollHeight;
        var FIX = (WIN_HEIGHT - THIS_HEIGHT) / 2;

        if( !this.fixed ) { //absolute の場合 : モーダル表示位置計算

            this.mgnModalBoxElm.style.top = WIN_HEIGHT > THIS_HEIGHT ? (this.scrollVal + FIX) + "px" : (this.scrollVal + 40) + "px";

        } else { //fixed の場合

            this.tagHTML.style.position = "fixed";
            this.tagHTML.style.width = "100%";
            this.tagHTML.style.top = -this.scrollVal + "px";
        }

        setTimeout( function() {

            if( !THAT.modal[0].classList ) { //IE9

                THAT.mgnModalBoxElm.style.opacity = 1;
                THAT.mgnModalBoxBgElm.style.opacity = 1;
                THAT.mgnModalBoxElm.style.display = "block";
                THAT.mgnModalBoxBgElm.style.display = "block";

            } else {

                THAT.mgnModalBoxElm.style.opacity = 1;
                THAT.mgnModalBoxElm.style.pointerEvents = "inherit";
                THAT.mgnModalBoxElm.style.transition = "all " + THAT.modalSpeed / 1000 + "s ease";
                THAT.mgnModalBoxElm.style.setProperty("-webkit-transition", "all " + THAT.modalSpeed / 1000 + "s ease");

                THAT.mgnModalBoxBgElm.style.opacity = THAT.bgOpacity;
                THAT.mgnModalBoxBgElm.style.pointerEvents = "inherit";

                var EndFunc = function() {
                    THAT.OpenEnd( THAT.index );
                    THAT.mgnModalBoxElm.removeEventListener("transitionend", EndFunc, false);
                };

                THAT.mgnModalBoxElm.addEventListener("transitionend", EndFunc, false);

            }

        },100);

    }


    /**
    **
    ** Close
    **
    **/
    mgnModal.prototype.Close = function() {

        var THAT = this;

        this.mgnModalBoxElm.style.opacity = 0;
        this.mgnModalBoxElm.style.pointerEvents = "none";

        this.mgnModalBoxBgElm.style.opacity = 0;
        this.mgnModalBoxBgElm.style.pointerEvents = "none";

        var EndFunc = function() {

            THAT.mgnModalBoxInnerElm.setAttribute("class", false);
            THAT.mgnModalWrapElm.setAttribute("style", false)
            THAT.mgnModalWrapElm.innerHTML = "";

            THAT.CloseEnd();

            THAT.mgnModalBoxElm.removeEventListener("transitionend", EndFunc, false);

        };

        this.mgnModalBoxElm.addEventListener("transitionend", EndFunc, false);

        //

        if( !this.modal[0].classList ) { //IE9
            this.mgnModalBoxElm.style.display = "none";
            this.mgnModalBoxBgElm.style.display = "none";
        }

        if( this.fixed ) { //fixed の場合

            this.tagHTML.removeAttribute("style");

            window.scroll( 0, this.scrollVal );

        }

    }

    mgnModal.prototype.AddClass = function( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }

    return mgnModal;

}));
