let user_name = 'Soumajit'
const title_container = document.getElementById('')

let title = "Meet Soumojit Barui"
const title_text_element = document.getElementById('title_text')
title_text_element.textContent = title

const name_field = document.getElementById("author_name");
name_field.textContent = `Made by ${'pinaka'}`





// Get the current date
const currentDate = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);
const dateContainer = document.getElementById('date_text');
dateContainer.textContent = formattedDate;

const currentYear = new Date().getFullYear();
document.getElementById('copy_yr').textContent = currentYear;


const form = document.getElementById('form');
const result = document.getElementById('dips');


function reloadPageAfterOneSecond() {
    setTimeout(function() {
        location.reload();
    }, 1000); // 1000 milliseconds = 1 second
}

// Call the function to execute it



form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = 'Message sent Sucessfully!!';
                reloadPageAfterOneSecond();
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});