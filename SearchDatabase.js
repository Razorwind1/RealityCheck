/*jslint white: true */
/*jslint devel: true */
var themePage, wrapperData;

function colorNav() {
    var listForTopNav, pageNAME;
    listForTopNav = document.querySelectorAll("ul.topNav1 li");
    //alert("listForTopNav: "+listForTopNav);
    pageNAME = document.getElementById("pageName").innerHTML;
            //alert("pageName: "+pageNAME);
        for (i=0; i<listForTopNav.length; i++) {
            //alert(listForTopNav[i].innerHTML);
            //alert("pageName: "+pageNAME);
            if (listForTopNav[i].innerHTML.indexOf(pageNAME) > -1 || (
               listForTopNav[i].innerHTML.indexOf("Options") > -1 && 
                (pageNAME==="Themes" || pageNAME==="Feats" || pageNAME==="Combat Styles" || pageNAME==="Spells" || pageNAME==="Search Options")) ) {
                listForTopNav[i].style.color = "rgb(10, 210, 239)";
                listForTopNav[i].style.fontSize = "200%";
            }
        }
}

function getNav() {
    //FIREFOX ISSUE RESOLVED---LOCAL FILES DO NOT EQUAL SERVER HOSTED FILES---FIREFOX ISSUE RESOLVED---LOCAL FILES DO NOT EQUAL SERVER HOSTED FILES---FIREFOX ISSUE RESOLVED---LOCAL FILES DO NOT EQUAL SERVER HOSTED FILES
    /*var requestNavigation = new XMLHttpRequest();
    requestNavigation.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) //Navigation is ready
            pasteNav(this);
        //console.log(this);
    }
    requestNavigation.open("GET", "navigation.xml", true);
    requestNavigation.send;
    console.log(requestNavigation);
}
function pasteNav(xmlParm) {
    var xmlNavPage = xmlParm.responseXML; //XMLHttpRequest.responseXML returns a Document containing the HTML or SML retrieved by the request
    alert(xmlNavPage);
    var navDiv = xmlNavPage.getElementById("navDiv");
    document.getElementById("navigationPlaceholder").innerHTML = navDiv;
}*/
    $.get('navigation.html', function(navigationPage){
        
    $(document.body).find("#navigationPlaceholder").append(navigationPage); //replaceWith, html, append
    
    $( document ).ready( colorNav );
    //$( window ).on( "load", colorNav );
    }
        );
    
}

