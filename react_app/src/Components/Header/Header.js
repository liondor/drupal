import React, {useEffect, useRef, useState} from 'react'
import BigHeader from "./BigHeader";
import SmallHeader from "./SmallHeader";

function Header() {

    const {height, width} = useWindowDimensions();
  //var [hasScrolled, setHasScrolled] = useState(false);
  var hasScrolled = useRef(false);
    useEffect(() => {
        if (width >= 768) {
          const header = document.getElementsByClassName("header")[0];
          //  const header = document.getElementById("header");
          const menu = document.getElementById("menuBig");
            const offset = document.getElementById("offset");
            const sticky = header.offsetTop;
            const scrollCallBack = window.addEventListener("scroll", () => {
                if (window.pageYOffset > sticky) {
                    header.classList.add("sticky");
                  offset.classList.add("offsetSticky");
                  menu.classList.add("stickyText");
                  header.classList.remove("headerGridNonSticky");
                  hasScrolled.current = true;
                } else {
                  offset.classList.remove("offsetSticky");
                    header.classList.remove("sticky");
                  menu.classList.remove("stickyText");
                  header.classList.add('headerGridNonSticky');
                  hasScrolled.current = false;
                }
            });
            return () => {
                window.removeEventListener("scroll", scrollCallBack);
            };
        }
    }, [width, hasScrolled]);
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

const Component = () => {
    const {height, width} = useWindowDimensions();

    return (
        <div>
            width: {width} ~ height: {height}
        </div>
    );
};
export default Header;
