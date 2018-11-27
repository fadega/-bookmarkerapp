// listen to submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
  // console.log("Submit clicked");
  var siteName=document.getElementById('siteName').value;
  var siteUrl=document.getElementById('siteUrl').value;

if(!validateForm(siteName,siteUrl)){
  return false;
}

//object
  var bookmark={
    name:siteName,
    url:siteUrl
  }
  //Local storage : stores only strings
  // localStorage.setItem('test','Helloworld');
  //get an item from localStorage
  // console.log(localStorage.getItem('test'));
  // remove item from localStorage
  //localStorage.removeItem('test');

  if(localStorage.getItem("bookmarks") === null){
    //init array
    var bookmarks=[];
    //Add to array
    bookmarks.push(bookmark);
    //set it to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }else{
    // get bookmarks from localStorage
    var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }
  //clear form
  document.getElementById('myForm').reset();

  //to automatically add the bookmark without reload
  fetchBookmarks();
//prevent form from submitting
  e.preventDefault();

}

function deleteBookmark(url){
  //first get booksmarks
  var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks if you find a match for the paramater
  for(var i=0; i<bookmarks.length;i++){
    if(bookmarks[i].url===url){
      //remove from array
      bookmarks.splice(i,1);
    }
  }
  //re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 // re-fetch to avoid reload to see the changes
 fetchBookmarks();


}
//Fetch bookmarks
function fetchBookmarks(){
  //Get bookmarks from localStorage
    var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
    //put results back on html
    var bookmarksResults = document.getElementById('bookmarksResults');
    //build output
    bookmarksResults.innerHTML='';
    for(var i=0; i<bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url=bookmarks[i].url;
      bookmarksResults.innerHTML+='<div class="card card-body bg-light">'+
                                  '<h3>'+name+
                                  '<a class="btn btn-lg  btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-lg btn-danger"  href="#">Delete</a>'
                                  '</h3>'+
                                  '</div>';

    }
}


function validateForm(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert("Please fill in the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert('Please Insert a valid URL');
    return false;
  }

  return true;
}
