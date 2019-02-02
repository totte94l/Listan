/* 
Kända Buggar!

 - Om ett namn finns flera gånger och man väljer att ta bort en av dem så tas alla bort med det namnet. 
*/

$(function() {

    // Arrayen som alla list-items hamnar i
    var listArray = new Array;

    // Ganska tydlig tbh
    var allowDuplicates = false;

    let input = $("#inpName");
    let list = $("#list");
    var sortList = $("#sortSelect");


    function addItem(item) {
        let exists = false;

        if ( item == "" ) {
            alert("Fältet får inte vara tomt!", "error");
            console.log("Error! Input can't be empty!");
           
        } else {
            if ( allowDuplicates ) {
                listArray.push(item);
                console.log(`"${item}" was added to the list`);
            } else {
                if ( listArray.length > 0 ) {
                    // Listan innehåller värden
                    
                    for(let i = 0; listArray.length > i; i++) {
                        if( listArray[i] == item ) {
                            exists = true;
                        } else {
                            // Namnet finns inte, går vidare!
                        }
                    }
                    
                    if( exists ) {
                        alert(`<span><strong>${item}</strong> finns redan i listan, tillåt dubbletter för att lägga till endå!</span>`, 'error');
                    } else { 
                        listArray.push(item);
                        console.log(`"${item}" was added to the list`);
                    }
        
                } else {
                   // Listan är tom, lägger till namnet då vi vet att det inte existerar sen tidigare
                   listArray.push(item);
                   console.log(`"${item}" was added to the list`);
                }
            }
            updateList();
        }
       
    }


    function updateList() {
        // Rensar listan först och främst
        list.html("");

        listArray.forEach(item => {
            list.append(`<li class="list-item"><span>${item}</span><i class="fas fa-user-minus"></i></li>`)
        });
    }

    // Lägg till-knappen
    $("#inpButton").click(function() {
        addItem(input.val());
    })

    // Ta bort enskild
    $("#container").on("click", '#list > .list-item > i', function() {
        let clicked = $(this).parent().text();

        /* 
        Förstår inte riktigt hur jag löste detta, men det funkar lol
        Nackdelen här är att den tar bort alla objekt i arrayen med samma namn (dubbletter).
        */ 
        listArray = jQuery.grep(listArray, function(value) {
            alert(`<strong>${clicked}</strong> togs bort!`, "info");
            console.log(`"${clicked}" was removed from the list`);
            return value != clicked;
            
          });
         
          updateList();
    });

    // Sortering
    sortList.on("click", "option", function() {
        tempArray = listArray;
        switch ($(this).val()) {
            case 'letters': 
                // Enkel inbyggd sortering efter alfabetet (0-9 a-ö)
                listArray.sort();
                updateList();
                console.log(`Sorting type: ${$(this).val()}`);
                break;
            
            case 'length':
                listArray.sort(function(a, b) {
                    // Byt plats på a och b för att sortera åt andra hållet.
                    return a.length - b.length;
                })
                updateList();
                console.log(`Sorting type: ${$(this).val()}`);
                break;
        }
    });

    // Rensa Listan
    $("#clear").on("click", function() {
        // Kollar om det finns något att rensa, annars körs den inte.
        if( listArray.length > 0 ) {
            let arrayLength = listArray.length;
            // Tömmer arrayen och uppdaterar listan
            listArray = [];
            updateList();
            alert(`<bold>${arrayLength}</bold> objekt togs bort!`, 'info');
            console.log("------------------------------------------------");
            console.log("List cleared");
        } else {

        }
    });

    // För att lägga till saker i listan med Enter. Skickar det som står i inputen.
    $(input).keyup(function(e) {
        if(e.keyCode == 13) {
            addItem(input.val());
            input.val("");
            console.log("User pressed Enter");
        }    
    })

    // För att sätta på eller stänga av dubletter
    $("#allow-duplicates").on("change", function() {
        if ( $("#allow-duplicates").is(":checked") ) {
            allowDuplicates = true;
            console.log(`Duplicates allowed: ${allowDuplicates}`);
        } else {
            allowDuplicates = false;
            console.log(`Duplicates allowed: ${allowDuplicates}`);
        }
    })

    // Alert
    function alert(message, type) {
        switch( type ) {
            case 'info':
                $("#alert").css("background", "rgb(120, 166, 250)", "color", "white");
                $("#alert > .header").html("Information");
                break;

            case 'error':
                $("#alert").css("background", "rgb(255, 160, 160)", "color", "#333");
                $("#alert > .header").html("Fel");
                break;

        }
        $("#alert > .message").html(message);
        $("#alert").fadeIn(500, function() {
            $("#alert").delay(2000).fadeOut(1000);
        });
    }
})