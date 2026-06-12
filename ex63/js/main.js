window.addEventListener('DOMContentLoaded', () => {
    const day = document.getElementById('birthDay');
    const month = document.getElementById('birthMonth');
    const year = document.getElementById('birthYear');

    for (let i = 1; i <= 31; i++) {
        let v = i < 10 ? '0' + i : i;
        day.add(new Option(v, v));
    }
    for (let i = 1; i <= 12; i++) {
        let v = i < 10 ? '0' + i : i;
        month.add(new Option(v, v));
    }
    for (let i = 1950; i <= 2026; i++) {
        let opt = new Option(i, i);
        if (i === 1970) opt.selected = true;
        year.add(opt);
    }

    applyHoverEvents();
});

document.myform.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.myform.name.value;
    const email = document.myform.email.value;

    if (name === "") { alert("Name cannot be left blank!"); return; }
    if (email === "") { alert("Email cannot be left blank!"); return; }

    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    const birthday = document.getElementById('birthDay').value + '/' + 
                     document.getElementById('birthMonth').value + '/' + 
                     document.getElementById('birthYear').value;

    let hobbies = [];
    document.querySelectorAll('input[name="favorite"]:checked').forEach(cb => {
        hobbies.push(cb.value);
    });
    let hobbiesText = hobbies.join(', ');

    const color = document.querySelector('input[name="favColor"]:checked').value;

    document.getElementById('memberBody').innerHTML += 
        '<tr>' +
            '<td>' + name + '</td>' +
            '<td>' + email + '</td>' +
            '<td>' + gender + '</td>' +
            '<td>' + birthday + '</td>' +
            '<td>' + hobbiesText + '</td>' +
            '<td>' + color + '</td>' +
        '</tr>';

    applyHoverEvents();
});

document.getElementById('btnNext').addEventListener('click', () => {
    document.myform.reset();
    document.myform.name.focus();
});

function applyHoverEvents() {
    document.querySelectorAll('#memberBody tr').forEach(row => {
        row.onmouseover = () => row.style.backgroundColor = 'yellow';
        row.onmouseout = () => row.style.backgroundColor = 'white';
    });
}