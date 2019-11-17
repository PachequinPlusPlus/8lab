function main(){
    update();

    $("#sbU").on("click", function(e) {
        ti = $("#title2").val();
        cn = $("#content2").val();
        auth = $("#author2").val();
        dt = $("#publishDate2").val();
        _id = $("#id2").val();
        let body = {
            "title" : ti,
            "content" : cn,
            "author" : auth,
            "publishDate" : dt,
            "id" : _id
        }
        e.preventDefault();
        $.ajax({
            url : "/blog-posts/" + _id,
            type : "PUT",
            contentType : "application/json",
            data : JSON.stringify(body),
            success : (json) => {
                update();
            },
            error : (err) => {
                $("h1").html(`${err.statusText}`);
            }

        });
    });


    $("#sb").on("click", function(e) {
        ti = $("#title").val();
        cn = $("#content").val();
        auth = $("#author").val();
        dt = $("#publishDate").val();
        let body = {
            "title" : ti,
            "content" : cn,
            "author" : auth,
            "publishDate" : dt
        }
        e.preventDefault();
        $.ajax({
            url : "/blog-posts",
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(body),
            success : (json) => {
                update();
            },
            error : (err) => {
                $("h1").html(`${err.statusText}`);
            }

        });
    });

    $("#sbD").on("click", function(e) {
        dt = $("#id").val();
        e.preventDefault();
        $.ajax({
            url : "/blog-posts/" + dt,
            type : "DELETE",
            contentType : "application/json",
            success : (json) => {
                update();
            },
            error : (err) => {
                $("h1").html(`${err.statusText}`);
            }

        });
    });
}


function update(){
    var obj = {};
    $("#Post").html("");
    $.ajax({
        url: "/blog-posts",
        type : "GET",
        contentType : "application/json",
        data : JSON.stringify(obj),
        success : (json) =>{
            json.forEach((item)=>{
                $("#Post").append(`<h2>title:${item.title}</h2>`);
                $("#Post").append(`<h2>content:${item.content}</h2>`);
                $("#Post").append(`<h2>author:${item.author}</h2>`);
                $("#Post").append(`<h2>publishDate:${item.publishDate}</h2>`);
                $("#Post").append(`<h2>id:${item.id}</h2>`);
            });
        },
        error : (err) =>{
            $("h1").html(`${err.statusText}`);
        },
    });
}


main();
