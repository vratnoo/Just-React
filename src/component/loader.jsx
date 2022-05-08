import React from 'react'

export const Loader = (props) => {

    if(props.loadingStatus==='loading'){
        return (
            <div className='loader'><div class="lds-ripple"><div></div><div></div></div></div>
               )
    }else{
        return null
    }

}


 
