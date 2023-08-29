import React from 'react'

export const Description = ({ product }) => {
        
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: product.prodDescription }} />
        </div>
    )
}
