function load_employees_data() 
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            xmlDocToanCuc = this.responseXML;
            droplist();
        }
    };
    xhr.open("GET","datasets/employees.xml",true);
    xhr.send();
}


function droplist() 
{
    var employee_tags = xmlDocToanCuc.getElementsByTagName("employee");
    var selectBox = document.getElementById("titleSelect");
    var mang_chuc_danh = [];

    for (var i = 0; i < employee_tags.length; i++) 
    {
        var title_value = employee_tags[i].getAttribute("title");
        if (mang_chuc_danh.indexOf(title_value) === -1) 
        {
            mang_chuc_danh.push(title_value);
        }
    }

    for (var j = 0; j < mang_chuc_danh.length; j++) 
    {
        var option = document.createElement("option");
        option.value = mang_chuc_danh[j];
        option.innerHTML = mang_chuc_danh[j];
        selectBox.appendChild(option);
    }

    if (mang_chuc_danh.length > 0) 
    {
        loc_nhan_vien_theo_title(mang_chuc_danh[0]);
    }
}

function loc_nhan_vien_theo_title(chuc_danh_can_loc) 
{
    var body_employee = document.getElementById("bodybox");
    body_employee.innerHTML = ""; 

    var employee_tags = xmlDocToanCuc.getElementsByTagName("employee");

    for (var i = 0; i < employee_tags.length; i++) 
    {
        var employee_tag = employee_tags[i];
        var student_title = employee_tag.getAttribute("title");


        if (student_title === chuc_danh_can_loc) 
        {
            var student_id = employee_tag.getAttribute("id");
            var name_tag = employee_tag.getElementsByTagName("name")[0];
            var phone_tag = employee_tag.getElementsByTagName("phone")[0];

            var student_name = name_tag.childNodes[0].nodeValue;
            var student_phone = phone_tag.childNodes[0].nodeValue;

            var tr = document.createElement("tr");
            var td_id = document.createElement("td");
            var td_name = document.createElement("td");
            var td_phone = document.createElement("td");

            td_id.innerHTML = student_id;
            td_name.innerHTML = student_name;
            td_phone.innerHTML = student_phone;

            tr.appendChild(td_id);
            tr.appendChild(td_name);
            tr.appendChild(td_phone);

            body_employee.appendChild(tr);
        }
    }
}