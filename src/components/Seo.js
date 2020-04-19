import React from 'react'
import { Helmet } from "react-helmet";

const defaultTitle = "Batifis, entreprise de travaux du batiment à 80200 péronne et 80700 roye"

export const Seo = (props) => {
    const { title, description } = props

    return <Helmet>
        <meta charSet="utf-8" />
        <title>{title === 'default' ? defaultTitle : title}</title>
        <meta name="description" content={description} />
        {/* <link rel="canonical" href={`http://batifis.fr/${path}`} /> */}
    </Helmet>
}