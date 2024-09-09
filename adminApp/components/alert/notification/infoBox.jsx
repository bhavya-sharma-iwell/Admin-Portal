import React from 'react';
export default class InfoBox extends React.Component{
	constructor(props){
		super(props);
		this.state={posClass:''}
	}

	componentDidMount(){ 
		let target = document.getElementById('myTestSpanId');
		let tip = this.props.infoMsg;
		let tooltip = document.getElementById('infoBox');
		
        var pos_left = target.offsetLeft + ( target.offsetWidth / 2 ) - ( tooltip.offsetWidth / 2 );
        var pos_top  = target.offsetTop - tooltip.offsetHeight - 20;
        if( pos_left < 0 )
        {
            pos_left = target.offsetLeft + target.offsetWidth / 2 - 20;
            this.setState({posClass:"left"})
        }

        if( pos_left + tooltip.offsetWidth > window.innerWidth )
        {
            pos_left = target.offsetLeft - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
            this.setState({posClass:"right",})
        }
        
        if( pos_top < 0 )
        {
            var pos_top  = target.offsetTop + target.offsetHeight;
            this.setState({posClass:"top"})
        }
         this.setState({pos_left:pos_left,pos_top:pos_top})
         

        /*tooltip.css( { left: pos_left, top: pos_top } )
               .animate( { top: '+=10', opacity: 1 }, 50 ); */
	}
	render(){
		return(
			<div id="infoBox" class={"tooltip "+this.state.posClass||'bottom'} style={{left:this.state.pos_left,top:this.state.top}}>{this.props.infoMsg}</div>
		)
	}
}

/*

Tool Tip With $.

$( function()
{
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
 
    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip == '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
 
        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.offsetWidth * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_left = target.offset().left + ( target.offsetWidth / 2 ) - ( tooltip.offsetWidth / 2 ),
                pos_top  = target.offset().top - tooltip.offsetHeight() - 20;
 
            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.offsetWidth / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
 
            if( pos_left + tooltip.offsetWidth > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
 
            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.offsetHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
 
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        init_tooltip();
        $( window ).resize( init_tooltip );
 
        var remove_tooltip = function()
        {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });
 
            target.attr( 'title', tip );
        };
 
        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });
});


*/
