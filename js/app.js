    // JQuery
    $(document).ready(function() {
        let item, title, author, publisher, bookLink, bookImg;
        let outputList = document.getElementById("list-output");
        // get API from Google Books
        let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
        // if book is not found
        let placeholder = '< img src = "https://www.mybookadda.net/wp-content/uploads/2018/04/NotAvailable.jpg" > ';
        //https://www.mybookadda.net/wp-content/uploads/2018/04/NotAvailable.jpg
        let searchData;

        // Add Eventlistner on Search button

        $("#search").click(function() {
            //output this inside the HTML
            outputList.innerHTML = ""; //empty HTML output
            document.body.style.backgroundImage = "url('')";
            searchData = $("#search-box").val();
            //handeling empty search input field
            if (searchData === "" || searchData === null) {
                displayError();
            } else {
                //handle submition with AJAX
                $.ajax({
                    url: bookUrl + searchData,
                    dataType: 'json',
                    success: function(response) {
                        if (response.totalItem === 0) {
                            alert("no results.... Please try again")
                        } else {
                            $("title").animate({ "margin-top": "5px" }, 1000); //search box animation
                            $(".book-list").css("visibility", "visible");
                            displayResult(response);
                            console.log(response)
                        }
                    },
                    error: function() {
                        alert("Something went wrong...")
                    }
                });
            }
            // clear searchbox value
            $("#search-box").val("");
        });
        // Function display result in index.html
        function displayResult(response) {
            for (var i = 0; i < response.items.length; i++) {
                let item1 = response.items[i]
                title = item1.volumeInfo.title;
                author = item1.volumeInfo.authors;
                publisher = item1.volumeInfo.publisher;
                bookIsbn = item1.volumeInfo.industryIdentifiers[1].identifier;
                bookImg = (item1.volumeInfo.imageLinks) ? item1.volumeInfo.imageLinks.thumbnail : placeholder;

                let item2 = response.items[i += 2]
                title2 = item2.volumeInfo.title;
                author2 = item2.volumeInfo.authors;
                publisher2 = item2.volumeInfo.publisher;
                bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
                bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeholder;



                //output list
                outputList.innerHTML += '<div class="row mt-4" >' + formatOutput(title, author, publisher, bookImg, bookIsbn) + formatOutput(title2, author2, publisher2, bookImg2, bookIsbn2) + '<div>'
                console.log(outputList)
            }
        }
        // template for bootstrap card
        function formatOutput(title, author, publisher, bookImg, bookIsbn) {
            let viewerUrl = `book.html?isbn=${bookIsbn}`;
            let htmlCard =
                //     `<h5 class="card-title">${title}</h5>   <p class="car-text">${author}</p><p class="car-text">${publisher}</p>
                // <img src="${bookImg}" alt="..">
                // `

                `            
                <div class="col-lg-6">
                    <div class="row no-gutters">
                        <div class="col-md-5 mx-auto">
                            <img src="${bookImg}" class="card-img" alt="..">
                        </div>
                        <div class="col-md-8 mx-auto">
                            <div class="card-body text-center">
                                <h5 class="card-title">${title}</h5>
                                <p class="car-text">${author}</p>
                                <p class="car-text">${publisher}</p>
                                <a target="_blank" href="${viewerUrl}" class="btn btn-secondary">Read</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            return htmlCard;
        }
        //handle errors
        function displayError() {
            alert("Please enter what you would like to search")
        }
    });