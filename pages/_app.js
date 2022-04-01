import'../pages/style.css'
import App from'next/app'
import React from'react'
export default class MyApp extends App{static async getInitialProps(ac){return({...await App.getInitialProps(ac)});
  }
  render(){const{Component,pageProps}=this.props
    return<Component{...pageProps}/>
  }}
