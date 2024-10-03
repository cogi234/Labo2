const Tests = {
    "?op=+&x=-111&y=-244" : '{"op":" ","x":"-111","y":"-244","value":-355}',
    "?op=-&x=1&y=abc" : '{"op":"-","x":"1","y":"abc","error":"\'y\' parameter is not a number"}',
    "?op=p&n=a" : '{"n":"a","op":"p","error":"\'n\' parameter must be an integer > 0"}',
    "?op=-&x=111&y=244" : '{"op":"-","x":"111","y":"244","value":-133}',
    "?op=*&x=11.56&y=244.12345" : '{"op":"*","x":"11.56","y":"244.12345","value":2822.067082}',
    "?op=/&x=99&y=11.06" : '{"op":"/","x":"99","y":"11.06","value":8.95117540687161}',
    "?op=/&x=99&y=0" : '{"op":"/","x":"99","y":"0","value":"infinity"}',
    "?op=/&x=0&y=0" : '{"op":"/","x":"0","y":"0","value":"NaN"}',
    "?op=%&x=5&y=5" : '{"op":"%","x":"5","y":"5","value":0}',
    "?op=%&x=100&y=13" : '{"op":"%","x":"100","y":"13","value":9}',
    "?op=%&x=100&y=0" : '{"op":"%","x":"100","y":"0","value":"NaN"}',
    "?n=0&op=!" : '{"n":"0","op":"!","error":"\'n\' parameter must be an integer > 0"}',
    "?n=0&op=p" : '{"n":"0","op":"p","error":"\'n\' parameter must be an integer > 0"}',
    "?n=1&op=p" : '{"n":"1","op":"p","value":false}',
    "?n=2&op=p" : '{"n":"2","op":"p","value":true}',
    "?n=5&op=p" : '{"n":"5","op":"p","value":true}',
    "?n=6&op=p" : '{"n":"6","op":"p","value":false}',
    "?n=6.5&op=p" : '{"n":"6.5","op":"p","error":"\'n\' parameter must be an integer > 0"}',
    "?n=113&op=p" : '{"n":"113","op":"p","value":true}',
    "?n=114&op=p" : '{"n":"114","op":"p","value":false}',
    "?n=1&op=np" : '{"n":"1","op":"np","value":2}',
    "?n=30&op=np" : '{"n":"30","op":"np","value":113}',
    "?X=111&op=+&y=244" : '{"X":"111","op":" ","y":"244","error":"\'x\' parameter is missing"}',
    "?Y=244&op=+&x=111" : '{"Y":"244","op":" ","x":"111","error":"\'y\' parameter is missing"}',
    "?op=+&x=111&y=244&z=0" : '{"op":" ","x":"111","y":"244","z":"0","error":"too many parameters"}',
    "?n=5&op=!&z=0" : '{"n":"5","op":"!","z":"0","error":"too many parameters"}',
    "?n=5.5&op=!" : '{"n":"5.5","op":"!","error":"\'n\' parameter must be an integer > 0"}',
    "?z=0" : '{"z":"0","error":"\'op\' parameter is missing"}',
    "?n=-5&op=!" : '{"n":"-5","op":"!","error":"\'n\' parameter must be an integer > 0"}',
    "?x=null" : '{"x":"null","error":"\'op\' parameter is missing"}',
};

InitUI();
function InitUI() {
    $('#confirmButton').on("click", async function () {
        StartTests();
    });
}

async function StartTests(){
    successfulTests = 0;
    $('#results').empty();
    $('#verdict').empty();
    for (const [query,value] of Object.entries(Tests))
    {
        result = await API_GetMaths(query);
        if (result == value)
        {
            $('#results').append(`OK ---> <span> "${result}" </span><hr>`);
            successfulTests += 1;
        }
        else{
            $('#results').append(`NO ---> <span> "${result}" </span><br><span>Expected ${value}</span><hr>`);
        }
    }
    console.log(successfulTests);
    console.log(Object.entries(Tests).length);
    if(successfulTests == Object.entries(Tests).length)
    {
        $('#verdict').append('Aucun problème détecté');
    }
    else{
        $('#verdict').append('problème détecté');
    }
}