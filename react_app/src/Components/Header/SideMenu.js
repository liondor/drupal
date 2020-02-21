import React from 'react'
import Drawer from "@material-ui/core/Drawer"

/** Menu pour l'entête du site pour les appareils mobiles
 *  Entrées :   -show : Booléen servant à ouvrir le menu
 *              -toggle : Fonction servant à fermer le menu
 *
 * */
const SideMenu = (props) => {
  return (
    <Drawer anchor={"left"} open={props.show} onClose={props.toggle}>
      <>
        {props.content(props.toggle)}
      </>
    </Drawer>)
};

export default SideMenu;
