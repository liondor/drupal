import React, {useEffect, useState} from 'react'
import Outil from "./Outils";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carte from "./Cartes/Carte";

function Liste(props) {
    var [categories, setCatergories] = useState(null)
    var [formattedCategories, setFormattedCategories] = useState(null)
    var pager = 'page[limit]=' + props.limit;
    var content_type = ''
    const URL_API = "http://localhost:8900/dsin/web/jsonapi/node/"
    useEffect(() => {
        if (props.limit !== null && props.limit !== undefined) {
            pager = '&page[limit]=' + props.limit;
        } else {
            pager = ""
        }
        if (props.type !== null && props.type !== undefined) {
            if (props.type === "outils") {
                content_type = "categorie_outils"
            }
            if (props.type === "articles") {
                content_type = "article"
            }
            if (props.type === "conseils") {
                content_type = "conseils"
            }
        }
        fetch(URL_API + content_type + '?include=field_image&fields[node--' + content_type + ']=title,field_description,field_description.value,field_image' + pager, {
            method: 'GET',
            headers: {
                'Autohrization': 'Beaver' + props.token.access_token,
                'Accept': 'application/vnd.api+json',
            },
        }).then((response) => response.json()
        ).then((data) => {
                setCatergories(data)
            },
        ).catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })

    }, [props.token.access_token, props.limit])

    useEffect(() => {

        let result = categories
        if (result !== null && result !== undefined) {
            let test = pairData()
            setFormattedCategories(test)
        }
    }, [categories])

    function pairData() {
        let content = categories.data
        let images = categories.included
        if (images) {
            images = images.map(image => {
                let imageURL = image.attributes.uri.url
                let imageID = image.id
                return {id: imageID, url: imageURL}
            })
        }
        //   console.log(images);
        let pairedArray = content.map(categorie => {
            let imageID
            let titre
            let content
            let result
            let imageURL
            if (categorie.relationships.field_image.data !== null) {
                imageID = categorie.relationships.field_image.data.id
                images.forEach(image => {
                    if (image.id === imageID)
                        imageURL = image.url
                })
            } else {
                imageURL = "/dsin/web/sites/default/files/default_images/question-mark.png"
            }
            titre = categorie.attributes.title
            //   console.log(categorie.attributes)
            if (categorie.attributes.field_description) {
                content = categorie.attributes.field_description.value
            } else {
                content = ""
            }
            result = {titre: titre, description: content, urlImage: imageURL}
            return result;
        })
        return pairedArray
    }

    function renderChild() {
        let result = formattedCategories
        if (result !== null & content_type !== undefined) {
            if (props.type === 'outils')
            return result.map(item => (
                <Outil id={item.titre + item.urlImage} titre={item.titre} description={item.description}
                       urlImage={item.urlImage}>Test</Outil>))
            if (props.type === 'conseils' || props.type === 'articles')
                return result.map(item => (
                    <Carte id={item.titre + item.urlImage} titre={item.titre} description={item.description}
                           urlImage={item.urlImage}>Test</Carte>))
        }
        else
            return <CircularProgress/>
    }

    return (
        <div id={"#listeOutils"} className={"conteneur"}>
            {renderChild()}

        </div>
    );
}

export default Liste