/*jslint white: true */
/*jslint devel: true */
function getOptions() { //Request the Themes, Feats, Combat Styles, and Spells. Paste them on the Search Database page.
    var themeWrapperElementsArray, themeWrapperHTML, featWrapperElementsArray, featWrapperHTML, styleWrapperElementsArray, styleWrapperHTML, spellWrapperElementsArray, spellWrapperHTML;
    $.get('Spells.html', function(spellPage){ //GET FEATS
        spellWrapperElementsArray = $(spellPage).find('div.spellWrapper');
        for (i=spellWrapperElementsArray.length-1; i>=0; i=i-1) {
            spellWrapperHTML = spellWrapperElementsArray[i].innerHTML;
            $(spellWrapperHTML).insertAfter(".optionsAnchor");
            //alert("spellWrapperElementsArray: "+spellWrapperElementsArray[i].innerHTML);
        }
    })
    $.get('CombatStyles.html', function(stylePage){ //GET FEATS
        styleWrapperElementsArray = $(stylePage).find('div.styleWrapper');
        for (i=styleWrapperElementsArray.length-1; i>=0; i=i-1) {
            styleWrapperHTML = styleWrapperElementsArray[i].innerHTML;
            $(styleWrapperHTML).insertAfter(".optionsAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
    $.get('Feats.html', function(featPage){ //GET FEATS
        featWrapperElementsArray = $(featPage).find('div.featWrapper');
        for (i=featWrapperElementsArray.length-1; i>=0; i=i-1) {
            featWrapperHTML = featWrapperElementsArray[i].innerHTML;
            $(featWrapperHTML).insertAfter(".optionsAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
    $.get('Themes.html', function(themePage){ //GET THEMES
        themeWrapperElementsArray = $(themePage).find('div.themeWrapper');
        for (i=themeWrapperElementsArray.length-1; i>=0; i=i-1) {
            themeWrapperHTML = themeWrapperElementsArray[i].innerHTML;
            $(themeWrapperHTML).insertAfter(".optionsAnchor");
            //alert("themeWrapperHTML: "+themeWrapperHTML);
        }
    })
}
//----SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE, SEARCH DATABASE----//
function mySearch() {
    "use strict";
    //alert("I exsist! Searching...");
    // Declare variables
    var input, inputTextUpCase, a, i, list, featNAME, featCONTENT, featTIER, styleNAME, styleTEXT, spellNAME, spellDESCRIPTION, spellFLAVOR, spellMETHOD, searchTierValue, CombatFeatOrNo, featsSEARCHfor, stylesSEARCHfor, spellsSEARCHfor, searchSchool, spellSCHOOL, searchMethod, searchElement, spellELEMENT, themeNAME, themeCONTENT, themesSEARCHfor, CombatThemeOrNo, displaySearchDatabaseWrapper;
    input = document.getElementById('myInput');
    inputTextUpCase = input.value.toUpperCase();
    list = document.querySelectorAll("div.theme, div.feat, div.combatStyle, div.spellFlexBox");
    
    displaySearchDatabaseWrapper = document.querySelectorAll("div.searchDatabaseWrapper");
    //alert("k: "+k.innerHTML);
    displaySearchDatabaseWrapper[0].style.display = "block";

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        //THEME
        if (typeof list[i].querySelectorAll("div.themeName")[0] !== "undefined") {
        themesSEARCHfor = document.getElementById("searchForThemes").checked; //Searching Themes???
            if (themesSEARCHfor) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        
        CombatThemeOrNo = document.getElementById("CombatThemeOrNo").value; //Combat Theme???
            if (CombatThemeOrNo === "C" && typeof list[i].querySelectorAll("span.nonCombat")[0] !== "undefined") {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            } else if (CombatThemeOrNo === "NC" && typeof list[i].querySelectorAll("span.nonCombat")[0] === "undefined") {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
            
        themeNAME = list[i].querySelectorAll("div.themeName")[0]; //Theme Text???
        themeCONTENT = list[i].querySelectorAll("div.themeContent")[0];
            //alert("themeCONTENT InnerHTML: "+themeCONTENT.innerHTML);
            if (themeNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            themeCONTENT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
                continue;
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        
        }
        //FEAT
        else if (typeof list[i].querySelectorAll("div.featName")[0] !== "undefined") {
        featsSEARCHfor = document.getElementById("searchForFeats").checked; //Searching Feats???
            if (featsSEARCHfor) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        
        searchTierValue = document.getElementById("searchTier").value; //Tier???
        featTIER = list[i].querySelectorAll("div.tier")[0];
            if (featTIER.innerHTML.indexOf(searchTierValue) === 0) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        
        CombatFeatOrNo = document.getElementById("CombatFeatOrNo").value; //Combat Feat???
            if (CombatFeatOrNo === "C" && typeof list[i].querySelectorAll("span.nonCombat")[0] !== "undefined") {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            } else if (CombatFeatOrNo === "NC" && typeof list[i].querySelectorAll("span.nonCombat")[0] === "undefined") {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        featNAME = list[i].querySelectorAll("div.featName")[0]; //Feat Text???
        featCONTENT = list[i].querySelectorAll("div.featContent")[0];
            //alert("Feat content: " + featCONTENT);
            if (featNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            featCONTENT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
                continue;
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        } //SYTLE
        else if (typeof list[i].querySelectorAll("div.styleName")[0] !== "undefined") {
        stylesSEARCHfor = document.getElementById("searchForStyles").checked; //Searching Styles???
            if (stylesSEARCHfor) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        
        styleNAME = list[i].querySelectorAll("div.styleName")[0]; //Style Text???
        styleTEXT = list[i].querySelectorAll("div.styleText")[0];
            if (styleNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            styleTEXT.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
                continue;
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        } //SPELL
        else if (typeof list[i].querySelectorAll("div.spellName")[0] !== "undefined") {
        spellsSEARCHfor = document.getElementById("searchForSpells").checked; //Searching Spells???
            //alert("Spell Search? "+spellsSEARCHfor);
            if (spellsSEARCHfor) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        searchSchool = document.getElementById("searchSchool").value.toUpperCase(); //Spell School???
            //alert("Spell School: "+searchSchool);
        spellSCHOOL = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellSCHOOL.innerHTML.toUpperCase().indexOf(searchSchool) > -1 ) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        searchMethod = document.getElementById("searchMethod").value.toUpperCase(); //Spell Method???
            //alert("Spell School: "+searchSchool);
        spellMETHOD = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellMETHOD.innerHTML.toUpperCase().indexOf(searchMethod) > -1 ) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        searchElement = document.getElementById("searchElement").value.toUpperCase(); //Spell Element???
            //alert("Spell School: "+searchSchool);
        spellELEMENT = list[i].querySelectorAll("div.spellCircles")[0];
            if (spellELEMENT.innerHTML.toUpperCase().indexOf(searchElement) > -1 ) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        spellNAME = list[i].querySelectorAll("div.spellName")[0]; //Spell Text???
        spellDESCRIPTION = list[i].querySelectorAll("div.spellDescription")[0];
        spellFLAVOR = list[i].querySelectorAll("div.spellFlavorText")[0];
            if (spellNAME.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellDESCRIPTION.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellFLAVOR.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1 ||
            spellMETHOD.innerHTML.toUpperCase().indexOf(inputTextUpCase) > -1) {
                $(list[i]).addClass("visibleOption");
                $(list[i]).removeClass("invisibleOption");
                continue;
            } else {
                $(list[i]).addClass("invisibleOption");
                $(list[i]).removeClass("visibleOption");
                continue;
            }
        }

    }
    $( document ).ready( SearchOptionMediaQueries );
}

function SearchOptionMediaQueries() { //uses esquire.js
    //alert("I exsist!Queries");
    
enquire.register("screen and (min-width:1600px)", function() { //for the largest screen size - 3 options accross
            //alert("I exsist!3");
            var optionsList = document.querySelectorAll("div.visibleOption");
            for (i=0; i<optionsList.length; i++) {
                if (i !== 0 && i%3 === 0) {
                    optionsList[i].style.clear = "both";
                } else{
                    optionsList[i].style.clear = "none";
                }
            }
        
    });
enquire.register("screen and (max-width:1600px)", { //for the largest screen size - 2 options accross
        match : function() {
            //alert("I exsist!2");
            var optionsList = document.querySelectorAll("div.visibleOption");
            for (i=0; i<optionsList.length; i++) {
                if (i !== 0 && i%2 === 0) {
                    optionsList[i].style.clear = "both";
                } else{
                    optionsList[i].style.clear = "none";
                }
            }
        }
    });
}

