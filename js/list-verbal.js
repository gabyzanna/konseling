import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.3/+esm';

document.addEventListener('DOMContentLoaded', async (e) => {
    try {
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const resFetch = await fetch('https://asia-southeast2-global-student-401904.cloudfunctions.net/read-verbal', {
            method:'GET',
            headers: myHeaders,
        })
        const result = await resFetch.json();
        
        const listReservasiEl = document.querySelector('#list-reservasi')
        result.data.forEach((verbal, index) => {
            const trEl = document.createElement('tr');
            trEl.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td class="name-item">${verbal.name}</td>
            <td class="kepribadian-item">${verbal.kepribadian}</td>
            <td class="score-item">${verbal.score}</td>
            <td data-item-id="${verbal._id}"><button class="btn btn-primary mr-2 edit-item">Edit</button><button class="btn btn-secondary del-item">Delete</button></td>
            `
            listReservasiEl.appendChild(trEl);
        });
        
        setupBtnDelete();
        setupBtEdit();
    } catch (error) {
        console.error(error);
    }
    
})


const setupBtnDelete = () => {
    document.querySelectorAll('.del-item').forEach((node) => {
        node.addEventListener('click', async (e) => {
            try {
                const id = e.target.parentElement.getAttribute('data-item-id');
           
                console.log('Idnya:', id);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
            
                const resFetch = await fetch("https://asia-southeast2-global-student-401904.cloudfunctions.net/delete_verbal", {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id,
                    })
                }) 
                const result = await resFetch.json();
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
               
          
        })
    })
}

const setupBtEdit = () => {
    document.querySelectorAll('.edit-item').forEach((node) => {
        node.addEventListener('click', async (e) => {
            try {
                const id = e.target.parentElement.getAttribute('data-item-id');
           
                const { value: formValues } = await Swal.fire({
                    title: "Edit Data",
                    html: `
                    <div>
                        <label for="swal-input1">Name</label>
                      <input id="swal-input1" class="swal2-input">
                    </div>
                    <div>
                        <label for="swal-input2">Karakter</label>
                        <input id="swal-input2" class="swal2-input">
                    </div>
                    <div>
                        <label for="swal-input3">Score</label>
                      <input id="swal-input3" class="swal2-input">
                    </div>
                      
                    `,
                    focusConfirm: false,
                    preConfirm: () => {
                      return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value,
                        document.getElementById("swal-input3").value,
                      ];
                    }
                  });
                console.log('Idnya:', id);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
            
                const resFetch = await fetch("https://asia-southeast2-global-student-401904.cloudfunctions.net/edit-verbal", {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id,
                        name: formValues[0],
                        kepribadian : formValues[1],
                        score: formValues[2]
                    })
                })
                const result = await resFetch.json();
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
               
          
        })
    })
}