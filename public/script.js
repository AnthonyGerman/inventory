function myFunction() {
    // Declare variables
  var input, filter, table, tr, td, i, txtValue, selector, y, count, x;
  input = document.querySelector('input');
  filter = input.value.toUpperCase();
  localStorage.setItem('search', filter);
  table = document.querySelector('table');
  tr = table.getElementsByTagName("tr");
  x = 0;
  selector = document.querySelector('select');
  count = document.querySelector('p');
  if (selector.value == 'Room') y = 0;
  else if (selector.value == 'Container') y = 1;
  else if (selector.value == 'Content') y = 2;
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[y];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        x += 1;
      } else {
        tr[i].style.display = "none";
      }
    }
    count.textContent = x + ' Items';
  }
}

function myOtherFunction() {
  input = document.querySelector('input');
  input.value = localStorage.getItem('search');
  myFunction();
}