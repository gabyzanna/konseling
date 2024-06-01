import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.3/+esm';

const doBuatJanji = () => {
    const name = document.querySelector('#name').value;
    const scoRe = document.querySelector('#score').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://asia-southeast2-global-student-401904.cloudfunctions.net/insert_aritmatika", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            name,
            score: scoRe
        })
    })        
    .then((res) => res.json())
    .then((res) => {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Tambah Data',
            text: "Data berhasil ditambahkan",
        }).then(() => {
            // Redirect to the dashboard page
            window.location.href = "../fitur/psikotesaritmatika.html";
        });
    })
    .catch((error) => console.log("error", error))
}

window.doBuatJanji = doBuatJanji;