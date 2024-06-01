import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.3/+esm';

const doBuatJanji = () => {
    const name = document.querySelector('#name').value;
    const konselor = document.querySelector('#konselor').value;
    const jamJanji = document.querySelector('#jam-janji').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://asia-southeast2-global-student-401904.cloudfunctions.net/insert_reservasi", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            name,
            konselor,
            jam_janji: jamJanji
        })
    })        
    .then((res) => res.json())
    .then((res) => {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Reservasi',
            text: "Reservasi berhasil dilakukan",
        }).then(() => {
            // Redirect to the dashboard page
            window.location.href = "../fitur/datares.html";
        });
    })
    .catch((error) => console.log("error", error))
}

window.doBuatJanji = doBuatJanji;