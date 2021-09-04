$( document ).ready(function() {
    let endpoint = "https://jsonplaceholder.typicode.com/todos"
    const table = $("#table tbody");

    $.ajax({
        url: endpoint,
        contentType: "application/json",
        dataType: 'json',
        type:  'get',
        success: function(result){

            for(let data of result){    
                const row = `<tr>
                                <td>${data.id}</td>
                                <td>${data.userId}</td>
                                <td>${data.title}</td>
                                <td>${data.completed}</td>
                            </tr>`;
                table.append(row);
            }
            // Hay que ponerlo aqui, porque el llenado de la tabla lo hace de manera asincrona
           
            for(let td of $('td')){
                if(td.textContent === "false")
                    td.style.color = "red";
    
                if(td.textContent === "true")
                    td.style.color = "green";
            }

            $('tr:contains(true)').addClass('alt');
            console.log(result);
            console.log(Object.keys(result).length);
        }
    });

    

}); 