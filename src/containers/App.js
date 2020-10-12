import React, { Component } from 'react';
import Pictures from '../components/Pictures/Pictures';
import SelectedPicture from '../components/SelectedPicture/SelectedPicture';
import uniqid from 'uniqid';
import './App.css';

class App extends Component {
  
  state = {
    objects: [],
  };

  componentDidMount() {
    
    // console.log('mounted');
    this.setURLs(25);

  }

  componentDidUpdate(prevProps) {

  }

  // cycleCounter = index => {
  //   const objects = [...this.state.objects];

  //   objects[index].state.cycles += 1;

  //   console.log('cyclecounter', objects[index]);

  //   this.setState({objects: objects});
  // }

  deleteObject = (ind) => {
    const objects = [...this.state.objects];

    objects.splice(ind, 1);

    console.log('deleted an item at index', ind);

    this.setState({objects: objects});
    
    this.setURLs(1);
  }

  setURLs = async (requiredNum) => {
    if (requiredNum > 1) {
      this.setState({loading: true})
    }

    let fetchURL = 'https://boiling-harbor-07938.herokuapp.com/https://oregonnikkei.pastperfectonline.com/randomimages';

    const urls = [];

    await fetch(fetchURL)
        .then( response => response.body)
        .then( body => {
          const reader = body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                      controller.close();
                      return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }  
          })
        })
        .then(stream => new Response(stream, { headers: { "Content-Type": "text/html" } }))
        .then(response => response.blob())
        .then(blob => blob.text())
        .then(text => {
          const regexpStart = /awesomeness=/g;
          var urlIndStart, urlIndsStart = [];

          while ((urlIndStart = regexpStart.exec(text)) != null && urlIndsStart.length <= requiredNum) {
            urlIndsStart.push((urlIndStart.index + 13));
          }

          console.log(urlIndsStart);

          const regexpEnd = /mediaid=/g;
          var urlIndEnd, urlIndsEnd = [];

          while ((urlIndEnd = regexpEnd.exec(text)) != null && urlIndsEnd.length <= requiredNum) {
            urlIndsEnd.push(urlIndEnd.index - 2);
          }

          console.log(urlIndsEnd);
          

          urlIndsStart.forEach((ind, index) => {
            const start = ind;
            const end = urlIndsEnd[index];

            const urlPrefix = 'https://oregonnikkei.pastperfectonline.com/';

            urls.push( urlPrefix + text.slice(start, end));
          })
          
        })

        await Promise.all(urls.map(async (url, index) => {
          console.log('url: ', url, 'index:', index);
          const obj = await this.getRandomObject(url);

          obj.timeout = setTimeout(() => this.deleteObject(index), (obj.style.randInt * 10000));
            
          console.log(obj);
  
          let objects = [...this.state.objects];

          objects.push(obj);

          this.setState({objects: objects});
        }))

        console.log('loading finished');
        this.setState({loading: false});
  }

  getRandomObject = async (url) => {

    let fetchURL = `https://boiling-harbor-07938.herokuapp.com/` + url;
      
    const response = await fetch(fetchURL)
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
      return pump();
      function pump() {
        return reader.read().then(({ done, value }) => {
        // When no more data needs to be consumed, close the stream
        if (done) {
          controller.close();
          return;
        }
        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);
        return pump();
        });
      }
    }  
    })
    const readStream = await new Response(stream, { headers: { "Content-Type": "text/html" } });
    const blob = await readStream.blob();
    const text = await blob.text()
    // console.log(text);
    const startSearchTerm = `<a href='https://s3.amazonaws.com/pastperfectonline/images/museum_975`
    const endSearchTerm = `<div class="grid_12 footer">`
    let startIndex = text.indexOf(startSearchTerm);
    let endIndex = text.indexOf(endSearchTerm);
    let newText = text.slice(startIndex, endIndex);
    // console.log(newText);
          
    let urlStartIndex = newText.indexOf(`https`);
    let urlEndIndex = newText.indexOf(`' rel="gallery1"`);
    let newURL = newText.slice(urlStartIndex, urlEndIndex);
          
    let titleStart = newText.indexOf(`linktitle="`);
    let titleEnd = newText.indexOf(`">`);
    let newTitle = newText.slice(titleStart, titleEnd).replace(`linktitle="`, '');
  
    let catalogStartIndex = newText.indexOf(`Catalog Number</td>`);
    let catalogEndIndex = newText.indexOf(`Object Name</td>`);
    // console.log(newText);
    // console.log(catalogStartIndex, catalogEndIndex)
    let newCatalog = newText.slice(catalogStartIndex, catalogEndIndex).replace(`Catalog Number</td>`, '');

    let contentStartIndex = newText.indexOf(`<td class="category">Description</td>`);
    let contentEndIndex = newText.indexOf(`<td class="category">Dimensions</td>`);
    let newContent = newText.slice(contentStartIndex, contentEndIndex).replace(`<td class="category">Description</td>`, '');

    let width = document.documentElement.clientWidth;

    let randX = Math.ceil(Math.random() * width) - 100;

    let randInt = Math.ceil(Math.random() * 20) + 35;
    let num = Math.ceil(Math.random() * 500) + 100;

    let blurClass = () => {
    
      if (num >= 400) {
          return 0;
      } else if (num >= 300) {
          return .05;
      } else if (num >= 200) {
          return .1;
      } else {
          return .2;
      }
    }
        
    let z = () => {
      if (blurClass === 0) {
        return 4;
      } else if (blurClass >= 0.05) {
        return 1;
      } else if (blurClass >= .1) {
        return 0;
      } else {
        return 0;
      }
    }
          
    const newObject = {
      title: newTitle,
      imgURL: newURL,
      catalog: newCatalog,
      content: newContent,
      isClicked: false,
      timeout: null,
      id: uniqid(),
      style: {
        randX: randX,
        randInt: randInt,
        num: num,
        blurClass: blurClass(),
        z: z()
      }
    }
    return newObject;
  }

  clickHandler = index => {
    let objects = [...this.state.objects];

    let clickedObject = objects[index];

    clickedObject.isClicked = true;
    
    // console.log(clickedObject);

    this.setState({
      isClicked: true,
      selectedObject: clickedObject
    });

  }
  
  deselectHandler = () => {
    this.setState({
      isClicked: false,
      selectedObject: null
    })
  }

  clearImages = () => {
    if (this.state.URLs) {
      this.setState({URLs: null});
    }
  }
  
  render() {
    return (
      <div className="pics-container">
        <img alt="JAMO logo" src="https://www.oregonnikkei.org/images/JAMOnotag.jpg" className="logo-img" />
            <Pictures 
              objects={this.state.objects}
              clicked={this.clickHandler}
              loading={this.state.loading}
              // deleteSelf={this.deleteObject}
            />
            {this.state.isClicked ?
              <SelectedPicture 
                object={this.state.selectedObject}
                deselect={this.deselectHandler}
              />
              :
              null}
      </div>
    );
  }
  
}

export default App;
