import React, { Component } from 'react';
import reload from './reload.png'
import Dropzone from 'react-dropzone';

class Reader extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded:false,
      items: null,

      isText:false,
      fileContent:null,

      isCSV:false,
      csvContent:[],

      showAPIArea: 'block',
      showUploadArea:'none',

      showAll:'block',
      showFilter: 'none'
    }
  }

  about = () => {alert('Paste the API link from Quandl into the input box below')}
  clearLink = () => {document.getElementById('Qlink').value = ''}

  runData = () => {
    const quandlLink = document.getElementById('Qlink').value
    if(quandlLink == ''){
      alert('Please paste an API referce in the textbox first')
    }
    else {
      fetch(quandlLink)
      .then(res => res.json())
      .then(json => {this.setState({isLoaded:true,items: json})
      })
    }}

    showAll = () => {
      this.setState({showAll:'block'})
      this.setState({showFilter:'none'})
    }
    showFilter = () => {
      this.setState({showAll:'none'})
      this.setState({showFilter:'block'})
    }
    FilterFunction = () => {
      const element = document.getElementById('filterBox').value
      if(!isNaN(element)){
        document.getElementById('resultDisplay').innerText = this.state.items[element].name
      } else {
        alert('You entered a string, good for you')
      }
    }

    nextPerson = () => {
      var element = document.getElementById('filterBox').value
      element++
      document.getElementById('filterBox').value = element
      document.getElementById('resultDisplay').innerText = this.state.items[element].name
    }

  handleOnDrop = (files, rejectedFiles) => {
      var fileOptions = document.getElementById('selectMenu')
      var fileChosen = fileOptions.options[fileOptions.selectedIndex].text
      if(fileChosen == 'TXT'){
        this.setState({fileContent:files})
        const reader = new FileReader()
        reader.onload = function(){
          document.getElementById('textarea').value = reader.result
        }
        reader.readAsText(files[0])
        this.setState({fileContent:reader.result})
        this.setState({isText:true})
      }
      else if(fileChosen == 'CSV'){
        const csvContent = this.state.csvContent
        const reader = new FileReader()
        reader.onload = function(){
          const lines = reader.result.split('\n').map(function(line){
            if(line != ''){
              csvContent.push(line)
            }
          })
          for(var i=0; i<csvContent.length;i++){
            const input = document.createElement('input')
            input.value = csvContent[i]
            document.getElementById('inputSection').appendChild(input)
          }
        }
        reader.readAsText(files[0])
        this.setState({csvContent:csvContent})
        this.setState({isCSV:true})
      }
  }

  render() {
    var {isLoaded, items, isText, fileContent, isCSV, csvContent} = this.state
    if(!isLoaded && !isText && !isCSV){
        return (
        <div>
          <div id='heading'>
            <h1>Quandl Reader</h1>
          </div>
          <div id='sidebar'>
            <h1 class='sideItem' onClick={()=>{this.setState({showAPIArea:'block'}), this.setState({showUploadArea:'none'})}}>Enter API</h1>
            <hr/>
            <h1 class='sideItem' onClick={()=>{this.setState({showAPIArea:'none'}), this.setState({showUploadArea:'block'})}}>Upload File</h1>
            <hr/>
            <h1 class='sideItem'></h1>
          </div>

          <div id='container' class='apiArea' style={{display:this.state.showAPIArea}}>
            <label class='label'>Quandl API</label>
            <input type='text' id='Qlink' class='input' size={25}/>
            <button class='smallBut' onClick={this.about}>?</button>
            <button class='smallBut' onClick={this.clearLink}><img src={reload} width={16} height={16}></img></button><br/>
            <button class='but' onClick={this.runData}>Run</button>
          </div>

          <div id='container' class='uploadArea' style={{display:this.state.showUploadArea}}>
            <Dropzone onDrop={this.handleOnDrop}>Upload a file</Dropzone>
            <select name="selectMenu" id='selectMenu'>
              <option value="txt">TXT</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
            </select>
          </div>
        </div>
      )
    }
    else if(isLoaded){
      const data = this.state.items
      return (
        <div>
          <div id='heading'>
            <h1>Quandl Reader</h1>
          </div>
          <div>
            <span class='option' onClick={this.showAll}>Full List</span>
            <span class='option' onClick={this.showFilter}>Filter</span>
          </div>
          <div id='container' style={{display:this.state.showAll}}>
          {this.state.items.map((content, index) =>{
          return<div id='dataDisplay' key={content.id}>
              <h3>{content.name}</h3>
            </div>
          })}
          </div>
          <div id='container' style={{display:this.state.showFilter}}>
            <label>Find by id</label>
            <input type='text' id='filterBox' class='input' size={25}/>
            <button class='but' onClick={this.FilterFunction}>Get</button>
            <button class='but' onClick={this.nextPerson}>Next</button>
            <h2 id='resultDisplay'></h2>
          </div>
        </div>
      )}
    else if(isText){
      return(
        <div>
          <div id='heading'>
            <h1>Quandl Reader</h1>
          </div>
          <div id='container'>
            <textarea id='textarea' rows="44" cols="70"/>
          </div>
        </div>
      )
    }
    else if(isCSV){
      return(
        <div>
          <div id='heading'><h1>Quandl Reader</h1></div>
          <div id='inputSection'></div>
          <div id='container' class='toolbox'>
            <label>Value of </label>
            <input type='text' id='val' size={10} onChange={()=>{document.getElementById('valueResult').innerText = this.state.csvContent[document.getElementById('val').value]}}/>
            <label id='valueResult'></label>
          </div>
        </div>
      )
    }
  }
}

export default Reader;
