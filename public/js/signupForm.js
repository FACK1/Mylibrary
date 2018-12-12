const form = document.getElementById('signForm');
const signUp = document.getElementById('signUp');
const submitBtn = document.getElementById('submit');

console.log(signUp);

function showForm()
{
form.style.visibility = "visible";
}

signUp.addEventListener('click', function () {showForm()});
