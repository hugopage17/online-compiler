import React, { Component } from 'react';

class EditorType extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      color: 'white',
    }
  }

  hoverOver = () => {this.setState({color: 'black'})}
  hoverAway = () => {this.setState({color: 'white'})}

  render(){
    const labelStyle = {
      marginRight: 60,
      fontSize: 24,
      color:this.state.color
    }

    return(
      <label style={labelStyle}
        onMouseEnter={this.hoverOver}
        onMouseLeave={this.hoverAway}
        onClick={this.props.navigate}>
        {this.props.name}
      </label>
    )
  }
}

class Compiler extends Component{
  constructor(props){
    super(props)
    this.state = {
      showHTML: 'block',
      showCSS: 'none',
      showJS:'none',
      showSite:'none',
      showFiles:'none',

      htmlFileNames:[],
      cssFileNames: [],
      jsFileNames:[],

      htmlCode:[],
      cssCode:[],
      jsCode:[]
    }
  }

  componentDidMount(){
    this.displayCode()
  }

  displayCode = () => {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;
    document.body.onkeyup = function() {
      code.open()
      code.writeln(
        html.value +
          "<style>" +
          css.value +
          "</style>" +
          "<script>" +
          js.value +
          "</script>"
      )
      code.close()
    }
  }

  showHTML = () => {
    this.setState({showHTML:'block'})
    this.setState({showCSS:'none'})
    this.setState({showJS:'none'})
    this.setState({showSite:'none'})
    this.setState({showFiles:'none'})
  }
  showCSS = () => {
    this.setState({showHTML:'none'})
    this.setState({showCSS:'block'})
    this.setState({showJS:'none'})
    this.setState({showSite:'none'})
    this.setState({showFiles:'none'})
  }
  showJS = () => {
    this.setState({showHTML:'none'})
    this.setState({showCSS:'none'})
    this.setState({showJS:'block'})
    this.setState({showSite:'none'})
    this.setState({showFiles:'none'})
  }
  showLive = () => {
    this.setState({showHTML:'none'})
    this.setState({showCSS:'none'})
    this.setState({showJS:'none'})
    this.setState({showSite:'block'})
    this.setState({showFiles:'none'})
  }

  showFiles = () => {
    this.setState({showHTML:'none'})
    this.setState({showCSS:'none'})
    this.setState({showJS:'none'})
    this.setState({showSite:'none'})
    this.setState({showFiles:'block'})
  }

  downloadSource = () => {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");

    var html_element = document.createElement("a");
    var css_element = document.createElement("a");
    var js_element = document.createElement("a");

    var html_file = new Blob([html.value], {type: 'text/plain'});
    var css_file = new Blob([css.value], {type: 'text/plain'});
    var js_file = new Blob([js.value], {type: 'text/plain'});

    html_element.href = URL.createObjectURL(html_file)
    css_element.href = URL.createObjectURL(css_file)
    js_element.href = URL.createObjectURL(js_file)

    html_element.download = 'index.html'
    css_element.download = 'style.css'
    js_element.download = 'index.js'

    html_element.click();
    css_element.click();
    js_element.click();
  }
  uploadSource = () => {
    const button = document.getElementById('uploadBut')
    const fileUploader = document.getElementById('fileUploader')
    const input = this.refs.fileSelect
    button.addEventListener('click', function(){
      fileUploader.click()
      fileUploader.addEventListener('change', function(e){
        const reader = new FileReader()
        reader.onload = function(){
          document.getElementById('html').value = reader.result
        }
        reader.readAsText(input.files[0])
      }, false)
    })
  }

