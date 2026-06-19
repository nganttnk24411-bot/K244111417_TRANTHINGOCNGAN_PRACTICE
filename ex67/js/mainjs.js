var huong_sap_xep = { id: true, name: true, birthday: true, gender: true };

function load_students_from_xml(dataset, body_student)
{
    body_student.innerHTML = "";

    var parser = new DOMParser(); 
    var xmlDoc = parser.parseFromString(dataset, "text/xml"); 
    //load an array of student XML tag: 
    var student_tags = xmlDoc.getElementsByTagName("student");
    
    for(i = 0; i < student_tags.length; i++)
    {
        //get tag at i position
        //XML DOM 
        student_tag = student_tags[i];
        id_tag = student_tag.getElementsByTagName("id")[0];
        name_tag = student_tag.getElementsByTagName("name")[0];
        birthday_tag = student_tag.getElementsByTagName("birthday")[0];
        gender_tag = student_tag.getElementsByTagName("gender")[0];
        
        student_id = id_tag.childNodes[0].nodeValue;
        student_name = name_tag.childNodes[0].nodeValue;
        student_birthday = birthday_tag.childNodes[0].nodeValue;
        student_gender = gender_tag.childNodes[0].nodeValue;
        
        //HTML DOM
        tr = document.createElement("tr");
        td_id = document.createElement("td");
        td_name = document.createElement("td");
        td_birthday = document.createElement("td");
        td_gender = document.createElement("td");
        
        td_id.innerHTML = student_id;
        td_name.innerHTML = student_name;
        td_birthday.innerHTML = student_birthday;
        td_gender.innerHTML = student_gender;
        
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_birthday);
        tr.appendChild(td_gender);
        
        tr.setAttribute("onclick", "hien_thi_chi_tiet_sinh_vien('" + student_id + "', '" + student_name + "', '" + student_birthday + "', '" + student_gender + "')");
        
        body_student.appendChild(tr);
    }
}

function hien_thi_chi_tiet_sinh_vien(id, name, birthday, gender) 
{
    document.getElementById("dt_id").innerHTML = id;
    document.getElementById("dt_name").innerHTML = name;
    document.getElementById("dt_birthday").innerHTML = birthday;
    document.getElementById("dt_gender").innerHTML = gender;
    document.getElementById("in4Detail").style.display = "table";
}

function sort_students(cot_sap_xep, dataset, body_student) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(dataset, "text/xml");
    var student_tags = xmlDoc.getElementsByTagName("student");
    var danh_sach_tags = Array.from(student_tags);
    
    var la_tang_dan = huong_sap_xep[cot_sap_xep];
    
    danh_sach_tags.sort(function(tag_a, tag_b) 
    {
        var val_a = tag_a.getElementsByTagName(cot_sap_xep)[0].childNodes[0].nodeValue.toLowerCase();
        var val_b = tag_b.getElementsByTagName(cot_sap_xep)[0].childNodes[0].nodeValue.toLowerCase();
        
        if (cot_sap_xep === 'id') 
        {
            return la_tang_dan ? (parseInt(val_a) - parseInt(val_b)) : (parseInt(val_b) - parseInt(val_a));
        }
        if (val_a < val_b) return la_tang_dan ? -1 : 1;
        if (val_a > val_b) return la_tang_dan ? 1 : -1;
        return 0;
    });
    
    huong_sap_xep[cot_sap_xep] = !la_tang_dan;
    
    var chuoi_xml_moi = "<students>";
    for (var j = 0; j < danh_sach_tags.length; j++) 
    {
        chuoi_xml_moi += danh_sach_tags[j].outerHTML;
    }
    chuoi_xml_moi += "</students>";
    
    students = chuoi_xml_moi;
    
    load_students_from_xml(chuoi_xml_moi, body_student);
}