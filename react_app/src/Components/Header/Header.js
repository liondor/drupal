import React, {useEffect, useRef, useState} from 'react'
import BigHeader from "./BigHeader";
import SmallHeader from "./SmallHeader";

/** But: Sert à alterner entre la version de l'entête pour petits et grands écrans.
 * Sert également à permettre à l'entête d'être constamment affiché en haut de la fenêtre  (Sticky header)
 *
 * Entrées: Aucunes
 * */

function Header() {
  const {height, width} = useWindowDimensions();
  var aDefile = useRef(false);
  useEffect(() => {
    if (width >= 768) {
      const header = document.getElementsByClassName("header")[0];
      const menu = document.getElementById("menuBig");
      const decalage = document.getElementById("offset");
      const sticky = header.offsetTop;
      const defilementCallBack = window.addEventListener("scroll", () => {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          decalage.classList.add("offsetSticky");
          menu.classList.add("stickyText");
          header.classList.remove("headerGridNonSticky");
          aDefile.current = true;
        } else {
          decalage.classList.remove("offsetSticky");
          header.classList.remove("sticky");
          menu.classList.remove("stickyText");
          header.classList.add('headerGridNonSticky');
          aDefile.current = false;
        }
      });
      return () => {
        window.removeEventListener("scroll", defilementCallBack);
      };
    }
  }, [width, aDefile]);
  if (width >= 768) {
    return (
      <>
        <BigHeader/>
      </>
    );
  } else {
    return (
      <>
        <SmallHeader/>
      </>
    );
  }
}

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowDimensions;
}

export default Header;
