function addInput(){
  const htmlInputCurrentPage = '<input type="hidden" id="current_page" />';
  const htmlInputShowPerPage = '<input type="hidden" id="show_per_page" />';
  const htmlPagination = "<div id='page_navigation'></div>";
  $('.chContent-Body-Page-RecentOrders-Wrapper').prepend(htmlInputCurrentPage+htmlInputShowPerPage);
  $('.chContent-Body-Page-General').append(htmlPagination);
}

$( document ).ready(function() {
  addInput();
  $('#results-count').html(function(i, v){
    return v.replace(/(\d)/g, '<span class="number">$1</span>');
  }); 
});

if(document.getElementsByName('ch-order-search')[0]) {
  document.getElementsByName('ch-order-search')[0].placeholder='Search your product or your order';
}

//how much items per page to show
var show_per_page = 8; 
//getting the amount of elements inside pagingBox div
var number_of_items = $('.chContent-Body-Page-RecentOrders-Wrapper-Item').length;
//calculate the number of pages we are going to have
var number_of_pages = Math.ceil(number_of_items/show_per_page);


$(document).ready(function () {
  //set the value of our hidden input fields
  $('#current_page').val(0);
  $('#show_per_page').val(show_per_page);

  //now when we got all we need for the navigation let's make it '
	paginationUpdate();

  var previousSearch = $('#main').find('#cho-search').val();
  if ( $('#main').find('#cho-search').length ) {
    var searchInterval = setInterval(function(){
      if ( $('#main').find('#cho-search').val() != '' ) {
        $('#page_navigation').hide();
      } else {
        if ( $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').length ) {
          $('#page_navigation').css('display', 'flex');
        }
        if ( previousSearch != '' ) {
          var show_per_page = $('#show_per_page').val();
          //add active_page class to the first page link
          $('#page_navigation .page_link').removeClass('active_page');
          $('#page_navigation .page_link:first').addClass('active_page');
          //hide all the elements inside pagingBox div
          $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').css('display', 'none');
          //and show the first n (show_per_page) elements
          $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').slice(0, show_per_page).css('display', 'flex');
        }
      }
      previousSearch = $('#main').find('#cho-search').val();
    },100);
  }

});

//Pagination JS
function paginationUpdate() {
  /* 
  what are we going to have in the navigation?
    - link to previous page
    - links to specific pages
    - link to next page
  */
  var navigation_html = '<div class="previous_link disable">Prev</div>';
  var current_link = 0;
  while(number_of_pages > current_link){
    navigation_html += '<div class="page_link" data-link="' + current_link +'" longdesc="' + current_link +'">'+ (current_link + 1) +'</div>';
    current_link++;
  }

  navigation_html += '<div class="next_link">Next</div>';
  $('#page_navigation').html(navigation_html);
  if ( $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').length ) {
    $('#page_navigation').css('display', 'flex');
  }

  //add active_page class to the first page link
  $('#page_navigation .page_link:first').addClass('active_page');
  //hide all the elements inside pagingBox div
  $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').css('display', 'none');
  //and show the first n (show_per_page) elements
  $('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').slice(0, show_per_page).css('display', 'flex');
}

function pageCalculate() {
  number_of_items = $('.chContent-Body-Page-RecentOrders-Wrapper-Item').length;
  number_of_pages = Math.ceil(number_of_items/show_per_page);
}

function previous(){
  var new_page = parseInt($('#current_page').val()) - 1;
	//if there is an item before the current active link run the function
	if($('.active_page').prev('.page_link').length==true){
		go_to_page(new_page);
	}
}

function next(){
	var new_page = parseInt($('#current_page').val()) + 1;
	//if there is an item after the current active link run the function
	if($('.active_page').next('.page_link').length==true){
		go_to_page(new_page);
	}
}
function go_to_page(page_num){
  $("html, body").animate({ scrollTop: 0 }, "fast");
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page').val());
	
	//get the element number where to start the slice from
	var start_from = page_num * show_per_page;
	
	//get the element number where to end the slice
	var end_on = start_from + show_per_page;

	//hide all children elements of pagingBox div, get specific items and show them
	$('.chContent-Body-Page-RecentOrders-Wrapper').children('.chContent-Body-Page-RecentOrders-Wrapper-Item').css('display', 'none').slice(start_from, end_on).css('display', 'flex');
	
	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
	
	//update the current page input field
	$('#current_page').val(page_num);

  if(page_num == parseInt(number_of_pages - 1)) {
    $('.previous_link').removeClass('disable');
    $('.next_link').addClass('disable');
  } else if(page_num == 0) {
    $('.next_link').removeClass('disable');
    $('.previous_link').addClass('disable');
  }

}

 $( document ).on('click', '.previous_link', function() {
   previous();
 });

 $( document ).on('click', '.next_link', function() {
   next();
 });

 $( document ).on('click', '.page_link', function() {
   var currentPageData = $(this).attr('data-link');
   go_to_page(currentPageData);
 });

$(document).ready(function() {  
});
