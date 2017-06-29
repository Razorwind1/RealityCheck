/*jslint white: true */
/*jslint devel: true */

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




