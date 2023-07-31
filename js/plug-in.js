$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        responsiveClass:true,
        responsive:{
            980:{
                items:2,
                nav:true
            },
            1320:{
                items:3,
                nav:true
            }
        }
    });
});