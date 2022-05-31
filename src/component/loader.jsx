import React from 'react'

const Loader = (props) => {

    if(props.loadingStatus==='loading'){
        return (
            <div className='loader'><div className="lds-ripple"><div></div><div></div></div></div>
               )
    }else{
        return null
    }

}

export default Loader

 
