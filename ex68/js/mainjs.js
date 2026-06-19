function loadDoc() 
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            myFunction(this);
        }
    };
    xhr.open("GET","datasets/cd_catalog.xml",true);
    xhr.send();
}

function myFunction(xml) 
{
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<thead><tr><th>Artist</th> <th>Title</th></tr></thead>";
    var x = xmlDoc.getElementsByTagName("CD");
    table += "<tbody>";
    for (i = 0; i<x.length; i++) 
    {
        table += "<tr><td>" +
        x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }

    table += "</tbody>";
    document.getElementById("demo").innerHTML = table;
}