  saveCode = () => {
    if(this.state.showHTML == 'block'){
      var htmlFiles = this.state.htmlFileNames
      var fileDisplay = document.getElementById('allHtml')
      while (fileDisplay.firstChild){
        fileDisplay.removeChild(fileDisplay.firstChild)
      }

      const file_name = prompt('Save this file as')
      htmlFiles.push(file_name)
      const current_code = document.getElementById('html').value

      var htmlCode = this.state.htmlCode
      htmlCode.push(current_code)
      this.setState({htmlCode:htmlCode})

      for(var i=0;i<htmlFiles.length;i++){
        const current_file = document.createElement('h3')
        current_file.innerText = htmlFiles[i] + '.html'
        document.getElementById('allHtml').appendChild(current_file)
      }
      this.setState({htmlFileNames:htmlFiles})
    }


    else if (this.state.showCSS == 'block'){
      var cssFiles = this.state.cssFileNames
      var fileDisplay = document.getElementById('allCss')
      while (fileDisplay.firstChild){
        fileDisplay.removeChild(fileDisplay.firstChild)
      }

      const file_name = prompt('Save this file as')
      cssFiles.push(file_name)
      const current_code = document.getElementById('css').value

      var cssCode = this.state.cssCode
      cssCode.push(current_code)
      this.setState({cssCode:cssCode})

      for(var i=0;i<cssFiles.length;i++){
        const current_file = document.createElement('h3')
        current_file.innerText = cssFiles[i] + '.css'
        document.getElementById('allCss').appendChild(current_file)
      }
      this.setState({cssFileNames:cssFiles})
    }

    else if (this.state.showJS == 'block'){
      var jsFiles = this.state.jsFileNames
      var fileDisplay = document.getElementById('allCss')
      while (fileDisplay.firstChild){
        fileDisplay.removeChild(fileDisplay.firstChild)
      }

      const file_name = prompt('Save this file as')
      jsFiles.push(file_name)
      const current_code = document.getElementById('js').value

      var jsCode = this.state.jsCode
      jsCode.push(current_code)
      this.setState({jsCode:jsCode})

      for(var i=0;i<jsFiles.length;i++){
        const current_file = document.createElement('h3')
        current_file.innerText = jsFiles[i] + '.js'
        document.getElementById('allJs').appendChild(current_file)
      }
      this.setState({jsFileNames:jsFiles})
    }

    else if (this.state.showHTML == 'none' && this.state.showCSS == 'none' && this.state.showJS == 'none'){
      alert('Please open a sheet before saving')
    }
  }

  render() {
    return (
      <div>
        <div id='header'>
          <div>
            <h1>Live Code Editor</h1>
          </div>
          <div id='butDiv'>
            <button id='uploadBut' class='but' onClick={this.uploadSource}>Import Code</button>
            <input type='file' hidden='hidden' ref='fileSelect' id='fileUploader'/>
            <button class='but' onClick={this.downloadSource}>Export Code</button>
          </div>
        </div>
        <div id='menu'>
          <button class='smallbut'>new sheet</button>
          <button class='smallbut' onClick={this.saveCode}>save sheet</button>
          <button class='smallbut' onClick={this.showFiles}>files</button>
        </div>
        <div id='workSpace'>
          <div style={{margin:'auto', width:'80%', marginBottom: 20, marginTop:20}}>
            <EditorType name='HTML Editor' navigate={this.showHTML}/>
            <EditorType name='CSS Editor' navigate={this.showCSS}/>
            <EditorType name='JS Editor' navigate={this.showJS}/>
            <EditorType name='Live Site' navigate={this.showLive}/>
          </div>
          <div id='compilerContainer'>
            <textarea class='compiler' id="html" placeholder="HTML Markup" rows="44" cols="120" style={{display:this.state.showHTML}}></textarea>
          </div>
          <div id='compilerContainer'>
            <textarea class='compiler' id="css" placeholder="CSS Markup" rows="44" cols="120" style={{display:this.state.showCSS}}></textarea>
          </div>
          <div id='compilerContainer'>
            <textarea class='compiler' id="js" placeholder="JS Markup" rows="44" cols="120" style={{display:this.state.showJS}}></textarea>
          </div>
          <div id='webContainer'>
            <iframe id="code" width="750" height="650" style={{display:this.state.showSite}}></iframe>
          </div>
        </div>
        <div id='fileLoader' style={{WebkitFilter: "drop-shadow(5px 0px 5px #666)", display:this.state.showFiles}}>
          <div id='htmlFiles'>
            <h2>HTML Files</h2>
            <hr/>
            <div id='allHtml'></div>
            <hr/>
          </div>

          <div id='cssFiles'>
            <h2>CSS Files</h2>
            <hr/>
            <div id='allCss'></div>
            <hr/>
          </div>

          <div id='jsFiles'>
            <h2>Javascript Files</h2>
            <hr/>
            <div id='allJs'></div>
            <hr/>
          </div>

        </div>
      </div>
    );
  }
}

export default Compiler
