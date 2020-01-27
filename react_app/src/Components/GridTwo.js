import React, {useEffect, useState} from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";

var HtmlToReactParser = require('html-to-react').Parser;
const GridTwo = (props) => {
    var [poles, setPoles] = useState(null)
    const URL_API = "http://localhost:8900/dsin/web/jsonapi/node/"
    useEffect(() => {

        fetch(URL_API + 'poles_dsin?fields[node--poles_dsin]=title,body,body.value', {
            method: 'GET',
            headers: {
                'Autohrization': 'Beaver' + props.token.access_token,
                'Accept': 'application/vnd.api+json',
            },
        }).then((response) => response.json()
        ).then((data) => {
                console.log(data.data)
                setPoles(data.data)
            },
        ).catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })

    }, [props.token.access_token])
    return (
        <div id={"grid2"} className={"grid2"}>
            {renderChild()}
        </div>
    );

    function parseStringToHTML(stringContainingHtmlTags) {
        var htmlToReactParser = new HtmlToReactParser();
        var reactElement = htmlToReactParser.parse(stringContainingHtmlTags);
        return reactElement

    }

    function renderChild() {
        let result = poles
        if (result !== null) {
            return result.map(item => (<>
                <h2> {item.attributes.title}</h2> <>{parseStringToHTML(item.attributes.body.value)}
            </>
            </>))
        } else
            return <CircularProgress/>
    }


}

export default GridTwo