import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

    useEffect(()=> {
    })

    let {id} = useParams();
    let product = props.products.find(function(product){
        return product.productId == id
      });

    return(
        <div className="container">
            <div className="row">
                <h4>{ product.productName } (ID : {product.productId})</h4>
                <p>Product Owner Name : { product.productOwnerName }</p>
                <p>Developers :</p>
                {
                    product.Developers.map(function(developer,i){
                        return(
                            <p>- { developer }</p>
                        )
                    })
                }
                <p>Scrum Master Name : { product.scrumMasterName }</p>
                <p>Start Date : { product.startDate }</p>
                <p>Methodology : { product.methodology }</p>
            </div>
        </div>
    )
  }

  export default Detail;