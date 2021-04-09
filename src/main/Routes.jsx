import React from 'react'
import {Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import ListaCrud  from '../components/lista/ListaCrud'
import ListaCrudPdf  from '../components/lista/ListaCrudPdf'
import ListaAnt from '../components/lista_anteriores/ListaAnt'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/listas' component={ListaCrud}/>  
        <Route exact path='/listas/pdf' component={ListaCrudPdf}/> 
        <Route exact path='/listas-anteriores' component={ListaAnt}/>
        <Route exact path='*' to='/'/>
    </Switch>