
$(document).on('click','.btn_cart_modal', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    console.log(url);
    $.ajax({
       type:'GET',
       url:url,
       data:{},
       success:function(res){
          $('div#product_modal').html(res.html).modal('show');
       }
    });
});

$(document).on('click','.btn_modal', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    console.log(url);
    $.ajax({
       type:'GET',
       url:url,
       data:{},
       success:function(res){
          $('div#product_modal').html(res.html).modal('show');
       }
    });
});

$(document).on('submit','form#cart_form_order', function(e){
	e.preventDefault();

	// let size=$(document).find('button.active').data('quantity');
    let size='';

	// if (size.length==0) {
	// 	toastr.error('Please Select A Size At First');

	// 	return;
	// }

	let url=$(this).attr('action');
	let method=$(this).attr('method');
	let data= $(this).serialize();

	console.log(data);
	$.ajax({
        url: url,
        method: method,
        data: data,
        success: function (res) {
        	if (res.success) {
        	    $('div#product_modal').modal('hide');
                toastr.success(res.msg);
                if (res.html) {
                	$(document).find('div.cart_sidebar').html(res.html);
                }

                if (res.item) {
                	$(document).find('span.rounded-circle').text(res.item);
                	$(document).find('span#cart_number').text(res.item);
                	$(document).find('p#total_amount').text(res.total_amount);
                }
                window.location.href = res.url;
                
            }else{
                toastr.error(res.msg);
            }
        },
        error:function (response){
            $.each(response.responseJSON.errors,function(field_name,error){
                toastr.error(error);
            })
        }
    });
});

$(document).on('submit','form#cart_form', function(e){
	e.preventDefault();

    let actionType = $(this).find('button[type="submit"]:focus').data('type');
    $('#action_type').val(actionType);

	// let size=$(document).find('button.active').data('quantity');
    let size='';
    

	// if (size.length==0) {
	// 	toastr.error('Please Select A Size At First');

	// 	return;
	// }

	let url=$(this).attr('action');
	let method=$(this).attr('method');
	let data= $(this).serialize();

	console.log(data);
	$.ajax({
        url: url,
        method: method,
        data: data,
        success: function (res) {
        	if (res.success) {
        	    $('div#product_modal').modal('hide');
                toastr.success(res.msg);
                window.location.href = res.url; 
                if (actionType === 'order_now') {
                    
                }else{
                    if (res.html) {
                    	$(document).find('div.cart_sidebar').html(res.html);
                    }
    
                    if (res.item) {
                    	$(document).find('span.rounded-circle').text(res.item);
                    	$(document).find('span#cart_number').text(res.item);
                    	$(document).find('p#total_amount').text(res.total_amount);
                    }
                }
                
            }else{
                toastr.error(res.msg);
                $('#alertDanger').removeClass('d-none');
                $('#alertDanger').addClass('d-block');
                $('#alertDanger').html(res.msg);
            }
        },
        error:function (response){
            $.each(response.responseJSON.errors,function(field_name,error){
                toastr.error(error);
            })
        }
    });
});


function AllSliders(){
  $(".product_slider").slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    margin: '10px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(".brand-slider").slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    margin: '10px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },

      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(".product-slider-main").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-slider-nav'
  });
  $(".product-slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slider-main',
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    margin: 20
  });


}

function accordion(){
  $('.accordion-box .accordion-title').click(function(){
    $(this).find('i').toggleClass('fa-plus fa-minus');
    $(this).closest('.accordion-box').find('.accordion-body').stop().slideToggle();
  })
}
function toggle(){
  $('.filter-btn').click(function(){
    $('.sidebar-filter').addClass('open');
    $('.overlay-sidebar').show();
  })
  $('.overlay-sidebar').click(function(){
    $('.sidebar-filter').removeClass('open');
    $('.overlay-sidebar').hide();
  })
  $('.filter_btn_shop').click(function(){
    $('.sidebar-main').addClass('active');
    $('.overlay').show();
  })

}
function navfix(){
    var fixedElement = $('header.header');

    
    $('.icon_cart').click(function(){
      $('.cart_sidebar').addClass('active');
      $('.overlay').show();
    })
    $('.cart_dismiss, .overlay, .sidebar_dismiss').click(function(){
      $('.cart_sidebar').removeClass('active');
      $('.sidebar-main').removeClass('active');
      $('.overlay').hide();
    })
    $('.signin_link').click(function(){
      $('.sign_in').addClass('active');
      $('.overlay').show();
    })
    $('.sign_in_dismiss, .overlay').click(function(){
      $('.sign_in').removeClass('active');
      $('.overlay').hide();
    })
    $('.menu_sidebar .navbar-nav li.has_menu > .nav-link').click(function(e){
        e.preventDefault();
      $(this).parent().find('.inner_menu').slideToggle();
      $(this).parent().toggleClass('active');
    })
    $('.side_menu_toggler').click(function(){
      $('.menu_sidebar').addClass('active');
      $('.overlay').show();
    })
    $('.overlay').click(function(){
      $('.menu_sidebar').removeClass('active');
      $('.overlay').hide();
    })
    
    $('i.fa-close').click(function(){
      $('.menu_sidebar').removeClass('active');
      $('.overlay').hide();
    })
    
    $('.passwordChange .password_visible').click(function(){
      let inputField = $(this).closest('.passwordChange').find('input');
      let ptype = inputField.attr('type');
  
      if (ptype === 'password') {
          inputField.attr('type', 'text');
      } else {
          inputField.attr('type', 'password');
      }
  });
  $('.quantity_box .minus').click(function(){
    let value = $('.quantity_value').val();
    if(value!=1){
       if(value > 0){
        value--;
    } 
    }
      $('.quantity_value').val(value);
  });
  $('.quantity_box .plus').click(function(){
    let value = $('.quantity_value').val();
    if(value < 10){
        value++;
    }
      $('.quantity_value').val(value);
  });
  
}

$(document).ready(function(){
  AllSliders();
  accordion();
   toggle();
   navfix();
//   var $easyzoom = $('.easyzoom').easyZoom();
   $('.fancybox').on('click', function (e) {
    e.preventDefault();
  
    // Open Fancybox
    $.fancybox.open({
        src: $(this).attr('href'),
        type: 'image',
        opts: {
            thumbs: {
                autoStart: true,
            },
            afterLoad: function (instance, current) {
                // Trigger EasyZoom on the opened Fancybox image
                easyzoom.data('easyzoom').swap(current.src, current.width, current.height);
            },
        },
    });
  });

});




