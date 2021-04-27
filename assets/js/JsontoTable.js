<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<style>
    th{ 
        color:#fff;
            }
</style>


<table class="table table-striped">
    <tr  class="bg-info">
        <th>Name</th>
        <th>Age</th>
        <th>Birthday</th>
    </tr>

    <tbody id="myTable">
        
    </tbody>
</table>

<script>
	var myArray = document.getElementById("data/terkini.json")
	
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById(data)

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].name}</td>
							<td>${data[i].age}</td>
							<td>${data[i].birthdate}</td>
					  </tr>`
			table.innerHTML += row


		}
	}

</script>