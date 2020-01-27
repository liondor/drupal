import React, {useRef, useState} from "react";
import {BrowserRouter as Router, useLocation} from "react-router-dom";
import _ from 'lodash'

export default function Login() {
    var [xmlResponse, setXMLResponse] = useState(null)
    var isAuth = useRef(false)
    var isFetchDone = useRef(false)

    function getXMLfile(ticket) {
        var resultat = null;
        if (ticket && xmlResponse == null) {
            fetch('https://auth.martinique.univ-ag.fr/cas/serviceValidate?service=http://172.15.255.255/login&ticket=' + ticket
            ).then(result => result.text()).then(result => {
                resultat = result
                setXMLResponse(result)
                isFetchDone.current = true
                return result
            }).then(resultat => {
                if (verifyXMLfile(resultat)) {
                    console.log(xmlResponse)
                }
            })
                .catch(function (error) {
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                })
        }

    }

    function verifyXMLfile(casResponse) {
        if (casResponse != null) {
            var casResponseHolder = casResponse;
            var verifyAuthentification = casResponseHolder.search("authenticationSuccess")
            if (verifyAuthentification >= 0) {
                var usernameStartingPos = casResponseHolder.search("<cas:user>")
                var usernameEndingPos = casResponseHolder.search("</cas:user>")
                console.log(casResponseHolder.substring(usernameStartingPos + 9, usernameEndingPos))
                isAuth.current = true
                return true;
            }
        }
        console.log("Authentification failed" + casResponse)
        return false
    }

    function isSessionValid(ticket) {
        var cookie = getCookie("JSESSION")
        console.log(cookie)
        if (cookie) {
            fetch('http://localhost:8900/dsin/web/hello?validate=' + cookie
            )
        }
        return false;
    }

    function startSession(ticket) {
        let sessionCookie = getCookie('JSESSION')
        let sessionCookieArgument = "";
        if (!_.isEqual(sessionCookie, "")) {
            sessionCookieArgument = '&session=' + sessionCookie
        }
        fetch('http://localhost:8900/dsin/web/hello?ticket=' + ticket + sessionCookieArgument
        ).then(result => result.text()).then(result => {
            setXMLResponse(result)
            isFetchDone.current = true
            return result
        }).then(resultat => {
            console.log(resultat)
            document.cookie = resultat;
        })
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            })
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function Child({ticket}) {

        if (!isAuth.current) {

            isSessionValid(ticket)

        }

        return (
            <div>
                {ticket ? (
                    <h3> There is a ticket</h3>
                ) : (
                    <h3>There is no ticket in the query string</h3>
                )}
            </div>
        );
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function QueryParamsDemo() {
        let query = useQuery();

        return (
            <div>
                <div>

                    <Child ticket={query.get("ticket")}/>
                </div>
            </div>
        );
    }


    return (
        <Router>
            <QueryParamsDemo/>
        </Router>
    );
}



