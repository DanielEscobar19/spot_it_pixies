import React from 'react'
import Layout from './Layout'

export default function ErrorNotFound() {
  return (
      <>
        <Layout/>
        <div className='d-flex align-items-center m-5 flex-row flex-wrap justify-content-center'>
            <div>
                <h1 >Oops! That page can’t be found.</h1>
                <p>
                    It looks like nothing was found at this location.<br/>Maybe try one of the links in the menu.
                </p>
            </div>
            <div className="ms-4" >
                <img src="/img/common/spot-it-hand-sad.svg" alt="Spot it hand decorative" className="col-4 dec-img-spot-it img-fluid"/>
            </div>
        </div>
      
      </>
  )
}
