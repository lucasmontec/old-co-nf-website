String.prototype.reduceWhiteSpace = function() {
    return this.replace(/\s+/g, ' ');
};

function m2gStr(element, index, array){
    var res = "";

    res += "compile ";
    
    //get the obj
    res += "'"+element.groupId+":"+element.artifactId+":"+element.version+"'";
    
    array[index] = res;
}

function make(array){
    var ret = "";
    for(i=0; i<array.length;i++){
        ret += array[i]+"\n";
    }
    return ret;
}

function convert2Gradle(){
    var f = $("#fromMaven").val();
    var to = $("#toGradle");
    
    //add the dependecy if none
    if(f.indexOf("<dependencies>") == -1){
        f = "<dependencies>\n"+f+"\n</dependencies>"
    }
    
    var results = $.xml2json(f).dependency;
    console.log(results);
    results.forEach(m2gStr);
    
    //set the text
    to.val(make(results));
}

$(function() {
    //Add the convert functionality
    $("#Convert").click(function(){
        convert2Gradle();
    });
});



/*
<dependency>
    <groupId>com.sparkjava</groupId>
    <artifactId>spark-core</artifactId>
    <version>2.3</version>
</dependency>
*/