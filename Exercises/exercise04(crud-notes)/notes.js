$( document ).ready(function() {
    let id;         // Para el usuario que vaya eliminar o actualizar
    let endpoint = "http://localhost:3000/notes";

    const table = $("#table tbody");        // Mi table en html 
    const btnAddNote = $("#btn-add-note");  // Mi boton addNote

    // ADD NOTE
    btnAddNote.click(function(){
        const inputTitle = $("#input-title");
        const inputContent = $("#input-content");
        const btnSubmit = $("#btnSubmit");

        $("#addNote").css("display","inline");
        $("#btn-add-note").css("display","none");

        btnSubmit.click(function(){
            let data = {                    //  Objeto a convertir JSON
                title: inputTitle.val(),    //  Objeto a agregar 
                content: inputContent.val()
            };
            
            btnSubmit.unbind('click');      // Lo puse porque insertaba dos veces
            postData(data);
        });
    });

    // GET
    getNotes(); // Arranca con esto
    function getNotes(){

       clearTable();

        $.ajax({
            url: endpoint,
            contentType: "application/json",
            dataType: 'json',
            type:  'get',
            success: function(result){
                 // Hay que ponerlo aqui, porque el llenado de la tabla lo hace de manera asincrona
                fillTable(result);    // Inserta los datos en el html
                setListeners(); // Aplica listeners a los botones de delete y update
               
                console.log(result);
                console.log(Object.keys(result).length);
            }
        });
    }
    
    // LISTENERS FOR BUTTONS DELETE & UPDATE
    function setListeners(){
        // Son clases porque se iban a repetir muchas veces los mismos botones
        $(".btnDelete").click(function(){   
            let row = $(this).closest('tr');        // Tomar el renglon actual
            id = row.find("td:eq(0)").text();       // Yo se que el primer elemento es el id
            console.log(id);
            deleteNote();                           // Realiza la peticion
        });

        // Este es el de la tabla
        $(".btnUpdate").click(function(){ 
            let inputTitleUpd = $("#input-title-update");
            let inputContentUpd = $("#input-content-update");
            
            let row = $(this).closest('tr');        // Tomar el renglon actual
            id = row.find("td:eq(0)").text();       // Yo se que el primer elemento es el id
            console.log(id);

            $(".update").css("display","inline");   // Despliega las entradas para el update.

            $("#submit-update").click(function(){
                let data = {                        // Crea el objeto
                    title: inputTitleUpd.val(),
                    content: inputContentUpd.val()
                };      

                updateNote(id, data);               // Realiza la peticion
            });
        });
    }

    // DELETE
    function deleteNote(){
        $.ajax({
            url: `${endpoint}/${id}`,
            type:  'DELETE',
            success: function(result){
                console.log(result);
                getNotes();
                alert("Deleted");
            }
        });
    }

    // POST
    function postData(obj){
        $.ajax({
            url: endpoint,
            contentType: "application/json",
            dataType: 'json',
            type: "POST",
            data: JSON.stringify(obj),
            success: function(result){
                console.log(result);
                getNotes();
            }
        });
    }

    // PUT
    function updateNote(id, newData){
        $.ajax({
            url: `${endpoint}/${id}`,
            contentType: "application/json",
            dataType: 'json',
            type: "PUT",
            data: JSON.stringify(newData),
            success: function(result){
                console.log(result);
                getNotes();
                $(".update").css("display","none");   // Oculta el input de update
            }
        });
    }

    function clearTable(){
        $("#table tbody tr").remove();  // Limpia todos los renglones (para que parezca refrescado automatico)
    }

    function fillTable(data){
        for(let elem of data){    
            const row = `<tr>
                            <td style="display: none">${elem._id}</td>
                            <td>${elem.title}</td>
                            <td>${elem.content}</td>
                            <td>
                                <button class="btnDelete" type="text">Delete</button>
                                <button class="btnUpdate" type="text">Update</button>
                            </td>
                        </tr>`;
            table.append(row);
        }

        $("#addNote").css("display","none");
        $("#btn-add-note").css("display","inline");
    }
}); 