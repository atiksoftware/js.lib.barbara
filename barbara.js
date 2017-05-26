
var barbara = {
	liste : [],
	recalc : function(C){
		var mx = C.pageX;
		var my = C.pageY;

		var W  = $(window).width(); /* Ekrna genişliği */
		var H  = $(window).height(); /* Ekran yüksekliği */
		var w  = W / 2; /* Ekranın genişliğinin yarısı */
		var h  = H / 2; /* Ekranın yüksekliğinin yarısı */
		var fx = 0; /* X yönünde : mausun merkezden uzaklığı */
		var fy = 0; /* Y yönünde : mausun merkezden uzaklığı */
		var ox = 0; /* X yönünde : mausun merkezden uzaklığının yüzdesi */
		var oy = 0; /* Y yönünde : mausun merkezden uzaklığının yüzdesi */
		var rx = 1; /* X yönünde : Mause sağda mı solda mı */
		var ry = 1; /* Y yönünde : Mause üstte mi altta mı */
		var ex = 0; /* Elementin X düzleminde orta noktası */
		var ey = 0; /* Elementin Y düzleminde orta noktası */
		var tt = "";
		for(i in barbara.liste){
			var r = barbara.liste[i];

			if(r.c != "screen"){
				w = r.e.offset().left + (r.e.width() / 2) + $(window).scrollLeft();
				h = r.e.offset().top + (r.e.height() / 2) + $(window).scrollTop();
			}
			fx = (mx > w ? mx - w : w - mx);
			rx = (mx > w ? 1 : -1);
			fy = (my > h ? my - h : h - my);
			ry = (my > h ? 1 : -1);
			ox = fx * 100 / w;
			oy = fy * 100 / h;

			if(r.d.indexOf("x") > -1){
				tt = " translateX("+  ((r.x / 100 * ox ) * rx )  +r.m+")";
			}
			if(r.d.indexOf("y") > -1){
				tt += " translateY("+  ((r.y / 100 * oy ) * ry )  +r.m+")";
			}
			r.e.css("transform",tt);
			//console.log(tt)
		}
	},
	scan : function(){
		barbara.liste = [];
		$(".barbara").each(function(){
			var e = $(this);
			barbara.liste.push({
				e : e,
				d : e.attr("barbara-direction"),
				x : e.attr("barbara-x"),
				y : e.attr("barbara-y"),
				m : e.attr("barbara-method"),
				c : e.attr("barbara-center")
			});
		});
	},
	create : function(){
		barbara.scan();
		$( document ).on( "mousemove", function( event ) {
			barbara.recalc(event);
		})
	}
}

$(document).ready(function(){
	barbara.create()
})