function resetSearchForm() {
    document.getElementById("databaseSearchBlock").reset();
    $( document ).ready( mySearch );
}
function getOptions() { //Request the Themes, Feats, Combat Styles, and Spells. Paste them on the Search Database page.
    var themeWrapperElementsArray, themeWrapperHTML, featWrapperElementsArray, featWrapperHTML, styleWrapperElementsArray, styleWrapperHTML, spellWrapperElementsArray, spellWrapperHTML;
    $.get('Themes.html', function(themePage){ //GET THEMES
        themeWrapperElementsArray = $(themePage).find('div.themeWrapper');
        for (i=themeWrapperElementsArray.length-1; i>=0; i=i-1) {
            themeWrapperHTML = themeWrapperElementsArray[i].innerHTML;
            $(themeWrapperHTML).insertAfter(".themesAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
    $.get('Feats.html', function(featPage){ //GET FEATS
        featWrapperElementsArray = $(featPage).find('div.featWrapper');
        for (i=featWrapperElementsArray.length-1; i>=0; i=i-1) {
            featWrapperHTML = featWrapperElementsArray[i].innerHTML;
            $(featWrapperHTML).insertAfter(".featsAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
    $.get('CombatStyles.html', function(stylePage){ //GET FEATS
        styleWrapperElementsArray = $(stylePage).find('div.styleWrapper');
        for (i=styleWrapperElementsArray.length-1; i>=0; i=i-1) {
            styleWrapperHTML = styleWrapperElementsArray[i].innerHTML;
            $(styleWrapperHTML).insertAfter(".stylesAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
    $.get('Spells.html', function(spellPage){ //GET FEATS
        spellWrapperElementsArray = $(spellPage).find('div.spellWrapper');
        for (i=spellWrapperElementsArray.length-1; i>=0; i=i-1) {
            spellWrapperHTML = spellWrapperElementsArray[i].innerHTML;
            $(spellWrapperHTML).insertAfter(".spellsAnchor");
            //alert("spellWrapperElementsArray: "+spellWrapperElementsArray[i].innerHTML);
        }
    })
}
//----SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE----//
function mySearch() {
    "use strict";
    // Declare variables
    var input, inputTextUpCase, a, i, list, featNAME, featCONTENT, featTIER, styleNAME, styleTEXT, spellNAME, spellDESCRIPTION, spellFLAVOR, spellMETHOD, searchTierValue, CombatFeatOrNo, featsSEARCHfor, stylesSEARCHfor, spellsSEARCHfor, searchSchool, spellSCHOOL, searchMethod, searchElement, spellELEMENT, themeNAME, themeCONTENT, themesSEARCHfor, CombatThemeOrNo, displaySearchDatabaseWrapper;
    input = document.getElementById('myInput');
    inputTextUpCase = input.value.toUpperCase();
    list = document.querySelectorAll("table.theme, table.feat, div.combatStyle, div.spellFlexBox");
    
    displaySearchDatabaseWrapper = document.querySelectorAll("div.searchDatabaseWrapper");
    //alert("k: "+k.innerHTML);
    displaySearchDatabaseWrapper[0].style.display = "block";

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        //THEME
        if (typeof list[i].querySelectorAll("th.themeName")[0] !== "undefined") {
        themesSEARCHfor = document.getElementById("searchForThemes").checked; //Searching Themes???
            if (themesSEARCHfor) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        
        CombatThemeOrNo = document.getElementById("CombatThemeOrNo").value; //Combat Theme???
            if (CombatThemeOrNo === "C" && typeof list[i].querySelectorAll("span.nonCombat")[0] !== "undefined") {
                list[i].style.display = "none";
                continue;
            } else if (CombatThemeOrNo === "NC" && typeof list[i].querySelectorAll("span.nonCombat")[0] === "undefined") {
                list[i].style.display = "none";
                continue;
            }
            
        themeNAME = list[i].querySelectorAll("th.themeName")[0]; //Theme Text???
        themeCONTENT = list[i].querySelectorAll("td.themeContent")[0];
            //alert("themeCONTENT InnerHTML: "+themeCONTENT.innerHTML);
            if (themeNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            themeCONTENT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                list[i].style.display = "";
                continue;
            } else {
                list[i].style.display = "none";
                continue;
            }
        
        }
        //FEAT
        else if (typeof list[i].querySelectorAll("th.featName")[0] !== "undefined") {
        featsSEARCHfor = document.getElementById("searchForFeats").checked; //Searching Feats???
            if (featsSEARCHfor) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        
        searchTierValue = document.getElementById("searchTier").value; //Tier???
        featTIER = list[i].querySelectorAll("td.tier")[0];
            if (featTIER.innerHTML.indexOf(searchTierValue) === 0) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        
        CombatFeatOrNo = document.getElementById("CombatFeatOrNo").value; //Combat Feat???
            if (CombatFeatOrNo === "C" && typeof list[i].querySelectorAll("span.nonCombat")[0] !== "undefined") {
                list[i].style.display = "none";
                continue;
            } else if (CombatFeatOrNo === "NC" && typeof list[i].querySelectorAll("span.nonCombat")[0] === "undefined") {
                list[i].style.display = "none";
                continue;
            }
        featNAME = list[i].querySelectorAll("th.featName")[0]; //Feat Text???
        featCONTENT = list[i].querySelectorAll("td.featContent")[0];
            //alert("Feat content: " + featCONTENT);
            if (featNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            featCONTENT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                list[i].style.display = "";
                continue;
            } else {
                list[i].style.display = "none";
                continue;
            }
        } //SYTLE
        else if (typeof list[i].querySelectorAll("div.styleName")[0] !== "undefined") {
        stylesSEARCHfor = document.getElementById("searchForStyles").checked; //Searching Styles???
            if (stylesSEARCHfor) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        
        styleNAME = list[i].querySelectorAll("div.styleName")[0]; //Style Text???
        styleTEXT = list[i].querySelectorAll("div.styleText")[0];
            if (styleNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            styleTEXT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                list[i].style.display = "";
                continue;
            } else {
                list[i].style.display = "none";
                continue;
            }
        } //SPELL
        else if (typeof list[i].querySelectorAll("div.spellName")[0] !== "undefined") {
        spellsSEARCHfor = document.getElementById("searchForSpells").checked; //Searching Spells???
            //alert("Spell Search? "+spellsSEARCHfor);
            if (spellsSEARCHfor) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        searchSchool = document.getElementById("searchSchool").value.toUpperCase(); //Spell School???
            //alert("Spell School: "+searchSchool);
        spellSCHOOL = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellSCHOOL.innerHTML.toUpperCase().indexOf(searchSchool) > -1 ) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        searchMethod = document.getElementById("searchMethod").value.toUpperCase(); //Spell Method???
            //alert("Spell School: "+searchSchool);
        spellMETHOD = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellMETHOD.innerHTML.toUpperCase().indexOf(searchMethod) > -1 ) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        searchElement = document.getElementById("searchElement").value.toUpperCase(); //Spell Element???
            //alert("Spell School: "+searchSchool);
        spellELEMENT = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellELEMENT.innerHTML.toUpperCase().indexOf(searchElement) > -1 ) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
                continue;
            }
        spellNAME = list[i].querySelectorAll("div.spellName")[0]; //Spell Text???
        spellDESCRIPTION = list[i].querySelectorAll("div.spellDescription")[0];
        spellFLAVOR = list[i].querySelectorAll("div.spellFlavorText")[0];
            if (spellNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellDESCRIPTION.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellFLAVOR.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellMETHOD.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                list[i].style.display = "";
                continue;
            } else {
                list[i].style.display = "none";
                continue;
            }
        }

    }
}

