function API_GetMaths(query) {
    let API_URL = document.getElementById("linkAPI").value;
    console.log(API_URL + "/" + query);
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "/" + query,
            success: result => { resolve(JSON.stringify(result)); },
            error: () => { resolve(null); }
        });
    });
}