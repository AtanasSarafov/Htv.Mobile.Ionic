function insertDate() {

    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth();
    var d = n.getDate();
    var months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "SeСептемвриp", "Октомври", "Ноември", "Декември"];
    document.getElementById("schedule-date").innerHTML = "Програма за " + d + " " + months[m] + " " + y;
}
