$(document).ready(function(){
	//ajax to retrieve and print values of API
	$.ajax({ 
		type: 'GET', 
		url: 'http://pokeapi.co/api/v2/pokemon/?limit=151', 
		data: { get_param: 'results' }, 
		dataType: 'json',
		success: function (data) { 
			$(".pokemon-container").attr("data-total", data.results.length);
			$.each(data.results, function(index){
				var item = data.results[index].url.split("/")[ data.results[index].url.split("/").length-2]; 
				var itemFormatted = (item < 100 ? (item < 10 ? '00' : '0') : '')+item;
				
				var pokemonElement =
					"<div class='wrap-container hide col-xs-12 col-sm-6 col-md-3'> \
						<div class='pokemon-img'> \
							<img class='left' src='./images/" + item + ".png'> \
						</div> \
						<div class='pokemon-details left'> \
							<p>" + itemFormatted + "</p> \
							<p>" + data.results[index].name + "</p> \
						</div> \
					</div>";			
				$('.pokemon-container').append(pokemonElement);
			});
		}
	}).done(function() {
		$('.pokemon-container').children().slice(0, 20).removeClass("hide");
	});
	
	//pagination
	$('#current_page').val(0);

	//filter
    $("#filter").keyup(function(){
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $(".pokemon-details").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).parent().fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).parent().fadeIn();
                count++;
            }
        });
    });
});
	
function paginationPrev()
{
	var currentPage = parseInt($("#current_page").val())-1;
	if (currentPage>-1)
	{
		$("#current_page").val(currentPage);
		$('.pokemon-container').children().removeClass("hide").addClass("hide");
		$('.pokemon-container').children().slice((20*currentPage), (20*currentPage)+20).removeClass("hide");
	}
};

function paginationNext()
{
	var currentPage = parseInt($("#current_page").val())+1;
	if (currentPage < parseInt($(".pokemon-container").attr("data-total"))/20)
	{
		$("#current_page").val(currentPage);
		$('.pokemon-container').children().removeClass("hide").addClass("hide");
		$('.pokemon-container').children().slice((20*currentPage), (20*currentPage)+20).removeClass("hide");
	}
};